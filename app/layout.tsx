import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ScrollProgress } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/site"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ScrollProgress />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
