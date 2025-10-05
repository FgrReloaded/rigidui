"use client"
import React from 'react'
import { Notification, NotificationCenter } from '@/r/new-york/notification-center/notification-center'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let masterNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to the Team',
    message: 'Your account has been successfully created and you have been added to the design team.',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    priority: 'high' as const
  },
  {
    id: '2',
    title: 'New Project Assignment',
    message: 'You have been assigned to the new mobile app redesign project starting next week.',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    priority: 'medium' as const
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 11 PM to 1 AM EST. Some features may be unavailable.',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'low' as const
  }
];

export default function NotificationCenterPreview() {
  const fetchNotifications = async (): Promise<Notification[]> => {

    await new Promise(resolve => setTimeout(resolve, 500));
    return [...masterNotifications];
  };

  const markAsRead = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    masterNotifications = masterNotifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
  };

  const markAllAsRead = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    masterNotifications = masterNotifications.map(n => ({ ...n, isRead: true }));
  };

  const deleteNotification = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    masterNotifications = masterNotifications.filter(n => n.id !== id);
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log(`Clicked notification: ${notification.title}`);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <div className="w-full flex items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <NotificationCenter
          variant="popover"
          fetchNotifications={fetchNotifications}
          onNotificationClick={handleNotificationClick}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDeleteNotification={deleteNotification}
          enableRealTimeUpdates={true}
          updateInterval={15000}
          showFilter={true}
          showMarkAllRead={true}
          enableBrowserNotifications={true}
        />
      </QueryClientProvider>
    </div>
  )
}
