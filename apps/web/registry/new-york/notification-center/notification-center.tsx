"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  MoreHorizontal,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Notification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  priority?: 'low' | 'medium' | 'high'
}

export interface NotificationCenterTheme {
  container: string
  header: string
  title: string
  badge: string
  notificationItem: {
    base: string
    unread: string
    read: string
    hover: string
  }
  notificationContent: {
    title: string
    titleRead: string
    message: string
    messageRead: string
    newBadge: string
    timestamp: string
  }
  priorityBadge: {
    high: string
    medium: string
    low: string
  }
  buttons: {
    filter: string
    markAllRead: string
    actionButton: string
  }
  popover: {
    content: string
    header: string
    trigger: string
    unreadIndicator: string
  }
  emptyState: {
    container: string
    icon: string
    title: string
    description: string
  }
  scrollArea: string
}

const defaultTheme: NotificationCenterTheme = {
  container: "w-full max-w-2xl shadow-sm border-border/50",
  header: "pb-3",
  title: "flex items-center gap-3",
  badge: "text-xs px-2 py-1 max-sm:hidden",
  notificationItem: {
    base: "group relative flex items-start gap-3 p-4 rounded-lg border transition-all duration-200",
    unread: "border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/10 dark:border-l-blue-400",
    read: "border-border hover:border-muted-foreground/20",
    hover: "hover:bg-muted/30 hover:shadow-sm"
  },
  notificationContent: {
    title: "text-sm leading-tight font-semibold text-foreground",
    titleRead: "text-sm leading-tight font-medium text-muted-foreground",
    message: "text-sm leading-relaxed text-foreground/80",
    messageRead: "text-sm leading-relaxed text-muted-foreground",
    newBadge: "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    timestamp: "text-xs text-muted-foreground font-medium"
  },
  priorityBadge: {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500"
  },
  buttons: {
    filter: "h-8 text-xs",
    markAllRead: "h-8 text-xs",
    actionButton: "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
  },
  popover: {
    content: "w-80 p-0 shadow-xl border-border/50",
    header: "p-4 border-b bg-muted/20",
    trigger: "relative hover:bg-muted transition-all duration-200 hover:scale-105",
    unreadIndicator: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse"
  },
  emptyState: {
    container: "flex flex-col items-center justify-center py-12 px-4 text-center",
    icon: "h-16 w-16 text-muted-foreground/40 mb-4",
    title: "font-semibold text-lg text-foreground mb-2",
    description: "text-sm text-muted-foreground max-w-sm"
  },
  scrollArea: "h-96"
}

export interface NotificationCenterProps {
  className?: string
  variant?: 'full' | 'popover'
  notifications?: Notification[]
  fetchNotifications?: () => Promise<Notification[]>
  onMarkAsRead?: (id: string) => Promise<void>
  onMarkAllAsRead?: () => Promise<void>
  onDeleteNotification?: (id: string) => Promise<void>
  onNotificationClick?: (notification: Notification) => void
  showFilter?: boolean
  showMarkAllRead?: boolean
  enableRealTimeUpdates?: boolean
  updateInterval?: number
  enableBrowserNotifications?: boolean
  emptyState?: {
    title?: string
    description?: string
  }
  theme?: NotificationCenterTheme
}

const defaultFetchNotifications = async (): Promise<Notification[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return []
}

const defaultMarkAsRead = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
}

const defaultMarkAllAsRead = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500))
}

const defaultDeleteNotification = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
}

