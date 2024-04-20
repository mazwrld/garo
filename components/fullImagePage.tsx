import Image from 'next/image'
import { getUserImage } from '@/server/queries'
import { clerkClient } from '@clerk/nextjs/server'

export default async function FullPageImageView(props: { imageId: number }) {
  const image = await getUserImage(props.imageId)
  const uploaderInfo = await clerkClient.users.getUser(image.userId)
  return (
    <div className="flex h-full w-screen min-w-0">
      <div className="relative size-full">
        <Image
          src={image.url}
          alt={image.name}
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <h1 className="border-b p-2 text-center text-lg">{image.name}</h1>
        <div className="flex flex-col p-2">
          <span className="text-zinc-400">Uploaded by:</span>
          <span className="text-zinc-200">{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span className="text-zinc-400">Created on:</span>
          <span className="text-zinc-200">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}
