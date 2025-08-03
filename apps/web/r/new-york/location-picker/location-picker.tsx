"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { MapPin, LoaderCircle, Search, MapPinned, Locate } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LocationSuggestion = {
  display_name: string;
  place_id: number;
  address: {
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    [key: string]: string | undefined;
  };
}

export interface LocationPickerTheme {
  container?: string;
  input?: string;
  searchButton?: string;
  locateButton?: string;
  suggestionsContainer?: string;
  suggestionItem?: string;
  suggestionIcon?: string;
  suggestionLocation?: string;
  suggestionAddress?: string;
  errorContainer?: string;
  loadingContainer?: string;
  popoverContent?: string;
  popoverTrigger?: string;
}

interface LocationPickerProps {
  className?: string;
  autoDetectOnLoad?: boolean;
  defaultLocation?: string;
  onChange?: (location: string) => void;
  variant?: 'popover' | 'inline';
  placeholder?: string;
  theme?: LocationPickerTheme;
}

export function LocationPicker({
  className,
  autoDetectOnLoad = false,
  defaultLocation = "",
  onChange,
  variant = 'popover',
  placeholder = "Enter city, district, or area",
  theme,
}: LocationPickerProps) {
  const [activeCity, setActiveCity] = useState(defaultLocation)
  const [isLoading, setIsLoading] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = "https://nominatim.openstreetmap.org"

  const defaultTheme: LocationPickerTheme = {
    container: "space-y-4",
    input: "border-border focus:border-primary focus:ring-primary/20 bg-background text-foreground",
    searchButton: "rounded-md h-10 w-10 p-0 bg-primary hover:bg-primary/90 text-primary-foreground",
    locateButton: "rounded-md h-10 w-10 p-0 bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    suggestionsContainer: "w-full bg-background rounded-md border border-border shadow-lg max-h-60 overflow-y-auto",
    suggestionItem: "px-4 py-2 hover:bg-muted cursor-pointer border-b border-border last:border-0 transition-colors",
    suggestionLocation: "text-sm font-medium text-foreground",
    suggestionAddress: "text-xs text-muted-foreground truncate max-w-[250px]",
    suggestionIcon: "text-primary",
    errorContainer: "w-full bg-destructive/10 rounded-md border border-destructive/20 p-3 text-center",
    loadingContainer: "w-full bg-background rounded-md border border-border shadow-md p-4 text-center",
    popoverContent: "w-80 p-0 shadow-lg dark:bg-background",
    popoverTrigger: "flex items-center gap-2 text-muted-foreground hover:text-foreground border-b border-transparent hover:border-primary cursor-pointer px-3 py-2 transition-colors"
  }

  const appliedTheme = { ...defaultTheme, ...theme }

  const getLocation = async (lat: number, long: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/reverse?lat=${lat}&lon=${long}&format=json`)
      const data = await res.json()
      const city = data.address?.county || data.address?.city || data.address?.state || ''

      if (city) {
        setActiveCity(city)
      }
    } catch (error) {
      console.log("Error fetching location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const searchLocation = async () => {
    if (!locationSearch.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(locationSearch)}&format=json&addressdetails=1`
      )
      const data = await res.json()

      if (data && data.length > 0) {
        const place = data[0]
        const city = place.address?.city || place.address?.county || place.address?.state || ''

        setActiveCity(city)
        setLocationSearch('')
        setSuggestions([])
        setIsPopoverOpen(false)
      } else {
        console.log("No location found")
      }
    } catch (error) {
      console.log("Error searching location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentLocation = useCallback(() => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        getLocation(latitude, longitude)
      },
      (error) => {
        let errorMessage = "Unable to retrieve location"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }
        setError(errorMessage)
        setIsLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsFetchingSuggestions(true);
    try {
      const res = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: LocationSuggestion) => {
    const city = suggestion.address?.city || suggestion.address?.county || suggestion.address?.state || '';
    setActiveCity(city);
    setLocationSearch("");
    setSuggestions([]);
    setIsPopoverOpen(false);
  };

  const formatLocationName = (suggestion: LocationSuggestion) => {
    const mainName = suggestion.address?.city || suggestion.address?.county || suggestion.address?.state || '';
    const region = suggestion.address?.state || suggestion.address?.country || '';

    if (mainName && region && mainName !== region) {
      return `${mainName}, ${region}`;
    }
    return mainName || suggestion.display_name.split(',')[0];
  };


  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(locationSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [locationSearch]);

  useEffect(() => {
    if (!isPopoverOpen) {
      setSuggestions([]);
    }
  }, [isPopoverOpen]);

  useEffect(() => {
    if (autoDetectOnLoad && !activeCity) {
      getCurrentLocation();
    }
  }, [autoDetectOnLoad, activeCity, getCurrentLocation]);

  useEffect(() => {
    if (onChange && activeCity) {
      onChange(activeCity);
    }
  }, [activeCity, onChange]);

  if (variant === 'inline') {
    return (
      <div className={cn(appliedTheme.container, className)}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={placeholder}
                value={activeCity || locationSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocationSearch(value);
                  if (activeCity && value !== activeCity) {
                    setActiveCity('');
                  }
                }}
                onKeyUp={(e) => e.key === 'Enter' && suggestions.length === 0 && searchLocation()}
                aria-label="Search for location"
                aria-describedby={suggestions.length > 0 ? "suggestions-list" : undefined}
                className={appliedTheme.input}
              />
            </div>

            <Button
              className={appliedTheme.searchButton}
              variant="outline"
              onClick={searchLocation}
              disabled={isLoading || !locationSearch.trim()}
              title="Search Location"
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={getCurrentLocation}
              className={appliedTheme.locateButton}
              title="Use Current Location"
            >
              <Locate className="h-4 w-4" />
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div
              id="suggestions-list"
              role="listbox"
              aria-label="Location suggestions"
              className={appliedTheme.suggestionsContainer}
            >
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                  className={appliedTheme.suggestionItem}
                  onClick={() => selectSuggestion(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectSuggestion(suggestion)
                    }
                  }}
                >
                  <div className="flex items-start">
                    <MapPinned size={16} className={cn("mt-0.5 mr-2 shrink-0", appliedTheme.suggestionIcon)} />
                    <div>
                      <p className={appliedTheme.suggestionLocation}>
                        {formatLocationName(suggestion)}
                      </p>
                      <p className={appliedTheme.suggestionAddress}>
                        {suggestion.display_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isFetchingSuggestions && locationSearch.length >= 2 && suggestions.length === 0 && (
            <div className={appliedTheme.loadingContainer}>
              <LoaderCircle size={20} className={cn("animate-spin mx-auto", appliedTheme.suggestionIcon)} />
              <p className="text-sm text-muted-foreground mt-1">Searching locations...</p>
            </div>
          )}

          {locationSearch.length >= 2 && !isFetchingSuggestions && suggestions.length === 0 && (
            <div className={appliedTheme.loadingContainer}>
              <p className="text-sm text-muted-foreground">No locations found for &quot;{locationSearch}&quot;</p>
            </div>
          )}

          {error && (
            <div className={appliedTheme.errorContainer}>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className={cn(appliedTheme.popoverTrigger, className)}>
          <MapPin size={16} className={cn("text-primary", appliedTheme.suggestionIcon)} />
          {isLoading ? (
            <div className="flex items-center gap-1">
              <LoaderCircle size={14} className="animate-spin" />
              <span className="text-sm">Locating...</span>
            </div>
          ) : (
            <span className="text-sm font-medium">
              {activeCity.length > 15 ? activeCity.slice(0, 15) + '...' : activeCity || 'Select Location'}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={appliedTheme.popoverContent} side="bottom" align="start" sideOffset={4}>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={placeholder}
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && suggestions.length === 0 && searchLocation()}
                aria-label="Search for location"
                aria-describedby={suggestions.length > 0 ? "suggestions-list" : undefined}
                className={appliedTheme.input}
              />
            </div>

            <Button
              className={appliedTheme.searchButton}
              variant="outline"
              onClick={searchLocation}
              disabled={isLoading || !locationSearch.trim()}
              title="Search Location"
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={getCurrentLocation}
              className={appliedTheme.locateButton}
              title="Use Current Location"
            >
              <Locate className="h-4 w-4" />
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className={cn("z-50 mt-1 mb-4", appliedTheme.suggestionsContainer)}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  className={appliedTheme.suggestionItem}
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <div className="flex items-start">
                    <MapPinned size={16} className={cn("mt-0.5 mr-2 shrink-0", appliedTheme.suggestionIcon)} />
                    <div>
                      <p className={appliedTheme.suggestionLocation}>
                        {formatLocationName(suggestion)}
                      </p>
                      <p className={appliedTheme.suggestionAddress}>
                        {suggestion.display_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isFetchingSuggestions && locationSearch.length >= 2 && suggestions.length === 0 && (
            <div className={cn("z-50 mt-1 mb-4", appliedTheme.loadingContainer)}>
              <LoaderCircle size={20} className={cn("animate-spin mx-auto", appliedTheme.suggestionIcon)} />
              <p className="text-sm text-muted-foreground mt-1">Searching locations...</p>
            </div>
          )}

          {locationSearch.length >= 2 && !isFetchingSuggestions && suggestions.length === 0 && (
            <div className={appliedTheme.loadingContainer}>
              <p className="text-sm text-muted-foreground">No locations found for &quot;{locationSearch}&quot;</p>
            </div>
          )}

          {error && (
            <div className={appliedTheme.errorContainer}>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}