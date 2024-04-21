import 'server-only'

import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import { images } from '@/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'

export async function getUserImages() {
  const user = auth()

  if (!user.userId) throw new Error('Unauthorized.')

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  })

  return images
}

export async function getUserImage(userId: number) {
  const user = auth()

  if (!user.userId) throw new Error('Unauthorized.')

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, userId),
  })

  if (!image) throw new Error('No image found.')

  if (image.userId !== user.userId) throw new Error('Unauthorized.')

  return image
}

export async function deleteImage(imageId: number) {
  const user = auth()

  if (!user.userId) throw new Error('Unauthorized')

  await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, imageId),
  })

  await db
    .delete(images)
    .where(and(eq(images.id, imageId), eq(images.userId, user.userId)))

  redirect('/')
}
