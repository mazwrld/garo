'use client'

import { useRouter } from 'next/navigation'
import SpinnerSVG from '@/components/ui/spinner'
import UploadSVG from '@/components/ui/uploadSVG'
import { useUploadThing } from '@/utils/uploadthing'
import { usePostHog } from 'posthog-js/react'
import { toast } from 'sonner'

type Input = Parameters<typeof useUploadThing>

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedFiles = Array.from(e.target.files)
    const result = await $ut.startUpload(selectedFiles)

    console.log('uploaded files', result)
    // TODO: persist result in state maybe?
  }

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: 'image/*',
    },
    isUploading: $ut.isUploading,
  }
}

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
          duration: this.onClientUploadComplete ? 0 : 10000,
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
