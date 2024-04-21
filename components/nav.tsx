import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import CostumeUploadButton from '@/components/costumeUploadButton'

export default function Nav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">Garo</Link>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <CostumeUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
