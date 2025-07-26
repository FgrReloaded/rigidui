"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useRouter } from 'next/navigation'
import { DialogTitle } from '@/components/ui/dialog'
import { navigationItems } from '@/lib/constants'

interface SearchItem {
  title: string
  href: string
  category: string
}

const DocsSearch = ({ collapsed }: { collapsed?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    }
  }, [])

  const flattenedItems: SearchItem[] = navigationItems.flatMap(item => {
    const parentItems = item.items
      ? item.items.map(subItem => ({
        title: subItem.title,
        href: subItem.href,
        category: item.title
      }))
      : [];

    return [
      { title: item.title, href: item.href, category: 'Main' },
      ...parentItems
    ];
  });

  const filteredItems = searchTerm.length > 0
    ? flattenedItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : flattenedItems;

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  }


  return (
    <>
      {collapsed ? (
        <button
          onClick={() => setOpen(true)}
          className="p-2 flex mx-auto rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors mb-4"
          aria-label="Search documentation"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center text-left p-2 text-sm text-primary dark:text-primary/90 bg-background/80 backdrop-blur-sm border border-primary/20 dark:border-primary/30 rounded-lg shadow-sm hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 mb-4 group"
        >
          <Search className="w-5 h-5 mr-3 text-primary/70 group-hover:text-primary transition-colors" />
          <p className="flex-grow font-medium">Search docs</p>
          <kbd
            className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 px-2 font-mono text-xs font-medium text-primary/70"
          >
            <span className="text-sm">⌘</span>K
          </kbd>
        </button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">
          Documentation Search
        </DialogTitle>
        <CommandInput
          placeholder="Search documentation..."
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          <CommandEmpty>
            No results found
          </CommandEmpty>
          {Array.from(new Set(filteredItems.map(item => item.category))).map(category => (
            <CommandGroup key={category} heading={category}>
              {filteredItems
                .filter(item => item.category === category)
                .map(item => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    <span>{item.title}</span>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default DocsSearch;