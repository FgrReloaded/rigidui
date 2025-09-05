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

const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-yellow-500'
    case 'low':
      return 'text-green-500'
    default:
      return 'text-muted-foreground'
  }
}



const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  onClick
}: {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (notification: Notification) => void
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(notification)
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 border rounded-lg",
        !notification.isRead && "bg-muted/30",
        onClick && 'cursor-pointer'
      )}
      onClick={handleClick}
    >
      <div className="shrink-0">
        <Bell className={cn('h-4 w-4', getPriorityColor(notification.priority))} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className={cn(
                "text-sm font-medium",
                !notification.isRead && "font-semibold"
              )}>
                {notification.title}
              </h4>
              {!notification.isRead && (
                <Badge variant="default" className="text-xs">
                  New
                </Badge>
              )}
            </div>

            <p className={cn(
              "text-sm mt-1",
              !notification.isRead ? "text-foreground" : "text-muted-foreground"
            )}>
              {notification.message}
            </p>

            <div className="flex items-center justify-between mt-3 pt-2 border-t">
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(notification.createdAt)}
              </span>

              {notification.priority && (
                <Badge
                  variant={
                    notification.priority === 'high' ? 'destructive' :
                      notification.priority === 'medium' ? 'default' : 'secondary'
                  }
                  className="text-xs"
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
                  className="h-8 w-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!notification.isRead && onMarkAsRead && (
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation()
                    onMarkAsRead(notification.id)
                  }}>
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
  }
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
    <ScrollArea className="h-96">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading notifications...</p>
          </div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <BellRing className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            {filter === 'unread' ? 'All caught up!' : emptyState.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === 'unread'
              ? 'You have no unread notifications.'
              : emptyState.description
            }
          </p>
        </div>
      ) : (
        <div className="space-y-2 p-4">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={staticNotifications ? undefined : markAsReadMutation.mutate}
              onDelete={staticNotifications ? undefined : deleteMutation.mutate}
              onClick={onNotificationClick}
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
            className={className}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Notifications</h4>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsPopoverOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            {(showFilter || (showMarkAllRead && unreadCount > 0)) && (
              <div className="flex items-center gap-2 mb-3 justify-between">
                {showFilter && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {filter === 'all' ? 'Unread' : 'All'}
                  </Button>
                )}

                {showMarkAllRead && unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAllAsReadMutation.mutate()}
                    disabled={markAllAsReadMutation.isPending}
                  >
                    <CheckCheck className="mr-2 h-4 w-4" />
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
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>

          <div className="flex items-center gap-2">
            {showFilter && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filter === 'all' ? 'Show Unread' : 'Show All'}
              </Button>
            )}

            {showMarkAllRead && unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAsReadMutation.mutate()}
                disabled={markAllAsReadMutation.isPending}
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark All Read
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