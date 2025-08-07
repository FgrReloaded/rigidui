"use client"

import { InfiniteScroll } from "@/r/new-york/infinite-scroll/infinite-scroll"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents

const basicCode = `import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useCallback } from "react"

export default function BasicExample() {
  const [items, setItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: items.length + i + 1,
      title: \`Item \${items.length + i + 1}\`,
      description: "Description for this item"
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 100)
    setLoading(false)
  }, [items.length])

  return (
    <InfiniteScroll
      items={items}
      hasNextPage={hasNext}
      isLoading={loading}
      onLoadMore={loadMore}
      renderItem={(item) => (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      )}
      initialLoad={true}
    />
  )
}`

const virtualizedCode = `import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useCallback } from "react"

export default function VirtualizedExample() {
  const [items, setItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const newItems = Array.from({ length: 50 }, (_, i) => ({
      id: items.length + i + 1,
      title: \`Item \${items.length + i + 1}\`,
      description: "Large dataset item with virtualization"
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 10000)
    setLoading(false)
  }, [items.length])

  return (
    <InfiniteScroll
      items={items}
      hasNextPage={hasNext}
      isLoading={loading}
      onLoadMore={loadMore}
      renderItem={(item) => (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      )}
      virtualized={true}
      height={400}
      estimateSize={() => 80}
      overscan={5}
      initialLoad={true}
    />
  )
}`

const reverseModeCode = `import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useCallback } from "react"

export default function ReverseModeExample() {
  const [messages, setMessages] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newMessages = Array.from({ length: 5 }, (_, i) => ({
      id: messages.length + i + 1,
      user: \`User \${Math.floor(Math.random() * 100)}\`,
      message: \`Message \${messages.length + i + 1}\`,
      time: new Date().toLocaleTimeString()
    }))

    setMessages(prev => [...newMessages, ...prev])
    setHasNext(messages.length + newMessages.length < 50)
    setLoading(false)
  }, [messages.length])

  return (
    <InfiniteScroll
      items={messages}
      hasNextPage={hasNext}
      isLoading={loading}
      onLoadMore={loadMore}
      renderItem={(message) => (
        <div className="p-3 border rounded-lg bg-muted/50">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-sm">{message.user}</span>
            <span className="text-xs text-muted-foreground">{message.time}</span>
          </div>
          <p className="text-sm">{message.message}</p>
        </div>
      )}
      reverse={true}
      className="space-y-2 p-4"
    />
  )
}`

const customLoadingCode = `import { InfiniteScroll } from "@/components/infinite-scroll"
import { useState, useCallback } from "react"
import { Loader2, CheckCircle } from "lucide-react"

export default function CustomLoadingExample() {
  const [items, setItems] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: items.length + i + 1,
      title: \`Product \${items.length + i + 1}\`,
      price: \`$\${(Math.random() * 100).toFixed(2)}\`,
      category: ['Electronics', 'Clothing', 'Books'][Math.floor(Math.random() * 3)]
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 40)
    setLoading(false)
  }, [items.length])

  return (
    <InfiniteScroll
      items={items}
      hasNextPage={hasNext}
      isLoading={loading}
      onLoadMore={loadMore}
      renderItem={(item) => (
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{item.title}</h3>
            <span className="font-bold text-green-600">{item.price}</span>
          </div>
          <p className="text-sm text-muted-foreground">{item.category}</p>
        </div>
      )}
      loader={() => (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-sm font-medium">Loading amazing products...</span>
        </div>
      )}
      endMessage={
        <div className="flex items-center justify-center py-6 text-green-600">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">All products loaded!</span>
        </div>
      }
      initialLoad={true}
    />
  )
}`

