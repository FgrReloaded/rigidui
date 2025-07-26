"use client"

import * as React from "react"
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncer } from '@tanstack/react-pacer'
import { Search, X, Clock, Hash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"

interface SearchFilter {
  key: string
  label: string
  icon?: React.ReactNode
}

interface SmartSearchProps {
  className?: string
  placeholder?: string
  debounceMs?: number
  urlSync?: boolean
  onSearch?: (query: string, filters?: string[]) => void
  searchHistory?: boolean
  suggestions?: string[]
  onSuggestionSelect?: (suggestion: string) => void
  searchFilters?: SearchFilter[]
  onFilterChange?: (filters: string[]) => void
  resultCount?: number
  maxHistoryItems?: number
}

export function SmartSearch({
  className,
  placeholder = "Search...",
  debounceMs = 300,
  urlSync = true,
  onSearch,
  searchHistory = false,
  suggestions = [],
  onSuggestionSelect,
  searchFilters = [],
  onFilterChange,
  resultCount,
  maxHistoryItems = 10
}: SmartSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistoryList, setSearchHistoryList] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'success' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isInternalUpdate = useRef(false)

  const searchDebouncer = useDebouncer(
    (searchQuery: string, filters: string[] = []) => {
      setSearchState('searching')
      onSearch?.(searchQuery, filters)
      saveToHistory(searchQuery)
      setTimeout(() => setSearchState('success'), 200)
    },
    {
      wait: debounceMs
    }
  )

  const isLoading = searchDebouncer.getIsPending()

  useEffect(() => {
    if (searchHistory) {
      const history = JSON.parse(localStorage.getItem('smart-search-history') || '[]')
      setSearchHistoryList(history)
    }
  }, [searchHistory])

  const parseSearchQuery = (query: string) => {
    const filters: string[] = []
    let cleanQuery = query

    const filterRegex = /(\w+):(\w+)/g
    let match
    while ((match = filterRegex.exec(query)) !== null) {
      filters.push(`${match[1]}:${match[2]}`)
      cleanQuery = cleanQuery.replace(match[0], '').trim()
    }

    return { filters, cleanQuery }
  }

  const saveToHistory = (searchQuery: string) => {
    if (searchHistory && searchQuery.trim()) {
      const history = JSON.parse(localStorage.getItem('smart-search-history') || '[]')
      const newHistory = [
        searchQuery,
        ...history.filter((item: string) => item !== searchQuery)
      ].slice(0, maxHistoryItems)
      localStorage.setItem('smart-search-history', JSON.stringify(newHistory))
      setSearchHistoryList(newHistory)
    }
  }

  const clearHistory = () => {
    localStorage.removeItem('smart-search-history')
    setSearchHistoryList([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const filteredSuggestions = suggestions.filter(s =>
      s.toLowerCase().includes(query.toLowerCase())
    )
    const filteredHistory = searchHistoryList.filter(h =>
      h.toLowerCase().includes(query.toLowerCase()) && h !== query
    )
    const allItems = [...filteredSuggestions, ...filteredHistory]

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % allItems.length)
        setShowSuggestions(true)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev <= 0 ? allItems.length - 1 : prev - 1)
        setShowSuggestions(true)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          const selectedItem = allItems[selectedIndex]
          handleSearch(selectedItem)
          onSuggestionSelect?.(selectedItem)
        } else if (query.trim()) {
          const { filters, cleanQuery } = parseSearchQuery(query)
          searchDebouncer.maybeExecute(cleanQuery, [...activeFilters, ...filters])
        }
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    isInternalUpdate.current = true
    setQuery(value)
    setSearchState('idle')

    if (value.trim()) {
      const { filters, cleanQuery } = parseSearchQuery(value)
      const combinedFilters = [...activeFilters, ...filters]
      searchDebouncer.maybeExecute(cleanQuery, combinedFilters)
      onFilterChange?.(combinedFilters)
    } else {
      searchDebouncer.cancel()
      onSearch?.(value, activeFilters)
      setSearchState('idle')
    }

    if (urlSync) {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false })
    }
    setTimeout(() => {
      isInternalUpdate.current = false
    }, 0)
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    setSearchState('idle')

    if (value.trim()) {
      const { filters, cleanQuery } = parseSearchQuery(value)
      const combinedFilters = [...activeFilters, ...filters]
      searchDebouncer.maybeExecute(cleanQuery, combinedFilters)
      onFilterChange?.(combinedFilters)
    } else {
      searchDebouncer.cancel()
      onSearch?.(value, activeFilters)
      setSearchState('idle')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
    onSuggestionSelect?.(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const toggleFilter = (filterKey: string) => {
    const newFilters = activeFilters.includes(filterKey)
      ? activeFilters.filter(f => f !== filterKey)
      : [...activeFilters, filterKey]

    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)

    if (query.trim()) {
      searchDebouncer.maybeExecute(query, newFilters)
    }
  }

  const clearQuery = () => {
    setQuery('')
    setShowSuggestions(false)
    setSelectedIndex(-1)
    setSearchState('idle')
    onSearch?.('', activeFilters)

    if (urlSync) {
      const params = new URLSearchParams(searchParams)
      params.delete('q')
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false })
    }

    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [])

  useEffect(() => {
    if (urlSync) {
      const urlQuery = searchParams.get('q') || ''
      if (urlQuery && !query) {
        setQuery(urlQuery)
        const { filters, cleanQuery } = parseSearchQuery(urlQuery)
        searchDebouncer.maybeExecute(cleanQuery, [...activeFilters, ...filters])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(query.toLowerCase()) && s !== query
  )
  const filteredHistory = searchHistoryList.filter(h =>
    h.toLowerCase().includes(query.toLowerCase()) && h !== query
  )

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {searchFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {searchFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => toggleFilter(filter.key)}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border transition-colors",
                activeFilters.includes(filter.key)
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.icon && <span className="w-3 h-3">{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={cn(
            "h-5 w-5 transition-colors duration-200",
            searchState === 'searching' && "text-primary",
            searchState === 'success' && "text-green-500",
            searchState === 'error' && "text-destructive",
            searchState === 'idle' && "text-muted-foreground group-focus-within:text-foreground"
          )} />
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 transition-all duration-200"
        />

        {query && (
          <button
            onClick={clearQuery}
            className="absolute inset-y-0 right-8 flex items-center pr-1"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}

        {isLoading && query.trim() && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary/30 border-t-primary"></div>
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
            </div>
          </div>
        )}

        {query.trim() && !isLoading && resultCount !== undefined && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow-lg">
            {resultCount}
          </div>
        )}
      </div>

      {showSuggestions && (filteredSuggestions.length > 0 || filteredHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 max-h-64 overflow-y-auto">
          {filteredSuggestions.length > 0 && (
            <div className="p-1">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
                    selectedIndex === index && "bg-accent text-accent-foreground"
                  )}
                >
                  <Hash className="h-3 w-3 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {filteredHistory.length > 0 && (
            <div className="p-1">
              {filteredSuggestions.length > 0 && (
                <div className="-mx-1 my-1 h-px bg-muted" />
              )}
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Recent Searches</span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              </div>
              {filteredHistory.map((historyItem, index) => (
                <button
                  key={`history-${index}`}
                  onClick={() => handleSuggestionClick(historyItem)}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
                    selectedIndex === filteredSuggestions.length + index && "bg-accent text-accent-foreground"
                  )}
                >
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  {historyItem}
                </button>
              ))}
            </div>
          )}

          <div className="-mx-1 my-1 h-px bg-muted" />
          <div className="px-2 py-1.5 bg-muted/50 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>↑↓ Navigate • ⏎ Select • ⎋ Close</span>
              <span>Ctrl+/ Focus</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}