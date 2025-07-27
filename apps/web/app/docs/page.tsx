'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Component,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: 'Getting Started',
      href: '/docs/getting-started',
      description: 'Installation guide and basic setup for RigidUI components',
      icon: BookOpen,
      color: 'from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Components',
      href: '/docs/components',
      description: 'Production-ready UI components with live examples and documentation',
      icon: Component,
      color: 'from-purple-500/10 to-violet-500/10',
      borderColor: 'border-purple-200 dark:border-purple-800/50',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Hooks',
      href: '/docs/hooks',
      description: 'Custom React hooks for enhanced functionality and state management',
      icon: Zap,
      color: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-200 dark:border-amber-800/50',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
  ]

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen">
      <div className="mb-12 md:mb-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-linear-to-r from-primary/15 to-purple-500/15 px-4 py-2 rounded-full border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4" />
          Documentation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-50">
          RigidUI Documentation
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          A comprehensive guide to using RigidUI components and utilities for building
          beautiful, accessible, and modern user interfaces with uncompromising quality.
        </p>
      </div>

      <div className="mb-10 md:mb-12 flex justify-center">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-12"
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

      <div className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Documentation</h2>
          <div className="ml-4 h-px bg-slate-200 dark:bg-slate-700/50 grow"></div>
          <Badge variant="outline" className="ml-3 px-2.5 py-1 text-sm border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800">
            {filteredCategories.length} sections
          </Badge>
        </div>

        <div className="flex flex-wrap gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link href={category.href} key={category.name} className="group w-full">
                <div className={`bg-linear-to-br ${category.color} ${category.borderColor} border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30 h-full`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.iconBg} shrink-0`}>
                      <Icon className={`h-6 w-6 ${category.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>


      <div className="bg-linear-to-br from-muted/30 via-background to-primary/5 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Ready to start building?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Jump into our getting started guide or explore components directly
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Get Started
          </Link>
          <Link
            href="/docs/components"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Component className="w-4 h-4" />
            View Components
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Docs