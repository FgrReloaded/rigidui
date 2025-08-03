"use client"
import { TourProvider, TourStep, TourTrigger } from '@/registry/new-york/guided-tour/guided-tour'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star, Play, Settings, User, BarChart3, Activity } from 'lucide-react'

export default function GuidedTourPreview() {
  return (
    <TourProvider
      autoStart={false}
      onTourComplete={() => console.log('Tour completed!')}
      onTourSkip={() => console.log('Tour skipped!')}
    >
      <div className="w-full max-w-4xl mx-auto p-3 space-y-4">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full">
            <Star className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Interactive Demo</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard Tour</h1>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mx-auto">
            Discover features with our guided walkthrough
          </p>
          <TourTrigger>
            <Button size="sm" className="mt-2">
              <Play className="h-3.5 w-3.5 mr-1.5" />
              Start Tour
            </Button>
          </TourTrigger>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <TourStep
            id="profile-card"
            title="Your Profile"
            content="View and edit your information."
            order={1}
            position="bottom"
          >
            <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm h-fit">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <User className="h-4 w-4 text-blue-600" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 px-3 pb-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input
                    id="name"
                    defaultValue="Alex Johnson"
                    className="h-7 text-xs"
                    readOnly
                  />
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Premium
                </Badge>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="stats-card"
            title="Analytics"
            content="Monitor your performance metrics."
            order={2}
            position="bottom"
          >
            <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm h-fit">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">2.4K</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">+18%</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="settings-card"
            title="Settings"
            content="Customize your preferences."
            order={3}
            position="bottom"
          >
            <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm h-fit">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <Settings className="h-4 w-4 text-purple-600" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-3 pb-3">
                <Button variant="ghost" size="sm" className="w-full justify-start h-7 px-2 text-xs">
                  Theme
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-7 px-2 text-xs">
                  Notifications
                </Button>
              </CardContent>
            </Card>
          </TourStep>

          <TourStep
            id="activities-card"
            title="Recent Activity"
            content="Track your latest updates."
            order={4}
            position="top"
          >
            <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm h-fit">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <Activity className="h-4 w-4 text-orange-600" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-md">
                    <span className="text-xs font-medium truncate">Profile updated</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 ml-1 flex-shrink-0">2h</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-md">
                    <span className="text-xs font-medium truncate">Settings changed</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 ml-1 flex-shrink-0">1d</Badge>
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