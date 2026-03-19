'use client'

import { useState, useEffect } from 'react'
import RuneBackground from './RuneBackground'

interface LandingScreenProps {
  onBegin: () => void
}

const temperamentColors = [
  { label: 'Sanguine', color: '#FFD700', delay: '0ms' },
  { label: 'Choleric', color: '#E63946', delay: '200ms' },
  { label: 'Melancholic', color: '#4CC9F0', delay: '400ms' },
  { label: 'Phlegmatic', color: '#52B788', delay: '600ms' },
]

export default function LandingScreen({ onBegin }: LandingScreenProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: '#0D0D0F' }}
    >
      <RuneBackground />

      <div
        className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Crown ornament */}
        <div className="flex items-center gap-3">
          {temperamentColors.map((t) => (
            <div
              key={t.label}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: t.color,
                boxShadow: `0 0 10px ${t.color}`,
                animationDelay: t.delay,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#64748B]">
            The Free Temperament Assessment
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl font-bold text-balance"
            style={{ color: '#FFD700', textShadow: '0 0 40px rgba(255,215,0,0.4)' }}
          >
            Temperament
          </h1>
          <h1
            className="font-serif text-5xl md:text-7xl font-bold text-balance"
            style={{ color: '#E2E8F0' }}
          >
            Quest
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-[#2A2A40]" />
          <span className="font-serif text-[#FFD700] text-lg">&#10022;</span>
          <div className="flex-1 h-px bg-[#2A2A40]" />
        </div>

        {/* Lore */}
        <p className="font-sans text-[#64748B] text-base leading-relaxed max-w-md text-pretty">
          Every hero carries a nature forged before the quest begins.{' '}
          <span className="text-[#E2E8F0]">40 questions. 4 temperaments. No paywall.</span>{' '}
          Discover the character class you were born to play.
        </p>

        {/* Class badges */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            { name: 'The Herald', sub: 'Sanguine', color: '#FFD700' },
            { name: 'The Commander', sub: 'Choleric', color: '#E63946' },
            { name: 'The Sage', sub: 'Melancholic', color: '#4CC9F0' },
            { name: 'The Guardian', sub: 'Phlegmatic', color: '#52B788' },
          ].map((cls) => (
            <div
              key={cls.name}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 border"
              style={{
                borderColor: `${cls.color}30`,
                backgroundColor: `${cls.color}08`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cls.color, boxShadow: `0 0 6px ${cls.color}` }}
              />
              <div className="text-left">
                <div className="font-serif text-xs font-semibold" style={{ color: cls.color }}>
                  {cls.name}
                </div>
                <div className="font-sans text-[10px] text-[#64748B]">{cls.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onBegin}
          className="group relative font-serif text-base font-bold tracking-widest uppercase px-10 py-4 rounded-lg border-2 transition-all duration-300 cursor-pointer"
          style={{
            borderColor: '#FFD700',
            color: '#0D0D0F',
            backgroundColor: '#FFD700',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#FFD700'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,215,0,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD700'
            e.currentTarget.style.color = '#0D0D0F'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Begin Your Quest
        </button>

        <p className="font-sans text-[#64748B] text-xs">
          ~20 minutes &bull; 40 questions &bull; Free forever
        </p>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#2A2A40] text-xs font-sans tracking-widest uppercase">
        Scroll to discover
      </div>
    </main>
  )
}
