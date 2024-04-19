import FullPageImageView from '@/components/fullImagePage'

export default function ImagePage({
  params: { id: imageId },
}: {
  params: { id: string }
}) {
  const idAsNumber = Number(imageId)

  if (Number.isNaN(idAsNumber)) throw new Error('Invalid image id.')

  return <FullPageImageView imageId={idAsNumber} />
}
