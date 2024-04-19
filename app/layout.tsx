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
      <html lang="en">
        <NextSSRPlugin
          routerConfig={extractRouterConfig(uploadThingFileRouter)}
        />
        <body className={`font-sans ${lato.variable} flex flex-col gap-4`}>
          <Nav />
          {children}
          {modal}
          <div id="modal-root"></div>
        </body>
      </html>
    </ClerkProvider>
  )
}
