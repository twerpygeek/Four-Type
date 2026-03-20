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
  title: 'FourType — The Temperament Quest — Know Your True Nature',
  description: 'Discover which of the four temperament types you are. A free, gamified personality assessment based on classical temperament theory.',
  generator: 'v0.app',
  metadataBase: new URL('https://fourtype.com'),
  openGraph: {
    title: 'FourType — The Temperament Quest',
    description: 'Discover your temperament type and unlock insights into your true nature. Free personality assessment.',
    url: 'https://fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FourType - Know Your True Nature',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FourType — The Temperament Quest',
    description: 'Discover your temperament type and unlock insights into your true nature.',
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
