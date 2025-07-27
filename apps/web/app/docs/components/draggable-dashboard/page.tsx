"use client"
import React from 'react'
import DraggableDashboard, { DraggableWrapper } from '@/registry/new-york/draggable-dashboard/draggable-dashboard'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity
} from 'lucide-react'

// Simple demo components
const RevenueCard = () => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
        +20.1% from last month
      </div>
    </CardContent>
  </Card>
)

const UsersCard = () => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
      <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">2,350</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
        +180.1% from last month
      </div>
    </CardContent>
  </Card>
)

const SalesCard = () => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Sales</CardTitle>
      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">12,234</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
        -19% from last month
      </div>
    </CardContent>
  </Card>
)

const PerformanceCard = () => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Performance</CardTitle>
      <Activity className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">573</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
        +201 since last hour
      </div>
    </CardContent>
  </Card>
)

const SimpleChart = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Revenue Overview</CardTitle>
      <CardDescription>Last 6 months</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[120px] flex items-end justify-between gap-2">
        {[65, 45, 78, 52, 89, 67].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-primary rounded-t-sm transition-all hover:bg-primary/80"
              style={{ height: `${height}%` }}
            />
            <span className="text-xs text-muted-foreground">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const NotificationCard = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Recent updates</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-start space-x-3">
        <div className="h-2 w-2 bg-red-500 rounded-full mt-2" />
        <div className="flex-1">
          <p className="text-sm font-medium">System Alert</p>
          <p className="text-xs text-muted-foreground">Server maintenance scheduled</p>
        </div>
        <Badge variant="destructive" className="text-xs">New</Badge>
      </div>
      <div className="flex items-start space-x-3">
        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
        <div className="flex-1">
          <p className="text-sm font-medium">Update Available</p>
          <p className="text-xs text-muted-foreground">New features released</p>
        </div>
        <Badge variant="outline" className="text-xs">Info</Badge>
      </div>
    </CardContent>
  </Card>
)

const DraggableDashboardDemo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <DraggableDashboard
        showLockToggle={true}
        showHandles={true}
        gridCols={3}
        gap={4}
        defaultLocked={false}
        persistenceKey="demo-dashboard"
      >
        <DraggableWrapper id="revenue" gridSize={{ cols: 1, rows: 1 }}>
          <RevenueCard />
        </DraggableWrapper>

        <DraggableWrapper id="users" gridSize={{ cols: 1, rows: 1 }}>
          <UsersCard />
        </DraggableWrapper>

        <DraggableWrapper id="sales" gridSize={{ cols: 1, rows: 1 }}>
          <SalesCard />
        </DraggableWrapper>

        <DraggableWrapper id="performance" gridSize={{ cols: 1, rows: 1 }}>
          <PerformanceCard />
        </DraggableWrapper>

        <DraggableWrapper id="chart" gridSize={{ cols: 2, rows: 1 }}>
          <SimpleChart />
        </DraggableWrapper>

        <DraggableWrapper id="notifications" gridSize={{ cols: 1, rows: 1 }}>
          <NotificationCard />
        </DraggableWrapper>
      </DraggableDashboard>
    </div>
  )
}

