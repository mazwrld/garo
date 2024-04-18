import Image from 'next/image'
import { getUserImages } from '@/server/queries'

export default async function Images() {
  const images = await getUserImages()
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 h-48 flex-col">
          <Image
            src={image.url}
            style={{ objectFit: 'contain' }}
            width={480}
            height={480}
            alt={`The name of the file is${image.name}. This an image a user uploaded.`}
          />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  )
}
