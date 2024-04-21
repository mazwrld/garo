'use client'

import { useRouter } from 'next/navigation'
import useUploadThingInputProps from '@/utils/useUploadThingInputProps'
import { usePostHog } from 'posthog-js/react'
import { toast } from 'sonner'

import SpinnerSVG from '@/components/ui/spinner'
import UploadSVG from '@/components/ui/uploadSVG'

export default function CostumeUploadButton() {
  const router = useRouter()
  const postHog = usePostHog()
  const { inputProps } = useUploadThingInputProps('imageUploader', {
    onUploadBegin() {
      postHog.capture('upload_being')
      toast(
        <div className="flex items-center gap-2">
          <SpinnerSVG />
          <span className="font-italic">Uploading...</span>
        </div>,
        {
          duration: 10000,
          id: 'upload-being',
        }
      )
    },
    onClientUploadComplete() {
      toast.dismiss('upload-being')
      toast('Upload completed!')
      router.refresh()
    },
  })
  return (
    <div>
      <label htmlFor="upload-button" title="Upload" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        title="Upload"
        type="file"
        name="upload-button"
        id="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  )
}
