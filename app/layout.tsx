import type { Metadata } from 'next'
import { Cinzel, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'TemperamentQuest — Know Thyself. No Paywall.',
  description: 'A free, gamified temperament assessment. Discover your character class — Sanguine, Choleric, Melancholic, or Phlegmatic.',
  generator: 'v0.app',
  metadataBase: new URL('https://typequest.app'),
  openGraph: {
    title: 'TemperamentQuest — Discover Your Character Class',
    description: 'Take the free temperament assessment and discover if you are The Bard, The Commander, The Strategist, or The Guardian.',
    url: 'https://typequest.app',
    siteName: 'TypeQuest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TypeQuest - Discover Your Character Class',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TemperamentQuest — Discover Your Character Class',
    description: 'Take the free temperament assessment and discover your true temperament.',
    images: ['/og-image.jpg'],
  },
}

export const viewport = {
  themeColor: '#0D0D0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
