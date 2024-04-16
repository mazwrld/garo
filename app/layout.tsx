import Nav from "@/components/Nav";
import "@/styles/globals.css";

import { Lato } from "next/font/google";

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
    <html lang="en">
      <body className={`font-sans ${lato.variable} flex flex-col gap-4`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
