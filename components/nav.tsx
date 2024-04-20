'use client'

import { useRouter } from 'next/navigation'
import { UploadButton } from '@/utils/uploadthing'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Nav() {
  const router = useRouter()
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Garo</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh()
            }}
          />
          <UserButton></UserButton>
        </SignedIn>
      </div>
    </nav>
  )
}
