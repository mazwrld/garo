'use client'

import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/utils/uploadthing'
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

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg className="spinner" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" fill="none" />
    </svg>
  )
}

export default function CostumeUploadButton() {
  const router = useRouter()
  const { inputProps } = useUploadThingInputProps('imageUploader', {
    onUploadBegin() {
      toast(
        <div className="flex items-center gap-2">
          <Spinner />
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
