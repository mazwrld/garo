import { getUserImage } from '@/server/queries'

import { Modal } from './modal'

// import { Modal } from '@/app/@modal/(.)images/[id]/modal'

export default async function ImageModel({
  params: { id: imageId },
}: {
  params: { id: string }
}) {
  const idAsNumber = Number(imageId)

  if (Number.isNaN(idAsNumber)) throw new Error('Invalid image id.')

  const image = await getUserImage(idAsNumber)

  return (
    <Modal>
      <img className="w-96" src={image.url} alt={image.name} />
    </Modal>
  )
}
