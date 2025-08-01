"use client"

import React from 'react'
import { FileUploader } from '@/registry/new-york/file-uploader/file-uploader'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "../../_components/CodeBlock"
import { advancedUsageExamples } from './_components/AdvancedUsage'

export default function FileUploaderPage() {
  const propsData = [
    {
      name: 'onFilesReady',
      type: '(files: File[]) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when files are ready or changed',
    },
    {
      name: 'maxFiles',
      type: 'number',
      defaultValue: '10',
      description: 'Maximum number of files that can be uploaded',
    },
    {
      name: 'maxSize',
      type: 'number',
      defaultValue: '10 * 1024 * 1024 (10MB)',
      description: 'Maximum file size in bytes',
    },
    {
      name: 'accept',
      type: 'string[]',
      defaultValue: "['image/*', 'application/pdf', 'text/*']",
      description: 'Array of accepted file types (e.g., ["image/*", "application/pdf"])',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "undefined",
      description: 'Additional class names for styling',
    },
    {
      name: 'enableCropping',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Enable image cropping functionality for uploaded images',
    },
    {
      name: 'cropAspectRatio',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Fixed aspect ratio for cropping (e.g., 16/9, 1, 4/3). If undefined, free cropping is allowed',
    },
    {
      name: 'cropMinWidth',
      type: 'number',
      defaultValue: '50',
      description: 'Minimum width for the crop area in pixels',
    },
    {
      name: 'cropMinHeight',
      type: 'number',
      defaultValue: '50',
      description: 'Minimum height for the crop area in pixels',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Drag & Drop Support",
      description: "Users can drag and drop files directly onto the upload area for seamless file selection."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "File Validation",
      description: "Automatically validates file types, sizes, and counts with customizable restrictions."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Upload Progress",
      description: "Real-time progress indicators show upload status with visual feedback for each file."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Image Previews",
      description: "Automatically generates preview thumbnails for uploaded image files."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
      title: "Image Cropping",
      description: "Built-in image cropping functionality with customizable aspect ratios and minimum dimensions."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Multiple Files",
      description: "Support for uploading multiple files simultaneously with individual progress tracking."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "File Management",
      description: "Easy file removal with automatic cleanup of preview URLs."
    }
  ]

  const usageCode = `import { FileUploader } from "@/components/file-uploader"

export default function MyComponent() {
  const handleFilesReady = (files) => {
    console.log('Files ready:', files)
    // Handle the uploaded files

    // Example: Create FormData to send to server
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(\`file-\${index}\`, file)
    })

    // Send to server
    // fetch('/api/upload', { method: 'POST', body: formData })
  }

  return (
    <FileUploader
      maxFiles={5}
      maxSize={1024 * 1024 * 5} // 5MB
      accept={['image/*', 'application/pdf']}
      onFilesReady={handleFilesReady}
      className="w-full max-w-lg"
      // Optional: Enable image cropping
      enableCropping={true}
      cropAspectRatio={16/9} // Fixed aspect ratio (optional)
      cropMinWidth={100}
      cropMinHeight={56}
    />
  )
}`

  const additionalSections = (
    <>
      <section className="space-y-8">
        <div className="flex items-center space-x-3">
          <svg className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h2 id="advanced-usage" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Usage
          </h2>
        </div>
        <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          Explore different configurations and use cases for the File Uploader component.
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

              <div className="bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
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
    </>
  )

  return (
    <ComponentDocTemplate
      title="File Uploader"
      description="A comprehensive file upload component with drag & drop support, progress tracking, file validation, and image cropping functionality."
      previewComponent={
        <div className="w-full max-w-xl mx-auto">
          <FileUploader
            maxFiles={3}
            accept={['image/*', 'application/pdf']}
            maxSize={1024 * 1024 * 5}
            enableCropping={true}
            className="w-full"
          />
        </div>
      }
      githubPath="registry/new-york/file-uploader/file-uploader.tsx"
      usageCode={usageCode}
      usageDescription="The File Uploader component provides a complete file upload interface with drag & drop, progress tracking, validation, and optional image cropping. It handles file selection, validation, preview generation, and allows users to crop images before upload. Note: The cropping functionality requires the react-image-crop dependency which is included automatically."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/file-uploader"
      additionalSections={additionalSections}
    />
  )
}