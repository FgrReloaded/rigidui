"use client"
import React from 'react'
import { Notification, NotificationCenter } from '@/registry/new-york/notification-center/notification-center'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
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
let nextId = 4;


export default function NotificationCenterPage() {

  const propsData = [
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling',
    },
    {
      name: 'variant',
      type: "'full' | 'popover'",
      defaultValue: "'full'",
      description: 'The display variant of the component - full for complete view or popover for compact trigger',
    },
    {
      name: 'notifications',
      type: 'Notification[]',
      defaultValue: 'undefined',
      description: 'Static notifications array. If provided, will be used instead of fetchNotifications',
    },
    {
      name: 'fetchNotifications',
      type: '() => Promise<Notification[]>',
      defaultValue: 'defaultFetchNotifications',
      description: 'Function to fetch notifications asynchronously',
    },
    {
      name: 'onMarkAsRead',
      type: '(id: string) => Promise<void>',
      defaultValue: 'defaultMarkAsRead',
      description: 'Callback function called when a notification is marked as read',
    },
    {
      name: 'onMarkAllAsRead',
      type: '() => Promise<void>',
      defaultValue: 'defaultMarkAllAsRead',
      description: 'Callback function called when all notifications are marked as read',
    },
    {
      name: 'onDeleteNotification',
      type: '(id: string) => Promise<void>',
      defaultValue: 'defaultDeleteNotification',
      description: 'Callback function called when a notification is deleted',
    },
    {
      name: 'onNotificationClick',
      type: '(notification: Notification) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when a notification is clicked',
    },
    {
      name: 'enableBrowserNotifications',
      type: 'boolean',
      defaultValue: 'false',
      description: 'If true, the component will ask for permission and send browser notifications for new updates.',
    },
    {
      name: 'maxHeight',
      type: 'string',
      defaultValue: "'h-96'",
      description: 'Maximum height class for the notification list container',
    },
    {
      name: 'showFilter',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the filter toggle button',
    },
    {
      name: 'showMarkAllRead',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the mark all as read button',
    },
    {
      name: 'enableRealTimeUpdates',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to enable automatic real-time updates',
    },
    {
      name: 'updateInterval',
      type: 'number',
      defaultValue: '30000',
      description: 'Interval in milliseconds for real-time updates (when enabled)',
    },
    {
      name: 'emptyState',
      type: '{ title?: string; description?: string }',
      defaultValue: '{ title: "No notifications", description: "New notifications will appear here." }',
      description: 'Custom empty state configuration',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V6h10v11z" />
        </svg>
      ),
      title: "Dual Variants",
      description: "Choose between full variant for comprehensive displays or popover variant for compact navigation integration."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Read Status Management",
      description: "Track and manage notification read status with visual indicators and bulk actions."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      ),
      title: "Priority System",
      description: "Organize notifications with high, medium, and low priority levels with visual color coding."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Real-time Updates",
      description: "Optional real-time updates with configurable intervals to keep notifications fresh and current."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      title: "Filtering Options",
      description: "Filter between all notifications or unread-only to help users focus on what matters most."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "Notification Management",
      description: "Complete CRUD operations with mark as read, mark all as read, and delete functionality."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V5a2 2 0 00-2-2h-7l-3 3v11a2 2 0 002 2z" />
        </svg>
      ),
      title: "Browser Notifications",
      description: "Opt-in to receive native browser notifications for new updates, keeping you informed even when the app is in the background."
    }
  ]

  const usageCode = `import React from 'react';
import { Notification, NotificationCenter } from "@/components/notification-center";
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';

// --- Simulated Backend API ---
let masterNotifications = [ /* ... initial notifications ... */ ];
let nextId = masterNotifications.length + 1;

const fetchNotifications = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return [...masterNotifications];
};

const markAsRead = async (id) => {
  masterNotifications = masterNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
};

const markAllAsRead = async () => {
  masterNotifications = masterNotifications.map(n => ({ ...n, isRead: true }));
};

const deleteNotification = async (id) => {
  masterNotifications = masterNotifications.filter(n => n.id !== id);
};
// --- End of Simulated API ---

export default function MyComponent() {
  const queryClient = useQueryClient();

  // Simulate real-time updates by adding a new notification every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: String(nextId++),
        title: 'New Real-time Update!',
        message: 'This notification was added automatically.',
        isRead: false,
        createdAt: new Date().toISOString(),
        priority: 'medium',
      };
      masterNotifications.unshift(newNotification);
      // Invalidate the query to trigger a refetch and show the new notification
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }, 10000);

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationCenter
        variant="popover"
        fetchNotifications={fetchNotifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDeleteNotification={deleteNotification}
        enableRealTimeUpdates={true}
        updateInterval={15000} // Refetch every 15 seconds
        enableBrowserNotifications={true}
      />
    </QueryClientProvider>
  );
}`


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

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const newNotification: Notification = {
        id: String(nextId++),
        title: 'Real-time Event',
        message: `A new event occurred at ${new Date().toLocaleTimeString()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
        priority: 'medium',
      };
      masterNotifications.unshift(newNotification);

      queryClient.invalidateQueries({ queryKey: ['notifications'] });

    }, 10000);

    return () => clearInterval(intervalId);
  }, [queryClient]);


  return (
    <ComponentDocTemplate
      title="Notification Center"
      description="A comprehensive notification management system with both full and popover variants for different UI contexts."
      previewComponent={
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
      }
      githubPath="registry/new-york/notification-center/notification-center.tsx"
      usageCode={usageCode}
      usageDescription="The Notification Center component provides a complete notification management system. It supports both full-featured displays and compact popover variants, with priority-based organization, filtering, and comprehensive notification lifecycle management."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/notification-center"
    />
  )
}