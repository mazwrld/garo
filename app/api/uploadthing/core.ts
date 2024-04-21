import { db } from '@/server/db'
import { images } from '@/server/db/schema'
import { ratelimit } from '@/server/ratelimit'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const fileRoute = createUploadthing()

export const uploadThingFileRouter = {
  imageUploader: fileRoute({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .middleware(async () => {
      const user = auth()
      if (!user.userId) throw new UploadThingError('Unauthorized')

      const fullUserData = await clerkClient.users.getUser(user.userId)

      if (fullUserData?.privateMetadata?.['can-upload'] !== true)
        throw new UploadThingError('User Does Not Have Upload Permission')

      const { success } = await ratelimit.limit(user.userId)

      if (!success) throw new UploadThingError('Ratelimited')

      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      })

      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type uploadThingFileRouter = typeof uploadThingFileRouter