function BasicExample() {
  const [items, setItems] = useState<Array<{ id: number, title: string, description: string }>>([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Item ${items.length + i + 1}`,
      description: "Description for this item"
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 50)
    setLoading(false)
  }

  return (
    <div className="h-64 border rounded-lg overflow-hidden">
      <InfiniteScroll
        items={items}
        hasNextPage={hasNext}
        isLoading={loading}
        onLoadMore={loadMore}
        renderItem={(item) => (
          <div className="p-4 border-b last:border-b-0">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        )}
        initialLoad={true}
      />
    </div>
  )
}

function VirtualizedExample() {
  const [items, setItems] = useState<Array<{ id: number, title: string, description: string }>>([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const newItems = Array.from({ length: 50 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Item ${items.length + i + 1}`,
      description: "Large dataset item with virtualization"
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 1000)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-700 dark:text-green-300">
          🚀 <strong>Performance:</strong> Only visible items are rendered ({items.length}/1000 loaded)
        </p>
      </div>
      <InfiniteScroll
        items={items}
        hasNextPage={hasNext}
        isLoading={loading}
        onLoadMore={loadMore}
        renderItem={(item) => (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        )}
        virtualized={true}
        height={320}
        estimateSize={() => 80}
        overscan={5}
        initialLoad={true}
      />
    </div>
  )
}

function ReverseModeExample() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", message: "Hey there!", time: "10:30 AM" },
    { id: 2, user: "Bob", message: "How are you?", time: "10:31 AM" }
  ])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newMessages = Array.from({ length: 5 }, (_, i) => ({
      id: messages.length + i + 1,
      user: `User ${Math.floor(Math.random() * 100)}`,
      message: `Message ${messages.length + i + 1}`,
      time: new Date().toLocaleTimeString()
    }))

    setMessages(prev => [...newMessages, ...prev])
    setHasNext(messages.length + newMessages.length < 30)
    setLoading(false)
  }

  return (
    <div className="h-64 border rounded-lg overflow-hidden">
      <InfiniteScroll
        items={messages}
        hasNextPage={hasNext}
        isLoading={loading}
        onLoadMore={loadMore}
        renderItem={(message) => (
          <div className="p-3 border-b bg-muted/50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">{message.user}</span>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
            <p className="text-sm">{message.message}</p>
          </div>
        )}
        reverse={true}
      />
    </div>
  )
}

function CustomLoadingExample() {
  const [items, setItems] = useState<Array<{ id: number, title: string, price: string, category: string }>>([])
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const categories = ['Electronics', 'Clothing', 'Books']
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Product ${items.length + i + 1}`,
      price: `$${(Math.random() * 100).toFixed(2)}`,
      category: categories[Math.floor(Math.random() * 3)]
    }))

    setItems(prev => [...prev, ...newItems])
    setHasNext(items.length + newItems.length < 40)
    setLoading(false)
  }

  return (
    <div className="h-80 border rounded-lg overflow-hidden">
      <InfiniteScroll
        items={items}
        hasNextPage={hasNext}
        isLoading={loading}
        onLoadMore={loadMore}
        renderItem={(item) => (
          <Card className="m-3">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <span className="font-bold text-green-600">{item.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{item.category}</Badge>
            </CardContent>
          </Card>
        )}
        loader={() => (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
            <span className="text-sm font-medium">Loading amazing products...</span>
          </div>
        )}
        endMessage={
          <div className="flex items-center justify-center py-6 text-green-600">
            <div className="h-5 w-5 mr-2">✓</div>
            <span className="text-sm font-medium">All products loaded!</span>
          </div>
        }
        initialLoad={true}
      />
    </div>
  )
}

export function InfiniteScrollAdvancedExamples() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Basic Infinite Scroll
          </h3>
          <p className="text-muted-foreground">
            Simple infinite scrolling with automatic loading when approaching the bottom.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full">
              <BasicExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={basicCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Virtualized Infinite Scroll
          </h3>
          <p className="text-muted-foreground">
            High-performance scrolling for large datasets using virtualization.
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

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Reverse Mode (Chat Style)
          </h3>
          <p className="text-muted-foreground">
            Perfect for chat interfaces where new content appears at the top.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full">
              <ReverseModeExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={reverseModeCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Custom Loading & End States
          </h3>
          <p className="text-muted-foreground">
            Customize loading indicators and end messages for better user experience.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full">
              <CustomLoadingExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={customLoadingCode} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}