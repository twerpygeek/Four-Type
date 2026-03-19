'use client'

import { useRef, useCallback } from 'react'
import { Temperament } from '@/lib/temperaments'

interface ShareableCardProps {
  heroName: string
  temperament: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
}

export default function ShareableCard({ heroName, temperament, scores }: ShareableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Get top 3 traits from strengths
  const traits = temperament.strengths.slice(0, 3).map((s) => {
    // Extract the main phrase (before em dash or semicolon)
    const match = s.match(/^([^—;]+)/)
    return match ? match[1].trim() : s.slice(0, 40)
  })

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0D0D0F',
        scale: 2,
        logging: false,
        useCORS: true,
      })
      
      const link = document.createElement('a')
      link.download = `temperamentquest-${heroName.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to generate image:', err)
    }
  }, [heroName])

  const handleCopyText = useCallback(async () => {
    const secondaryKey = Object.entries(scores)
      .filter(([key]) => key !== temperament.key)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || ''

    const text = `I got ${temperament.title} (${temperament.color}/${secondaryKey}). What's yours?\n\n"${temperament.language}"\n\nDiscover your character class free at temperamentquest.app`
    
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [temperament, scores])

  return (
    <div className="flex flex-col gap-4">
      {/* The shareable card */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          backgroundColor: '#0D0D0F',
          border: `2px solid ${temperament.colorHex}`,
        }}
      >
        {/* Glow background effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${temperament.colorHex}40 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${temperament.colorHex}20 0%, transparent 40%)`,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 w-16 h-16"
          style={{
            background: `linear-gradient(135deg, ${temperament.colorHex}20 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-16 h-16"
          style={{
            background: `linear-gradient(315deg, ${temperament.colorHex}20 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-5">
          {/* Header with emblem */}
          <div className="flex items-start gap-4">
            {/* Character emblem */}
            <div
              className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center border-2"
              style={{
                borderColor: temperament.colorHex,
                backgroundColor: `${temperament.colorHex}15`,
                boxShadow: `0 0 20px ${temperament.colorHex}30`,
              }}
            >
              <span
                className="font-serif text-3xl font-black"
                style={{ color: temperament.colorHex, textShadow: `0 0 10px ${temperament.colorHex}` }}
              >
                {temperament.emoji}
              </span>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="font-sans text-xs text-[#64748B] truncate">{heroName}</p>
              <h2
                className="font-serif text-2xl font-black leading-tight"
                style={{ color: temperament.colorHex }}
              >
                {temperament.title.toUpperCase()}
              </h2>
              <p className="font-sans text-sm text-[#94A3B8]">
                {temperament.name} &bull; {temperament.language}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${temperament.colorHex}40, transparent)`,
            }}
          />

          {/* 3 Key Traits */}
          <div className="flex flex-col gap-2">
            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#64748B]">
              Key Traits
            </p>
            {traits.map((trait, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: temperament.colorHex }}
                />
                <p className="font-sans text-sm text-[#E2E8F0] leading-snug">{trait}</p>
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-[#1A1A2E]">
            {(['Yellow', 'Red', 'Blue', 'Green'] as const).map((key) => {
              const colors = {
                Yellow: '#FFD700',
                Red: '#E63946',
                Blue: '#4CC9F0',
                Green: '#52B788',
              }
              const total = Object.values(scores).reduce((a, b) => a + b, 0)
              const pct = (scores[key] / total) * 100
              return (
                <div
                  key={key}
                  className="h-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: colors[key],
                    opacity: key === temperament.key ? 1 : 0.4,
                  }}
                />
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#2A2A40]">
              TemperamentQuest
            </p>
            <p className="font-sans text-[10px] text-[#2A2A40]">
              temperamentquest.app
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer"
          style={{
            borderColor: temperament.colorHex,
            color: '#0D0D0F',
            backgroundColor: temperament.colorHex,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = temperament.colorHex
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = temperament.colorHex
            e.currentTarget.style.color = '#0D0D0F'
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        
        <ShareTextButton temperament={temperament} scores={scores} onCopy={handleCopyText} />
      </div>
    </div>
  )
}

function ShareTextButton({
  temperament,
  onCopy,
}: {
  temperament: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
  onCopy: () => Promise<boolean>
}) {
  const [copied, setCopied] = React.useState(false)

  const handleClick = async () => {
    const success = await onCopy()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border transition-all duration-200 cursor-pointer"
      style={{
        borderColor: `${temperament.colorHex}40`,
        color: temperament.colorHex,
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = temperament.colorHex
        e.currentTarget.style.backgroundColor = `${temperament.colorHex}10`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${temperament.colorHex}40`
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Text
        </>
      )}
    </button>
  )
}

import React from 'react'
