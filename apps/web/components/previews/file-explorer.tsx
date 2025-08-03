"use client"
import React from 'react'
import { FileExplorer } from '@/r/new-york/file-explorer/file-explorer'
import { FileCode, FolderClosed, FolderOpen, ImageIcon } from 'lucide-react'

export default function FileExplorerPreview() {

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
    <div className='w-full flex justify-center'>
      <FileExplorer
        initialData={previewFileSystem}
        showTitle={true}
        height="400px"
        className="w-full"
      />
    </div>
  )
}