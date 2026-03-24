import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SharePageClient from './SharePageClient'
import { BLENDS, BlendKey } from '@/lib/blends'
import { TEMPERAMENTS } from '@/lib/temperaments'

// Decode a shareable ID back into result data
function decodeShareId(id: string): { 
  heroName: string
  blendKey: BlendKey
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
} | null {
  try {
    // Format: base64(heroName|blendKey|Y,R,B,G)
    const decoded = atob(id.replace(/-/g, '+').replace(/_/g, '/'))
    const [heroName, blendKey, scoresStr] = decoded.split('|')
    const [y, r, b, g] = scoresStr.split(',').map(Number)
    
    if (!heroName || !blendKey || isNaN(y) || isNaN(r) || isNaN(b) || isNaN(g)) {
      return null
    }
    
    if (!(blendKey in BLENDS)) {
      return null
    }
    
    return {
      heroName: heroName.slice(0, 30), // Limit name length
      blendKey: blendKey as BlendKey,
      scores: { Yellow: y, Red: r, Blue: b, Green: g }
    }
  } catch {
    return null
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const data = decodeShareId(id)
  
  if (!data) {
    return {
      title: 'Share Your Temperament | FourType',
      description: 'Discover your temperament at FourType.com',
    }
  }
  
  const blend = BLENDS[data.blendKey]
  
  const title = `I am ${blend.name} | FourType`
  const description = `${data.heroName} discovered they are ${blend.name} (${blend.blend}). "${blend.tagline}" — Take the free temperament test at FourType.com`
  
  return {
    title,
    description,
    openGraph: {
      title: `${data.heroName} is ${blend.name}!`,
      description: `"${blend.tagline}" — ${blend.lore.slice(0, 150)}...`,
      url: `https://www.fourtype.com/share/${id}`,
      siteName: 'FourType',
      images: [
        {
          url: `https://www.fourtype.com/api/og?blend=${data.blendKey}&name=${encodeURIComponent(data.heroName)}`,
          width: 1200,
          height: 630,
          alt: `${blend.name} - ${blend.blend}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.heroName} is ${blend.name}!`,
      description: `"${blend.tagline}" — Discover your temperament free at FourType.com`,
      images: [`https://www.fourtype.com/api/og?blend=${data.blendKey}&name=${encodeURIComponent(data.heroName)}`],
    },
  }
}

export default async function SharePage({ params }: PageProps) {
  const { id } = await params
  const data = decodeShareId(id)
  
  if (!data) {
    notFound()
  }
  
  const blend = BLENDS[data.blendKey]
  const dominantTemp = TEMPERAMENTS[blend.primary]
  
  return (
    <SharePageClient
      heroName={data.heroName}
      blend={blend}
      dominantTemp={dominantTemp}
      scores={data.scores}
      shareId={id}
    />
  )
}
