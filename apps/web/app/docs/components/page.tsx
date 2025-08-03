'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PasswordStrengthMeter } from '@/r/new-york/strength-meter/strength-meter'
import { SmartSearch } from '@/r/new-york/smart-search/smart-search'
import DraggableDashboard, { DraggableWrapper } from '@/r/new-york/draggable-dashboard/draggable-dashboard'
import { ImageLoader } from '@/r/new-york/image-loader/image-loader'
import { TourProvider, TourStep, TourTrigger } from '@/r/new-york/guided-tour/guided-tour'
import { Check, FileCode, FolderClosed, FolderOpen, MapPin, Bell, TrendingUp, Users, DollarSign, Activity, Grid2X2, Route } from 'lucide-react'

const componentsData = [
  {
    category: 'Core',
    items: [
      {
        name: 'Currency Manager',
        href: '/docs/components/currency-manager',
        description: 'Manage and convert between different currencies with real-time exchange rates',
        image: '/window.svg'
      },
      {
        name: 'Draggable Dashboard',
        href: '/docs/components/draggable-dashboard',
        description: 'Create customizable, drag-and-drop dashboards with resizable widgets',
        image: '/dashboard.svg'
      },
      {
        name: 'Image Loader',
        href: '/docs/components/image-loader',
        description: 'Advanced image loading component with beautiful loading states and error handling',
        image: '/window.svg'
      },
      {
        name: 'Location Picker',
        href: '/docs/components/location-picker',
        description: 'Interactive component for selecting geographic locations with map integration',
        image: '/globe.svg'
      },
      {
        name: 'Guided Tour',
        href: '/docs/components/guided-tour',
        description: 'Interactive onboarding and feature introduction component with step-by-step guidance',
        image: '/window.svg'
      },
      {
        name: 'Smart Search',
        href: '/docs/components/smart-search',
        description: 'Intelligent search component with suggestions, history, filters, and keyboard navigation',
        image: '/window.svg'
      },
    ]
  },
  {
    category: 'Form Elements',
    items: [
      {
        name: 'File Uploader',
        href: '/docs/components/file-uploader',
        description: 'Drag and drop file uploader with progress indicators and validation',
        image: '/file.svg'
      },
      {
        name: 'Multi-Step Form Wrapper',
        href: '/docs/components/multi-step-form-wrapper',
        description: 'Guide users through complex forms with a structured step-by-step interface',
        image: '/window.svg'
      },
      {
        name: 'Password Strength Meter',
        href: '/docs/components/strength-meter',
        description: 'Interactive password strength meter with customizable requirements and visual feedback',
        image: '/images/components/strength-meter.png'
      },
      {
        name: 'Smart Form',
        href: '/docs/components/smart-form',
        description: 'Powerful form component with built-in validation, mutation handling, and TypeScript support',
        image: '/window.svg'
      },
    ]
  },
  {
    category: 'Data Display',
    items: [
      {
        name: 'Content Grid',
        href: '/docs/components/content-grid',
        description: 'Flexible grid/list component with view toggle functionality and customizable card rendering',
        image: '/window.svg'
      },
      {
        name: 'File Explorer',
        href: '/docs/components/file-explorer',
        description: 'Interactive file system explorer with syntax highlighting and directory navigation',
        image: '/file.svg'
      },
      {
        name: 'Infinite Scroll',
        href: '/docs/components/infinite-scroll',
        description: 'Efficiently display large datasets with automatic loading and smooth user experience',
        image: '/window.svg'
      },
      {
        name: 'Notification Center',
        href: '/docs/components/notification-center',
        description: 'Centralized hub for managing and displaying user notifications',
        image: '/window.svg'
      }
    ]
  }
]

interface ComponentCardProps {
  name: string
  description: string
  image: string
  href?: string
}

