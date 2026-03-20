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
  title: 'FourType — The Temperament Quest',
  description: 'Discover which of the 15 temperament blends you are. A free, gamified personality assessment based on classical temperament theory. 40 questions. No paywall.',
  generator: 'v0.app',
  metadataBase: new URL('https://fourtype.com'),
  keywords: ['temperament test', 'personality quiz', 'choleric sanguine melancholic phlegmatic', 'four temperaments', 'temperament assessment', 'free personality test'],
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'FourType — The Temperament Quest',
    description: 'Which of the 15 temperament types are you? Take the free quest — 40 questions, no paywall, know your true nature.',
    url: 'https://fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: '/og-image.jpg',
        width: 1270,
        height: 952,
        alt: 'FourType — Know Your True Nature. The Commander, The Bard, The Strategist, The Guardian.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FourType — The Temperament Quest',
    description: 'Which of the 15 temperament types are you? Take the free quest — 40 questions, no paywall.',
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
