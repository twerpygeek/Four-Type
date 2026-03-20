'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Users, Brain, Sparkles, ChevronRight, Play } from 'lucide-react'
import RuneBackground from '@/components/RuneBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const temperaments = [
  {
    key: 'sanguine',
    title: 'The Bard',
    name: 'Sanguine',
    color: '#FFD700',
    bgGlow: 'from-[#FFD700]/20 to-transparent',
    description: 'The enthusiastic connector who lights up every room with infectious energy and optimism.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
    traits: ['Charismatic', 'Creative', 'Spontaneous'],
  },
  {
    key: 'choleric',
    title: 'The Commander',
    name: 'Choleric',
    color: '#E63946',
    bgGlow: 'from-[#E63946]/20 to-transparent',
    description: 'The natural leader who takes charge, drives results, and turns vision into reality.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
    traits: ['Decisive', 'Ambitious', 'Strategic'],
  },
  {
    key: 'melancholic',
    title: 'The Strategist',
    name: 'Melancholic',
    color: '#4CC9F0',
    bgGlow: 'from-[#4CC9F0]/20 to-transparent',
    description: 'The deep thinker who sees patterns others miss and holds the world to high standards.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    traits: ['Analytical', 'Perfectionist', 'Loyal'],
  },
  {
    key: 'phlegmatic',
    title: 'The Guardian',
    name: 'Phlegmatic',
    color: '#52B788',
    bgGlow: 'from-[#52B788]/20 to-transparent',
    description: 'The calm peacemaker who brings harmony, listens deeply, and holds teams together.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
    traits: ['Patient', 'Diplomatic', 'Reliable'],
  },
]

const features = [
  {
    icon: Brain,
    title: '2,500 Years of Wisdom',
    description: 'From Hippocrates to modern psychology, the temperaments have stood the test of time.',
  },
  {
    icon: Users,
    title: 'Understand Yourself & Others',
    description: 'Learn why you react the way you do, and how to connect better with every type.',
  },
  {
    icon: BookOpen,
    title: 'Actionable Insights',
    description: 'Practical strategies for growth, relationships, leadership, and daily life.',
  },
  {
    icon: Sparkles,
    title: '15 Unique Subtypes',
    description: 'Go beyond the basics with detailed blend profiles for deeper self-discovery.',
  },
]

const blogPosts = [
  {
    slug: 'history-of-temperaments',
    title: 'History of the 4 Temperaments',
    excerpt: 'From Hippocrates to modern psychology — a 2,500-year journey through personality science.',
    category: 'History',
    readTime: '8 min',
  },
  {
    slug: 'leadership-and-temperament',
    title: 'Temperament and Leadership',
    excerpt: 'How each temperament leads differently, and how to develop your leadership style.',
    category: 'Leadership',
    readTime: '6 min',
  },
  {
    slug: 'temperaments-vs-mbti-big-five',
    title: '4 Temperaments vs MBTI vs Big Five',
    excerpt: 'How the major personality systems compare and which one is right for you.',
    category: 'Comparison',
    readTime: '7 min',
  },
]

