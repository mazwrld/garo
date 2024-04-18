import { getUserImage } from '@/server/queries'

export default async function ImageModel({
  params: { id: imageId },
}: {
  params: { id: string }
}) {
  const idAsNumber = Number(imageId)

  if (Number.isNaN(idAsNumber)) throw new Error('Invalid image id.')

  const image = await getUserImage(idAsNumber)

  return (
    <div>
      <img className="w-96" src={image.url} alt={image.name} />
    </div>
  )
}
