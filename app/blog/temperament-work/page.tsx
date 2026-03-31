import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Temperament at Work: Team Building & Productivity by Type | FourType',
  description: 'Boost team performance using temperament types. Learn productivity strategies, leadership approaches, and team dynamics for sanguine, choleric, melancholic, and phlegmatic personalities.',
  keywords: ['temperament work', 'team building personality', 'workplace productivity by type', 'temperament leadership', 'team dynamics'],
  openGraph: {
    title: 'Temperament at Work: Build Better Teams',
    description: 'Harness temperament types to improve team dynamics, productivity, and leadership effectiveness.',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['FourType'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Temperament at Work: Team Building & Productivity by Type',
  description: 'Discover how to leverage temperament types for better team dynamics and workplace productivity.',
  image: 'https://www.fourtype.com/og-image.jpg',
  datePublished: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'FourType',
    url: 'https://www.fourtype.com',
  },
}

export default function TemperamentWorkPage() {
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
              <Briefcase className="w-6 h-6 text-green-400" />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Work & Teams</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Temperament at Work: Build Better Teams
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every temperament brings unique strengths to the workplace. Learn how to leverage each type's natural talents, assign roles strategically, and build balanced teams that outperform.
            </p>
          </div>

          {/* Work Style by Type */}
          <div className="space-y-12 mb-16">
            {/* Sanguine at Work */}
            <section className="border-l-4 border-yellow-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Sanguine at Work: The Energizer & Connector</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Natural Strengths:</strong> Sanguines are your team's morale boosters. They excel in sales, marketing, client relations, and networking. They're natural presenters and can energize sluggish projects.
                </p>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Ideal Sanguine Roles</p>
                  <ul className="text-sm space-y-1">
                    <li>• Sales & Business Development</li>
                    <li>• Marketing & Communications</li>
                    <li>• Event Planning & Facilitation</li>
                    <li>• Client Relations & Support</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Management Challenge:</strong> Sanguines struggle with follow-through, detail work, and working alone. They need accountability systems and deadline reminders. Pair them with detail-oriented team members.
                </p>
                <p>
                  <strong className="text-foreground">Motivation:</strong> Recognition, variety, and social interaction keep Sanguines engaged. Isolate them or bore them, and they lose interest.
                </p>
              </div>
            </section>

            {/* Choleric at Work */}
            <section className="border-l-4 border-red-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Choleric at Work: The Strategic Leader</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Natural Strengths:</strong> Cholerics are your high performers and natural leaders. They set goals, drive results, and inspire teams through their confidence. They excel in roles requiring decisiveness and accountability.
                </p>
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Ideal Choleric Roles</p>
                  <ul className="text-sm space-y-1">
                    <li>• Executive Leadership & Management</li>
                    <li>• Project Management</li>
                    <li>• Strategic Planning</li>
                    <li>• Entrepreneurship & Startup Roles</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Management Challenge:</strong> Cholerics can be overbearing and dismissive of others' ideas. They may burn out from overwork. They need feedback that their approach can alienate teammates.
                </p>
                <p>
                  <strong className="text-foreground">Motivation:</strong> Clear goals, measurable results, and autonomy drive Cholerics. Micromanagement or lack of progress will frustrate them.
                </p>
              </div>
            </section>

            {/* Melancholic at Work */}
            <section className="border-l-4 border-blue-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Melancholic at Work: The Strategist & Perfectionist</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Natural Strengths:</strong> Melancholics bring depth, creativity, and quality to work. They excel in analytical roles, design, research, and anything requiring problem-solving and attention to detail.
                </p>
                <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Ideal Melancholic Roles</p>
                  <ul className="text-sm space-y-1">
                    <li>• Software Engineering & Development</li>
                    <li>• Research & Analysis</li>
                    <li>• Design & Creative Strategy</li>
                    <li>• Quality Assurance & Systems</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Management Challenge:</strong> Melancholics can get stuck perfecting projects and miss deadlines. They overthink decisions and struggle in collaborative, fast-paced environments. They need frameworks and decision criteria.
                </p>
                <p>
                  <strong className="text-foreground">Motivation:</strong> Meaningful work, appreciation for quality, and autonomy motivate Melancholics. Recognition for their insights is important.
                </p>
              </div>
            </section>

            {/* Phlegmatic at Work */}
            <section className="border-l-4 border-green-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Phlegmatic at Work: The Reliable Stabilizer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Natural Strengths:</strong> Phlegmatics are your team's backbone—reliable, consistent, and cooperative. They excel in roles requiring patience, care, and steady execution. They prevent chaos and maintain morale.
                </p>
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Ideal Phlegmatic Roles</p>
                  <ul className="text-sm space-y-1">
                    <li>• Operations & Administration</li>
                    <li>• Human Resources & Support</li>
                    <li>• Customer Service & Care</li>
                    <li>• Process Management</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Management Challenge:</strong> Phlegmatics can lack initiative and avoid taking on stretch assignments. They may allow themselves to be overloaded without speaking up. They need encouragement to voice opinions and take risks.
                </p>
                <p>
                  <strong className="text-foreground">Motivation:</strong> Stability, appreciation, and a harmonious environment keep Phlegmatics engaged. Public recognition and gentle career development conversations help them grow.
                </p>
              </div>
            </section>
          </div>

          {/* Building Balanced Teams */}
          <div className="mb-16 bg-secondary/30 border border-border rounded-xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-6">Building the Ideal Team Mix</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">The Balanced Team Has:</strong>
              </p>
              <ul className="space-y-2">
                <li>• <strong>A Choleric</strong> to set vision and drive results</li>
                <li>• <strong>A Melancholic</strong> to ensure quality and think strategically</li>
                <li>• <strong>A Sanguine</strong> to maintain energy and external relationships</li>
                <li>• <strong>A Phlegmatic</strong> to stabilize and ensure harmony</li>
              </ul>
              <p className="pt-4">
                While you can't always hire by temperament, understanding your team's composition helps you assign roles strategically and fill gaps with partnerships.
              </p>
            </div>
          </div>

          {/* Conflict Resolution */}
          <div className="mb-16 bg-secondary/30 border border-border rounded-xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-4">Managing Temperament Conflict</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Sanguine vs. Melancholic:</strong> Sanguine's superficiality frustrates the thoughtful Melancholic. Bridge them by asking Sanguine to go deeper and validating Melancholic's concerns.</p>
              <p><strong className="text-foreground">Choleric vs. Phlegmatic:</strong> Choleric's pace overwhelms Phlegmatic. Give Phlegmatic time and autonomy; ask Choleric to slow down and include input.</p>
              <p><strong className="text-foreground">Same Type Conflicts:</strong> Two Cholerics compete for leadership; two Melancholics compete over standards. Clarify roles and separate domains.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">Unlock Your Team's Full Potential</h3>
            <p className="text-muted-foreground mb-6">
              Have your team take the temperament quiz to build stronger, more effective working relationships.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-serif font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/leadership-and-temperament" className="group p-4 rounded-lg border border-border hover:border-green-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-green-400 transition-colors">Leadership & Temperament</p>
                <p className="text-sm text-muted-foreground">Leadership styles across the four types</p>
              </Link>
              <Link href="/blog" className="group p-4 rounded-lg border border-border hover:border-green-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-green-400 transition-colors">All Articles</p>
                <p className="text-sm text-muted-foreground">Explore the complete FourType educational library</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
