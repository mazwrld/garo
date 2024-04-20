import { getUserImage } from '@/server/queries'

export default async function FullPageImageView(props: { imageId: number }) {
  const image = await getUserImage(props.imageId)

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex-shrink">
        <img
          className="flex-shrink object-contain"
          src={image.url}
          alt={image.name}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <h1 className="text-xl font-bold">{image.name}</h1>
      </div>
    </div>
  )
}
