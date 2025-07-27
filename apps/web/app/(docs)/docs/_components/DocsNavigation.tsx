'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PanelLeft, ChevronRight, PanelRight } from "lucide-react"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import DocsSearch from './DocsSearch'
import { ModeToggle } from '@/components/mode-toggle'
import { NavigationItem } from '@/lib/types'
import { navigationItems } from '@/lib/constants'

export function DocsNavigation({
  className,
  onToggleSidebar,
  collapsed = false,
  isMobile = false
}: {
  className?: string,
  onToggleSidebar?: () => void,
  collapsed?: boolean,
  isMobile?: boolean
}) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [isCommandPanelOpen, setIsCommandPanelOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setIsCommandPanelOpen(prev => !prev)
      }
      if (event.key === 'Escape' && isCommandPanelOpen) {
        setIsCommandPanelOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCommandPanelOpen])

  const toggleSection = (href: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [href]: !prev[href]
    }))
  }

  const NavItem = ({ item }: { item: NavigationItem }) => {
    const isActive = pathname === item.href
    const hasActiveChild = item.items?.some(child => pathname === child.href)

    const manualExpansionState = expandedSections[item.href];
    const autoExpandCondition = item.items && item.items.length > 0 && pathname.startsWith(item.href);
    const defaultExpandCondition = item.isCollapsed === false && item.items && item.items.length > 0;
    const isExpanded = manualExpansionState !== undefined ? manualExpansionState : (autoExpandCondition || defaultExpandCondition);

    return (
      <div>
        <div className="flex items-center group">
          <Link
            href={item.href}
            className={cn(
              "flex-1 flex items-center px-3 py-2 text-sm rounded-md transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-950 dark:text-blue-300"
                : hasActiveChild
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <span className={cn(
              isActive ? "font-medium" : hasActiveChild ? "font-medium" : "font-normal"
            )}>
              {item.title}
            </span>
          </Link>

          {item.items && (
            <button
              onClick={() => toggleSection(item.href)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </button>
          )}
        </div>

        {item.items && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.items.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block px-3 py-1.5 text-sm rounded-md transition-colors",
                  pathname === child.href
                    ? "text-blue-600 bg-blue-50 font-medium dark:text-blue-400 dark:bg-blue-950"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className={cn(
      "h-full bg-white dark:bg-background border-r border-gray-200 dark:border-gray-800",
      className,
      collapsed && !isMobile ? 'w-16' : 'w-full'
    )}>
      <div className={cn(
        "flex items-center p-4 border-b border-gray-200 dark:border-gray-800",
        collapsed && !isMobile ? 'justify-center flex-col space-y-3' : 'justify-between'
      )}>
        <Link href="/" className="flex items-center">
          {collapsed ?
            <Image src="/short-logo.png" width={24} height={24} alt="Logo" /> :
            <Image src="/logo.png" alt="Logo" width={100} height={24} className="h-6 w-auto" />
          }
        </Link>

        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className='hidden md:block'>
              <ModeToggle />
            </div>
            {!isMobile && (
              <button
                onClick={onToggleSidebar}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {collapsed && !isMobile && (
          <div className="flex flex-col items-center space-y-2">
            <div className='hidden md:block'>
              <ModeToggle />
            </div>
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Expand sidebar"
            >
              <PanelRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="p-4 dark:border-gray-800">
          <DocsSearch collapsed={false} />
        </div>
      )}

      {!collapsed && (
        <div className="p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      )}
    </nav>
  )
}