const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const getPriorityColor = (priority?: 'low' | 'medium' | 'high', theme: NotificationCenterTheme = defaultTheme) => {
  switch (priority) {
    case 'high':
      return theme.priorityBadge.high
    case 'medium':
      return theme.priorityBadge.medium
    case 'low':
      return theme.priorityBadge.low
    default:
      return 'text-gray-500'
  }
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
  theme = defaultTheme
}: {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (notification: Notification) => void
  theme?: NotificationCenterTheme
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(notification)
    }
  }

  return (
    <div
      className={cn(
        theme.notificationItem.base,
        theme.notificationItem.hover,
        !notification.isRead ? theme.notificationItem.unread : theme.notificationItem.read,
        onClick && 'cursor-pointer'
      )}
      onClick={handleClick}
    >
      <div className="mt-0.5 flex-shrink-0">
        <Bell className={cn('h-4 w-4', getPriorityColor(notification.priority, theme))} />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className={cn(
                !notification.isRead ? theme.notificationContent.title : theme.notificationContent.titleRead
              )}>
                {notification.title}
              </h4>
              {!notification.isRead && (
                <span className={theme.notificationContent.newBadge}>
                  New
                </span>
              )}
            </div>

            <p className={cn(
              !notification.isRead ? theme.notificationContent.message : theme.notificationContent.messageRead
            )}>
              {notification.message}
            </p>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40">
              <span className={theme.notificationContent.timestamp}>
                {formatTimeAgo(notification.createdAt)}
              </span>

              {notification.priority && (
                <Badge
                  variant={
                    notification.priority === 'high' ? 'destructive' :
                      notification.priority === 'medium' ? 'default' : 'secondary'
                  }
                  className="text-xs px-2 py-0.5"
                >
                  {notification.priority}
                </Badge>
              )}
            </div>
          </div>

          {(onMarkAsRead || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={theme.buttons.actionButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {!notification.isRead && onMarkAsRead && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onMarkAsRead(notification.id)
                  }} className="text-sm">
                    <Check className="mr-2 h-4 w-4" />
                    Mark as read
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(notification.id)
                    }}
                    className="text-red-600 focus:text-red-600 text-sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}

export function NotificationCenter({
  className,
  variant = 'full',
  notifications: staticNotifications,
  fetchNotifications = defaultFetchNotifications,
  onMarkAsRead = defaultMarkAsRead,
  onMarkAllAsRead = defaultMarkAllAsRead,
  onDeleteNotification = defaultDeleteNotification,
  onNotificationClick,
  showFilter = true,
  showMarkAllRead = true,
  enableRealTimeUpdates = false,
  updateInterval = 30000,
  enableBrowserNotifications = false,
  emptyState = {
    title: "No notifications",
    description: "New notifications will appear here."
  },
  theme = defaultTheme
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (enableBrowserNotifications && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [enableBrowserNotifications]);

  useEffect(() => {
    if (!enableRealTimeUpdates) return

    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [enableRealTimeUpdates, updateInterval, queryClient])

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    initialData: staticNotifications,
    refetchInterval: enableRealTimeUpdates ? updateInterval : false,
    enabled: !staticNotifications
  })

  const displayNotifications = staticNotifications || notifications
  const prevDisplayNotificationsRef = React.useRef<Notification[]>(null);

  useEffect(() => {
    if (enableBrowserNotifications && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      const oldNotifications = prevDisplayNotificationsRef.current;

      if (oldNotifications) {
        const newNotifications = displayNotifications.filter(
          (n) => !oldNotifications.some((on) => on.id === n.id)
        );

        newNotifications.forEach((notification) => {
          if (!notification.isRead) {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/short-logo.png'
            });
          }
        });
      }
    }
    prevDisplayNotificationsRef.current = displayNotifications;
  }, [displayNotifications, enableBrowserNotifications]);

  const markAsReadMutation = useMutation({
    mutationFn: onMarkAsRead,
    onSuccess: (_, id) => {
      if (staticNotifications) return

      queryClient.setQueryData(['notifications'], (old: Notification[] = []) =>
        old.map(n => n.id === id ? { ...n, isRead: true } : n)
      )
    }
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: onMarkAllAsRead,
    onSuccess: () => {
      if (staticNotifications) return

      queryClient.setQueryData(['notifications'], (old: Notification[] = []) =>
        old.map(n => ({ ...n, isRead: true }))
      )
    }
  })

  const deleteMutation = useMutation({
    mutationFn: onDeleteNotification,
    onSuccess: (_, id) => {
      if (staticNotifications) return

      queryClient.setQueryData(['notifications'], (old: Notification[] = []) =>
        old.filter(n => n.id !== id)
      )
    }
  })

  const filteredNotifications = useMemo(() =>
    displayNotifications.filter(n => filter === 'all' || !n.isRead),
    [displayNotifications, filter]
  )

  const unreadCount = useMemo(() =>
    displayNotifications.filter(n => !n.isRead).length,
    [displayNotifications]
  )

  const NotificationList = () => (
    <ScrollArea className={cn(theme.scrollArea)}>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading notifications...</p>
          </div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className={theme.emptyState.container}>
          <BellRing className={theme.emptyState.icon} />
          <h3 className={theme.emptyState.title}>
            {filter === 'unread' ? 'All caught up!' : emptyState.title}
          </h3>
          <p className={theme.emptyState.description}>
            {filter === 'unread'
              ? 'You have no unread notifications. Great job staying on top of things!'
              : emptyState.description
            }
          </p>
        </div>
      ) : (
        <div className="space-y-2 px-3">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={staticNotifications ? undefined : markAsReadMutation.mutate}
              onDelete={staticNotifications ? undefined : deleteMutation.mutate}
              onClick={onNotificationClick}
              theme={theme}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  )

  if (variant === 'popover') {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(theme.popover.trigger, className)}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <div className={theme.popover.unreadIndicator}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={theme.popover.content} side="bottom" align="end" sideOffset={8}>
          <div className={theme.popover.header}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg text-foreground max-sm:text-xs">Notifications</h4>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className={theme.badge}>
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted"
                onClick={() => setIsPopoverOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="px-1 py-3">
            {(showFilter || (showMarkAllRead && unreadCount > 0)) && (
              <div className="flex items-center gap-2 mb-3 px-4 justify-between">
                {showFilter && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={theme.buttons.filter}
                    onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
                  >
                    <Filter className="mr-1.5 h-3 w-3" />
                    {filter === 'all' ? 'Unread' : 'All'}
                  </Button>
                )}

                {showMarkAllRead && unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={theme.buttons.markAllRead}
                    onClick={() => markAllAsReadMutation.mutate()}
                    disabled={markAllAsReadMutation.isPending}
                  >
                    {markAllAsReadMutation.isPending ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1.5" />
                    ) : (
                      <CheckCheck className="mr-1.5 h-3 w-3" />
                    )}
                    Mark All Read
                  </Button>
                )}
              </div>
            )}

            <div className="max-h-96">
              <NotificationList />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Card className={cn(theme.container, className)}>
      <CardHeader className={theme.header}>
        <div className="flex items-center justify-between">
          <CardTitle className={theme.title}>
            <div className="relative">
              <Bell className="h-5 w-5 text-foreground" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </div>
            <span className="text-xl font-semibold max-sm:text-sm">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className={theme.badge}>
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>

          <div className="flex items-center gap-2">
            {showFilter && (
              <Button
                variant="outline"
                size="sm"
                className={theme.buttons.filter}
                onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
              >
                <Filter className="mr-1.5 h-3 w-3" />
                <span className="max-md:hidden">
                  {filter === 'all' ? 'Show Unread' : 'Show All'}
                </span>
              </Button>
            )}

            {showMarkAllRead && unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className={theme.buttons.markAllRead}
                onClick={() => markAllAsReadMutation.mutate()}
                disabled={markAllAsReadMutation.isPending}
              >
                {markAllAsReadMutation.isPending ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1.5" />
                ) : (
                  <CheckCheck className="mr-1.5 h-3 w-3" />
                )}
                <span className="max-md:hidden">
                  Mark All Read
                </span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <NotificationList />
      </CardContent>
    </Card>
  )
}