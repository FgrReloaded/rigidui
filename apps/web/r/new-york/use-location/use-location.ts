
"use client"

import { useState, useCallback } from 'react'

export type LocationCoordinates = {
  latitude: number;
  longitude: number;
}

export interface UseLocationOptions {
  apiUrl?: string;
  geolocationOptions?: PositionOptions;
}

export interface UseLocationReturn {
  location: string;
  coordinates: LocationCoordinates | null;
  isLoading: boolean;
  error: string | null;

  getCurrentLocation: () => void;
  getLocationFromCoordinates: (lat: number, lon: number) => Promise<void>;
  clearLocation: () => void;
}

export function useLocation(options: UseLocationOptions = {}): UseLocationReturn {
  const {
    apiUrl = "https://nominatim.openstreetmap.org",
    geolocationOptions = { timeout: 10000, enableHighAccuracy: true },
  } = options;

  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationFromCoordinates = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/reverse?lat=${lat}&lon=${lon}&format=json`);

      if (!response.ok) {
        throw new Error(`Failed to fetch location: ${response.statusText}`);
      }

      const data = await response.json();
      const locationName = data.address?.county || data.address?.city || data.address?.state || data.display_name || '';

      setLocation(locationName);
      setCoordinates({ latitude: lat, longitude: lon });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location from coordinates';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    if (location) return;

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getLocationFromCoordinates(latitude, longitude);
      },
      (err) => {
        let errorMessage = "Unable to retrieve location";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        setError(errorMessage);
        setIsLoading(false);
      },
      geolocationOptions
    );
  }, [geolocationOptions, getLocationFromCoordinates, location]);


  const clearLocation = useCallback(() => {
    setLocation('');
    setCoordinates(null);
    setError(null);
  }, []);

  return {
    location,
    coordinates,
    isLoading,
    error,
    getCurrentLocation,
    getLocationFromCoordinates,
    clearLocation,
  };
}