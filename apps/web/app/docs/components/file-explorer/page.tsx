"use client"
import React from 'react'
import { FileExplorer } from '@/registry/new-york/file-explorer/file-explorer'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "../../_components/CodeBlock"
import { advancedUsageExamples } from './_components/AdvancedUsage'
import { FileCode, FolderClosed, FolderOpen, ImageIcon } from 'lucide-react'

export default function FileExplorerPage() {
  const propsData = [
    {
      name: 'initialData',
      type: 'FolderType',
      defaultValue: 'defaultFileSystemData',
      description: 'The initial file system data structure to display',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for the container',
    },
    {
      name: 'cardClassName',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for the card components',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: "'File Explorer'",
      description: 'Title displayed above the file explorer',
    },
    {
      name: 'showTitle',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the title or not',
    },
    {
      name: 'height',
      type: 'string',
      defaultValue: "'calc(100vh-200px)'",
      description: 'Height of the file explorer component',
    },
    {
      name: 'fileContentHeight',
      type: 'string',
      defaultValue: "'100%'",
      description: 'Height of the file content display area',
    },
    {
      name: 'defaultFileIcon',
      type: 'React.ReactNode',
      defaultValue: '<FileText className="h-4 w-4 text-muted-foreground" />',
      description: 'Default icon to use for all files without a custom icon',
    },
    {
      name: 'defaultFolderIcon',
      type: 'React.ReactNode',
      defaultValue: '<Folder className="h-4 w-4 text-yellow-500" />',
      description: 'Default icon to use for closed folders without a custom icon',
    },
    {
      name: 'defaultFolderOpenIcon',
      type: 'React.ReactNode',
      defaultValue: '<FolderOpen className="h-4 w-4 text-yellow-500" />',
      description: 'Default icon to use for open folders without a custom icon',
    },
    {
      name: 'onFileSelect',
      type: '(file: FileType) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when a file is selected',
    },
    {
      name: 'onFolderToggle',
      type: '(folderId: string, isExpanded: boolean) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when a folder is expanded or collapsed',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the file explorer is in read-only mode',
    },
    {
      name: 'allowedFileTypes',
      type: 'string[]',
      defaultValue: 'undefined',
      description: 'Array of allowed file extensions for filtering',
    },
    {
      name: 'maxFileSize',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Maximum file size in bytes for validation',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the component is in a loading state',
    },
    {
      name: 'onRefresh',
      type: '() => void',
      defaultValue: 'undefined',
      description: 'Callback function for the refresh button',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      title: "Tree Structure",
      description: "Navigate through a hierarchical file system with expandable folders and files."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "File Search",
      description: "Quickly find files by name with an integrated search functionality."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Copy Content",
      description: "Easily copy file contents to clipboard with a single click."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      title: "Syntax Highlighting",
      description: "View file contents with language-specific syntax highlighting for better readability."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Image Preview",
      description: "Preview images directly in the explorer with support for multiple formats."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Accessibility",
      description: "Full keyboard navigation support and screen reader compatibility."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Performance Optimized",
      description: "Memoized components and optimized rendering for large file structures."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      title: "Error Handling",
      description: "Robust error boundaries and graceful fallbacks for better user experience."
    }
  ]

  const bestPractices = [
    {
      type: 'do' as const,
      items: [
        'Provide meaningful file and folder names for better user experience',
        'Use appropriate file icons to help users identify file types quickly',
        'Implement proper error handling for file operations',
        'Optimize performance for large file structures using memoization',
        'Provide loading states for better user feedback',
        'Use proper ARIA labels for accessibility compliance',
        'Test keyboard navigation thoroughly',
        'Implement proper image fallbacks for preview failures',
      ]
    },
    {
      type: 'dont' as const,
      items: [
        'Load extremely large file trees without virtualization',
        'Include sensitive information in file contents for demos',
        'Nest folders too deeply without proper UX considerations',
        'Forget to handle clipboard API failures gracefully',
        'Ignore accessibility requirements for keyboard users',
        'Use the component without proper error boundaries',
        'Implement file operations without proper validation',
        'Forget to provide meaningful feedback for user actions',
      ]
    }
  ]

  const usageCode = `import { FileExplorer } from "@/components/ui/file-explorer"
import { FileCode, FolderClosed, FolderOpen, ImageIcon, FileText } from "lucide-react"

const previewFileSystem = {
  id: 'root',
  name: 'my-project',
  type: 'folder' as const,
  expanded: true,
  icon: <FolderClosed className="h-4 w-4 text-blue-500" />,
  expandedIcon: <FolderOpen className="h-4 w-4 text-blue-500" />,
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder' as const,
      children: [
        {
          id: 'file1',
          name: 'example.ts',
          type: 'file' as const,
          language: 'typescript',
          content: 'console.log("Hello world!");',
          icon: <FileCode className="h-4 w-4 text-green-500" />
        },
        {
          id: 'images',
          name: 'images',
          type: 'folder' as const,
          icon: <FolderClosed className="h-4 w-4 text-purple-500" />,
          expandedIcon: <FolderOpen className="h-4 w-4 text-purple-500" />,
          children: [{
            id: 'logo.png',
            name: 'logo.png',
            type: 'file' as const,
            isImage: true,
            imageUrl: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Logo',
            content: 'Binary image data',
            icon: <ImageIcon className="h-4 w-4 text-orange-500" />
          }]
        }
      ]
    }
  ]
}



export default function MyComponent() {
  const [loading, setLoading] = useState(false)

  const handleFileSelect = (file) => {
    console.log('Selected file:', file.name)
  }

  const handleFolderToggle = (folderId, isExpanded) => {
    console.log(\`Folder \${folderId} is now \${isExpanded ? 'expanded' : 'collapsed'}\`)
  }

  const handleRefresh = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <FileExplorer
      initialData={previewFileSystem}
      height="500px"
      showTitle={false}
      loading={loading}
      onFileSelect={handleFileSelect}
      onFolderToggle={handleFolderToggle}
      onRefresh={handleRefresh}
      // Customize default icons used for files without custom icons
      defaultFileIcon={<FileText className="h-4 w-4 text-gray-500" />}
      defaultFolderIcon={<FolderClosed className="h-4 w-4 text-amber-500" />}
      defaultFolderOpenIcon={<FolderOpen className="h-4 w-4 text-amber-500" />}
    />
  )
}`

  const previewFileSystem = {
    id: 'root',
    name: 'my-project',
    type: 'folder' as const,
    expanded: true,
    icon: <FolderClosed className="h-4 w-4 text-blue-500" />,
    expandedIcon: <FolderOpen className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder' as const,
        children: [
          {
            id: 'file1',
            name: 'example.ts',
            type: 'file' as const,
            language: 'typescript',
            content: 'console.log("Hello world!");',
            icon: <FileCode className="h-4 w-4 text-green-500" />
          },
          {
            id: 'images',
            name: 'images',
            type: 'folder' as const,
            icon: <FolderClosed className="h-4 w-4 text-purple-500" />,
            expandedIcon: <FolderOpen className="h-4 w-4 text-purple-500" />,
            children: [{
              id: 'logo.png',
              name: 'logo.png',
              type: 'file' as const,
              isImage: true,
              imageUrl: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Logo',
              content: 'Binary image data',
              icon: <ImageIcon className="h-4 w-4 text-orange-500" />
            }]
          }
        ]
      }
    ]
  }



  return (
    <ComponentDocTemplate
      title="File Explorer"
      description="A fully-featured, accessible file explorer component with syntax highlighting, image preview, search functionality, and keyboard navigation support. Perfect for showcasing code structures, documentation sites, or any hierarchical data visualization."
      previewComponent={
        <FileExplorer
          initialData={previewFileSystem}
          showTitle={true}
          height="400px"
          className="w-full"
        />
      }
      githubPath="registry/new-york/file-explorer/file-explorer.tsx"
      usageCode={usageCode}
      usageDescription="The File Explorer component provides a comprehensive interface for browsing and viewing hierarchical file system structures with full accessibility support, performance optimizations, and extensive customization options."
      propsData={propsData}
      features={features}
      bestPractices={bestPractices}
      componentName="https://rigidui.com/registry/file-explorer"
      additionalSections={
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
            Explore different configurations and use cases for the File Explorer component with various project structures and interactive features.
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
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        Preview
                      </TabsTrigger>
                      <TabsTrigger
                        value="code"
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        Code
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="px-8 flex flex-col justify-start">
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