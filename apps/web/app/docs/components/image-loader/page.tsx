"use client"
import React from 'react'
import { ImageLoader } from '@/registry/new-york/image-loader/image-loader'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'

export default function ImageLoaderPage() {
  const propsData = [
    {
      name: 'src',
      type: 'string',
      defaultValue: 'undefined',
      description: 'The source URL of the image to load',
      required: true,
    },
    {
      name: 'alt',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Alternative text for the image (required for accessibility)',
      required: true,
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling',
    },
    {
      name: 'blurIntensity',
      type: 'string',
      defaultValue: "'blur(50px)'",
      description: 'CSS blur-sm filter intensity for the loading state',
    },
    {
      name: 'width',
      type: 'number | string',
      defaultValue: '400',
      description: 'Width of the image container in pixels or CSS units',
    },
    {
      name: 'height',
      type: 'number | string',
      defaultValue: '300',
      description: 'Height of the image container in pixels or CSS units',
    },
    {
      name: 'fallbackComponent',
      type: 'React.ReactNode',
      defaultValue: 'undefined',
      description: 'Custom component to display when image fails to load',
    },
    {
      name: 'onLoad',
      type: '() => void',
      defaultValue: 'undefined',
      description: 'Callback function called when image successfully loads',
    },
    {
      name: 'onError',
      type: '(error: Event) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when image fails to load',
    },
    {
      name: 'loading',
      type: "'lazy' | 'eager'",
      defaultValue: "'lazy'",
      description: 'Native browser loading behavior for the image',
    },
    {
      name: 'objectFit',
      type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'",
      defaultValue: "'cover'",
      description: 'How the image should be resized to fit its container',
    },
    {
      name: 'customColors',
      type: 'ColorCombination[]',
      defaultValue: 'undefined',
      description: 'Custom color combinations for the loading pattern',
    },
    {
      name: 'seed',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Seed value for generating consistent loading patterns',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Beautiful Loading States",
      description: "Dynamic SVG patterns with gradient effects provide visually appealing loading experiences."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Optimized Performance",
      description: "Lazy loading, async decoding, and efficient pattern generation for optimal performance."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Responsive Design",
      description: "Automatically adapts to different screen sizes and container dimensions."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Error Handling",
      description: "Graceful fallback states with customizable error components for failed image loads."
    }
  ]

  const usageCode = `import { ImageLoader } from "@/components/image-loader"

export default function MyComponent() {
  return (
    <ImageLoader
      src="https://example.com/image.jpg"
      alt="Description of the image"
      width={400}
      height={300}
    />
  )
}`

  return (
    <ComponentDocTemplate
      title="Image Loader"
      description="An advanced image loading component with beautiful loading states, error handling, and performance optimizations."
      previewComponent={
        <ImageLoader
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Mountain landscape"
          width={400}
          height={300}
          className="shadow-lg"
        />
      }
      githubPath="registry/new-york/image-loader/image-loader.tsx"
      usageCode={usageCode}
      usageDescription="The Image Loader component provides a seamless image loading experience with animated patterns, smooth transitions, and comprehensive error handling."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/image-loader"
    />
  )
}