export default function HomePage() {
  const [hoveredTemp, setHoveredTemp] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <RuneBackground />
        
        {/* ── Hero Section ── */}
        <section ref={heroRef} className="relative flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">

          {/* Radial dark vignette on edges */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_50%,rgba(13,13,15,0.85)_100%)]" />

          <div className="relative z-10 w-full flex flex-col items-center px-4">

            {/* ── Top ornament: lines + star ── */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-[#FFD700]/50" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="#FFD700" />
              </svg>
              <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-[#FFD700]/50" />
            </div>

            {/* ── Tagline ── */}
            <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.45em] uppercase mb-4"
              style={{ color: '#c9a227' }}>
              Know Your True Nature
            </p>

            {/* ── FOURTYPE glow title ── */}
            <h1
              className="font-serif font-black text-center leading-[0.9] mb-4 select-none"
              style={{
                fontSize: 'clamp(3.8rem, 13vw, 9.5rem)',
                color: '#FFD700',
                textShadow: [
                  '0 0 12px #FFE566',
                  '0 0 30px #FFD700',
                  '0 0 60px #FFA500',
                  '0 0 100px #FF7700',
                  '0 0 140px #cc5500',
                  '3px 3px 0 rgba(80,40,0,0.6)',
                ].join(', '),
              }}
            >
              FOURTYPE
            </h1>

            {/* ── Subtitle ── */}
            <p className="font-serif text-lg sm:text-xl text-foreground/55 tracking-[0.18em] mb-4">
              The Temperament Quest
            </p>

            {/* ── Diamond divider ── */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                <path d="M4.5 0L9 4.5L4.5 9L0 4.5Z" fill="#FFD700" fillOpacity="0.7" />
              </svg>
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
            </div>

            {/* ── Video frame with gold L-bracket corners ── */}
            <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-[680px] mx-auto mb-10">
              {/* L-bracket corners — each is two absolutely-positioned spans */}
              {/* top-left */}
              <span className="pointer-events-none absolute -top-[10px] -left-[10px] w-7 h-7 border-t-2 border-l-2 border-[#FFD700]/75" />
              {/* top-right */}
              <span className="pointer-events-none absolute -top-[10px] -right-[10px] w-7 h-7 border-t-2 border-r-2 border-[#FFD700]/75" />
              {/* bottom-left */}
              <span className="pointer-events-none absolute -bottom-[10px] -left-[10px] w-7 h-7 border-b-2 border-l-2 border-[#FFD700]/75" />
              {/* bottom-right */}
              <span className="pointer-events-none absolute -bottom-[10px] -right-[10px] w-7 h-7 border-b-2 border-r-2 border-[#FFD700]/75" />

              {/* Video container */}
              <div
                className="overflow-hidden bg-black"
                style={{
                  aspectRatio: '16/9',
                  boxShadow: '0 0 0 1px rgba(255,215,0,0.18), 0 8px 48px rgba(0,0,0,0.7)',
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok-video-a2da9931-dd77-40ca-b351-adddc5cc3a08-PYDgy4CNaLVdiZe0hjEl7V7Jxejpnr.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* ── "Find Your True Nature" ── */}
            <p className="font-serif text-base sm:text-lg tracking-[0.2em] mb-20"
              style={{ color: 'rgba(255,215,0,0.55)' }}>
              Find Your True Nature
            </p>

            {/* ── CHOOSE YOUR PATH + character cards ── */}
            <div className="w-full max-w-5xl mx-auto">
              {/* Section rule with label */}
              <div className="flex items-center gap-5 justify-center mb-12">
                <div className="h-px flex-1 max-w-[220px] bg-foreground/12" />
                <p className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] uppercase text-foreground/35 whitespace-nowrap">
                  Choose Your Path
                </p>
                <div className="h-px flex-1 max-w-[220px] bg-foreground/12" />
              </div>

              {/* 4 character columns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {temperaments.map((temp) => (
                  <Link
                    key={temp.key}
                    href={`/temperament/${temp.key}`}
                    className="group flex flex-col items-center gap-3"
                    onMouseEnter={() => setHoveredTemp(temp.key)}
                    onMouseLeave={() => setHoveredTemp(null)}
                  >
                    {/* Character with colour glow underneath */}
                    <div className="relative flex items-end justify-center h-44 sm:h-56 w-full">
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-2xl transition-opacity duration-300"
                        style={{
                          backgroundColor: temp.color,
                          opacity: hoveredTemp === temp.key ? 0.4 : 0.13,
                        }}
                      />
                      <Image
                        src={temp.image}
                        alt={temp.title}
                        width={170}
                        height={210}
                        className="relative object-contain drop-shadow-2xl transition-transform duration-300 group-hover:-translate-y-3"
                      />
                    </div>

                    {/* Bordered name card */}
                    <div
                      className="w-full px-3 py-3 text-center transition-all duration-300"
                      style={{
                        border: `1px solid ${temp.color}`,
                        boxShadow: hoveredTemp === temp.key
                          ? `0 0 16px ${temp.color}70, inset 0 0 12px ${temp.color}15`
                          : `0 0 5px ${temp.color}28`,
                        backgroundColor: hoveredTemp === temp.key ? `${temp.color}0f` : 'transparent',
                      }}
                    >
                      <p
                        className="font-serif text-sm sm:text-base font-bold tracking-[0.15em] uppercase"
                        style={{ color: temp.color }}
                      >
                        {temp.title}
                      </p>
                      <p className="font-sans text-xs text-foreground/45 mt-0.5">
                        {temp.name}
                      </p>
                    </div>

                    {/* Animated hover info panel */}
                    <div
                      className="w-full px-3 text-center overflow-hidden transition-all duration-300"
                      style={{
                        border: hoveredTemp === temp.key ? `1px solid ${temp.color}50` : '1px solid transparent',
                        backgroundColor: `${temp.color}0A`,
                        maxHeight: hoveredTemp === temp.key ? '130px' : '0px',
                        opacity: hoveredTemp === temp.key ? 1 : 0,
                        paddingTop: hoveredTemp === temp.key ? '0.625rem' : '0',
                        paddingBottom: hoveredTemp === temp.key ? '0.625rem' : '0',
                      }}
                    >
                      <p className="font-sans text-[11px] text-foreground/65 leading-relaxed mb-2">
                        {temp.description}
                      </p>
                      <div className="flex gap-1 flex-wrap justify-center">
                        {temp.traits.map((t) => (
                          <span
                            key={t}
                            className="font-sans text-[10px] px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${temp.color}22`, color: temp.color }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="mt-16 flex flex-col items-center gap-3">
              <Link
                href="/quiz"
                className="group flex items-center gap-2 px-9 py-3 font-sans font-semibold text-sm tracking-wide rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#FFD700',
                  color: '#0D0D0F',
                  boxShadow: '0 0 24px rgba(255,215,0,0.38)',
                }}
              >
                Take the Free Quiz
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

        {/* The Four Types Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                The Four Types
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each temperament represents a fundamental pattern of personality that shapes how you think, feel, and act.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {temperaments.map((temp) => (
                <Link
                  key={temp.key}
                  href={`/temperament/${temp.key}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1"
                  style={{ '--temp-color': temp.color } as React.CSSProperties}
                >
                  {/* Glow effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${temp.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  
                  <div className="relative p-6 lg:p-8 flex gap-6">
                    {/* Character */}
                    <div className="relative w-24 h-32 flex-shrink-0">
                      <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
                        style={{ backgroundColor: temp.color }}
                      />
                      <Image
                        src={temp.image}
                        alt={temp.title}
                        fill
                        className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${temp.color}20`, color: temp.color }}
                        >
                          {temp.name}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {temp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {temp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {temp.traits.map((trait) => (
                          <span
                            key={trait}
                            className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 self-center" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 lg:py-32 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Why Study Temperaments?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding your temperament is the first step to understanding yourself and connecting with others.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Latest Insights
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore the science, history, and practical applications of temperament theory.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View all articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
                      Read more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="sm:hidden flex items-center justify-center gap-2 mt-8 text-primary hover:underline font-medium"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-[#E63946]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Discover Your Type?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Take our comprehensive temperament assessment and receive detailed insights about your personality, 
              strengths, and growth areas.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
