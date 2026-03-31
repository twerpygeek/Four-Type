import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FourType - Discover Your Temperament Type',
    short_name: 'FourType',
    description: 'Take the temperament test based on the four classic temperament types. Discover if you\'re sanguine, choleric, melancholic, or phlegmatic.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a2e',
    theme_color: '#ffd700',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
