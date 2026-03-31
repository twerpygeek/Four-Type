import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Temperament & Dating: Personality Compatibility Guide | FourType',
  description: 'Explore temperament compatibility in relationships. Learn which temperament types complement each other, communication tips, and dating advice for all four types.',
  keywords: ['temperament dating', 'personality compatibility', 'temperament relationships', 'sanguine dating', 'melancholic relationships'],
  openGraph: {
    title: 'Temperament & Dating: Find Your Personality Match',
    description: 'Understand temperament compatibility and build stronger relationships based on personality type.',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['FourType'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Temperament & Dating: Personality Compatibility Guide',
  description: 'Explore temperament compatibility in relationships and learn dating strategies for each type.',
  image: 'https://www.fourtype.com/og-image.jpg',
  datePublished: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'FourType',
    url: 'https://www.fourtype.com',
  },
}

export default function TemperamentDatingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Relationships</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Temperament & Dating: Find Your Personality Match
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understanding your temperament and your partner's type can transform how you communicate, handle conflict, and build intimacy. Discover which combinations thrive together.
            </p>
          </div>

          {/* Dating by Type */}
          <div className="space-y-12 mb-16">
            {/* Sanguine Dating */}
            <section className="border-l-4 border-yellow-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Sanguine Dating: The Social Butterfly</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">What Sanguines Look For:</strong> Sanguines need excitement, variety, and someone who can keep up with their social energy. They're attracted to people who are fun, spontaneous, and can engage in witty banter.
                </p>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Sanguine Dating Tips</p>
                  <ul className="text-sm space-y-1">
                    <li>• Plan dates with novelty and social elements</li>
                    <li>• Use humor and keep conversations light (initially)</li>
                    <li>• Show enthusiasm and match their energy</li>
                    <li>• Don't need to be alone to feel connected</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Sanguine Challenges:</strong> Sanguines can appear shallow or uncommitted. They struggle with depth, vulnerability, and monogamy. They need partners who can ground them without feeling suffocated.
                </p>
                <p>
                  <strong className="text-foreground">Best Matches:</strong> Choleric (shared enthusiasm), Phlegmatic (calming influence), other Sanguines (shared energy)
                </p>
              </div>
            </section>

            {/* Choleric Dating */}
            <section className="border-l-4 border-red-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Choleric Dating: The Strong Leader</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">What Cholerics Look For:</strong> Cholerics are attracted to competence and independence. They respect partners who have their own goals and won't be clingy. They want someone they can respect and build something with.
                </p>
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Choleric Dating Tips</p>
                  <ul className="text-sm space-y-1">
                    <li>• Show competence and have your own ambitions</li>
                    <li>• Don't play games or be manipulative</li>
                    <li>• Be direct about your feelings</li>
                    <li>• Respect their need for independence</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Choleric Challenges:</strong> Cholerics can be domineering and struggle to show vulnerability. They may prioritize achievement over emotional connection. They need partners who won't be intimidated by their strength.
                </p>
                <p>
                  <strong className="text-foreground">Best Matches:</strong> Phlegmatic (grounding influence), Melancholic (intellectual depth), other Cholerics (mutual respect)
                </p>
              </div>
            </section>

            {/* Melancholic Dating */}
            <section className="border-l-4 border-blue-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Melancholic Dating: The Deep Romantic</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">What Melancholics Look For:</strong> Melancholics crave depth, meaning, and emotional intimacy. They want to be truly understood. They're often idealistic about love and looking for their "soulmate."
                </p>
                <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Melancholic Dating Tips</p>
                  <ul className="text-sm space-y-1">
                    <li>• Engage in deep conversations about meaning and values</li>
                    <li>• Show consistency and follow through</li>
                    <li>• Be emotionally available and authentic</li>
                    <li>• Appreciate their sensitivity and introspection</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Melancholic Challenges:</strong> Melancholics can overthink relationships and create problems that don't exist. They struggle with joy and can be moody or withdrawn. They need reassurance that they're loved.
                </p>
                <p>
                  <strong className="text-foreground">Best Matches:</strong> Phlegmatic (stability), Choleric (grounding), other Melancholics (mutual understanding)
                </p>
              </div>
            </section>

            {/* Phlegmatic Dating */}
            <section className="border-l-4 border-green-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Phlegmatic Dating: The Steady Partner</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">What Phlegmatics Look For:</strong> Phlegmatics seek stability, loyalty, and a partner who is calm and predictable. They're not typically the pursuers—they move slowly and cautiously into relationships.
                </p>
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Phlegmatic Dating Tips</p>
                  <ul className="text-sm space-y-1">
                    <li>• Be patient and give them space</li>
                    <li>• Show you're reliable and consistent</li>
                    <li>• Don't push them for quick decisions</li>
                    <li>• Appreciate their loyalty once committed</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Phlegmatic Challenges:</strong> Phlegmatics can seem indifferent or uncommitted. They avoid conflict and may suppress their own needs. They need partners who will gently encourage them to express emotions.
                </p>
                <p>
                  <strong className="text-foreground">Best Matches:</strong> Choleric (motivation), Sanguine (energy), Melancholic (emotional depth)
                </p>
              </div>
            </section>
          </div>

          {/* Compatibility Matrix */}
          <div className="mb-16 bg-secondary/30 border border-border rounded-xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-6">Compatibility at a Glance</h3>
            <div className="space-y-4 text-sm">
              <p><strong>Most Compatible:</strong> Sanguine-Phlegmatic, Choleric-Phlegmatic, Melancholic-Choleric</p>
              <p><strong>Challenging But Workable:</strong> Same type combinations (require mutual understanding) and Sanguine-Melancholic (opposite energy)</p>
              <p><strong>Key Insight:</strong> Opposite temperaments can work beautifully if both partners appreciate what the other brings. Similarity makes connection easy but growth harder.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">Know Your Type, Know Your Match</h3>
            <p className="text-muted-foreground mb-6">
              Take the quiz and discover your temperament type for deeper relationship insights.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors"
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-serif font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/temperament-anxiety" className="group p-4 rounded-lg border border-border hover:border-pink-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-pink-400 transition-colors">Temperament & Anxiety</p>
                <p className="text-sm text-muted-foreground">Understand stress responses across types</p>
              </Link>
              <Link href="/blog" className="group p-4 rounded-lg border border-border hover:border-pink-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-pink-400 transition-colors">All Articles</p>
                <p className="text-sm text-muted-foreground">Explore the complete FourType educational library</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
