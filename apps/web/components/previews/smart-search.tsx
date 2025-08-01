"use client"
import React, { useState } from 'react'
import { SmartSearch } from '@/registry/new-york/smart-search/smart-search'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Tag, Calendar, FileText, Search } from 'lucide-react'

export default function SmartSearchPreview() {
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