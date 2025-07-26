'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DocsNavigation } from './_components/DocsNavigation'
import { TableOfContents } from './_components/TableOfContents'
import { PanelLeft } from "lucide-react"
import { ModeToggle } from '@/components/mode-toggle'


export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const isComponentPage = pathname.includes('/docs/components/') &&
    pathname !== '/docs/components'

  useEffect(() => {
    const checkIfMobile = () => {
      const mobileView = window.innerWidth < 768
      setIsMobile(mobileView)
      if (mobileView) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-background transition-colors duration-200"
    >
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed md:sticky top-0 z-20 h-screen
        transform transition-all duration-300 ease-in-out
        ${isMobile
          ? sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
          : sidebarOpen ? 'w-64' : 'w-16'
        }
        overflow-hidden
      `}>
        <DocsNavigation
          className="border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto"
          onToggleSidebar={toggleSidebar}
          collapsed={!sidebarOpen}
          isMobile={isMobile}
        />
      </div>

      <main className="flex-1 transition-all duration-300 w-full">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-3 md:hidden flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          <ModeToggle />
        </div>

        <div className="md:px-4 px-2 py-8 max-w-7xl mx-auto">
          <div className="flex items-start">
            <div className={`w-full ${isComponentPage ? 'lg:max-w-4xl' : 'max-w-5xl mx-auto'}`}>
              {children}
            </div>

            {isComponentPage && (
              <div className="hidden lg:block flex-grow ml-10 sticky top-8">
                <TableOfContents />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