const ComponentCard = ({ name, description, image, href }: ComponentCardProps) => {
  const renderDemo = () => {
    switch (name) {
      case 'Password Strength Meter':
        return (
          <div>
            <PasswordStrengthMeter
              placeholder="Enter password"
              showRequirements={false}
              segments={4}
              className="max-w-[220px]"
            />
          </div>
        )
      case 'Image Loader':
        return (
          <div className="p-3 h-full">
            <ImageLoader
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=180&fit=crop"
              alt="Component preview"
              width={250}
              height={180}
              className="rounded-lg shadow-xs"
            />
          </div>
        )
      case 'Content Grid':
        return (
          <div className="p-2 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <Grid2X2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Content Grid</span>
                </div>
                <div className="flex border rounded-md p-0.5 gap-0.5">
                  <Button variant="default" size="sm" className="h-6 w-6 p-0">
                    <Grid2X2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-2">
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-2">
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                Switch between grid & list views
              </div>
            </Card>
          </div>
        )
      case 'File Explorer':
        return (
          <div className="p-2 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2 space-x-2">
                <div className="flex items-center">
                  <FolderOpen className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Project Files</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">3 items</div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center pl-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <FolderClosed className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">src</span>
                </div>
                <div className="flex items-center pl-6 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <FileCode className="h-4 w-4 mr-2 text-sky-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">app.js</span>
                </div>
                <div className="flex items-center pl-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <FileCode className="h-4 w-4 mr-2 text-emerald-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">README.md</span>
                </div>
              </div>
            </Card>
          </div>
        )
      case 'Multi-Step Form Wrapper':
        return (
          <div className="p-2 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className={`flex items-center ${step === 1 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-primary text-white' : 'border border-slate-400 dark:border-slate-600'}`}>
                          {step === 1 ? <Check className="w-3 h-3" /> : step}
                        </div>
                      </div>
                      {step < 3 && <div className={`flex-1 h-0.5 mx-1.5 ${step === 1 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />}
                    </React.Fragment>
                  ))}
                </div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Personal Info</h4>
                <div className="mt-2 space-y-1.5">
                  <Input placeholder="Name" className="mb-1.5 h-8 text-xs" />
                  <Input placeholder="Email" className="h-8 text-xs" />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button size="sm" className="text-xs">Next</Button>
              </div>
            </Card>
          </div>
        )
      case 'File Uploader':
        return (
          <div className="p-3 h-full">
            <Card className="flex items-center justify-center p-4 border-dashed border-2 border-slate-300 dark:border-slate-700 text-center hover:border-primary/70 transition-colors duration-200 bg-slate-50 dark:bg-transparent h-full">
              <div>
                <div className="mx-auto w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-2 text-primary">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Drag & Drop or <span className="text-primary font-medium">Browse</span>
                </div>
              </div>
            </Card>
          </div>
        )
      case 'Currency Manager':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 space-x-2">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Currency Manager</h3>
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-0.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">USD</span>
                  <svg className="w-3 h-3 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Product:</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">$199.99</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">€ (EUR):</span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">€185.40</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">£ (GBP):</span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">£158.65</span>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs h-7 mt-1.5 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">Change Currency</Button>
              </div>
            </Card>
          </div>
        )
      case 'Infinite Scroll':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Data Feed</h3>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">Loading...</Badge>
              </div>
              <div className="space-y-2 max-h-24 overflow-y-auto">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-200">Product #1</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Dynamic content loading</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-200">Product #2</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Seamless scrolling experience</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 opacity-50">
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-200">Loading...</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Auto-pagination in action</div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">↓ Scroll for more items</div>
              </div>
            </Card>
          </div>
        )
      case 'Location Picker':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs h-full bg-transparent">
              <div className="mb-2.5 text-sm font-medium flex items-center text-slate-700 dark:text-slate-200">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Select Location
              </div>
              <Input className="text-xs h-8" placeholder="Search location..." />
            </Card>
          </div>
        )
      case 'Notification Center':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full w-3/4 mx-auto">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center font-medium">
                      3
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Notifications</span>
                </div>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  3 new
                </Badge>
              </div>
              <div className="space-y-2 max-h-20 overflow-y-auto">
                <div className="flex items-start gap-2 p-2 bg-blue-50/30 dark:bg-blue-950/10 rounded-md border-l-2 border-l-blue-500">
                  <Bell className="h-3 w-3 text-blue-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-200">Welcome Message</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Your account has been created successfully</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                  <Bell className="h-3 w-3 text-slate-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-600 dark:text-slate-300">System Update</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">New features available</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )
      case 'Smart Form':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Smart Form</h3>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">Form</Badge>
              </div>
              <div className="space-y-1.5">
                <Input placeholder="Enter your name" className="h-8 text-xs" />
                <Input type="email" placeholder="Enter your email" className="h-8 text-xs" />
                <Button size="sm" className="w-full text-xs h-7 mt-1.5 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-white dark:text-black">Submit</Button>
              </div>
            </Card>
          </div>
        )
      case 'Guided Tour':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Guided Tour</span>
                </div>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                  Demo
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-200">Welcome Step</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Start your journey here</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                  <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 text-xs flex items-center justify-center text-slate-500 dark:text-slate-400">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-600 dark:text-slate-300">Feature Tour</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Explore key features</div>
                  </div>
                </div>
                <Button size="sm" className="w-full text-xs h-7">
                  Start Interactive Tour
                </Button>
              </div>
            </Card>
          </div>
        )
      case 'Smart Search':
        return (
          <div className="p-3 h-full">
            <Card className="p-3 shadow-xs bg-white dark:bg-transparent h-full">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Smart Search</h3>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">Search</Badge>
              </div>
              <div className="space-y-2">
                <SmartSearch
                  placeholder="Search components..."
                  className="h-8 text-xs"
                  suggestions={['React', 'TypeScript', 'Components']}
                  urlSync={false}
                />
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>✨ Intelligent search with suggestions</span>
                </div>
              </div>
            </Card>
          </div>
        )
      case 'Draggable Dashboard':
        return (
          <div className="p-2 h-full">
            <Card className="p-2 shadow-xs bg-white dark:bg-transparent h-full">
              <DraggableDashboard
                showLockToggle={false}
                showHandles={true}
                gridCols={2}
                gap={2}
                defaultLocked={false}
                className="space-y-2"
              >
                <DraggableWrapper id="revenue-mini" gridSize={{ cols: 1, rows: 1 }}>
                  <Card className="h-full p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Revenue</span>
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="text-sm font-bold">$45.2K</div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="mr-1 h-2 w-2" />
                      +20%
                    </div>
                  </Card>
                </DraggableWrapper>

                <DraggableWrapper id="users-mini" gridSize={{ cols: 1, rows: 1 }}>
                  <Card className="h-full p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Users</span>
                      <Users className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="text-sm font-bold">2.3K</div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="mr-1 h-2 w-2" />
                      +18%
                    </div>
                  </Card>
                </DraggableWrapper>

                <DraggableWrapper id="activity-mini" gridSize={{ cols: 2, rows: 1 }}>
                  <Card className="h-full p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Activity</span>
                      <Activity className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-center space-x-1">
                      {[40, 60, 30, 80].map((height, i) => (
                        <div
                          key={i}
                          className="w-2 bg-primary rounded-t-sm"
                          style={{ height: `${height / 2}px` }}
                        />
                      ))}
                    </div>
                  </Card>
                </DraggableWrapper>
              </DraggableDashboard>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Link href={href || '#'} className="block h-full">
      <div className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30 bg-white dark:bg-transparent h-full flex flex-col">
        <div className="bg-transparent p-1 min-h-[180px] md:min-h-[200px] flex items-center justify-center relative overflow-hidden group-hover:opacity-95 transition-opacity duration-300">
          {renderDemo() || (
            <div className="w-full h-full bg-contain bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${image})` }} />
          )}
        </div>
        <div className="p-4 md:p-5 border-t border-slate-200 dark:border-slate-800/60 grow">
          <div className="flex items-start justify-between">
            <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">{name}</h3>
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:transform group-hover:translate-x-0.5 transition-all mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  )
}

