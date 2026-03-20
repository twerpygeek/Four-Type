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
        
        {/* Hero Section - FourType Landing */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4CC9F0]/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
            {/* Tagline */}
            <div className="text-center mb-4">
              <p className="text-sm sm:text-base text-primary/80 font-medium tracking-widest uppercase letter-spacing">
                Know Your True Nature
              </p>
            </div>

            {/* Logo */}
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-primary via-[#FFD700] to-primary bg-clip-text text-transparent drop-shadow-lg">
                FOURTYPE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-center text-lg sm:text-xl text-muted-foreground mb-12 font-light tracking-wide">
              The Temperament Quest
            </p>

            {/* Center Video with Decorative Border */}
            <div className="relative w-full max-w-3xl mx-auto mb-16">
              {/* Decorative corners */}
              <div className="absolute -top-6 -left-6 w-8 h-8 border-t-2 border-l-2 border-primary/40" />
              <div className="absolute -top-6 -right-6 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
              <div className="absolute -bottom-6 -left-6 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
              <div className="absolute -bottom-6 -right-6 w-8 h-8 border-b-2 border-r-2 border-primary/40" />

              {/* Video Container */}
              <div className="relative bg-black/60 rounded-lg overflow-hidden aspect-video border border-primary/20">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok-video-a2da9931-dd77-40ca-b351-adddc5cc3a08-tiKxL7ZkSPMBtfTWvRilrBR5Q1UAoe.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Character Cards Section */}
            <div className="w-full">
              <p className="text-center text-muted-foreground mb-10 text-sm sm:text-base tracking-wide">
                Find Your True Nature
              </p>

              {/* Character Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
                {temperaments.map((temp) => (
                  <Link
                    key={temp.key}
                    href={`/temperament/${temp.key}`}
                    className="group relative flex flex-col items-center transition-all duration-300"
                    onMouseEnter={() => setHoveredTemp(temp.key)}
                    onMouseLeave={() => setHoveredTemp(null)}
                  >
                    {/* Glowing Border Box */}
                    <div 
                      className={`relative w-full aspect-square mb-4 transition-all duration-300 ${
                        hoveredTemp === temp.key ? 'scale-105' : ''
                      }`}
                      style={{
                        border: `2px solid ${temp.color}`,
                        borderRadius: '0.5rem',
                        boxShadow: hoveredTemp === temp.key 
                          ? `0 0 20px ${temp.color}, inset 0 0 20px ${temp.color}20` 
                          : `0 0 10px ${temp.color}40`,
                        backgroundColor: hoveredTemp === temp.key ? `${temp.color}10` : 'transparent',
                      }}
                    >
                      {/* Glow effect background */}
                      <div 
                        className="absolute inset-0 rounded opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-xl"
                        style={{ backgroundColor: temp.color }}
                      />
                      
                      {/* Character Image */}
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <Image
                          src={temp.image}
                          alt={temp.title}
                          width={200}
                          height={240}
                          className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Hover Info Box */}
                      <div 
                        className={`absolute -bottom-40 left-1/2 -translate-x-1/2 w-48 p-4 rounded-lg border transition-all duration-300 pointer-events-none ${
                          hoveredTemp === temp.key 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-2'
                        }`}
                        style={{
                          backgroundColor: `${temp.color}15`,
                          borderColor: temp.color,
                        }}
                      >
                        <p className="text-xs sm:text-sm text-foreground font-medium text-center">
                          {temp.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1 justify-center">
                          {temp.traits.slice(0, 2).map((trait) => (
                            <span
                              key={trait}
                              className="text-xs px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: `${temp.color}30`,
                                color: temp.color,
                              }}
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Title and Type */}
                    <h3 
                      className="font-serif text-base sm:text-lg font-bold text-center transition-colors duration-300"
                      style={{ color: hoveredTemp === temp.key ? temp.color : '#E5E7EB' }}
                    >
                      {temp.title}
                    </h3>
                    <p 
                      className="text-xs sm:text-sm text-muted-foreground text-center"
                      style={{ color: temp.color }}
                    >
                      {temp.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Centered CTA */}
            <div className="mt-20 flex flex-col items-center gap-6">
              <Link
                href="/quiz"
                className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Take the Free Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/manifesto"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Learn More About Temperaments
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
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
