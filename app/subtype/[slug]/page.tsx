import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSubtype, getAllSubtypes } from '@/lib/subtypes'
import SubtypePageClient from './SubtypePageClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const subtype = getSubtype(slug)
  
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
  return getAllSubtypes().map(subtype => ({
    slug: subtype.slug,
  }))
}

export default async function SubtypePage({ params }: PageProps) {
  const { slug } = await params
  const subtype = getSubtype(slug)
  
  if (!subtype) {
    notFound()
  }
  
  return <SubtypePageClient subtype={subtype} />
}
