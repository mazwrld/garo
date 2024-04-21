import CSPostHogProvider from '@/analytics/providers'

import { Toaster } from '@/components/ui/sonner'
import Nav from '@/components/nav'
import { uploadThingFileRouter } from '@/app/api/uploadthing/core'

import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'

import '@uploadthing/react/styles.css'

import { Lato } from 'next/font/google'
import { extractRouterConfig } from 'uploadthing/server'

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
})

export const metadata = {
  title: 'Garo - A Gallery App',
  description: 'Garo - Japanese for Gallery.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            routerConfig={extractRouterConfig(uploadThingFileRouter)}
          />
          <body className={`font-sans ${lato.variable} dark`}>
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <Nav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root"></div>
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  )
}
