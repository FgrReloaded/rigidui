"use client"

import React, { useEffect, useRef, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

const DefaultLoader = () => (
  <div className="flex justify-center py-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
)

const DefaultEndMessage = () => (
  <div className="text-center py-4 text-muted-foreground">
    <p>No more items to load</p>
  </div>
)

interface InfiniteScrollProps<T> {
  items: T[];
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
  loader?: React.ComponentType;
  endMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  initialLoad?: boolean;
  scrollableTarget?: string;
}

export function InfiniteScroll<T>({
  items,
  hasNextPage,
  isLoading,
  onLoadMore,
  threshold = 100,
  loader: Loader = DefaultLoader,
  endMessage = <DefaultEndMessage />,
  errorMessage,
  renderItem,
  className,
  itemClassName,
  reverse = false,
  initialLoad = false,
  scrollableTarget,
}: InfiniteScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const [internalLoading, setInternalLoading] = useState(false)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isLoading && !internalLoading) {
        setInternalLoading(true)
        Promise.resolve(onLoadMore()).finally(() => {
          setInternalLoading(false)
        })
      }
    },
    [hasNextPage, isLoading, internalLoading, onLoadMore]
  )

  useEffect(() => {
    const element = loadingRef.current
    if (!element) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: scrollableTarget ? document.getElementById(scrollableTarget) : null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, threshold, scrollableTarget])

  useEffect(() => {
    if (initialLoad && items.length === 0 && hasNextPage && !isLoading) {
      onLoadMore()
    }
  }, [initialLoad, items.length, hasNextPage, isLoading, onLoadMore])

  const renderItems = () => {
    const renderedItems = items.map((item, index) => (
      <div key={index} className={cn(itemClassName)}>
        {renderItem(item, index)}
      </div>
    ))

    return reverse ? renderedItems.reverse() : renderedItems
  }

  return (
    <div
      ref={containerRef}
      className={cn("space-y-4", className)}
      style={reverse ? { display: 'flex', flexDirection: 'column-reverse' } : undefined}
      role="feed"
      aria-busy={isLoading}
      aria-label="Scrollable content list"
    >
      {renderItems()}

      <div ref={loadingRef} className="h-1" />

      {isLoading && <Loader />}

      {errorMessage && (
        <div className="text-center py-4 text-destructive">
          {errorMessage}
        </div>
      )}

      {!hasNextPage && !isLoading && items.length > 0 && endMessage}

      {!hasNextPage && !isLoading && items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No items found</p>
        </div>
      )}
    </div>
  )
}

export type { InfiniteScrollProps }