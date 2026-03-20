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
  title: 'Temperament Test – Find Your Character Class | FourType',
  description: 'Find out who you really are under pressure. Take this free temperament test and discover your character class — Commander, Bard, Strategist, or Guardian.',
  generator: 'v0.app',
  metadataBase: new URL('https://fourtype.com'),
  keywords: ['temperament test', 'personality test', 'character type', 'four temperaments', 'personality quiz', 'free personality test', 'choleric sanguine melancholic phlegmatic'],
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'Temperament Test – Find Your Character Class | FourType',
    description: 'Find out who you really are under pressure. Take this free temperament test and discover your character class — Commander, Bard, Strategist, or Guardian.',
    url: 'https://fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FourType — Know Your True Nature. The Commander, The Bard, The Strategist, The Guardian.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temperament Test – Find Your Character Class | FourType',
    description: 'Find out who you really are under pressure. Take this free temperament test and discover your character class.',
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
