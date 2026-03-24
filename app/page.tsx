'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Brain, Sparkles, Scroll, Swords, Map, Users } from 'lucide-react'
import RuneBackground from '@/components/RuneBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const temperaments = [
  {
    key: 'sanguine',
    title: 'The Bard',
    name: 'Sanguine',
    color: '#FFD700',
    description: 'The enthusiastic connector who lights up every room with infectious energy and optimism.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
    traits: ['Charismatic', 'Creative', 'Spontaneous'],
  },
  {
    key: 'choleric',
    title: 'The Commander',
    name: 'Choleric',
    color: '#E63946',
    description: 'The natural leader who takes charge, drives results, and turns vision into reality.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
    traits: ['Decisive', 'Ambitious', 'Strategic'],
  },
  {
    key: 'melancholic',
    title: 'The Strategist',
    name: 'Melancholic',
    color: '#4CC9F0',
    description: 'The deep thinker who sees patterns others miss and holds the world to high standards.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    traits: ['Analytical', 'Perfectionist', 'Loyal'],
  },
  {
    key: 'phlegmatic',
    title: 'The Guardian',
    name: 'Phlegmatic',
    color: '#52B788',
    description: 'The calm peacemaker who brings harmony, listens deeply, and holds teams together.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
    traits: ['Patient', 'Diplomatic', 'Reliable'],
  },
]

