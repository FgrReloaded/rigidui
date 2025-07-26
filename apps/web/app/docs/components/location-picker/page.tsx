"use client"
import React from 'react'
import { LocationPicker } from '@/registry/new-york/location-picker/location-picker'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "../../_components/CodeBlock"
import { advancedUsageExamples } from './_components/AdvancedUsage'

export default function LocationPickerPage() {
  const propsData = [
    {
      name: 'defaultLocation',
      type: 'string',
      defaultValue: "''",
      description: 'The default location to display',
    },
    {
      name: 'autoDetectOnLoad',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to automatically detect location on component load',
    },
    {
      name: 'variant',
      type: "'popover' | 'inline'",
      defaultValue: "'popover'",
      description: 'The display variant of the component',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "'Enter city, district, or area'",
      description: 'Placeholder text for the search input',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the label section (only applies to inline variant)',
    },
    {
      name: 'onChange',
      type: '(location: string) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when location changes',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Location Search",
      description: "Users can search for locations by name, address, or postal code with real-time suggestions."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Dual Variants",
      description: "Choose between popover variant for compact layouts or inline variant for full-featured forms."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      title: "Autocomplete Suggestions",
      description: "As users type, the component provides autocomplete suggestions for locations with debounced search."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Geolocation Support",
      description: "Allows users to quickly use their current location with browser geolocation API."
    }
  ]

  const usageCode = `import { LocationPicker } from "@/components/location-picker"

export default function MyComponent() {
  return (
    <LocationPicker />
  )
}`

  return (
    <ComponentDocTemplate
      title="Location Picker"
      description="A location picker component that allows users to search and select locations."
      previewComponent={<LocationPicker className='w-fit' />}
      githubPath="registry/new-york/location-picker/location-picker.tsx"
      usageCode={usageCode}
      usageDescription="The Location Picker component provides an interface for searching and selecting locations. It supports both popover and inline variants to fit different UI contexts."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/location-picker"
      additionalSections={
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <svg className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
            </svg>
            <h2 id="advanced-usage" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Advanced Usage</h2>
          </div>
          <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Explore different configurations and use cases for the Location Picker component.
          </p>

          <div className="space-y-12">
            {advancedUsageExamples.map((example, index) => (
              <div key={index} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {example.description}
                  </p>
                </div>

                <div className="bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="flex justify-start border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/70">
                      <TabsTrigger
                        value="preview"
                        className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                      >
                        Preview
                      </TabsTrigger>
                      <TabsTrigger
                        value="code"
                        className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                      >
                        Code
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="px-8  flex flex-col justify-start">
                      <div className="mb-4 mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">Live Preview</div>
                      {example.component}
                    </TabsContent>
                    <TabsContent value="code" className="max-h-[500px] overflow-auto">
                      <CodeBlock
                        code={example.code}
                        language='typescript'
                        filename={`${example.title.replace(/\s+/g, '')}.tsx`}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ))}
          </div>
        </section>
      }
    />
  )
}
