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
  title: {
    default: 'FourType — Know Your True Nature | The Temperament Quest',
    template: '%s | FourType',
  },
  description: 'Take the free 40-question temperament test and discover if you are The Commander (Choleric), The Bard (Sanguine), The Strategist (Melancholic), or The Guardian (Phlegmatic). Based on 2,500 years of temperament science. Free forever. No paywall.',
  metadataBase: new URL('https://www.fourtype.com'),
  alternates: {
    canonical: 'https://www.fourtype.com',
  },
  keywords: [
    'temperament test', 'four temperaments', 'free personality test', 'what is my temperament',
    'choleric sanguine melancholic phlegmatic', 'temperament quiz', 'personality type quiz',
    'know your temperament', 'temperament types explained', 'four humors personality',
    'choleric personality', 'sanguine personality', 'melancholic personality', 'phlegmatic personality',
    'temperament vs personality', 'ancient personality types', 'Hippocrates temperaments',
    'character archetypes', '15 temperament subtypes', 'temperament blend', 'FourType',
    'fourtype.com', 'temperament education', 'personality psychology', 'self discovery quiz',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'FourType — Know Your True Nature | Free 40-Question Temperament Quest',
    description: 'Discover your temperament through 40 questions. The Commander, The Bard, The Strategist, The Guardian — and 15 unique subtypes. Free forever. No paywall. FourType.com',
    url: 'https://www.fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: 'https://www.fourtype.com/og-image.jpg',
        width: 1280,
        height: 960,
        alt: 'FourType — Know Your True Nature. The Temperament Quest. 40 questions. 4 temperaments. Free forever.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FourType — Free 40-Question Temperament Test',
    description: 'Discover if you are The Commander, The Bard, The Strategist, or The Guardian. 40 questions. Free forever. FourType.com',
    images: ['https://www.fourtype.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FourType',
    alternateName: 'FourType — The Temperament Quest',
    url: 'https://www.fourtype.com',
    description: 'Free 40-question temperament test based on the four classical temperaments: Choleric (The Commander), Sanguine (The Bard), Melancholic (The Strategist), Phlegmatic (The Guardian). Discover your type, your blend, and 15 unique subtypes.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.fourtype.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FourType',
      url: 'https://www.fourtype.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fourtype.com/fourtype-logo.png',
      },
    },
    sameAs: ['https://www.fourtype.com'],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
