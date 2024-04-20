import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react'

import { type uploadThingFileRouter } from '@/app/api/uploadthing/core'

export const UploadButton = generateUploadButton<uploadThingFileRouter>()
export const UploadDropzone = generateUploadDropzone<uploadThingFileRouter>()
export const { useUploadThing } = generateReactHelpers<uploadThingFileRouter>()
