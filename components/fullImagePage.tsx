/* eslint-disable @next/next/no-img-element */
import { getUserImage } from '@/server/queries'

export default async function FullPageImageView(props: { imageId: number }) {
  const image = await getUserImage(props.imageId)

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          className="flex-shrink object-contain"
          src={image.url}
          alt={image.name}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <h1 className="text-xl font-bold">{image.name}</h1>
      </div>
    </div>
  )
}
