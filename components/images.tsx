import Image from 'next/image'
import Link from 'next/link'
import { getUserImages } from '@/server/queries'

export default async function Images() {
  const images = await getUserImages()
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/images/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: 'contain' }}
              width={480}
              height={480}
              priority
              alt={`The name of the file is${image.name}. This an image a user uploaded.`}
            />
            <div>{image.name}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}