export default function DraggableDashboardPage() {
  const propsData = [
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'The draggable wrapper components to be rendered in the dashboard',
      required: true,
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling the dashboard container',
    },
    {
      name: 'showLockToggle',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the lock/unlock toggle switch',
    },
    {
      name: 'showHandles',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show drag handles on items',
    },
    {
      name: 'gridCols',
      type: 'number',
      defaultValue: '3',
      description: 'Number of grid columns for the dashboard layout',
    },
    {
      name: 'gap',
      type: 'number',
      defaultValue: '6',
      description: 'Gap between grid items (in Tailwind spacing units)',
    },
    {
      name: 'defaultLocked',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the dashboard should be locked by default',
    },
    {
      name: 'onOrderChange',
      type: '(newOrder: string[]) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when item order changes',
    },
    {
      name: 'persistenceKey',
      type: 'string',
      defaultValue: "'draggable-dashboard-order'",
      description: 'Unique key for localStorage to persist item order across sessions',
    },
  ]

  const wrapperPropsData = [
    {
      name: 'id',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Unique identifier for the draggable item',
      required: true,
    },
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'The content to be wrapped and made draggable',
      required: true,
    },
    {
      name: 'gridSize',
      type: '{ cols: number, rows: number }',
      defaultValue: '{ cols: 1, rows: 1 }',
      description: 'Size of the item in grid columns and rows',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling the wrapper',
    },
    {
      name: 'isLocked',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether this specific item is locked (inherited from parent)',
    },
    {
      name: 'showHandle',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the drag handle for this item (inherited from parent)',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
      title: "Drag & Drop",
      description: "Intuitive drag and drop interface allows users to reorder dashboard components easily."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "Grid Layout",
      description: "Responsive grid system with customizable columns and flexible item sizing."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Lock/Unlock",
      description: "Toggle between edit and view modes to prevent accidental changes to the layout."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Flexible Sizing",
      description: "Components can span multiple columns and rows to create complex dashboard layouts."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "State Persistence",
      description: "Dashboard layout is automatically saved to localStorage and persists across page reloads and browser sessions."
    }
  ]

  const usageCode = `import DraggableDashboard, { DraggableWrapper } from "@/components/draggable-dashboard"

export default function MyDashboard() {
  return (
     <div className="w-full max-w-4xl mx-auto">
      <DraggableDashboard
        showLockToggle={true}
        showHandles={true}
        gridCols={3}
        gap={4}
        defaultLocked={false}
        persistenceKey="my-dashboard"
      >
        <DraggableWrapper id="revenue" gridSize={{ cols: 1, rows: 1 }}>
          <RevenueCard />
        </DraggableWrapper>

        <DraggableWrapper id="users" gridSize={{ cols: 1, rows: 1 }}>
          <UsersCard />
        </DraggableWrapper>

        <DraggableWrapper id="sales" gridSize={{ cols: 1, rows: 1 }}>
          <SalesCard />
        </DraggableWrapper>

        <DraggableWrapper id="performance" gridSize={{ cols: 1, rows: 1 }}>
          <PerformanceCard />
        </DraggableWrapper>

        <DraggableWrapper id="chart" gridSize={{ cols: 2, rows: 1 }}>
          <SimpleChart />
        </DraggableWrapper>

        <DraggableWrapper id="notifications" gridSize={{ cols: 1, rows: 1 }}>
          <NotificationCard />
        </DraggableWrapper>
      </DraggableDashboard>
    </div>
  )
}`

  return (
    <ComponentDocTemplate
      title="Draggable Dashboard"
      description="A flexible dashboard component with drag-and-drop functionality for rearranging layout items."
      previewComponent={<DraggableDashboardDemo />}
      githubPath="registry/new-york/draggable-dashboard/draggable-dashboard.tsx"
      usageCode={usageCode}
      usageDescription="The Draggable Dashboard component provides a grid-based layout system where users can drag and drop items to customize their dashboard arrangement. It includes lock/unlock functionality, flexible grid sizing options, and automatic state persistence using localStorage to maintain layout across sessions."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/draggable-dashboard"
      additionalSections={
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <svg className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
            </svg>
            <h2 id="draggable-wrapper" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">DraggableWrapper Props</h2>
          </div>
          <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            The DraggableWrapper component wraps individual dashboard items and provides the drag-and-drop functionality.
          </p>

          <div className="bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {wrapperPropsData.map((prop, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                          {prop.name}
                        </code>
                        {prop.name === 'id' && (
                          <span className="ml-2 text-xs text-red-500">*</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 font-mono">
                        {prop.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {prop.defaultValue}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="text-red-500">*</span> Required prop
              </p>
            </div>
          </div>
        </section>
      }
    />
  )
}