import { PostHog } from 'posthog-node'

const severSideAnalytics = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
})

export default severSideAnalytics
