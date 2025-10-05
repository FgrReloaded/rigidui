"use client"
import {
  FileUploader,
  FileUploaderDropZone,
  FileUploaderFileList,
  FileUploaderCrop
} from '@/r/new-york/file-uploader/file-uploader'

export default function FileUploaderPreview() {
  return (
    <div className="w-full flex justify-center">
      <FileUploader
        maxFiles={3}
        accept={['image/*', 'application/pdf']}
        maxSize={1024 * 1024 * 5}
        className="w-full"
        onFilesReady={(files) => console.log('Files ready:', files)}
      >
        <FileUploaderDropZone />
        <FileUploaderFileList enableCropping />
        <FileUploaderCrop aspectRatio={16 / 9} minWidth={100} minHeight={100} />
      </FileUploader>
    </div>
  )
}