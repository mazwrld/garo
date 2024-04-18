import { db } from '@/server/db'
import { images } from '@/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const fileRoute = createUploadthing()

export const uploadThingFileRouter = {
  imageUploader: fileRoute({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .middleware(async () => {
      const user = auth()
      if (!user.userId) throw new UploadThingError('Unauthorized')

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
