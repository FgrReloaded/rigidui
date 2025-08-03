"use client"

import { useState } from "react"
import { FileExplorer } from "@/registry/new-york/file-explorer/file-explorer"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents
const basicProjectData = {
  id: 'basic-project',
  name: 'my-project',
  type: 'folder' as const,
  expanded: true,
  children: [
    {
      id: 'readme',
      name: 'README.md',
      type: 'file' as const,
      language: 'markdown',
      content: `# My Project

A simple project demonstrating the FileExplorer component.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run the development server

## Features

- File system navigation
- Syntax highlighting
- Search functionality
- Copy to clipboard`
    },
    {
      id: 'src-folder',
      name: 'src',
      type: 'folder' as const,
      expanded: true,
      children: [
        {
          id: 'index.js',
          name: 'index.js',
          type: 'file' as const,
          language: 'javascript',
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
        },
        {
          id: 'app.js',
          name: 'App.js',
          type: 'file' as const,
          language: 'javascript',
          content: `function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <p>Edit src/App.js and save to reload.</p>
      </header>
    </div>
  );
}

export default App;`
        }
      ]
    },
    {
      id: 'package.json',
      name: 'package.json',
      type: 'file' as const,
      language: 'json',
      content: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`
    }
  ]
}

const mediaProjectData = {
  id: 'media-project',
  name: 'media-gallery',
  type: 'folder' as const,
  expanded: true,
  children: [
    {
      id: 'images',
      name: 'images',
      type: 'folder' as const,
      expanded: true,
      children: [
        {
          id: 'hero.jpg',
          name: 'hero.jpg',
          type: 'file' as const,
          isImage: true,
          imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop',
          content: 'Binary image data'
        },
        {
          id: 'thumbnail.png',
          name: 'thumbnail.png',
          type: 'file' as const,
          isImage: true,
          imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
          content: 'Binary image data'
        }
      ]
    },
    {
      id: 'videos',
      name: 'videos',
      type: 'folder' as const,
      children: [
        {
          id: 'demo.mp4',
          name: 'demo.mp4',
          type: 'file' as const,
          content: 'Binary video data'
        }
      ]
    },
    {
      id: 'config.yaml',
      name: 'config.yaml',
      type: 'file' as const,
      language: 'yaml',
      content: `gallery:
  title: "My Media Gallery"
  description: "A collection of images and videos"
  thumbnail_size: 200

media:
  allowed_formats:
    - jpg
    - png
    - mp4
    - webm
  max_file_size: 10MB

settings:
  auto_generate_thumbnails: true
  lazy_loading: true`
    }
  ]
}

const fullStackProjectData = {
  id: 'fullstack-app',
  name: 'fullstack-app',
  type: 'folder' as const,
  expanded: true,
  children: [
    {
      id: 'frontend',
      name: 'frontend',
      type: 'folder' as const,
      expanded: true,
      children: [
        {
          id: 'src-frontend',
          name: 'src',
          type: 'folder' as const,
          children: [
            {
              id: 'App.tsx',
              name: 'App.tsx',
              type: 'file' as const,
              language: 'tsx',
              content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;`
            }
          ]
        },
        {
          id: 'package-frontend.json',
          name: 'package.json',
          type: 'file' as const,
          language: 'json',
          content: `{
  "name": "frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.0.0"
  }
}`
        }
      ]
    },
    {
      id: 'backend',
      name: 'backend',
      type: 'folder' as const,
      children: [
        {
          id: 'server.js',
          name: 'server.js',
          type: 'file' as const,
          language: 'javascript',
          content: `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
        },
        {
          id: 'package-backend.json',
          name: 'package.json',
          type: 'file' as const,
          language: 'json',
          content: `{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  }
}`
        }
      ]
    },
    {
      id: 'docker-compose.yml',
      name: 'docker-compose.yml',
      type: 'file' as const,
      language: 'yaml',
      content: `version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production

  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"`
    }
  ]
}

const basicProjectCode = `import { FileExplorer } from "@/components/ui/file-explorer"

const projectData = {
  id: 'my-project',
  name: 'my-project',
  type: 'folder',
  expanded: true,
  children: [
    {
      id: 'readme',
      name: 'README.md',
      type: 'file',
      language: 'markdown',
      content: '# My Project\\n\\nA simple project...'
    }
  ]
}

export default function BasicExample() {
  return (
    <FileExplorer
      initialData={projectData}
      title="My Project"
      height="400px"
    />
  )
}`

