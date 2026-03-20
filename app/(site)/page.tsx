'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Users, Brain, Sparkles, ChevronRight, Play } from 'lucide-react'
import RuneBackground from '@/components/RuneBackground'

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
    <main className="min-h-screen bg-background">
      <RuneBackground />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4CC9F0]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Ancient wisdom, modern understanding</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            <span className="text-balance">Know Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-[#E63946] to-[#4CC9F0] bg-clip-text text-transparent">
              True Nature
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100">
            Discover which of the four temperaments shapes your personality, decisions, and relationships. 
            Take the quiz and unlock insights that have guided humanity for over 2,500 years.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link
              href="/quiz"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Take the Free Quiz
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/manifesto"
              className="group flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border border-border"
            >
              <Play className="w-5 h-5" />
              Read the Manifesto
            </Link>
          </div>

          {/* Floating character preview */}
          <div className="mt-16 flex items-end justify-center gap-4 sm:gap-8">
            {temperaments.map((temp, i) => (
              <div
                key={temp.key}
                className="relative group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
                onMouseEnter={() => setHoveredTemp(temp.key)}
                onMouseLeave={() => setHoveredTemp(null)}
              >
                <div 
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ backgroundColor: temp.color }}
                />
                <div className={`relative w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36 transition-transform duration-300 ${hoveredTemp === temp.key ? 'scale-110 -translate-y-2' : ''}`}>
                  <Image
                    src={temp.image}
                    alt={temp.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div 
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-opacity duration-300 ${hoveredTemp === temp.key ? 'opacity-100' : 'opacity-0'}`}
                  style={{ color: temp.color }}
                >
                  {temp.title}
                </div>
              </div>
            ))}
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
                href={`/temperaments/${temp.key}`}
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
            {features.map((feature, i) => (
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
  )
}
