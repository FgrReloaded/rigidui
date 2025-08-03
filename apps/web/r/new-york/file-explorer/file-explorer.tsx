"use client"

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText, X, Copy, Check, ChevronsUp, Search, Image, AlertTriangle, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { cn } from '@/lib/utils'

type FileType = {
  id: string
  name: string
  type: 'file'
  language?: string
  content: string
  icon?: React.ReactNode
  isImage?: boolean
  imageUrl?: string
}

type FolderType = {
  id: string
  name: string
  type: 'folder'
  children: (FileType | FolderType)[]
  expanded?: boolean
  icon?: React.ReactNode
  expandedIcon?: React.ReactNode
}

type FileSystemItemType = FileType | FolderType

class FileExplorerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6">
          <AlertTriangle className="h-16 w-16 mb-4 text-destructive" />
          <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
          <p className="text-muted-foreground">
            Unable to load file explorer. Please try refreshing the page.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

interface FileExplorerProps {
  initialData?: FolderType
  className?: string
  cardClassName?: string
  title?: string
  showTitle?: boolean
  height?: string
  fileContentHeight?: string
  defaultFileIcon?: React.ReactNode
  defaultFolderIcon?: React.ReactNode
  defaultFolderOpenIcon?: React.ReactNode
  onFileSelect?: (file: FileType) => void
  onFolderToggle?: (folderId: string, isExpanded: boolean) => void
  readOnly?: boolean
  allowedFileTypes?: string[]
  maxFileSize?: number
  loading?: boolean
  onRefresh?: () => void
}

const defaultFileSystemData: FolderType = {
  id: 'root',
  name: 'project-root',
  type: 'folder',
  expanded: true,
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      expanded: true,
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          children: [
            {
              id: 'Button.tsx',
              name: 'Button.tsx',
              type: 'file',
              language: 'tsx',
              content: `import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-solid';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
}) => {
  return (
    <button
      className={\`button \${variant} \${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`
            },
            {
              id: 'Card.tsx',
              name: 'Card.tsx',
              type: 'file',
              language: 'tsx',
              content: `import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};`
            }
          ]
        },
        {
          id: 'pages',
          name: 'pages',
          type: 'folder',
          children: [
            {
              id: 'index.tsx',
              name: 'index.tsx',
              type: 'file',
              language: 'tsx',
              content: `import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to My App</h1>
      <Card title="Getting Started">
        <p>This is a simple example of using our components.</p>
        <Button>Click Me</Button>
      </Card>
    </div>
  );
}`
            }
          ]
        },
        {
          id: 'assets',
          name: 'assets',
          type: 'folder',
          children: [
            {
              id: 'logo.png',
              name: 'logo.png',
              type: 'file',
              isImage: true,
              imageUrl: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Logo',
              content: 'Binary image data'
            },
            {
              id: 'hero.jpg',
              name: 'hero.jpg',
              type: 'file',
              isImage: true,
              imageUrl: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Hero+Image',
              content: 'Binary image data'
            }
          ]
        }
      ]
    }
  ]
}

const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico']
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
}

const getFileIcon = (file: FileType, defaultFileIcon: React.ReactNode): React.ReactNode => {
  if (file.icon) return file.icon
  if (file.isImage || isImageFile(file.name)) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image className="h-4 w-4 text-blue-500" />
  }
  return defaultFileIcon
}

