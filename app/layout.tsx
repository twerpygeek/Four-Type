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
  title: 'Temperament Test & Education Platform | FourType - Master the 4 Temperaments',
  description: 'Discover the 4 temperaments (Choleric, Sanguine, Melancholic, Phlegmatic) through FourType\'s comprehensive education platform. Learn temperament theory, read blog posts, explore the manifesto, and find your character class. Free education resource for understanding personality archetypes.',
  generator: 'v0.app',
  metadataBase: new URL('https://fourtype.com'),
  keywords: ['temperament', 'four temperaments', 'temperament types', 'choleric', 'sanguine', 'melancholic', 'phlegmatic', 'personality types', 'temperament test', 'personality theory', 'character archetypes', 'temperament education', 'psychology', 'personality psychology'],
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'Temperament Test & Education Platform | FourType',
    description: 'Comprehensive education platform for the 4 temperaments. Learn temperament theory, explore character archetypes, read expert blog posts, and discover which temperament you are.',
    url: 'https://fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FourType — Master the 4 Temperaments. The Commander, The Bard, The Strategist, The Guardian.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FourType - Temperament Test & Education Platform',
    description: 'Discover the 4 temperaments with our comprehensive education platform. Learn, explore, and master temperament theory.',
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
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
