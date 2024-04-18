import { createRouteHandler } from 'uploadthing/next'

import { uploadThingFileRouter } from '@/app/api/uploadthing/core'

export const { GET, POST } = createRouteHandler({
  router: uploadThingFileRouter,
})
