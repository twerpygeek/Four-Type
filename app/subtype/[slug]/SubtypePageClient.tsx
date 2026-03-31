'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Flame, Wind, Mountain, Droplets, BookOpen, Target, Heart, Users, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RuneBackground from '@/components/RuneBackground'
import { Subtype, getSubtypeColor } from '@/lib/subtypes'

interface SubtypePageClientProps {
  subtype: Subtype
}

export default function SubtypePageClient({ subtype }: SubtypePageClientProps) {
  const color = getSubtypeColor(subtype.primary)
  const secondaryColor = subtype.secondary ? getSubtypeColor(subtype.secondary) : null
  
  // Determine element icon
  const ElementIcon = subtype.element === 'Fire' ? Flame :
                     subtype.element === 'Air' ? Wind :
                     subtype.element === 'Earth' ? Mountain :
                     subtype.element === 'Water' ? Droplets : null

  return (
    <div className="min-h-screen bg-background">
      <RuneBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <Link href="/blog/subtypes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Subtypes
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Character Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20`, borderColor: color, borderWidth: '2px' }}>
                  {ElementIcon && <ElementIcon className="w-6 h-6" style={{ color }} />}
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{subtype.primary}</span>
              </div>
              
              <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4" style={{ color }}>
                {subtype.name}
              </h1>
              
              <p className="text-2xl text-muted-foreground mb-6 italic">
                {subtype.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {subtype.description}
              </p>
              
              {/* Core Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                  <div>
                    <h3 className="font-semibold mb-1">Core Drive</h3>
                    <p className="text-muted-foreground">{subtype.coreDrive}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                  <div>
                    <h3 className="font-semibold mb-1">Superpower</h3>
                    <p className="text-muted-foreground">{subtype.superpower}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                  <div>
                    <h3 className="font-semibold mb-1">Kryptonite</h3>
                    <p className="text-muted-foreground">{subtype.kryptonite}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Character Stats Card */}
            <div className="relative">
              <div
                className="rounded-2xl border-2 p-8 space-y-6"
                style={{
                  backgroundColor: `${color}0a`,
                  borderColor: `${color}40`,
                }}
              >
                <div className="space-y-2 border-b pb-6" style={{ borderColor: `${color}20` }}>
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Characteristics</h2>
                  <p className="text-sm text-muted-foreground">{subtype.characterization}</p>
                </div>
                
                <div className="space-y-4">
                  {subtype.strengths && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color }}>
                        <Sparkles className="w-4 h-4" /> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {subtype.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {subtype.challenges && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color }}>
                        <Target className="w-4 h-4" /> Challenges
                      </h3>
                      <ul className="space-y-2">
                        {subtype.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Communication & Interaction */}
          {subtype.communicationStyle && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="rounded-xl border p-6" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
                <h3 className="font-serif text-2xl font-bold mb-4" style={{ color }}>Communication Style</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-foreground">Pace:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.pace}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">Tone:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.tone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">Preferred Input:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.preferredInput}</p>
                  </div>
                  {subtype.communicationStyle.petPeeve && (
                    <div>
                      <span className="text-sm font-semibold text-foreground">Pet Peeve:</span>
                      <p className="text-muted-foreground">{subtype.communicationStyle.petPeeve}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {subtype.relationshipStyle && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: secondaryColor ? `${secondaryColor}05` : `${color}05`, borderColor: secondaryColor ? `${secondaryColor}20` : `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: secondaryColor || color }}>Relationship Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">{subtype.relationshipStyle}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Career & Growth */}
          {(subtype.idealCareers || subtype.growthPath) && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {subtype.idealCareers && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color }}>Ideal Careers</h3>
                  <ul className="space-y-2">
                    {subtype.idealCareers.map((career, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {subtype.growthPath && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: secondaryColor ? `${secondaryColor}05` : `${color}05`, borderColor: secondaryColor ? `${secondaryColor}20` : `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: secondaryColor || color }}>Path to Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">{subtype.growthPath}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Famous Examples */}
          {subtype.famousExamples && subtype.famousExamples.length > 0 && (
            <div className="rounded-xl border p-8 mb-16" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
              <h3 className="font-serif text-2xl font-bold mb-6" style={{ color }}>Notable Examples</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subtype.famousExamples.map((example, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: `${color}10` }}>
                    <p className="font-semibold text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Motto */}
          {subtype.motto && (
            <div className="text-center py-12 border-t border-b" style={{ borderColor: `${color}20` }}>
              <p className="text-2xl font-serif italic text-muted-foreground mb-3">
                "{subtype.motto}"
              </p>
              <p className="text-sm text-muted-foreground">The essence of {subtype.name}</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-4">Discover Your Type</h2>
          <p className="text-muted-foreground mb-8">Not sure if this is your temperament? Take our comprehensive quiz to find out.</p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: color, color: '#0D0D0F' }}
          >
            Take the Quiz
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
