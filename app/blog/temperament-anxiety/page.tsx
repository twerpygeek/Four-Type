import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Brain, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Temperament & Anxiety: How Your Type Affects Stress | FourType',
  description: 'Discover how the four temperament types experience and manage anxiety differently. Learn stress triggers and coping strategies for sanguine, choleric, melancholic, and phlegmatic personalities.',
  keywords: ['temperament anxiety', 'anxiety by personality type', 'stress management temperament', 'melancholic anxiety', 'choleric stress'],
  openGraph: {
    title: 'Temperament & Anxiety: Understanding Your Stress Response',
    description: 'Learn how each temperament type experiences anxiety and discover evidence-based coping strategies.',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['FourType'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Temperament & Anxiety: How Your Type Affects Stress Response',
  description: 'Discover how the four temperament types experience and manage anxiety differently.',
  image: 'https://www.fourtype.com/og-image.jpg',
  datePublished: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'FourType',
    url: 'https://www.fourtype.com',
  },
}

export default function TemperamentAnxietyPage() {
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
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Mental Health</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Temperament & Anxiety: How Your Type Affects Stress
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Anxiety manifests differently across temperament types. Understanding your temperament's stress response can transform how you manage worry, fear, and overwhelm.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 mb-16">
            {/* Sanguine */}
            <section className="border-l-4 border-yellow-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Sanguine: Anxiety Through Overstimulation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The Sanguine Trap:</strong> Sanguines experience anxiety not through worry, but through restlessness and inability to sit still. Their anxiety manifests as constant motion, excessive talking, and jumping between activities.
                </p>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Sanguine Stress Triggers</p>
                  <ul className="text-sm space-y-1">
                    <li>• Boring or repetitive tasks with no variety</li>
                    <li>• Being alone or isolated for extended periods</li>
                    <li>• Slow-moving situations (waiting, bureaucracy)</li>
                    <li>• Loss of attention or social rejection</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Recovery Strategy:</strong> Sanguines need movement, social connection, and novelty. High-energy activities, group sports, and frequent social events actually reduce their anxiety. Structure and routine feel suffocating—they need flexibility and stimulation.
                </p>
              </div>
            </section>

            {/* Choleric */}
            <section className="border-l-4 border-red-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Choleric: Anxiety as Loss of Control</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The Choleric Fear:</strong> Cholerics experience anxiety when they cannot control outcomes. Obstacles, incompetent people, and situations requiring patience trigger their stress response. They become aggressive or domineer to regain control.
                </p>
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Choleric Stress Triggers</p>
                  <ul className="text-sm space-y-1">
                    <li>• Obstacles or delays in reaching goals</li>
                    <li>• Incompetence or resistance from others</li>
                    <li>• Being told what to do (loss of autonomy)</li>
                    <li>• Lack of measurable progress</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Recovery Strategy:</strong> Cholerics need clear goals, autonomy, and measurable progress. Channel their anxiety into productive projects where they can lead and make decisions. Competition and achievement-focused activities help them process stress.
                </p>
              </div>
            </section>

            {/* Melancholic */}
            <section className="border-l-4 border-blue-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Melancholic: Anxiety as Perfectionism & Self-Doubt</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The Melancholic Burden:</strong> Melancholics experience chronic anxiety tied to perfectionism, self-criticism, and catastrophic thinking. They anticipate problems and obsess over details, creating a feedback loop of worry.
                </p>
                <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Melancholic Stress Triggers</p>
                  <ul className="text-sm space-y-1">
                    <li>• Fear of failure or making mistakes</li>
                    <li>• Perfectionism and high personal standards</li>
                    <li>• Criticism (real or perceived)</li>
                    <li>• Uncertainty and lack of clear expectations</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Recovery Strategy:</strong> Melancholics need to practice self-compassion and allow imperfection. Creative outlets, depth work they care about, and professional help (therapy, coaching) are valuable. They benefit from clear structure and knowing exactly what's expected.
                </p>
              </div>
            </section>

            {/* Phlegmatic */}
            <section className="border-l-4 border-green-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Phlegmatic: Anxiety as Avoidance & Shutdown</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The Phlegmatic Withdrawal:</strong> Phlegmatics experience anxiety differently—as avoidance. When stressed, they shut down emotionally, withdraw from relationships, or become passively resistant. Their anxiety is quiet and internal.
                </p>
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Phlegmatic Stress Triggers</p>
                  <ul className="text-sm space-y-1">
                    <li>• Conflict or confrontation</li>
                    <li>• Being forced into the spotlight</li>
                    <li>• Rapid change or unpredictability</li>
                    <li>• Emotional intensity from others</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Recovery Strategy:</strong> Phlegmatics need safe spaces and gradual change. Gentle exercise, nature time, and one-on-one connection (not group activities) help. They need permission to take breaks and reassurance that conflict won't destroy relationships.
                </p>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">Discover Your Temperament's Anxiety Pattern</h3>
            <p className="text-muted-foreground mb-6">
              Understanding your type is the first step to managing stress more effectively.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Take the Temperament Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-serif font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/temperaments-vs-mbti-big-five" className="group p-4 rounded-lg border border-border hover:border-blue-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">Temperament vs. MBTI & Big Five</p>
                <p className="text-sm text-muted-foreground">Why temperament is more predictive for mental health outcomes</p>
              </Link>
              <Link href="/blog" className="group p-4 rounded-lg border border-border hover:border-blue-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">All Articles</p>
                <p className="text-sm text-muted-foreground">Explore the complete FourType educational library</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
