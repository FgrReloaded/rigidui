"use client"
import React, { useState, useCallback, useMemo } from 'react'
import { InfiniteScroll } from '@/r/new-york/infinite-scroll/infinite-scroll'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InfiniteScrollPreview() {
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
    <div className="w-full flex flex-col items-center space-y-4">
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