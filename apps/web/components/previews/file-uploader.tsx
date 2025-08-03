import { FileUploader } from '@/r/new-york/file-uploader/file-uploader'

export default function FileUploaderPreview() {
  return (
    <div className="w-full flex justify-center">
      <FileUploader
        maxFiles={3}
        accept={['image/*', 'application/pdf']}
        maxSize={1024 * 1024 * 5}
        enableCropping={true}
        className="w-full"
      />
    </div>
  )
}