import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUBTYPES } from '@/lib/subtypes'
import SubtypePageClient from './SubtypePageClient'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const subtype = SUBTYPES.find(s => s.slug === params.slug)
  
  if (!subtype) {
    return {
      title: 'Temperament Not Found',
      description: 'This temperament type could not be found.',
    }
  }
  
  return {
    title: `${subtype.name} - ${subtype.subtitle} | FourType`,
    description: subtype.description,
    keywords: ['temperament', 'personality', subtype.name.toLowerCase(), subtype.subtitle.toLowerCase()],
    openGraph: {
      title: `${subtype.name} - ${subtype.subtitle}`,
      description: subtype.description,
      type: 'website',
      url: `https://www.fourtype.com/subtype/${subtype.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${subtype.name} - ${subtype.subtitle}`,
      description: subtype.description,
    },
  }
}

export async function generateStaticParams() {
  return SUBTYPES.map(subtype => ({
    slug: subtype.slug,
  }))
}

export default function SubtypePage({ params }: { params: { slug: string } }) {
  const subtype = SUBTYPES.find(s => s.slug === params.slug)
  
  if (!subtype) {
    notFound()
  }
  
  return <SubtypePageClient subtype={subtype} />
}
