import { withSentryConfig } from '@sentry/nextjs'

await import('./env.js')

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
}

const config = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: 'maz-ds',
    project: 'garo',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
)

export default config
