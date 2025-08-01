"use client"
import React from 'react'
import DraggableDashboard, { DraggableWrapper } from '@/registry/new-york/draggable-dashboard/draggable-dashboard'
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

export default function DraggableDashboardPreview() {
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

  return (
    <div className="w-full max-w-4xl mx-auto -mt-6!">
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