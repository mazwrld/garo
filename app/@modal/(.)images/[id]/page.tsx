import FullPageImageView from '@/components/fullImagePage'
import { Modal } from '@/app/@modal/(.)images/[id]/modal'

export default function ImageModel({
  params: { id: imageId },
}: {
  params: { id: string }
}) {
  const idAsNumber = Number(imageId)

  if (Number.isNaN(idAsNumber)) throw new Error('Invalid image id.')

  return (
    <Modal>
      <FullPageImageView imageId={idAsNumber} />
    </Modal>
  )
}
