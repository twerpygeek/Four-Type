'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RuneBackground from './RuneBackground'
import { TEMPERAMENTS } from '@/lib/temperaments'
import type { TemperamentKey } from '@/lib/scoringKey'

interface LandingScreenProps {
  onBegin: () => void
}

const characterOrder: TemperamentKey[] = ['Red', 'Yellow', 'Blue', 'Green']

export default function LandingScreen({ onBegin }: LandingScreenProps) {
  const [visible, setVisible] = useState(false)
  const [hoveredChar, setHoveredChar] = useState<TemperamentKey | null>(null)

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
        className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
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

        {/* Character showcase */}
        <div className="relative w-full max-w-3xl">
          {/* Characters */}
          <div className="flex justify-center items-end gap-2 md:gap-4">
            {characterOrder.map((key, i) => {
              const t = TEMPERAMENTS[key]
              const isHovered = hoveredChar === key
              return (
                <div
                  key={key}
                  className="relative flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredChar(key)}
                  onMouseLeave={() => setHoveredChar(null)}
                  style={{
                    animationDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Glow effect behind character */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl transition-opacity duration-300"
                    style={{
                      backgroundColor: t.colorHex,
                      opacity: isHovered ? 0.6 : 0.2,
                    }}
                  />
                  
                  {/* Character image */}
                  <div
                    className="relative transition-all duration-300"
                    style={{
                      transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                    }}
                  >
                    <Image
                      src={t.characterImage}
                      alt={t.title}
                      width={140}
                      height={200}
                      className="w-24 h-auto md:w-36 object-contain drop-shadow-lg"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 20px ${t.colorHex}80)` : 'none',
                      }}
                    />
                  </div>
                  
                  {/* Character label */}
                  <div
                    className="mt-2 flex flex-col items-center transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0.7,
                    }}
                  >
                    <p
                      className="font-serif text-xs md:text-sm font-bold tracking-wide"
                      style={{ color: t.colorHex }}
                    >
                      {t.title.toUpperCase()}
                    </p>
                    <p className="font-sans text-[10px] md:text-xs text-[#64748B]">
                      {t.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hover tooltip */}
          {hoveredChar && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 px-4 py-2 rounded-lg border text-center max-w-xs pointer-events-none"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.95)',
                borderColor: TEMPERAMENTS[hoveredChar].colorHex + '40',
                boxShadow: `0 0 20px ${TEMPERAMENTS[hoveredChar].colorHex}20`,
              }}
            >
              <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                {TEMPERAMENTS[hoveredChar].rpgClass}
              </p>
              <p
                className="font-serif text-xs mt-1"
                style={{ color: TEMPERAMENTS[hoveredChar].colorHex }}
              >
                The Language of {TEMPERAMENTS[hoveredChar].language}
              </p>
            </div>
          )}
        </div>

        {/* Lore */}
        <p className="font-sans text-[#64748B] text-base leading-relaxed max-w-md text-pretty">
          Every hero carries a nature forged before the quest begins.{' '}
          <span className="text-[#E2E8F0]">40 questions. 4 temperaments. No paywall.</span>{' '}
          Discover the character class you were born to play.
        </p>

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
    </main>
  )
}
