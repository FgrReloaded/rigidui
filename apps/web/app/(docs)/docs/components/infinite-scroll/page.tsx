"use client"

import React, { useState, useCallback, useMemo } from 'react'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { InfiniteScroll } from '@/registry/new-york/infinite-scroll/infinite-scroll'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InfiniteScrollPage() {
  const InfiniteScrollDemo = () => {
    const [items, setItems] = useState([
      { id: 1, title: "Product Listing Feature", description: "Showcase infinite scroll with product catalogs and inventory management." },
      { id: 2, title: "Social Media Feed", description: "Perfect for displaying posts, comments, and user-generated content." },
    ])
    const [hasNext, setHasNext] = useState(true)
    const [loading, setLoading] = useState(false)

    const demoItems = useMemo(() => [
      { id: 3, title: "Blog Articles", description: "Load blog posts dynamically as users explore your content." },
      { id: 4, title: "Search Results", description: "Display search results with seamless pagination experience." },
      { id: 5, title: "Chat Messages", description: "Ideal for chat interfaces with reverse loading support." },
      { id: 6, title: "Image Gallery", description: "Browse through image collections with smooth loading transitions." },
      { id: 7, title: "Product Reviews", description: "Load customer reviews and ratings progressively." },
      { id: 8, title: "News Articles", description: "Stay updated with the latest news through infinite feed." },
    ], [])

    const loadMore = useCallback(async () => {
      if (loading) return

      setLoading(true)

      await new Promise(resolve => setTimeout(resolve, 1000))

      const currentLength = items.length
      const nextItems = demoItems.slice(currentLength - 2, currentLength + 2)

      if (nextItems.length > 0) {
        setItems(prev => [...prev, ...nextItems])
        setHasNext(currentLength + nextItems.length < demoItems.length + 2)
      } else {
        setHasNext(false)
      }

      setLoading(false)
    }, [items.length, loading])

    return (
      <div className="w-full max-w-md">
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📱 <strong>Interactive Demo:</strong> Scroll down to see more items load automatically!
          </p>
        </div>
        <div className="max-h-96 overflow-auto border rounded-lg">
          <InfiniteScroll
            items={items}
            hasNextPage={hasNext}
            isLoading={loading}
            onLoadMore={loadMore}
            renderItem={(item) => (
              <Card className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            )}
            className="space-y-3 p-4"
            threshold={100}
            loader={() => (
              <div className="flex justify-center py-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Loading more items...</span>
                </div>
              </div>
            )}
            endMessage={
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">🎉 All examples loaded!</p>
              </div>
            }
          />
        </div>
      </div>
    )
  }

  const propsData = [
    {
      name: 'items',
      type: 'T[]',
      description: 'Array of items to display',
      required: true,
    },
    {
      name: 'hasNextPage',
      type: 'boolean',
      description: 'Whether there are more items to load',
      required: true,
    },
    {
      name: 'isLoading',
      type: 'boolean',
      description: 'Whether the component is currently loading',
      required: true,
    },
    {
      name: 'onLoadMore',
      type: '() => void | Promise<void>',
      description: 'Function called when more items should be loaded',
      required: true,
    },
    {
      name: 'renderItem',
      type: '(item: T, index: number) => React.ReactNode',
      description: 'Function to render each item',
      required: true,
    },
    {
      name: 'threshold',
      type: 'number',
      defaultValue: '100',
      description: 'Distance in pixels from bottom to trigger loading',
    },
    {
      name: 'loader',
      type: 'React.ComponentType',
      defaultValue: 'DefaultLoader',
      description: 'Custom loading component',
    },
    {
      name: 'endMessage',
      type: 'React.ReactNode',
      defaultValue: 'Default end message',
      description: 'Message shown when all items are loaded',
    },
    {
      name: 'errorMessage',
      type: 'React.ReactNode',
      defaultValue: 'undefined',
      description: 'Error message to display when loading fails',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for the container',
    },
    {
      name: 'itemClassName',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for each item wrapper',
    },
    {
      name: 'reverse',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to load items in reverse order (useful for chat)',
    },
    {
      name: 'initialLoad',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to automatically load initial data on mount',
    },
    {
      name: 'scrollableTarget',
      type: 'string',
      defaultValue: 'undefined',
      description: 'ID of custom scroll container element',
    },
  ]


  const bestPractices = [
    {
      type: 'do' as const,
      items: [
        'Use appropriate threshold values (50-200px) to provide smooth user experience',
        'Implement proper error handling and retry mechanisms',
        'Show meaningful loading states and end messages',
        'Consider using skeleton loaders for better perceived performance',
        'Implement proper virtualization for very large lists (1000+ items)',
        'Use debouncing if combining with search functionality',
        'Test thoroughly on mobile devices for scroll performance',
        'Provide clear visual feedback when loading or when reaching the end',
      ]
    },
    {
      type: 'dont' as const,
      items: [
        'Set threshold too high (causes premature loading) or too low (causes delays)',
        'Forget to handle loading and error states properly',
        'Load too many items at once (impacts performance)',
        'Use infinite scroll for critical actions or navigation',
        'Ignore accessibility - provide keyboard navigation alternatives',
        'Forget to test with slow network connections',
        'Use infinite scroll when pagination would be more appropriate',
        'Load data without user consent on metered connections',
      ]
    }
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Automatic Loading",
      description: "Automatically loads more content when user scrolls near the bottom using Intersection Observer API."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "High Performance",
      description: "Uses efficient Intersection Observer instead of scroll events for better performance and battery life."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "Flexible Configuration",
      description: "Customizable loading triggers, custom loaders, error states, and support for reverse loading."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Optimized",
      description: "Touch-friendly scrolling with optimized performance for mobile devices and responsive design."
    }
  ]

  const usageCode = `
import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useCallback } from "react"

export default function MyComponent() {
  const [items, setItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(\`/api/items?page=\${Math.floor(items.length / 10) + 1}\`)
    const data = await response.json()

    setItems(prev => [...prev, ...data.items])
    setHasNext(data.hasMore)
  } catch (error) {
    console.error('Failed to load items:', error)
  } finally {
    setLoading(false)
  }
}, [items.length])

return (
  <InfiniteScroll
    items={items}
    hasNextPage={hasNext}
    isLoading={loading}
    onLoadMore={loadMore}
    threshold={200}
    initialLoad={true}
    renderItem={(item, index) => (
      <div key={item.id} className="p-4 border rounded-lg">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-muted-foreground">{item.description}</p>
      </div>
    )}
    loader={() => (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
      </div>
    )}
    endMessage={
      <div className="text-center py-4 text-muted-foreground">
        <p>You've reached the end! 🎉</p>
      </div>
    }
  />
)}`

  return (
    <ComponentDocTemplate
      title="Infinite Scroll"
      description="A high-performance infinite scroll component that automatically loads more content as users scroll."
      previewComponent={<InfiniteScrollDemo />}
      githubPath="registry/new-york/infinite-scroll/infinite-scroll.tsx"
      usageCode={usageCode}
      usageDescription="The Infinite Scroll component provides seamless content loading as users scroll. It uses the Intersection Observer API for optimal performance and supports various configurations including reverse loading for chat interfaces."
      propsData={propsData}
      features={features}
      bestPractices={bestPractices}
      componentName="https://rigidui.com/registry/infinite-scroll"
    />
  )
}