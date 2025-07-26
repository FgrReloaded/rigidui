"use client"
import React, { useState } from 'react'
import { SmartSearch } from '@/registry/new-york/smart-search/smart-search'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Tag, Calendar, FileText, Search } from 'lucide-react'

function SmartSearchDemo() {
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [lastQuery, setLastQuery] = useState('')
  const [searchCount, setSearchCount] = useState(0)

  const suggestions = [
    'React Components',
    'TypeScript',
    'Next.js',
    'Tailwind CSS'
  ]

  const searchFilters = [
    { key: 'type', label: 'Type', icon: <Tag className="w-3 h-3" /> },
    { key: 'author', label: 'Author', icon: <User className="w-3 h-3" /> },
    { key: 'date', label: 'Recent', icon: <Calendar className="w-3 h-3" /> },
    { key: 'docs', label: 'Documentation', icon: <FileText className="w-3 h-3" /> }
  ]

  const sampleResults = [
    'Smart Search Component Documentation',
    'React Search Best Practices',
    'TypeScript Search Implementation',
    'Advanced Search Patterns',
    'Search UX Guidelines',
    'Debounced Search Tutorial',
    'Keyboard Navigation Guide',
    'Search History Management',
    'Filter Integration Patterns',
    'Real-time Search Optimization'
  ]

  const handleSearch = (query: string, filters?: string[]) => {
    setLastQuery(query)
    setSearchCount(prev => prev + 1)

    if (query.trim()) {
      const filtered = sampleResults.filter(result =>
        result.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 5))
    } else {
      setSearchResults([])
    }

    console.log('Active filters:', filters)
  }

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    console.log('Selected suggestion:', suggestion)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Interactive Demo
          </CardTitle>
          <CardDescription>
            Try searching, using filters, and exploring all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SmartSearch
            className="w-full"
            placeholder="Search documentation, guides, tutorials..."
            searchHistory={true}
            suggestions={suggestions}
            searchFilters={searchFilters}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSuggestionSelect={handleSuggestionSelect}
            resultCount={searchResults.length}
            debounceMs={300}
            urlSync={true}
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <Search className="w-3 h-3 mr-1" />
              {searchCount} searches
            </Badge>
            {activeFilters.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {activeFilters.length} filter(s) active
              </Badge>
            )}
            {lastQuery && (
              <Badge variant="outline" className="text-xs">
                Last: &ldquo;{lastQuery}&rdquo;
              </Badge>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                Search Results ({searchResults.length})
              </h4>
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/50 rounded-lg text-sm hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
          <CardDescription>
            Smart Search supports full keyboard navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">↑↓</kbd>
              <p className="text-muted-foreground">Navigate suggestions</p>
            </div>
            <div className="space-y-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
              <p className="text-muted-foreground">Select suggestion</p>
            </div>
            <div className="space-y-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
              <p className="text-muted-foreground">Close dropdown</p>
            </div>
            <div className="space-y-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+/</kbd>
              <p className="text-muted-foreground">Focus search</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SmartSearchPage() {
  const propsData = [
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "'Search...'",
      description: 'Placeholder text for the search input',
    },
    {
      name: 'debounceMs',
      type: 'number',
      defaultValue: '300',
      description: 'Debounce delay in milliseconds for search queries',
    },
    {
      name: 'urlSync',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to sync search query with URL parameters',
    },
    {
      name: 'onSearch',
      type: '(query: string, filters?: string[]) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when search query changes',
    },
    {
      name: 'searchHistory',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to enable search history functionality',
    },
    {
      name: 'suggestions',
      type: 'string[]',
      defaultValue: '[]',
      description: 'Array of search suggestions to display',
    },
    {
      name: 'onSuggestionSelect',
      type: '(suggestion: string) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when a suggestion is selected',
    },
    {
      name: 'searchFilters',
      type: 'SearchFilter[]',
      defaultValue: '[]',
      description: 'Array of filter buttons to display above the search input',
    },
    {
      name: 'onFilterChange',
      type: '(filters: string[]) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when search filters change',
    },
    {
      name: 'resultCount',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Number of search results to display as a badge',
    },
    {
      name: 'maxHistoryItems',
      type: 'number',
      defaultValue: '10',
      description: 'Maximum number of history items to store',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Real-time Search",
      description: "Debounced search input with real-time results and visual feedback for search states."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Search History",
      description: "Optional search history with local storage persistence and easy access to recent searches."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
        </svg>
      ),
      title: "Smart Filters",
      description: "Configurable filter chips and advanced query parsing with filter:value syntax support."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Keyboard Navigation",
      description: "Full keyboard support with arrow keys for navigation, Enter to select, and Ctrl+/ to focus."
    }
  ]

  const usageCode = `import { SmartSearch } from "@/components/smart-search"
import { useState } from "react"
import { User, Tag, Calendar } from "lucide-react"

export default function MyComponent() {
  const [searchResults, setSearchResults] = useState([])

  const suggestions = [
    'React Components',
    'TypeScript',
    'Next.js',
    'Tailwind CSS'
  ]

  const searchFilters = [
    { key: 'author', label: 'Author', icon: <User className="w-3 h-3" /> },
    { key: 'tag', label: 'Tag', icon: <Tag className="w-3 h-3" /> },
    { key: 'recent', label: 'Recent', icon: <Calendar className="w-3 h-3" /> }
  ]

  const handleSearch = (query, filters) => {
    // Perform your search logic here
    console.log('Searching for:', query, 'with filters:', filters)
    // Update search results
    setSearchResults(/* your search results */)
  }

  return (
    <SmartSearch
      placeholder="Search documentation..."
      searchHistory={true}
      suggestions={suggestions}
      searchFilters={searchFilters}
      onSearch={handleSearch}
      onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
      resultCount={searchResults.length}
      debounceMs={300}
      urlSync={true}
    />
  )
}`

  return (
    <ComponentDocTemplate
      title="Smart Search"
      description="An intelligent search component with suggestions, history, filters, and keyboard navigation."
      previewComponent={<SmartSearchDemo />}
      githubPath="registry/new-york/smart-search/smart-search.tsx"
      usageCode={usageCode}
      usageDescription="The Smart Search component provides a comprehensive search interface with real-time suggestions, persistent search history, customizable filters, and full keyboard navigation. Perfect for documentation sites, data tables, or any application requiring advanced search functionality."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/smart-search"
    />
  )
}