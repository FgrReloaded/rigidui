"use client"
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet, FileText, Upload, Map, Route, Image as ImageIcon, Infinity, Bell, Search, Shield, Grid, RemoveFormatting } from 'lucide-react'

interface ComponentPreviewProps {
  componentName: string
}

export function ComponentPreview({ componentName }: ComponentPreviewProps) {
  switch (componentName) {
    case 'currency-manager':
      return (
        <Card className="w-full max-w-xs bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Wallet className="h-5 w-5 text-green-600" />
              <Badge variant="secondary" className="text-xs">USD</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Balance</p>
              <p className="text-lg font-bold text-green-900 dark:text-green-100">$2,459.80</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-gray-800 rounded px-2 py-1">
                <span className="text-gray-600 dark:text-gray-400">EUR:</span> <span className="font-medium">€2,145</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded px-2 py-1">
                <span className="text-gray-600 dark:text-gray-400">GBP:</span> <span className="font-medium">£1,932</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'draggable-dashboard':
      return (
        <div className="w-full max-w-xs space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-2 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 cursor-move">
              <div className="text-xs text-blue-800 dark:text-blue-200 font-medium mb-1">Sales</div>
              <div className="text-sm font-bold text-blue-900 dark:text-blue-100">$12.4k</div>
            </Card>
            <Card className="p-2 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 cursor-move">
              <div className="text-xs text-purple-800 dark:text-purple-200 font-medium mb-1">Users</div>
              <div className="text-sm font-bold text-purple-900 dark:text-purple-100">2.3k</div>
            </Card>
          </div>
          <Card className="p-3 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 cursor-move">
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-800 dark:text-orange-200">Chart</span>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
                <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                <div className="w-1 h-3 bg-orange-300 rounded-full"></div>
                <div className="w-1 h-5 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          </Card>
        </div>
      )

    case 'file-explorer':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-3 space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
              <span className="font-medium">src</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center space-x-2 text-xs text-blue-600">
                <FileText className="w-3 h-3" />
                <span>App.tsx</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-green-600">
                <FileText className="w-3 h-3" />
                <span>utils.ts</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
              <span className="font-medium">public</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 mt-2">
              <code className="text-xs text-gray-600 dark:text-gray-400">console.log(&quot;Hello&quot;);</code>
            </div>
          </CardContent>
        </Card>
      )

    case 'file-uploader':
      return (
        <Card className="w-full max-w-xs border-2 border-dashed border-primary/50 bg-primary/5">
          <CardContent className="p-4 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium mb-1">Drop files here</p>
            <p className="text-xs text-muted-foreground mb-3">or click to browse</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs bg-white dark:bg-gray-800 rounded p-2">
                <ImageIcon className="w-3 h-3" />
                <span>image.png</span>
                <Badge className="ml-auto" variant="secondary">95%</Badge>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div className="bg-primary h-1 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'guided-tour':
      return (
        <Card className="w-full max-w-xs relative">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</div>
                <span className="text-sm font-medium">Welcome Tour</span>
              </div>
              <Route className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Learn how to use this feature step by step</p>
            <div className="flex space-x-2">
              <Button size="sm" className="text-xs">Next</Button>
              <Button size="sm" variant="outline" className="text-xs">Skip</Button>
            </div>
            <div className="w-full bg-muted rounded-full h-1 mt-2">
              <div className="bg-primary h-1 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </CardContent>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full animate-ping"></div>
        </Card>
      )

    case 'image-loader':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 aspect-video rounded-t-lg flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
            </div>
            <div className="p-3">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      )

    case 'infinite-scroll':
      return (
        <Card className="w-full max-w-xs h-40 overflow-hidden">
          <CardContent className="p-0">
            <div className="space-y-1 p-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center space-x-3 p-2 bg-muted/50 rounded">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">{item}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center py-2 border-t">
              <Infinity className="w-4 h-4 text-primary animate-spin" />
            </div>
          </CardContent>
        </Card>
      )

    case 'location-picker':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 aspect-video rounded-t-lg flex items-center justify-center">
              <Map className="w-8 h-8 text-green-600" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium mb-1">Selected Location</p>
              <p className="text-xs text-muted-foreground">San Francisco, CA</p>
            </div>
          </CardContent>
        </Card>
      )

    case 'multi-step-form-wrapper':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Step 2 of 4</span>
              <RemoveFormatting className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full ${step <= 2 ? 'bg-primary' : 'bg-muted'
                    }`}
                ></div>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
              <div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button size="sm" variant="outline" className="text-xs">Back</Button>
              <Button size="sm" className="text-xs">Next</Button>
            </div>
          </CardContent>
        </Card>
      )

    case 'notification-center':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-0">
            <div className="p-3 border-b flex items-center justify-between">
              <span className="text-sm font-medium">Notifications</span>
              <Badge variant="secondary" className="text-xs">3</Badge>
            </div>
            <div className="space-y-0">
              {[
                { type: 'success', message: 'Upload completed', time: '2m ago' },
                { type: 'warning', message: 'Storage almost full', time: '5m ago' },
                { type: 'info', message: 'New update available', time: '1h ago' }
              ].map((notif, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border-b last:border-b-0 hover:bg-muted/50">
                  <Bell className="w-3 h-3 mt-0.5 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case 'smart-search':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-3">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <div className="w-full pl-9 pr-3 py-2 bg-muted rounded-lg text-xs">Search components...</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 p-2 bg-primary/10 rounded text-xs">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium">Button Component</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded text-xs">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span>Card Component</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded text-xs">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span>Form Component</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'strength-meter':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-4 space-y-3">
            <div>
              <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded border-2 border-green-300 relative">
                <Shield className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-1">
                <div className="h-1 w-1/4 bg-red-400 rounded-full"></div>
                <div className="h-1 w-1/4 bg-orange-400 rounded-full"></div>
                <div className="h-1 w-1/4 bg-yellow-400 rounded-full"></div>
                <div className="h-1 w-1/4 bg-green-400 rounded-full"></div>
              </div>
              <p className="text-xs text-green-600 font-medium">Strong password</p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">8+ characters</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">Uppercase & lowercase</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'smart-form':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Smart Form</span>
              <RemoveFormatting className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12 mb-1"></div>
                <div className="h-8 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded"></div>
                <div className="text-xs text-blue-600 mt-1">✓ Valid email format</div>
              </div>
              <div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
                <div className="h-8 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded"></div>
                <div className="text-xs text-yellow-600 mt-1">! Required field</div>
              </div>
            </div>
            <Button size="sm" className="w-full text-xs">Submit Form</Button>
          </CardContent>
        </Card>
      )

    case 'content-grid':
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Content Grid</span>
              <Grid className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-muted/50 rounded p-2">
                  <div className="aspect-square bg-primary/20 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
            <div className="flex space-x-1 mt-3 justify-center">
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                <Grid className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                <div className="w-3 h-3 flex flex-col space-y-0.5">
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card className="w-full max-w-xs">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-primary/20 rounded"></div>
            </div>
            <p className="text-sm text-muted-foreground">Component Preview</p>
          </CardContent>
        </Card>
      )
  }
}