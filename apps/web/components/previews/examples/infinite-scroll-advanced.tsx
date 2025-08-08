"use client"

import { InfiniteScroll } from "@/r/new-york/infinite-scroll/infinite-scroll"
import { useState, useEffect, useRef, useCallback } from "react"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const { Tabs, Tab } = TabsComponents

const virtualizedCode = `import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useEffect } from "react"

export default function VirtualizedExample() {
  const [items, setItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: items.length + i + 1,
      title: \`Product \${items.length + i + 1}\`,
      description: "High-quality product with detailed specifications and reviews",
      price: Math.floor(Math.random() * 500) + 50,
      category: ["Electronics", "Clothing", "Home", "Sports"][Math.floor(Math.random() * 4)]
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 500)
    setLoading(false)
  }

  useEffect(() => {
    loadMore()
  }, [])

  return (
    <InfiniteScroll
      items={items}
      hasNextPage={hasNext}
      isLoading={loading}
      onLoadMore={loadMore}
      renderItem={(item) => (
        <div className="group p-6 border border-border rounded-xl bg-card hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  \${item.price}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full text-xs"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      virtualized={true}
      height={400}
      estimateSize={() => 120}
      overscan={3}
      className="p-4"
    />
  )
}`

function VirtualizedExample() {
  const [items, setItems] = useState<Array<{
    id: number
    title: string
    description: string
    price: number
    category: string
  }>>([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const initialized = useRef(false)

  const loadMore = useCallback(async () => {
    console.log("Loading more items...", {
      loading,
      hasNext,
      currentItems: items.length
    })

    if (loading) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Product ${items.length + i + 1}`,
      description: "High-quality product with detailed specifications and reviews",
      price: Math.floor(Math.random() * 500) + 50,
      category: ["Electronics", "Clothing", "Home", "Sports"][Math.floor(Math.random() * 4)]
    }))

    setItems(prev => {
      const updated = [...prev, ...newItems]
      console.log("Items updated:", prev.length, "->", updated.length)
      return updated
    })

    const newTotal = items.length + newItems.length
    const stillHasNext = newTotal < 500
    setHasNext(stillHasNext)

    console.log("Load complete:", {
      newTotal,
      stillHasNext
    })

    setLoading(false)
  }, [items.length, hasNext, loading])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      loadMore()
    }
  }, [loadMore])

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-border bg-card/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-foreground">Virtual Scrolling Active</p>
              <p className="text-xs text-muted-foreground">Smooth rendering with virtualization</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {items.length}/500 loaded
            </Badge>
            <Badge variant="outline" className="text-xs">Only visible items rendered</Badge>
          </div>
        </div>
        <div
          className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden"
          aria-label="Loaded items progress"
          role="progressbar"
          aria-valuenow={Math.min((items.length / 500) * 100, 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-primary transition-[width] duration-500"
            style={{ width: `${Math.min((items.length / 500) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-auto">
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
          virtualized={true}
          height={400}
          estimateSize={() => 120}
          overscan={3}
          loader={() => (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin" />
              <span className="mt-2 text-xs text-muted-foreground">Loading…</span>
            </div>
          )}
          endMessage={
            <div className="text-center py-8">
              <span className="text-sm text-muted-foreground">All products loaded • {items.length}</span>
            </div>
          }
          className="p-4 space-y-3 mt-4"
        />
      </div>
    </div>
  )
}

export function InfiniteScrollAdvancedExamples() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-foreground">
            Virtualized Infinite Scroll
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience high-performance scrolling with thousands of items. Only visible items are rendered to the DOM,
            ensuring smooth performance regardless of dataset size.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full">
              <VirtualizedExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={virtualizedCode} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}