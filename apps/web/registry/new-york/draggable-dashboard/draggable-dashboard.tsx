"use client"

import React, { useState, ReactNode, Children, isValidElement, useEffect, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  GripVertical,
  Lock,
  Unlock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DraggableWrapperProps {
  id: string
  children: ReactNode
  gridSize?: {
    cols: number
    rows: number
  }
  className?: string
  isLocked?: boolean
  showHandle?: boolean
}

interface DraggableDashboardProps {
  children: ReactNode
  className?: string
  showLockToggle?: boolean
  showHandles?: boolean
  gridCols?: number
  gap?: number
  defaultLocked?: boolean
  onOrderChange?: (newOrder: string[]) => void
  persistenceKey?: string
}

export function DraggableWrapper({
  id,
  children,
  gridSize = { cols: 1, rows: 1 },
  className,
  isLocked = false,
  showHandle = true,
}: DraggableWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isLocked
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${gridSize.cols}`,
    gridRow: `span ${gridSize.rows}`,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        isDragging && "opacity-50 z-50",
        className
      )}
    >
      {!isLocked && showHandle && (
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "absolute top-2 right-2 z-10 cursor-grab hover:cursor-grabbing",
            "p-1 bg-background/80 backdrop-blur-sm rounded shadow-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "hover:bg-muted"
          )}
          title="Drag to move"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {isLocked && showHandle && (
        <div
          className={cn(
            "absolute top-2 right-2 z-10 cursor-grab hover:cursor-grabbing",
            "p-1 bg-background/80 backdrop-blur-sm rounded shadow-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "hover:bg-muted"
          )}
          title="Locked"
        >
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      <div className={cn(
        "h-full transition-all duration-200",
        !isLocked && "hover:shadow-lg",
        isDragging && "shadow-2xl"
      )}>
        {children}
      </div>
    </div>
  )
}

function DragOverlayWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="shadow-2xl">
      {children}
    </div>
  )
}

export default function DraggableDashboard({
  children,
  className,
  showLockToggle = true,
  showHandles = true,
  gridCols = 3,
  gap = 6,
  defaultLocked = false,
  onOrderChange,
  persistenceKey = 'draggable-dashboard-order'
}: DraggableDashboardProps) {
  const [isLocked, setIsLocked] = useState(defaultLocked)
  const [activeId, setActiveId] = useState<string | null>(null)

  const childrenArray = Children.toArray(children)

  const getInitialOrder = (): string[] => {
    return childrenArray
      .map((child, index) => {
        if (isValidElement(child) && child.props && typeof child.props === 'object' && 'id' in child.props) {
          return child.props.id as string
        }
        return `item-${index}`
      })
  }

  const loadPersistedOrder = useCallback((): string[] => {
    if (typeof window === 'undefined') return getInitialOrder()

    try {
      const savedOrder = localStorage.getItem(persistenceKey)
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder)
        const initialOrder = getInitialOrder()

        const isValidOrder = parsedOrder.length === initialOrder.length &&
          parsedOrder.every((id: string) => initialOrder.includes(id)) &&
          initialOrder.every((id: string) => parsedOrder.includes(id))

        if (isValidOrder) {
          return parsedOrder
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted dashboard order:', error)
    }

    return getInitialOrder()
  }, [persistenceKey])

  const [itemOrder, setItemOrder] = useState<string[]>(getInitialOrder)

  useEffect(() => {
    const persistedOrder = loadPersistedOrder()
    setItemOrder(persistedOrder)
  }, [loadPersistedOrder, persistenceKey])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(persistenceKey, JSON.stringify(itemOrder))
      } catch (error) {
        console.warn('Failed to save dashboard order:', error)
      }
    }
  }, [itemOrder, persistenceKey])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: DragStartEvent) {
    if (isLocked) return
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id && over?.id) {
      setItemOrder((items) => {
        const oldIndex = items.findIndex((item) => item === active.id)
        const newIndex = items.findIndex((item) => item === over.id)

        const newOrder = arrayMove(items, oldIndex, newIndex)

        if (onOrderChange) {
          onOrderChange(newOrder)
        }

        return newOrder
      })
    }

    setActiveId(null)
  }

  const orderedChildren = itemOrder.map(id => {
    return childrenArray.find((child, index) => {
      if (isValidElement(child) && child.props && typeof child.props === 'object' && 'id' in child.props) {
        return child.props.id === id
      }
      return `item-${index}` === id
    })
  }).filter(Boolean)

  const activeChild = childrenArray.find((child, index) => {
    if (isValidElement(child) && child.props && typeof child.props === 'object' && 'id' in child.props) {
      return child.props.id === activeId
    }
    return `item-${index}` === activeId
  })

  const toggleLock = () => {
    setIsLocked(!isLocked)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {(showLockToggle) && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              {isLocked ? "Dashboard is locked" : "Drag items to customize your layout"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {showLockToggle && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="lock-toggle" className="text-sm font-medium">
                  {isLocked ? "Locked" : "Unlocked"}
                </Label>
                <Switch
                  id="lock-toggle"
                  checked={isLocked}
                  onCheckedChange={toggleLock}
                />
                {isLocked ? (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Unlock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Separator />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemOrder}
          strategy={rectSortingStrategy}
        >
          <div
            className={cn(
              "grid auto-rows-min",
              `grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridCols}`
            )}
            style={{
              gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
              gap: `${gap * 0.25}rem`
            }}
          >
            {orderedChildren.map((child, index) => {
              if (!isValidElement(child)) return null

              const childProps = child.props && typeof child.props === 'object' ? child.props : {}
              const id = ('id' in childProps ? childProps.id : `item-${index}`) as string

              return React.createElement(child.type, {
                ...(child.props || {}),
                key: id,
                isLocked,
                showHandle: showHandles,
              })
            })}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeChild && isValidElement(activeChild) ? (
            <DragOverlayWrapper>
              {React.createElement(activeChild.type, {
                ...(activeChild.props || {}),
                isLocked: true,
                showHandle: false,
                key: 'overlay'
              })}
            </DragOverlayWrapper>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}