import type { Metadata } from 'next'
import FieldGuideCampaign from './FieldGuideCampaign'
import './field-guide.css'
import { getSupporterOffer } from '@/lib/field-guide/catalog'

const canonicalUrl = 'https://www.fourtype.com/field-guide'

export const metadata: Metadata = {
  title: 'FourType Field Guide · Illustrated Digital Book',
  description:
    'See your pattern. Choose your next move. The complete illustrated FourType Field Guide for work, relationships, tension and repair.',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: 'website',
    url: canonicalUrl,
    title: 'Read the room. Widen your range. · FourType',
    description:
      'See your pattern. Choose your next move. A practical illustrated guide for work, relationships, tension and repair.',
    images: [
      {
        url: '/images/field-guide/fourtype-field-guide-og.png',
        width: 1731,
        height: 909,
        alt: 'FourType: The Field Guide, shown as an illustrated book with the four FourType characters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read the room. Widen your range. · FourType',
    description:
      'See your pattern. Choose your next move. A practical illustrated guide for work, relationships, tension and repair.',
    images: ['/images/field-guide/fourtype-field-guide-og.png'],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The FourType Field Guide',
  description:
    'A complete illustrated digital Field Guide that helps readers see recurring patterns and choose more useful next moves at work, in relationships, under pressure and during repair.',
  url: canonicalUrl,
  image: 'https://www.fourtype.com/images/field-guide/fourtype-field-guide-og.png',
  brand: {
    '@type': 'Brand',
    name: 'FourType',
  },
  category: 'Digital book',
  offers: {
    '@type': 'Offer',
    name: 'Complete Digital Edition',
    price: getSupporterOffer('founding', 'usd').amount / 100,
    priceCurrency: 'USD',
    url: canonicalUrl,
  },
}

export default function FieldGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <FieldGuideCampaign />
    </>
  )
}
