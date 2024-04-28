import { Suspense } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

import Images from '@/components/images'

export const dynamic = 'force-dynamic'

function Loading() {
  return (
    <div className="flex h-svh items-center justify-center overflow-hidden">
      <div className="relative rounded-lg p-5 shadow-lg">
        <div className="absolute left-0 top-0 flex h-svh w-svw items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-white"></div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="h-svh w-svw text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<Loading />}>
          <Images />
        </Suspense>
      </SignedIn>
    </>
  )
}
