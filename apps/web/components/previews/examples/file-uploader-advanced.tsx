"use client"

import { useState } from "react"
import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList,
  FileUploaderCrop
} from "@/r/new-york/file-uploader/file-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents

function CompleteFlowExample() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFilesReady = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadStatus('Uploading...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus('Upload completed successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <FileUploader
        maxFiles={3}
        onFilesReady={handleFilesReady}
      >
        <FileUploaderDropZone />
        <FileUploaderFileList enableCropping />
      </FileUploader>

      {files.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Files Selected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {file.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                size="sm"
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>

              {uploadStatus && (
                <p className={`text-xs ${uploading ? 'text-blue-500' :
                    uploadStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {uploadStatus}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function GlassmorphismExample() {
  return (
    <FileUploader
      maxFiles={3}
      accept={['image/*']}
      maxSize={1024 * 1024 * 5}
      onFilesReady={(files) => console.log('Glassmorphism files:', files)}
      className="w-full max-w-lg mx-auto"
    >
      <FileUploaderDropZone className="relative backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/40 dark:hover:bg-black/40 hover:border-white/30 dark:hover:border-white/20" />

      <FileUploaderFileList
        enableCropping
        className="space-y-2"
      />

      <FileUploaderCrop aspectRatio={1} />
    </FileUploader>
  );
}

export function FileUploaderAdvancedExamples() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Basic File Uploader
          </h3>
          <p className="text-muted-foreground">
            Simple file uploader with default settings using the new component-based architecture.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FileUploader
                onFilesReady={(files) => console.log('Basic example files:', files)}
                className="w-full max-w-lg mx-auto"
              >
                <FileUploaderDropZone />
                <FileUploaderFileList />
              </FileUploader>
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList
} from "@/components/file-uploader"

export default function BasicExample() {
  const handleFilesReady = (files) => {
    console.log('Files ready:', files)
  }

  return (
    <FileUploader
      onFilesReady={handleFilesReady}
      className="w-full max-w-lg mx-auto"
    >
      <FileUploaderDropZone />
      <FileUploaderFileList />
    </FileUploader>
  )
}`} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Single Image with Cropping
          </h3>
          <p className="text-muted-foreground">
            Restrict uploads to a single image file with cropping functionality for profile pictures.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FileUploader
                maxFiles={1}
                accept={['image/*']}
                maxSize={1024 * 1024 * 5}
                onFilesReady={(files) => console.log('Single image:', files)}
                className="w-full max-w-md"
              >
                <FileUploaderDropZone />
                <FileUploaderFileList enableCropping />
                <FileUploaderCrop aspectRatio={1} minWidth={80} minHeight={80} />
              </FileUploader>
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList,
  FileUploaderCrop
} from "@/components/file-uploader"

export default function SingleImageExample() {
  return (
    <FileUploader
      maxFiles={1}
      accept={['image/*']}
      maxSize={1024 * 1024 * 5}
      onFilesReady={(files) => console.log('Image selected:', files[0])}
      className="w-full max-w-md"
    >
      <FileUploaderDropZone />
      <FileUploaderFileList enableCropping />
      <FileUploaderCrop aspectRatio={1} minWidth={80} minHeight={80} />
    </FileUploader>
  )
}`} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Complete Upload Flow
          </h3>
          <p className="text-muted-foreground">
            Full implementation with file selection, progress tracking, and upload simulation.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <CompleteFlowExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList
} from "@/components/file-uploader"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CompleteFlowExample() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFilesReady = (selectedFiles) => {
    setFiles(selectedFiles)
    setUploadStatus('')
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadStatus('Uploading...')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUploadStatus('Upload completed successfully!')
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <FileUploader
        maxFiles={3}
        onFilesReady={handleFilesReady}
      >
        <FileUploaderDropZone />
        <FileUploaderFileList enableCropping />
      </FileUploader>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Files Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {files.map((file, index) => (
                <Badge key={index} variant="secondary">
                  {file.name}
                </Badge>
              ))}
            </div>

            <Button
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>

            {uploadStatus && (
              <p className="mt-2 text-sm">{uploadStatus}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}`} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Custom Theme
          </h3>
          <p className="text-muted-foreground">
            Custom theme effect with backdrop blur and translucent backgrounds.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center p-8 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 rounded-xl">
              <GlassmorphismExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList,
  FileUploaderCrop
} from "@/components/file-uploader"

export default function GlassmorphismExample() {
  return (
    <FileUploader
      maxFiles={3}
      accept={['image/*']}
      maxSize={1024 * 1024 * 5}
      onFilesReady={(files) => console.log('Glassmorphism files:', files)}
      className="w-full max-w-lg mx-auto"
    >
      <FileUploaderDropZone
        className="relative backdrop-blur-md bg-white/30 dark:bg-black/30
          border border-white/20 dark:border-white/10 rounded-3xl
          shadow-2xl hover:shadow-3xl transition-all duration-500
          hover:bg-white/40 dark:hover:bg-black/40
          hover:border-white/30 dark:hover:border-white/20"
      />

      <FileUploaderFileList enableCropping className="space-y-2" />
      <FileUploaderCrop aspectRatio={1} />
    </FileUploader>
  )
}`} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