const menuItems = [
  {
    href: '/quiz',
    icon: Swords,
    label: 'Begin Quest',
    description: 'Discover your temperament',
    primary: true,
  },
  {
    href: '/manifesto',
    icon: Scroll,
    label: 'The Manifesto',
    description: 'Learn the ancient wisdom',
  },
  {
    href: '/blog',
    icon: BookOpen,
    label: 'Chronicles',
    description: 'Stories and insights',
  },
  {
    href: '/faq',
    icon: Map,
    label: 'Guide',
    description: 'Questions answered',
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

export default function HomePage() {
  const [hoveredTemp, setHoveredTemp] = useState<string | null>(null)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <RuneBackground />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
          {/* Radial dark vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_50%,rgba(13,13,15,0.85)_100%)]" />

          <div className="relative z-10 w-full flex flex-col items-center px-4">

            {/* Top ornament */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-[#FFD700]/50" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="#FFD700" />
              </svg>
              <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-[#FFD700]/50" />
            </div>

            {/* Tagline */}
            <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.45em] uppercase mb-6" style={{ color: '#c9a227' }}>
              Know Your True Nature
            </p>

            {/* FourType logo — full width, no clipping */}
            <div className="w-full max-w-6xl mx-auto flex items-center justify-center mb-6">
              <Image
                src="/fourtype-logo.png"
                alt="FourType — The Temperament Quest"
                width={1000}
                height={350}
                className="w-full h-auto object-contain drop-shadow-2xl filter brightness-105"
                priority
              />
            </div>

            {/* Diamond divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                <path d="M4.5 0L9 4.5L4.5 9L0 4.5Z" fill="#FFD700" fillOpacity="0.7" />
              </svg>
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
            </div>

            {/* Video frame */}
            <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-[680px] mx-auto mb-6">
              <span className="pointer-events-none absolute -top-[10px] -left-[10px] w-7 h-7 border-t-2 border-l-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -top-[10px] -right-[10px] w-7 h-7 border-t-2 border-r-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -bottom-[10px] -left-[10px] w-7 h-7 border-b-2 border-l-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -bottom-[10px] -right-[10px] w-7 h-7 border-b-2 border-r-2 border-[#FFD700]/75" />
              <div
                className="overflow-hidden bg-black"
                style={{
                  aspectRatio: '16/9',
                  boxShadow: '0 0 0 1px rgba(255,215,0,0.18), 0 8px 48px rgba(0,0,0,0.7)',
                }}
              >
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok-video-a2da9931-dd77-40ca-b351-adddc5cc3a08-PYDgy4CNaLVdiZe0hjEl7V7Jxejpnr.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Find Your True Nature + Begin Quest */}
            <p className="font-serif text-base sm:text-lg tracking-[0.2em] mb-8" style={{ color: 'rgba(255,215,0,0.55)' }}>
              Find Your True Nature
            </p>

            {/* Gold BEGIN YOUR QUEST button */}
            <Link
              href="/quiz"
              className="group relative flex items-center justify-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 font-serif font-bold text-base sm:text-lg tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] mb-24 lg:mb-32"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
                color: '#1a1000',
                boxShadow: '0 0 35px rgba(255,215,0,0.5), 0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,215,0,0.9)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" fill="currentColor" />
              </svg>
              Begin Your Quest
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" fill="currentColor" />
              </svg>
            </Link>

            {/* Menu — no decorative box, plain list */}
            <div className="w-full max-w-md mx-auto space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-4 px-5 py-4 transition-all duration-300 ${
                    item.primary
                      ? 'bg-[#FFD700]/10 border-2 border-[#FFD700]/60 hover:bg-[#FFD700]/18 hover:border-[#FFD700]'
                      : 'bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20'
                  }`}
                  onMouseEnter={() => setHoveredMenu(item.href)}
                  onMouseLeave={() => setHoveredMenu(null)}
                  style={{
                    boxShadow: hoveredMenu === item.href
                      ? item.primary
                        ? '0 0 20px rgba(255,215,0,0.3), inset 0 0 20px rgba(255,215,0,0.05)'
                        : '0 0 12px rgba(255,255,255,0.07)'
                      : 'none',
                  }}
                >
                  <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                    item.primary ? 'text-[#FFD700]' : 'text-foreground/50 group-hover:text-foreground/80'
                  } transition-colors`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-serif text-base sm:text-lg font-semibold tracking-wide ${
                      item.primary ? 'text-[#FFD700]' : 'text-foreground/75 group-hover:text-foreground'
                    } transition-colors`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-foreground/40 group-hover:text-foreground/55 transition-colors">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                    item.primary ? 'text-[#FFD700]/60 group-hover:text-[#FFD700]' : 'text-foreground/25 group-hover:text-foreground/50'
                  }`} />
                  {item.primary && (
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              ))}
            </div>

            {/* Character Selection */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-5 justify-center mb-10">
                <div className="h-px flex-1 max-w-[180px] bg-foreground/12" />
                <p className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] uppercase text-foreground/35 whitespace-nowrap">
                  Choose Your Path
                </p>
                <div className="h-px flex-1 max-w-[180px] bg-foreground/12" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {temperaments.map((temp) => (
                  <Link
                    key={temp.key}
                    href={`/temperament/${temp.key}`}
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredTemp(temp.key)}
                    onMouseLeave={() => setHoveredTemp(null)}
                  >
                    {/* Character with glow */}
                    <div className="relative flex items-end justify-center w-full mb-3">
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-20 sm:h-28 rounded-full blur-2xl transition-opacity duration-300"
                        style={{ backgroundColor: temp.color, opacity: hoveredTemp === temp.key ? 0.4 : 0.13 }}
                      />
                      <Image
                        src={temp.image}
                        alt={temp.title}
                        width={140}
                        height={175}
                        className="relative object-contain drop-shadow-2xl transition-transform duration-300 group-hover:-translate-y-2 w-auto h-[120px] sm:h-[155px]"
                      />
                    </div>

                    {/* Name card */}
                    <div
                      className="w-full px-2 sm:px-3 py-2 sm:py-3 text-center transition-all duration-300"
                      style={{
                        border: `1px solid ${temp.color}`,
                        boxShadow: hoveredTemp === temp.key
                          ? `0 0 16px ${temp.color}70, inset 0 0 12px ${temp.color}15`
                          : `0 0 5px ${temp.color}28`,
                        backgroundColor: hoveredTemp === temp.key ? `${temp.color}0f` : 'transparent',
                      }}
                    >
                      <p className="font-serif text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase" style={{ color: temp.color }}>
                        {temp.title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-xs text-foreground/45 mt-0.5">{temp.name}</p>
                    </div>

                    {/* Hover detail card */}
                    <div
                      className="absolute bottom-full left-1/2 mb-3 w-52 pointer-events-none z-20 transition-all duration-200"
                      style={{
                        opacity: hoveredTemp === temp.key ? 1 : 0,
                        transform: `translateX(-50%) translateY(${hoveredTemp === temp.key ? '0px' : '8px'})`,
                      }}
                    >
                      <div
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor: '#13131a',
                          border: `1px solid ${temp.color}60`,
                          boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${temp.color}20`,
                        }}
                      >
                        <p className="font-serif text-xs font-bold tracking-widest uppercase mb-2" style={{ color: temp.color }}>
                          {temp.title}
                        </p>
                        <p className="font-sans text-[11px] text-foreground/70 leading-relaxed mb-3">
                          {temp.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {temp.traits.map((t) => (
                            <span
                              key={t}
                              className="font-sans text-[10px] px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${temp.color}20`, color: temp.color }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div
                          className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                          style={{ backgroundColor: '#13131a', borderRight: `1px solid ${temp.color}60`, borderBottom: `1px solid ${temp.color}60` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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

      </main>
      <Footer />
    </>
  )
}
