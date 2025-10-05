import { ImageLoader } from '@/r/new-york/image-loader/image-loader'

export default function ImageLoaderPreview() {
  return (
    <div className="flex w-full items-center justify-center">
      <ImageLoader
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        alt="Mountain landscape"
        width={400}
        height={300}
        className="shadow-lg"
      />
    </div>
  )
}