const FileTreeItem = ({
  item,
  level = 0,
  onToggleExpand,
  onSelectFile,
  selectedFileId,
  defaultFileIcon,
  defaultFolderIcon,
  defaultFolderOpenIcon
}: {
  item: FileSystemItemType
  level?: number
  onToggleExpand: (id: string) => void
  onSelectFile: (file: FileType) => void
  selectedFileId: string | null
  defaultFileIcon: React.ReactNode
  defaultFolderIcon: React.ReactNode
  defaultFolderOpenIcon: React.ReactNode
}) => {
  const indent = level * 16

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
    if (e.key === 'ArrowRight' && item.type === 'folder' && !(item as FolderType).expanded) {
      onToggleExpand(item.id)
    }
    if (e.key === 'ArrowLeft' && item.type === 'folder' && (item as FolderType).expanded) {
      onToggleExpand(item.id)
    }
  }, [item, onToggleExpand])

  if (item.type === 'folder') {
    const folderIcon = item.expanded
      ? (item.expandedIcon || defaultFolderOpenIcon)
      : (item.icon || defaultFolderIcon);

    return (
      <>
        <div
          className={cn(
            "flex items-center py-1 mb-1 px-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors",
            { "bg-accent/30": item.expanded }
          )}
          style={{ paddingLeft: `${indent}px` }}
          onClick={() => onToggleExpand(item.id)}
          onKeyDown={(e) => handleKeyDown(e, () => onToggleExpand(item.id))}
          tabIndex={0}
          role="treeitem"
          aria-expanded={item.expanded}
          aria-selected={false}
          aria-label={`${item.name} folder, ${item.expanded ? 'expanded' : 'collapsed'}`}
        >
          {item.expanded ?
            <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" /> :
            <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
          }
          <span className="mr-1">
            {folderIcon}
          </span>
          <span className="text-sm">{item.name}</span>
        </div>

        {item.expanded && item.children.map((child) => (
          <FileTreeItem
            key={child.id}
            item={child}
            level={level + 1}
            onToggleExpand={onToggleExpand}
            onSelectFile={onSelectFile}
            selectedFileId={selectedFileId}
            defaultFileIcon={defaultFileIcon}
            defaultFolderIcon={defaultFolderIcon}
            defaultFolderOpenIcon={defaultFolderOpenIcon}
          />
        ))}
      </>
    )
  } else {
    const fileIcon = getFileIcon(item as FileType, defaultFileIcon);

    return (
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent/50 transition-colors",
          { "bg-primary/10 text-primary": selectedFileId === item.id }
        )}
        style={{ paddingLeft: `${indent + 20}px` }}
        onClick={() => onSelectFile(item as FileType)}
        onKeyDown={(e) => handleKeyDown(e, () => onSelectFile(item as FileType))}
        tabIndex={0}
        role="treeitem"
        aria-label={`${item.name} file`}
        aria-selected={selectedFileId === item.id}
      >
        <span className="mr-2">{fileIcon}</span>
        <span className="text-sm">{item.name}</span>
      </div>
    )
  }
}

