"use client"

import { useLocation } from "@/registry/new-york/use-location/use-location"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2, Target } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents

const basicLocationCode = `import { useLocation } from "@/hooks/use-location"
import { Button } from "@/components/ui/button"

export default function BasicLocationExample() {
  const { location, isLoading, error, getCurrentLocation, clearLocation } = useLocation()

  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading ? 'Getting Location...' : 'Get Current Location'}
      </Button>

      {location && (
        <div className="p-3 bg-green-100 rounded">
          <p>📍 {location}</p>
          <Button variant="outline" size="sm" onClick={clearLocation}>
            Clear
          </Button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
    </div>
  )
}`

const coordinatesCode = `import { useLocation } from "@/hooks/use-location"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LocationWithCoordinatesExample() {
  const {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation
  } = useLocation()

  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading ? 'Detecting...' : 'Get Location & Coordinates'}
      </Button>

      {location && coordinates && (
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <p className="font-medium">📍 {location}</p>
              <p className="text-sm text-muted-foreground">
                Lat: {coordinates.latitude.toFixed(6)},
                Lng: {coordinates.longitude.toFixed(6)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-4 text-red-600">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}`

const customCoordinatesCode = `import { useLocation } from "@/hooks/use-location"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CustomCoordinatesExample() {
  const {
    location,
    isLoading,
    error,
    getLocationFromCoordinates
  } = useLocation()
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  const handleGetLocation = () => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (!isNaN(latitude) && !isNaN(longitude)) {
      getLocationFromCoordinates(latitude, longitude)
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="40.7128"
          />
        </div>
        <div>
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="-74.0060"
          />
        </div>
      </div>

      <Button
        onClick={handleGetLocation}
        disabled={isLoading || !lat || !lng}
        className="w-full"
      >
        {isLoading ? 'Getting Location...' : 'Get Location'}
      </Button>

      {location && (
        <div className="p-3 bg-blue-50 rounded">
          <p>📍 {location}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
    </div>
  )
}`

const dashboardCode = `import { useLocation } from "@/hooks/use-location"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LocationDashboardExample() {
  const {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation,
    clearLocation
  } = useLocation()

  const getStatusBadge = () => {
    if (isLoading) return <Badge variant="secondary">🔄 Detecting...</Badge>
    if (error) return <Badge variant="destructive">❌ Error</Badge>
    if (location) return <Badge variant="default">✅ Located</Badge>
    return <Badge variant="outline">📍 Ready</Badge>
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Location Status
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Detecting...' : 'Get Location'}
          </Button>
          {location && (
            <Button variant="outline" onClick={clearLocation}>
              Clear
            </Button>
          )}
        </div>

        {location && (
          <div className="space-y-2 p-3 bg-green-50 rounded">
            <p className="font-medium">📍 {location}</p>
            {coordinates && (
              <p className="text-xs text-gray-600">
                {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Browser geolocation required</p>
          <p>• Uses OpenStreetMap for reverse geocoding</p>
          <p>• High accuracy positioning enabled</p>
        </div>
      </CardContent>
    </Card>
  )
}`

function BasicLocationExample() {
  const { location, isLoading, error, getCurrentLocation, clearLocation } = useLocation()

  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Getting Location...
          </>
        ) : (
          <>
            <MapPin className="h-4 w-4 mr-2" />
            Get Current Location
          </>
        )}
      </Button>

      {location && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <p className="text-green-800 dark:text-green-200">📍 {location}</p>
          <Button variant="outline" size="sm" onClick={clearLocation} className="mt-2">
            Clear
          </Button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

function LocationWithCoordinatesExample() {
  const {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation
  } = useLocation()

  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation} disabled={isLoading}>
        {isLoading ? (
          <>
            <Target className="h-4 w-4 animate-pulse mr-2" />
            Detecting...
          </>
        ) : (
          <>
            <Target className="h-4 w-4 mr-2" />
            Get Location & Coordinates
          </>
        )}
      </Button>

      {location && coordinates && (
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <p className="font-medium">📍 {location}</p>
              <p className="text-sm text-muted-foreground">
                Lat: {coordinates.latitude.toFixed(6)}, Lng: {coordinates.longitude.toFixed(6)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-4 text-red-600">
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CustomCoordinatesExample() {
  const {
    location,
    isLoading,
    error,
    getLocationFromCoordinates
  } = useLocation()
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  const handleGetLocation = () => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (!isNaN(latitude) && !isNaN(longitude)) {
      getLocationFromCoordinates(latitude, longitude)
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="40.7128"
          />
        </div>
        <div>
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="-74.0060"
          />
        </div>
      </div>

      <Button
        onClick={handleGetLocation}
        disabled={isLoading || !lat || !lng}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Getting Location...
          </>
        ) : (
          'Get Location'
        )}
      </Button>

      {location && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-blue-800 dark:text-blue-200">📍 {location}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

function LocationDashboardExample() {
  const {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation,
    clearLocation
  } = useLocation()

  const getStatusBadge = () => {
    if (isLoading) return <Badge variant="secondary">🔄 Detecting...</Badge>
    if (error) return <Badge variant="destructive">❌ Error</Badge>
    if (location) return <Badge variant="default">✅ Located</Badge>
    return <Badge variant="outline">📍 Ready</Badge>
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Location Status
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Detecting...' : 'Get Location'}
          </Button>
          {location && (
            <Button variant="outline" onClick={clearLocation}>
              Clear
            </Button>
          )}
        </div>

        {location && (
          <div className="space-y-2 p-3 bg-green-50 rounded">
            <p className="font-medium">📍 {location}</p>
            {coordinates && (
              <p className="text-xs text-gray-600">
                {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Browser geolocation required</p>
          <p>• Uses OpenStreetMap for reverse geocoding</p>
          <p>• High accuracy positioning enabled</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function UseLocationAdvancedExamples() {
  return (
    <div className="space-y-8">
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Basic Location Detection
          </h3>
          <p className="text-muted-foreground">
            Simple location detection with current location button and status display.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <BasicLocationExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={basicLocationCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Location with Coordinates
          </h3>
          <p className="text-muted-foreground">
            Display both location name and precise coordinates for better context.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationWithCoordinatesExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={coordinatesCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Custom Coordinates Input
          </h3>
          <p className="text-muted-foreground">
            Allow users to input specific coordinates to get location information for any place.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <CustomCoordinatesExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={customCoordinatesCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Location Status Dashboard
          </h3>
          <p className="text-muted-foreground">
            Comprehensive dashboard showing all location states and capabilities.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationDashboardExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={dashboardCode} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
