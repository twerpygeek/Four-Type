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
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden">

          {/* Subtle radial vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_40%,#0D0D0F_100%)]" />

          <div className="relative z-10 w-full flex flex-col items-center px-4">

            {/* ── Top ornament: lines + star ── */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-primary/60" />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="#FFD700" />
              </svg>
              <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-primary/60" />
            </div>

            {/* ── Tagline ── */}
            <p className="text-xs sm:text-sm font-medium tracking-[0.35em] uppercase text-primary/70 mb-4 font-sans">
              Know Your True Nature
            </p>

            {/* ── FOURTYPE glow title ── */}
            <h1 className="font-serif font-black text-center leading-none mb-5 select-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: '#FFD700',
                textShadow: `
                  0 0 20px #FFD700,
                  0 0 40px #FFB300,
                  0 0 80px #FF8C00,
                  0 0 120px #FF6600,
                  2px 2px 0 #7a4e00
                `,
              }}
            >
              FOURTYPE
            </h1>

            {/* ── Subtitle ── */}
            <p className="font-serif text-lg sm:text-2xl text-foreground/70 tracking-widest mb-5">
              The Temperament Quest
            </p>

            {/* ── Diamond divider ── */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-10 sm:w-20 bg-primary/30" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 0L10 5L5 10L0 5Z" fill="#FFD700" fillOpacity="0.8" />
              </svg>
              <div className="h-px w-10 sm:w-20 bg-primary/30" />
            </div>

            {/* ── Video frame with gold L-bracket corners ── */}
            <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto mb-10">
              {/* L-bracket corners */}
              <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary/80 pointer-events-none" />
              <span className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/80 pointer-events-none" />
              <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/80 pointer-events-none" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary/80 pointer-events-none" />

              {/* Video */}
              <div className="overflow-hidden rounded bg-black aspect-video"
                style={{ boxShadow: '0 0 40px rgba(255,215,0,0.08), 0 0 1px rgba(255,215,0,0.3)' }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok-video-a2da9931-dd77-40ca-b351-adddc5cc3a08-tiKxL7ZkSPMBtfTWvRilrBR5Q1UAoe.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* ── "Find Your True Nature" ── */}
            <p className="font-serif text-base sm:text-lg text-foreground/60 tracking-widest mb-16">
              Find Your True Nature
            </p>

            {/* ── CHOOSE YOUR PATH + character cards ── */}
            <div className="w-full max-w-5xl mx-auto">
              {/* Section header with side lines */}
              <div className="flex items-center gap-4 justify-center mb-10">
                <div className="h-px flex-1 max-w-xs bg-foreground/15" />
                <p className="text-xs sm:text-sm font-medium tracking-[0.4em] uppercase text-foreground/40 font-sans whitespace-nowrap">
                  Choose Your Path
                </p>
                <div className="h-px flex-1 max-w-xs bg-foreground/15" />
              </div>

              {/* Characters row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {temperaments.map((temp) => (
                  <Link
                    key={temp.key}
                    href={`/temperament/${temp.key}`}
                    className="group flex flex-col items-center gap-3"
                    onMouseEnter={() => setHoveredTemp(temp.key)}
                    onMouseLeave={() => setHoveredTemp(null)}
                  >
                    {/* Character image with radial glow */}
                    <div className="relative flex items-end justify-center h-40 sm:h-52 w-full">
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl transition-opacity duration-300"
                        style={{
                          backgroundColor: temp.color,
                          opacity: hoveredTemp === temp.key ? 0.35 : 0.12,
                        }}
                      />
                      <Image
                        src={temp.image}
                        alt={temp.title}
                        width={160}
                        height={200}
                        className="relative object-contain drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-2"
                      />
                    </div>

                    {/* Name card with border */}
                    <div
                      className="w-full rounded px-3 py-3 text-center transition-all duration-300"
                      style={{
                        border: `1px solid ${temp.color}`,
                        boxShadow: hoveredTemp === temp.key
                          ? `0 0 14px ${temp.color}80, inset 0 0 10px ${temp.color}18`
                          : `0 0 6px ${temp.color}30`,
                        backgroundColor: hoveredTemp === temp.key
                          ? `${temp.color}12`
                          : 'transparent',
                      }}
                    >
                      <p
                        className="font-serif text-sm sm:text-base font-bold tracking-widest uppercase transition-colors duration-200"
                        style={{ color: temp.color }}
                      >
                        {temp.title}
                      </p>
                      <p className="text-xs text-foreground/50 mt-0.5 font-sans">
                        {temp.name}
                      </p>
                    </div>

                    {/* Hover description */}
                    <div
                      className="w-full rounded px-3 py-3 text-center transition-all duration-300 overflow-hidden"
                      style={{
                        border: `1px solid ${temp.color}60`,
                        backgroundColor: `${temp.color}0D`,
                        maxHeight: hoveredTemp === temp.key ? '120px' : '0px',
                        opacity: hoveredTemp === temp.key ? 1 : 0,
                        paddingTop: hoveredTemp === temp.key ? '0.75rem' : '0',
                        paddingBottom: hoveredTemp === temp.key ? '0.75rem' : '0',
                      }}
                    >
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        {temp.description}
                      </p>
                      <div className="flex gap-1 flex-wrap justify-center">
                        {temp.traits.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full font-sans"
                            style={{ backgroundColor: `${temp.color}25`, color: temp.color }}
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
            <div className="mt-16 flex flex-col items-center gap-4">
              <Link
                href="/quiz"
                className="group flex items-center gap-2 px-8 py-3 font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 font-sans text-sm tracking-wide"
                style={{
                  backgroundColor: '#FFD700',
                  color: '#0D0D0F',
                  boxShadow: '0 0 20px rgba(255,215,0,0.35)',
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