export function FileExplorer({
  initialData = defaultFileSystemData,
  className = "",
  cardClassName = "",
  title = "File Explorer",
  showTitle = true,
  height = "calc(100vh-200px)",
  fileContentHeight = "100%",
  defaultFileIcon = <FileText className="h-4 w-4 text-muted-foreground" />,
  defaultFolderIcon = <Folder className="h-4 w-4 text-yellow-500" />,
  defaultFolderOpenIcon = <FolderOpen className="h-4 w-4 text-yellow-500" />,
  onFileSelect,
  onFolderToggle,
  loading = false,
  onRefresh
}: FileExplorerProps) {
  const [fileSystem, setFileSystem] = useState<FolderType>(initialData)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setFileSystem(initialData)
  }, [initialData])

  const handleToggleExpand = useCallback((id: string) => {
    const toggleFolder = (items: FileSystemItemType[]): FileSystemItemType[] => {
      return items.map(item => {
        if (item.id === id && item.type === 'folder') {
          const newExpanded = !(item as FolderType).expanded
          onFolderToggle?.(id, newExpanded)
          return { ...item, expanded: newExpanded }
        }
        if (item.type === 'folder') {
          return { ...item, children: toggleFolder((item as FolderType).children) }
        }
        return item
      })
    }

    setFileSystem(prevState => ({
      ...prevState,
      children: toggleFolder(prevState.children)
    }))
  }, [onFolderToggle])

  const handleSelectFile = useCallback((file: FileType) => {
    setSelectedFile(file)
    onFileSelect?.(file)
  }, [onFileSelect])

  const handleCopyContent = useCallback(async () => {
    if (selectedFile) {
      try {
        await navigator.clipboard.writeText(selectedFile.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy content:', error)
      }
    }
  }, [selectedFile])

  const filterFileSystem = useCallback((items: FileSystemItemType[], query: string): FileSystemItemType[] => {
    if (!query) return items

    return items.reduce<FileSystemItemType[]>((filtered, item) => {
      if (item.type === 'file') {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          filtered.push(item)
        }
      } else {
        const filteredChildren = filterFileSystem((item as FolderType).children, query)
        if (filteredChildren.length > 0 || item.name.toLowerCase().includes(query.toLowerCase())) {
          filtered.push({
            ...item,
            children: filteredChildren,
            expanded: true
          } as FolderType)
        }
      }
      return filtered
    }, [])
  }, [])

  const filteredFileSystem = useMemo(() => {
    return searchQuery
      ? { ...fileSystem, children: filterFileSystem(fileSystem.children, searchQuery) }
      : fileSystem
  }, [fileSystem, searchQuery, filterFileSystem])

  const handleRefresh = useCallback(() => {
    setFileSystem(initialData)
    setSelectedFile(null)
    setSearchQuery('')
    onRefresh?.()
  }, [initialData, onRefresh])

  const handleCloseFile = useCallback(() => {
    setSelectedFile(null)
  }, [])

  return (
    <FileExplorerErrorBoundary>
      <div className={cn("container p-0", className)}>
        {showTitle && <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>}

        <div className="relative grid grid-cols-1 lg:grid-cols-6 gap-6">
          <Card className={cn("lg:col-span-2 p-4 overflow-auto", cardClassName)} style={{ height }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Files</h2>
              <div className="flex gap-1">
                {onRefresh && (
                  <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setFileSystem(initialData)} disabled={loading}>
                  <ChevronsUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                disabled={loading}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-6 w-6"
                  onClick={() => setSearchQuery('')}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="file-tree" role="tree">
                {filteredFileSystem.children.map((item) => (
                  <FileTreeItem
                    key={item.id}
                    item={item}
                    onToggleExpand={handleToggleExpand}
                    onSelectFile={handleSelectFile}
                    selectedFileId={selectedFile?.id || null}
                    defaultFileIcon={defaultFileIcon}
                    defaultFolderIcon={defaultFolderIcon}
                    defaultFolderOpenIcon={defaultFolderOpenIcon}
                  />
                ))}
                {filteredFileSystem.children.length === 0 && (
                  <div className="py-4 text-center text-muted-foreground text-sm">
                    No files match your search
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card
            className={cn(
              "lg:col-span-4 overflow-hidden flex flex-col",
              "lg:static lg:translate-x-0 lg:opacity-100",
              selectedFile
                ? "absolute inset-0 z-50 lg:relative lg:inset-auto lg:z-auto translate-x-0 opacity-100"
                : "absolute inset-0 z-50 lg:relative lg:inset-auto lg:z-auto translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100",
              "transition-all duration-300 ease-in-out",
              cardClassName
            )}
            style={{ height }}
          >
            {selectedFile ? (
              <>
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseFile}
                      className="h-8 w-8 mr-2 lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <span className="mr-2">{getFileIcon(selectedFile, defaultFileIcon)}</span>
                    <span className="font-medium">{selectedFile.name}</span>
                  </div>
                  {!selectedFile.isImage && !isImageFile(selectedFile.name) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyContent}
                      className="h-8 w-8"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                <div className="grow overflow-auto p-0">
                  {selectedFile.isImage || isImageFile(selectedFile.name) ? (
                    <div className="flex items-center justify-center h-full p-6">
                      <div className="max-w-full max-h-full flex flex-col items-center">
                        <img
                          src={selectedFile.imageUrl || selectedFile.content}
                          alt={selectedFile.name}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                              <div class="flex flex-col items-center justify-center text-muted-foreground">
                                <Image class="h-16 w-16 mb-4" />
                                <p class="text-lg font-medium">Unable to display image</p>
                                <p class="text-sm">${selectedFile.name}</p>
                              </div>
                            `;
                            }
                          }}
                        />
                        <p className="mt-4 text-sm text-muted-foreground text-center">
                          {selectedFile.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <SyntaxHighlighter
                      language={selectedFile.language || 'text'}
                      style={atomOneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        height: fileContentHeight,
                        borderRadius: 0,
                        fontSize: '0.9rem',
                        backgroundColor: 'hsl(var(--background))',
                      }}
                    // showLineNumbers={true}
                    >
                      {selectedFile.content}
                    </SyntaxHighlighter>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <FileText className="h-16 w-16 mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-medium mb-2">No File Selected</h3>
                <p className="text-muted-foreground">
                  Select a file from the sidebar to view its contents
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </FileExplorerErrorBoundary>
  )
}