const mediaProjectCode = `import { FileExplorer } from "@/components/ui/file-explorer"

const mediaData = {
  id: 'media-gallery',
  name: 'media-gallery',
  type: 'folder',
  expanded: true,
  children: [
    {
      id: 'hero.jpg',
      name: 'hero.jpg',
      type: 'file',
      isImage: true,
      imageUrl: 'https://example.com/hero.jpg',
      content: 'Binary image data'
    }
  ]
}

export default function MediaExample() {
  return (
    <FileExplorer
      initialData={mediaData}
      title="Media Gallery"
      height="500px"
    />
  )
}`

const fullStackProjectCode = `import { FileExplorer } from "@/components/ui/file-explorer"

const fullStackData = {
  id: 'fullstack-app',
  name: 'fullstack-app',
  type: 'folder',
  expanded: true,
  children: [
    {
      id: 'frontend',
      name: 'frontend',
      type: 'folder',
      children: []
    },
    {
      id: 'backend',
      name: 'backend',
      type: 'folder',
      children: []
    }
  ]
}

export default function FullStackExample() {
  return (
    <FileExplorer
      initialData={fullStackData}
      title="Full-Stack Application"
      height="600px"
    />
  )
}`

const interactiveCode = `import { FileExplorer } from "@/components/ui/file-explorer"
import { useState } from "react"

export default function InteractiveExample() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState(null)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    console.log('File selected:', file.name)
  }

  const handleFolderToggle = (folderId, isExpanded) => {
    setSelectedFolder({ id: folderId, expanded: isExpanded })
    console.log('Folder toggled:', folderId, isExpanded)
  }

  return (
    <div className="space-y-4">
      <FileExplorer
        initialData={projectData}
        onFileSelect={handleFileSelect}
        onFolderToggle={handleFolderToggle}
        height="400px"
      />
      {selectedFile && (
        <div className="p-4 bg-muted rounded">
          <p>Selected: {selectedFile.name}</p>
        </div>
      )}
    </div>
  )
}`

const loadingStateCode = `import { FileExplorer } from "@/components/ui/file-explorer"
import { useState } from "react"

export default function LoadingExample() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initialData)

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setData(await fetchUpdatedData())
    setLoading(false)
  }

  return (
    <FileExplorer
      initialData={data}
      loading={loading}
      onRefresh={handleRefresh}
      title="Dynamic File System"
      height="400px"
    />
  )
}`

function LoadingStateExample() {
  const [loading, setLoading] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshCount(prev => prev + 1)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <FileExplorer
        initialData={basicProjectData}
        loading={loading}
        onRefresh={handleRefresh}
        title="Dynamic File System"
        height="400px"
        className="w-full"
      />
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          Refreshed {refreshCount} times
        </Badge>
        <p className="text-sm text-muted-foreground">
          Click the refresh button to simulate loading states
        </p>
      </div>
    </div>
  )
}

export function FileExplorerAdvancedExamples() {
  return (
    <div className="space-y-8">
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Basic Project Structure
          </h3>
          <p className="text-muted-foreground">
            A simple React project with source files, package.json, and README. Perfect for showcasing small projects or tutorials.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FileExplorer
                initialData={basicProjectData}
                title="Basic Project"
                height="400px"
                className="w-full max-w-2xl"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={basicProjectCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Media Files with Image Preview
          </h3>
          <p className="text-muted-foreground">
            Showcase a media gallery project with image preview capabilities. Images are displayed inline when selected.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FileExplorer
                initialData={mediaProjectData}
                title="Media Gallery"
                height="500px"
                className="w-full max-w-2xl"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={mediaProjectCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Full-Stack Project Structure
          </h3>
          <p className="text-muted-foreground">
            Complex project structure with frontend, backend, and configuration files. Demonstrates nested folders and different file types.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FileExplorer
                initialData={fullStackProjectData}
                title="Full-Stack Application"
                height="600px"
                className="w-full max-w-2xl"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={fullStackProjectCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Interactive File Selection
          </h3>
          <p className="text-muted-foreground">
            Handle file selection events with callbacks to integrate with your application state and perform actions when files are selected.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <div className="space-y-4 w-full max-w-2xl">
                <FileExplorer
                  initialData={basicProjectData}
                  onFileSelect={(file) => console.log('File selected:', file.name)}
                  onFolderToggle={(id, expanded) => console.log('Folder toggled:', id, expanded)}
                  height="400px"
                  className="w-full"
                />
                <div className="p-3 bg-muted rounded text-sm">
                  <p className="font-medium mb-1">Interactive Features:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Click files to select them (check console)</li>
                    <li>• Expand/collapse folders</li>
                    <li>• Use keyboard navigation (Tab, Enter, Space)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={interactiveCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Loading States & Refresh
          </h3>
          <p className="text-muted-foreground">
            Demonstrate loading states and refresh functionality for dynamic file systems that load data asynchronously.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LoadingStateExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={loadingStateCode} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
