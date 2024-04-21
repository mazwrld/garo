'use client'

import { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    ui_host: 'https://app.posthog.com',
  })
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const userInfo = useUser()

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
        name: userInfo.user.fullName,
      })
    } else if (!auth.isSignedIn) {
      posthog.reset()
    }
  }, [auth, userInfo])

  return <>{children}</>
}

export default function CSPostHogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  )
}
