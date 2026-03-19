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
