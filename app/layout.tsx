import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Lato } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import { uploadThingFileRouter } from "@/app/api/uploadthing/core";
import Nav from "@/component/nav";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Garo - A Gallery App",
  description: "Garo - Japanese for Gallery.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(uploadThingFileRouter)}
        />
        <body className={`font-sans ${lato.variable} flex flex-col gap-4`}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
