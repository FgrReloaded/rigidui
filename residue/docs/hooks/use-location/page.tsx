"use client"
import React from 'react'
import { useLocation } from '@/registry/new-york/use-location/use-location'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Button } from '@/components/ui/button'
import { MapPin, Loader2 } from 'lucide-react'

function UseLocationDemo() {
  const { location, isLoading, error, getCurrentLocation, clearLocation } = useLocation()

  return (
    <div className="space-y-4 w-fit">
      <div className="flex items-center gap-2">
        <Button onClick={getCurrentLocation} disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" />Getting Location...</>
          ) : (
            <><MapPin className="h-4 w-4 mr-2" />Get Current Location</>
          )}
        </Button>
        {location && (
          <Button variant="outline" onClick={clearLocation} size="sm">
            Clear
          </Button>
        )}
      </div>

      {location && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md max-w-md">
          <p className="text-green-800 dark:text-green-200 text-sm">📍 {location}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md max-w-md">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

export default function UseLocationPage() {
  const propsData = [
    {
      name: 'apiUrl',
      type: 'string',
      defaultValue: "'https://nominatim.openstreetmap.org'",
      description: 'The API endpoint URL for reverse geocoding requests',
    },
    {
      name: 'geolocationOptions',
      type: 'PositionOptions',
      defaultValue: '{ timeout: 10000, enableHighAccuracy: true }',
      description: 'Configuration options for the browser geolocation API',
    },
  ]

  const returnData = [
    {
      name: 'location',
      type: 'string',
      description: 'The current location name (city, county, or state)',
    },
    {
      name: 'coordinates',
      type: 'LocationCoordinates | null',
      description: 'The latitude and longitude coordinates of the current location',
    },
    {
      name: 'isLoading',
      type: 'boolean',
      description: 'Loading state indicator for location operations',
    },
    {
      name: 'error',
      type: 'string | null',
      description: 'Error message if location detection fails',
    },
    {
      name: 'getCurrentLocation',
      type: '() => void',
      description: 'Function to get the user\'s current location using browser geolocation',
    },
    {
      name: 'getLocationFromCoordinates',
      type: '(lat: number, lon: number) => Promise<void>',
      description: 'Function to get location name from specific coordinates',
    },
    {
      name: 'clearLocation',
      type: '() => void',
      description: 'Function to clear the current location and reset state',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Browser Geolocation",
      description: "Leverages the browser's native geolocation API to detect user's current position with high accuracy."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Reverse Geocoding",
      description: "Converts latitude/longitude coordinates into human-readable location names using OpenStreetMap's Nominatim API."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "Configurable Options",
      description: "Customizable API endpoints and geolocation settings including timeout, accuracy, and cache options."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Error Handling",
      description: "Comprehensive error handling for permission denials, timeouts, and network failures with descriptive messages."
    }
  ]

  const usageCode = `import { useLocation } from "@/hooks/use-location"

export default function MyComponent() {
  const { location, isLoading, getCurrentLocation } = useLocation()

  return (
    <div>
      <button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading ? 'Getting Location...' : 'Get Current Location'}
      </button>
      {location && <p>Current location: {location}</p>}
    </div>
  )
}`

  return (
    <ComponentDocTemplate
      title="useLocation"
      description="A React hook for location detection and reverse geocoding that provides easy access to user's current location with browser geolocation API."
      previewComponent={<UseLocationDemo />}
      githubPath="registry/new-york/use-location/use-location.ts"
      usageCode={usageCode}
      usageDescription="The useLocation hook provides a simple interface for getting user location through browser geolocation API and converting coordinates to readable location names. It handles loading states, errors, and provides both automatic and manual location detection."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/use-location"
      additionalSections={
        <>
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <svg className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 id="return-values" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Return Values</h2>
            </div>
            <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              The hook returns an object containing location data and control functions:
            </p>

            <div className="bg-white dark:bg-transparent rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-950">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {returnData.map((item) => (
                      <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors">
                        <td className="md:px-6 px-3 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="md:px-6 px-3 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="md:px-6 px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      }
    />
  )
}