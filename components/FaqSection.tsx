import { HelpCircle } from 'lucide-react'
import type { FaqItem } from '@/lib/seo-content'

export function FaqSection({ faq }: { faq?: FaqItem[] }) {
  if (!faq?.length) return null

  return (
    <section className="mt-16 mb-16 border-t border-border pt-10">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-serif font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faq.map((item) => (
          <div key={item.question} className="rounded-xl border border-border bg-secondary/20 p-5">
            <h3 className="font-serif text-lg font-bold mb-2">{item.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
