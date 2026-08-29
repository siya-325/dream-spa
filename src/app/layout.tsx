import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"

import { BackToTop } from "@/components/layout/back-to-top"
import { FloatingQuickActions } from "@/components/layout/floating-quick-actions"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { site } from "@/data/site"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Beauty & Wellness Spa in Ahmedabad`,
    template: `%s — ${site.name} Ahmedabad`,
  },
  description: site.description,
  generator: "v0.app",
  keywords: [
    "spa in Ahmedabad",
    "body massage Ahmedabad",
    "spa in Gurukul",
    "ayurvedic massage Ahmedabad",
    "couple spa Ahmedabad",
    "Dream Spa Ahmedabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Beauty & Wellness Spa in Ahmedabad`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Beauty & Wellness Spa in Ahmedabad`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/images/logo-icon-white.svg", type: "image/svg+xml" }],
    apple: "/images/logo-icon-white.svg",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#faf8f4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${fraunces.variable} bg-background`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <FloatingQuickActions />
        <BackToTop />
        <SiteFooter />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
