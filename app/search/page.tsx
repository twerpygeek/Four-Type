import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { allContentPages } from '@/lib/seo-content'

export const metadata: Metadata = {
  title: 'Search Temperament Test Guides',
  description: 'Search FourType temperament test guides, four temperaments articles, subtype profiles, and practical personality resources.',
  robots: {
    index: false,
    follow: true,
  },
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

const coreResults = [
  {
    href: '/',
    title: 'FourType Free Temperament Test',
    description: 'Start at FourType and take the free temperament test.',
  },
  {
    href: '/quiz',
    title: 'Take the Free Temperament Test',
    description: 'Answer 40 questions to discover your temperament and subtype direction.',
  },
  {
    href: '/what-is-temperament-test',
    title: 'What Is a Temperament Test?',
    description: 'Learn what temperament tests measure and how to read your result.',
  },
]

function matchesQuery(page: { title: string; description: string; href: string }, terms: string[]) {
  const haystack = `${page.title} ${page.description} ${page.href}`.toLowerCase()
  return terms.every((term) => haystack.includes(term))
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const pages = [...coreResults, ...allContentPages]
  const results = terms.length > 0 ? pages.filter((page) => matchesQuery(page, terms)) : pages.slice(0, 12)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-28 pb-16">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary mb-3">FourType Search</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Search Temperament Test Guides
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Find FourType pages about the temperament test, four temperaments, subtypes, relationships, work, and type-specific guides.
            </p>
          </div>

          <form action="/search" className="relative mb-10">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search temperament test, choleric, subtypes..."
              className="w-full rounded-lg border border-border bg-card py-4 pl-12 pr-28 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Search
            </button>
          </form>

          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {query ? `Results for "${query}"` : 'Popular temperament resources'}
            </h2>
            <span className="text-sm text-muted-foreground">{results.length} results</span>
          </div>

          <div className="grid gap-4">
            {results.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{page.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{page.description}</p>
                <p className="mt-3 text-sm font-medium text-primary">{page.href}</p>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">No matching guide found</h2>
              <p className="text-muted-foreground mb-5">Try a broader phrase such as temperament test, four temperaments, choleric, relationships, or subtypes.</p>
              <Link href="/temperament-test" className="inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Open the Temperament Test Guide
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
