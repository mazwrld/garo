import { getUserImage } from '@/server/queries'

export default async function FullPageImageView(props: { imageId: number }) {
  const image = await getUserImage(props.imageId)

  return <img className="w-96" src={image.url} alt={image.name} />
}
