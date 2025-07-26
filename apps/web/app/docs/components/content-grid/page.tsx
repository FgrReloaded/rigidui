/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react'
import { ContentGrid } from '@/registry/new-york/content-grid/content-grid'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, Download } from "lucide-react"

export default function ContentGridPage() {
  const sampleItems = [
    {
      id: 1,
      title: 'Dashboard Template',
      description: 'A comprehensive dashboard template with charts and analytics.',
      category: 'Template',
      price: '$49',
      rating: 4.9,
      views: 1234,
      downloads: 892,
    },
    {
      id: 2,
      title: 'UI Kit Pro',
      description: 'Complete UI kit with modern components and layouts.',
      category: 'UI Kit',
      price: '$29',
      rating: 4.8,
      views: 956,
      downloads: 643,
    },
    {
      id: 3,
      title: 'Icon Library',
      description: 'Premium icon collection with 500+ icons.',
      category: 'Icons',
      price: 'Free',
      rating: 4.7,
      views: 2134,
      downloads: 1543,
    },
  ]

  const renderCard = (item: any, viewMode: 'grid' | 'list') => {
    const isListMode = viewMode === 'list'

    return (
      <Card key={item.id} className={`hover:shadow-md transition-shadow ${isListMode ? 'flex items-center gap-4' : ''}`}>
        <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg ${isListMode ? 'w-16 h-16 flex-shrink-0 ml-4' : 'w-full h-24 mb-3'}`} />
        <div className={`flex-1 ${isListMode ? 'mr-4' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{item.price}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {item.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {item.downloads.toLocaleString()}
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </CardContent>
        </div>
      </Card>
    )
  }

  const propsData = [
    {
      name: 'items',
      type: 'ContentItem[]',
      defaultValue: '[]',
      description: 'Array of items to display in the grid/list',
      required: true,
    },
    {
      name: 'renderCard',
      type: '(item: ContentItem, viewMode: ViewMode) => React.ReactNode',
      defaultValue: 'undefined',
      description: 'Function to render each card item. Receives the item and current view mode.',
      required: true,
    },
    {
      name: 'defaultViewMode',
      type: "'grid' | 'list'",
      defaultValue: "'grid'",
      description: 'Default view mode when component loads',
    },
    {
      name: 'gridColumns',
      type: "'auto' | 1 | 2 | 3 | 4 | 5 | 6",
      defaultValue: "'auto'",
      description: 'Number of columns in grid view. "auto" provides responsive columns.',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for the container',
    },
    {
      name: 'onViewModeChange',
      type: '(mode: ViewMode) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when view mode changes',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Grid & List Views",
      description: "Seamlessly switch between grid and list layouts with smooth transitions and optimized rendering."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1z" />
        </svg>
      ),
      title: "Flexible Rendering",
      description: "Complete control over card rendering with custom render functions that adapt to view modes."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Responsive Design",
      description: "Built-in responsive breakpoints ensure optimal display across all device sizes."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Customizable Columns",
      description: "Configure exact column counts or use auto-responsive layouts that adapt to screen size."
    }
  ]

  const usageCode = `import { ContentGrid } from "@/components/content-grid"

export default function MyComponent() {

    const renderCard = (item: ContentItem, viewMode: 'grid' | 'list') => {
    const isListMode = viewMode === 'list'

    return (
      <Card key={item.id} className={\`hover:shadow-md transition-shadow \${isListMode ? 'flex items-center gap-4' : ''}\`}>
        <div className={\`bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg \${isListMode ? 'w-16 h-16 flex-shrink-0 ml-4' : 'w-full h-24 mb-3'}\`} />
        <div className={\`flex-1 \${isListMode ? 'mr-4' : ''}\`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{item.price}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {item.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {item.downloads.toLocaleString()}
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
      <ContentGrid
        items={sampleItems}
        renderCard={renderCard}
        defaultViewMode="grid"
        gridColumns={3}
        className="w-full"
        />
  )
}`

  return (
    <ComponentDocTemplate
      title="Content Grid"
      description="A flexible grid/list component that provides seamless switching between grid and list layouts with customizable card rendering."
      previewComponent={
        <ContentGrid
          items={sampleItems}
          renderCard={renderCard}
          defaultViewMode="grid"
          gridColumns={3}
          className="w-full"
        />
      }
      githubPath="registry/new-york/content-grid/content-grid.tsx"
      usageCode={usageCode}
      usageDescription="The Content Grid component provides a flexible layout system for displaying collections of items. It supports both grid and list views with smooth transitions and gives you complete control over how each item is rendered."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/content-grid"
    />
  )
}