'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLocation } from '@/r/new-york/use-location/use-location'
import { MapPin, Loader2, ToggleLeft, ToggleRight, Database, Code, Zap, Settings } from 'lucide-react'

const hooksData = [
  {
    category: 'Location & Geography',
    items: [
      {
        name: 'useLocation',
        href: '/docs/hooks/use-location',
        description: 'React hook for browser geolocation and reverse geocoding with error handling',
        image: '/globe.svg'
      }
    ]
  }
]

interface HookCardProps {
  name: string
  description: string
  image: string
  href?: string
}

const HookCard = ({ name, description, image, href }: HookCardProps) => {
  const renderDemo = () => {
    switch (name) {
      case 'useLocation':
        return <UseLocationDemo />
      case 'useToggle':
        return <UseToggleDemo />
      case 'useLocalStorage':
        return <UseLocalStorageDemo />
      case 'useDebounce':
        return <UseDebounceDemo />
      case 'useClickOutside':
        return <UseClickOutsideDemo />
      default:
        return null
    }
  }

  return (
    <Link href={href || '#'} className="block h-full">
      <div className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30 bg-white dark:bg-transparent h-full flex flex-col">
        <div className="bg-transparent p-3 min-h-[200px] md:min-h-[220px] flex items-center justify-center relative overflow-hidden group-hover:opacity-95 transition-opacity duration-300">
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

function UseLocationDemo() {
  const { location, isLoading, error, getCurrentLocation, clearLocation } = useLocation()

  return (
    <div className="w-full max-w-sm space-y-3">
      <Card className="p-3 shadow-xs bg-white dark:bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Location Hook</span>
          </div>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            {isLoading ? 'Loading...' : location ? 'Located' : 'Ready'}
          </Badge>
        </div>

        <div className="space-y-2">
          <Button
            onClick={getCurrentLocation}
            disabled={isLoading}
            size="sm"
            className="w-full text-xs h-7"
          >
            {isLoading ? (
              <><Loader2 className="h-3 w-3 animate-spin mr-2" />Locating...</>
            ) : (
              <><MapPin className="h-3 w-3 mr-2" />Get Location</>
            )}
          </Button>

          {location && (
            <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-green-800 dark:text-green-200 text-xs truncate">📍 {location}</p>
              <Button
                variant="outline"
                onClick={clearLocation}
                size="sm"
                className="mt-1 text-xs h-6 w-full"
              >
                Clear
              </Button>
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-800 dark:text-red-200 text-xs">{error}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function UseToggleDemo() {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <Card className="p-3 shadow-xs bg-white dark:bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Toggle Hook</span>
          </div>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            {isToggled ? 'On' : 'Off'}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">Dark Mode</span>
            <button
              onClick={() => setIsToggled(!isToggled)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ backgroundColor: isToggled ? '#3b82f6' : '#d1d5db' }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isToggled ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            State: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
              {isToggled ? 'true' : 'false'}
            </code>
          </div>

          <Button
            onClick={() => setIsToggled(!isToggled)}
            size="sm"
            variant="outline"
            className="w-full text-xs h-7"
          >
            {isToggled ? <ToggleRight className="h-3 w-3 mr-2" /> : <ToggleLeft className="h-3 w-3 mr-2" />}
            Toggle
          </Button>
        </div>
      </Card>
    </div>
  )
}

function UseLocalStorageDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full max-w-sm">
      <Card className="p-3 shadow-xs bg-white dark:bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Database className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">LocalStorage</span>
          </div>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            Persistent
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">{count}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Stored Count</div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setCount(count - 1)}
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-7"
            >
              -
            </Button>
            <Button
              onClick={() => setCount(count + 1)}
              size="sm"
              className="flex-1 text-xs h-7"
            >
              +
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Persists across page reloads
          </div>
        </div>
      </Card>
    </div>
  )
}

function UseDebounceDemo() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <div className="w-full max-w-sm">
      <Card className="p-3 shadow-xs bg-white dark:bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Debounce Hook</span>
          </div>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            500ms
          </Badge>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-xs h-8"
          />

          <div className="space-y-1">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Input: <span className="text-slate-700 dark:text-slate-200">{inputValue || 'Empty'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Debounced: <span className="text-slate-700 dark:text-slate-200">{debouncedValue || 'Empty'}</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Updates after 500ms delay
          </div>
        </div>
      </Card>
    </div>
  )
}

function UseClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <Card className="p-3 shadow-xs bg-white dark:bg-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Code className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Click Outside</span>
          </div>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            {isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            className="w-full text-xs h-7"
          >
            {isOpen ? 'Close' : 'Open'} Modal
          </Button>

          {isOpen && (
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 rounded-md"></div>
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-3 shadow-xs">
                <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Click outside to close
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  size="sm"
                  variant="outline"
                  className="text-xs h-6"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Detects outside clicks
          </div>
        </div>
      </Card>
    </div>
  )
}

const HooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = hooksData
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-50">
          React Hooks
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Powerful custom React hooks for state management, side effects, and utility functions
          that enhance your development workflow with reusable logic.
        </p>
      </div>

      <div className="mb-10 md:mb-12 flex justify-center">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Search hooks (e.g., 'useLocation', 'useToggle')"
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

      {filteredCategories.length > 0 ? (
        <>
          {filteredCategories.map((category) => (
            <div key={category.category} className="mb-12 md:mb-16">
              <div className="flex items-center mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{category.category}</h2>
                <div className="ml-4 h-px bg-slate-200 dark:bg-slate-700/50 grow"></div>
                <Badge variant="outline" className="ml-3 px-2.5 py-1 text-sm border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800">{category.items.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.items.map((item) => (
                  <HookCard key={item.name} {...item} />
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
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No hooks found matching your search.</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">Try a different search term or explore all hooks.</p>
        </div>
      )}
    </div>
  )
}

export default HooksPage