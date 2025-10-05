"use client"

import * as React from "react"
import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { cn } from "@/lib/utils"

const defaultColorCombinations = [
  { start: 'hsl(220, 15%, 8%)', middle: 'hsl(200, 12%, 18%)', end: 'hsl(240, 10%, 12%)' },
  { start: 'hsl(35, 25%, 15%)', middle: 'hsl(30, 20%, 25%)', end: 'hsl(25, 15%, 10%)' },
  { start: 'hsl(210, 20%, 12%)', middle: 'hsl(200, 15%, 22%)', end: 'hsl(215, 18%, 8%)' },
  { start: 'hsl(150, 30%, 8%)', middle: 'hsl(140, 25%, 15%)', end: 'hsl(160, 20%, 6%)' },
  { start: 'hsl(230, 35%, 6%)', middle: 'hsl(220, 30%, 12%)', end: 'hsl(240, 25%, 4%)' },
  { start: 'hsl(20, 40%, 12%)', middle: 'hsl(15, 35%, 18%)', end: 'hsl(10, 30%, 8%)' },
  { start: 'hsl(280, 25%, 10%)', middle: 'hsl(270, 20%, 16%)', end: 'hsl(290, 15%, 6%)' },
  { start: 'hsl(0, 0%, 8%)', middle: 'hsl(0, 0%, 18%)', end: 'hsl(0, 0%, 4%)' },
]

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

const SVGPattern = React.memo(({
  colors,
  uniqueId,
  randomSeed
}: {
  colors: ColorCombination;
  uniqueId: string;
  randomSeed: number;
}) => {
  const gradientId = `ffflux-gradient-${uniqueId}`;
  const filterId = `ffflux-filter-${uniqueId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Loading pattern"
    >
      <defs>
        <linearGradient
          gradientTransform="rotate(150, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id={gradientId}
        >
          <stop stopColor={colors.start} stopOpacity="1" offset="0%" />
          {colors.middle && (
            <stop stopColor={colors.middle} stopOpacity="1" offset="50%" />
          )}
          <stop stopColor={colors.end} stopOpacity="1" offset="100%" />
        </linearGradient>
        <filter
          id={filterId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005 0.003"
            numOctaves={2}
            seed={randomSeed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          />
          <feGaussianBlur
            stdDeviation="20 0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            edgeMode="duplicate"
            result="blur"
          />
          <feBlend
            mode="color-dodge"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            in2="blur"
            result="blend"
          />
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${gradientId})`}
        filter={`url(#${filterId})`}
      />
    </svg>
  );
})

SVGPattern.displayName = "SVGPattern";

interface ColorCombination {
  start: string;
  middle?: string;
  end: string;
}

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  blurIntensity?: string;
  width?: number | string;
  height?: number | string;
  fallbackComponent?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  customColors?: ColorCombination[];
  seed?: number;
}

export function ImageLoader({
  src,
  alt,
  className,
  blurIntensity = "blur(50px)",
  width = 400,
  height = 300,
  fallbackComponent,
  onLoad,
  onError,
  loading = "lazy",
  objectFit = "cover",
  customColors,
  seed
}: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  if (!src) {
    console.warn('ImageLoader: src prop is required')
  }
  if (!alt) {
    console.warn('ImageLoader: alt prop is required for accessibility')
  }

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [src])

  const patternData = useMemo(() => {
    const colorCombinations = customColors && customColors.length > 0 ? customColors : defaultColorCombinations

    const seedValue = seed !== undefined ? seed : hashString(src || 'default')
    const colorIndex = seedValue % colorCombinations.length
    const selectedColors = colorCombinations[colorIndex]

    const randomSeed = seedValue % 1000
    const uniqueId = `${hashString(src || 'default')}-${seedValue}`.slice(0, 9)

    return {
      colors: selectedColors,
      uniqueId,
      randomSeed
    }
  }, [customColors, seed, src])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    setIsLoaded(true)
    onError?.(event.nativeEvent)
  }, [onError])

  const handleImageRef = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true)
    }
  }, [])

  const containerStyle = useMemo(() => ({
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }), [width, height])

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={containerStyle}
      role="img"
      aria-label={alt}
    >
      {!hasError && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isLoaded ? 'opacity-0' : 'opacity-100'
          )}
          style={{ filter: blurIntensity }}
          aria-hidden="true"
        >
          <SVGPattern
            colors={patternData.colors}
            uniqueId={patternData.uniqueId}
            randomSeed={patternData.randomSeed}
          />
        </div>
      )}

      {!hasError && (
        <img
          ref={(img) => {
            if (imgRef.current) imgRef.current = img;
            handleImageRef(img);
          }}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-500",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ objectFit }}
          loading={loading}
          decoding="async"
        />
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          {fallbackComponent ? (
            fallbackComponent
          ) : (
            <div className="text-center text-muted-foreground">
              <svg
                className="mx-auto h-12 w-12 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Failed to load image</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}