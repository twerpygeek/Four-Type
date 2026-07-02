import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LinkCard } from '@/lib/seo-content'

type InternalLinkHubProps = {
  eyebrow?: string
  title: string
  links: LinkCard[]
}

export function InternalLinkHub({ eyebrow = 'Recommended Guides', title, links }: InternalLinkHubProps) {
  if (!links.length) return null

  return (
    <section className="my-16 border-t border-border pt-10">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">{eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-border bg-secondary/20 p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
