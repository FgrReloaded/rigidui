import { FileUploader } from "@/registry/new-york/file-uploader/file-uploader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const advancedUsageExamples = [
  {
    title: "Basic File Uploader",
    description:
      "Simple file uploader with default settings supporting images, PDFs, and text files.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function BasicExample() {
  const handleFilesReady = (files) => {
    console.log('Files ready:', files)
  }

  return (
    <FileUploader
      onFilesReady={handleFilesReady}
      className="w-full max-w-lg"
    />
  )
}`,
    component: (
      <FileUploader
        onFilesReady={(files) => console.log('Basic example files:', files)}
        className="w-full max-w-lg"
      />
    ),
  },
  {
    title: "Single Image Uploader",
    description:
      "Restrict uploads to a single image file with a smaller size limit, perfect for profile pictures or avatars.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function SingleImageExample() {
  return (
    <FileUploader
      maxFiles={1}
      accept={['image/*']}
      maxSize={1024 * 1024 * 2} // 2MB
      onFilesReady={(files) => console.log('Image selected:', files[0])}
      className="w-full max-w-md border-dashed border-2 border-blue-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={1}
        accept={['image/*']}
        maxSize={1024 * 1024 * 2}
        onFilesReady={(files) => console.log('Single image:', files)}
        className="w-full max-w-md border-dashed border-2 border-blue-300/50"
      />
    ),
  },
  {
    title: "Document Uploader",
    description:
      "Accept only document files (PDF, DOC, DOCX) with larger size limits for business documents.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function DocumentExample() {
  return (
    <FileUploader
      maxFiles={5}
      accept={[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]}
      maxSize={1024 * 1024 * 15} // 15MB
      onFilesReady={(files) => console.log('Documents ready:', files)}
      className="w-full max-w-lg border-dashed border-2 border-amber-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={5}
        accept={[
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]}
        maxSize={1024 * 1024 * 15}
        onFilesReady={(files) => console.log('Documents:', files)}
        className="w-full max-w-lg border-dashed border-2 border-amber-300/50"
      />
    ),
  },
  {
    title: "Media Files Uploader",
    description:
      "Upload various media types including images, videos, and audio files with appropriate size limits.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function MediaExample() {
  return (
    <FileUploader
      maxFiles={8}
      accept={['image/*', 'video/*', 'audio/*']}
      maxSize={1024 * 1024 * 50} // 50MB for videos
      onFilesReady={(files) => console.log('Media files:', files)}
      className="w-full max-w-xl border-dashed border-2 border-purple-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={8}
        accept={['image/*', 'video/*', 'audio/*']}
        maxSize={1024 * 1024 * 50}
        onFilesReady={(files) => console.log('Media files:', files)}
        className="w-full max-w-xl border-dashed border-2 border-purple-300/50"
      />
    ),
  },
  {
    title: "Image Cropping - Free Aspect",
    description:
      "Enable image cropping with free aspect ratio for profile pictures and image editing.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function ImageCroppingExample() {
  return (
    <FileUploader
      maxFiles={3}
      accept={['image/*']}
      enableCropping={true}
      maxSize={1024 * 1024 * 5} // 5MB
      onFilesReady={(files) => console.log('Cropped images:', files)}
      className="w-full max-w-lg border-dashed border-2 border-green-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={3}
        accept={['image/*']}
        enableCropping={true}
        maxSize={1024 * 1024 * 5}
        onFilesReady={(files) => console.log('Cropped images:', files)}
        className="w-full max-w-lg border-dashed border-2 border-green-300/50"
      />
    ),
  },
  {
    title: "Image Cropping - Fixed Aspect Ratio",
    description:
      "Crop images with a fixed aspect ratio, perfect for social media posts or specific layouts.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function FixedAspectCroppingExample() {
  return (
    <FileUploader
      maxFiles={1}
      accept={['image/*']}
      enableCropping={true}
      cropAspectRatio={16/9} // Fixed 16:9 aspect ratio
      cropMinWidth={100}
      cropMinHeight={56}
      maxSize={1024 * 1024 * 5} // 5MB
      onFilesReady={(files) => console.log('16:9 cropped image:', files)}
      className="w-full max-w-lg border-dashed border-2 border-cyan-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={1}
        accept={['image/*']}
        enableCropping={true}
        cropAspectRatio={16 / 9}
        cropMinWidth={100}
        cropMinHeight={56}
        maxSize={1024 * 1024 * 5}
        onFilesReady={(files) => console.log('16:9 cropped image:', files)}
        className="w-full max-w-lg border-dashed border-2 border-cyan-300/50"
      />
    ),
  },
  {
    title: "Square Image Cropping",
    description:
      "Crop images to perfect squares, ideal for profile pictures and thumbnails.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function SquareCroppingExample() {
  return (
    <FileUploader
      maxFiles={1}
      accept={['image/*']}
      enableCropping={true}
      cropAspectRatio={1} // Perfect square (1:1)
      cropMinWidth={80}
      cropMinHeight={80}
      maxSize={1024 * 1024 * 3} // 3MB
      onFilesReady={(files) => console.log('Square cropped image:', files)}
      className="w-full max-w-md border-dashed border-2 border-pink-300/50"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={1}
        accept={['image/*']}
        enableCropping={true}
        cropAspectRatio={1}
        cropMinWidth={80}
        cropMinHeight={80}
        maxSize={1024 * 1024 * 3}
        onFilesReady={(files) => console.log('Square cropped image:', files)}
        className="w-full max-w-md border-dashed border-2 border-pink-300/50"
      />
    ),
  },
  {
    title: "Complete Upload Flow",
    description:
      "Full implementation with server upload, progress tracking, and success/error handling.",
    code: `import { FileUploader } from "@/components/file-uploader"
import { useState } from "react"
import { Button } from "@/components/ui/button"

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setUploadStatus('Upload completed successfully!')
    } catch (error) {
      console.error('Upload error:', error)
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
      />

      {files.length > 0 && (
        <div className="flex items-center gap-4">
          <Button
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>

          {uploadStatus && (
            <p className={uploading ? 'text-blue-500' :
              uploadStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}>
              {uploadStatus}
            </p>
          )}
        </div>
      )}
    </div>
  )
}`,
    component: (
      <CompleteFlowExample />
    ),
  },
  {
    title: "Custom Styled Uploader",
    description:
      "Customize the appearance and behavior with specific styling and constraints.",
    code: `import { FileUploader } from "@/components/file-uploader"

export default function CustomStyledExample() {
  return (
    <FileUploader
      maxFiles={2}
      accept={['image/jpeg', 'image/png', 'image/webp']}
      maxSize={1024 * 1024 * 3} // 3MB
      onFilesReady={(files) => console.log('Custom upload:', files)}
      className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-blue-50
                 border-2 border-indigo-200 rounded-xl"
    />
  )
}`,
    component: (
      <FileUploader
        maxFiles={2}
        accept={['image/jpeg', 'image/png', 'image/webp']}
        maxSize={1024 * 1024 * 3}
        onFilesReady={(files) => console.log('Custom styled:', files)}
        className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-blue-50
                   border-2 border-indigo-200 rounded-xl"
      />
    ),
  },
];

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
    <div className="space-y-4 w-full max-w-lg">
      <FileUploader
        maxFiles={3}
        onFilesReady={handleFilesReady}
      />

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
                  uploadStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
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