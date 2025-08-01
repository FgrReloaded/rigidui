"use client";
import React from "react";
import { useLocation } from "@/registry/new-york/use-location/use-location";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Navigation, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UseLocationPreview() {
  const {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation,
    clearLocation
  } = useLocation();

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Location Detector
          </CardTitle>
          <CardDescription>
            Get your current location using browser geolocation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="flex-1"
              variant={location ? "outline" : "default"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Detecting...
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Location
                </>
              )}
            </Button>

            {location && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearLocation}
                className="px-3"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {location && (
            <div className="p-3 border border-gray-300 dark:border-gray-700 rounded flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <span className="block text-gray-900 dark:text-gray-100 font-semibold truncate">
                  {location}
                </span>
                {coordinates && (
                  <span className="block text-xs text-gray-700 dark:text-gray-300 font-mono">
                    {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
                  </span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-red-800 dark:text-red-200 text-sm leading-tight">
                  {error}
                </p>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
