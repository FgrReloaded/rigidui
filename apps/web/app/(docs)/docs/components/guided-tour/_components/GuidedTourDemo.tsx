"use client"
import React from 'react'
import { TourProvider, TourStep, TourTrigger } from '@/registry/new-york/guided-tour/guided-tour'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star, Play, Settings, User } from 'lucide-react'

const DemoComponent = () => {
  return (
    <TourProvider
      autoStart={false}
      onTourComplete={() => console.log('Tour completed!')}
      onTourSkip={() => console.log('Tour skipped!')}
    >
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Interactive Dashboard Demo
            </CardTitle>
            <CardDescription>
              Take a guided tour to learn about all the features
            </CardDescription>
            <TourTrigger className="w-fit mx-auto">
              <Button className="mt-4">
                <Play className="h-4 w-4 mr-2" />
                Start Guided Tour
              </Button>
            </TourTrigger>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <TourStep
            id="profile-card"
            title="Welcome to Your Profile"
            content="This is your profile card where you can view and edit your personal information. Click here to update your details anytime."
            order={1}
            position="bottom"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" />
                </div>
                <Badge variant="secondary">Active User</Badge>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="stats-card"
            title="Your Statistics"
            content="Here you can monitor your performance metrics and track your progress over time. These numbers update in real-time!"
            order={2}
            position="bottom"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-bold">12,345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <span className="font-bold text-green-600">+23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="settings-card"
            title="Customize Your Experience"
            content="Access all your settings here. You can customize themes, notifications, privacy options, and much more to personalize your experience."
            order={3}
            position="left"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Theme Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy & Security
                </Button>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="activities-card"
            title="Recent Activities"
            content="Stay up to date with your recent activities and interactions. This timeline shows your most important events and updates."
            order={4}
            position="top"
          >
            <Card className="hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Updated profile information</span>
                    <Badge variant="outline">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Completed guided tour</span>
                    <Badge variant="outline">1 day ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Changed theme settings</span>
                    <Badge variant="outline">3 days ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TourStep>
        </div>
      </div>
    </TourProvider>
  )
}

export default DemoComponent