const Components = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = componentsData
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0)

  return (
    <TourProvider autoStart={false}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen">
        <TourStep
          id="header"
          title="Welcome to Components"
          content="This is our comprehensive library of beautifully crafted UI components. Browse through different categories to find the perfect component for your project."
          order={1}
        >
          <div className="mb-12 md:mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50">
                Components
              </h1>
              <TourTrigger className="cursor-pointer">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Take Tour
                </Button>
              </TourTrigger>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Explore our library of beautifully crafted UI components designed for building
              modern, responsive interfaces with minimal effort.
            </p>
          </div>
        </TourStep>

        <TourStep
          id="search"
          title="Search Components"
          content="Use this search bar to quickly find specific components. You can search by component name or description to filter the results instantly."
          order={2}
        >
          <div className="mb-10 md:mb-12 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Input
                type="search"
                placeholder="Search components (e.g., 'File Uploader', 'Location Picker')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </TourStep>

        {filteredCategories.length > 0 ? (
          <>
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12 md:mb-16">
                <TourStep
                  id={`category-${category.category.toLowerCase().replace(' ', '-')}`}
                  title={`${category.category} Components`}
                  content={`This section contains ${category.items.length} components in the ${category.category} category. ${categoryIndex === 0 ? 'Click on any component to view detailed documentation and examples.' : `Each component includes interactive demos and usage examples.`}`}
                  order={categoryIndex + 3}
                >
                  <div className="flex items-center mb-6 md:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{category.category}</h2>
                    <div className="ml-4 h-px bg-slate-200 dark:bg-slate-700/50 grow"></div>
                    <Badge variant="outline" className="ml-3 px-2.5 py-1 text-sm border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800">{category.items.length}</Badge>
                  </div>
                </TourStep>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {category.items.map((item, itemIndex) => (
                    <div key={item.name}>
                      {categoryIndex === 0 && itemIndex === 0 ? (
                        <TourStep
                          id="first-component"
                          title="Component Cards"
                          content="Each component card shows a live preview, description, and links to detailed documentation. Click on any card to learn more about implementation and usage."
                          order={category.items.length + 4}
                        >
                          <ComponentCard {...item} />
                        </TourStep>
                      ) : (
                        <ComponentCard {...item} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-16 md:py-20 bg-white dark:bg-slate-800/30 rounded-xl shadow-xs">
            <svg
              className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500/70 mb-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No components found matching your search.</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">Try a different search term or explore all components.</p>
          </div>
        )}
      </div>
    </TourProvider>
  )
}

export default Components