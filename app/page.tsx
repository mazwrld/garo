import { Suspense } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

import Loading from '@/components/ui/loading'
import Images from '@/components/images'

export const dynamic = 'force-dynamic'

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
