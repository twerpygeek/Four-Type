'use client'

import { useEffect, useState } from 'react'

const LEVEL_GATES = [10, 20, 30, 40]

interface XPProgressBarProps {
  current: number
  total: number
  heroName: string
}

export default function XPProgressBar({ current, total, heroName }: XPProgressBarProps) {
  const pct = (current / total) * 100
  const [flash, setFlash] = useState(false)

  // Flash effect on level milestones
  useEffect(() => {
    if (LEVEL_GATES.slice(0, -1).includes(current)) {
      setFlash(true)
      const timer = setTimeout(() => setFlash(false), 500)
      return () => clearTimeout(timer)
    }
  }, [current])

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs text-[#64748B]">
          {heroName}
        </span>
        <span className="font-serif text-xs" style={{ color: '#FFD700' }}>
          Quest {current} of {total}
        </span>
      </div>

      {/* XP Bar Container */}
      <div
        className="relative w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        {/* Fill with gradient and glow */}
        <div
          className="h-full rounded-full transition-all duration-500 relative"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #B8860B 0%, #FFD700 50%, #FF6B00 100%)',
            boxShadow: flash
              ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,215,0,0.6)'
              : '0 0 12px rgba(255,215,0,0.5)',
          }}
        >
          {/* Animated shimmer on fill edge */}
          <div
            className="absolute right-0 top-0 h-full w-8 opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Level gate markers (diamond icons) */}
        {LEVEL_GATES.slice(0, -1).map((gate) => {
          const markerPct = (gate / total) * 100
          const reached = current >= gate
          return (
            <div
              key={gate}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
              style={{
                left: `${markerPct}%`,
              }}
            >
              {/* Diamond shape */}
              <div
                className="w-2.5 h-2.5 rotate-45 transition-all duration-300"
                style={{
                  backgroundColor: reached ? '#FFD700' : '#2A2A40',
                  boxShadow: reached ? '0 0 8px rgba(255,215,0,0.6)' : 'none',
                  border: `1px solid ${reached ? '#FFD700' : '#3A3A50'}`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Level labels */}
      <div className="relative w-full h-4">
        {LEVEL_GATES.map((gate) => {
          const markerPct = (gate / total) * 100
          const reached = current >= gate
          return (
            <div
              key={gate}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${markerPct}%` }}
            >
              <span
                className="font-serif text-[9px] font-bold transition-all duration-300"
                style={{
                  color: reached ? '#FFD700' : '#2A2A40',
                  textShadow: reached ? '0 0 8px rgba(255,215,0,0.5)' : 'none',
                }}
              >
                {gate === 40 ? 'END' : `LV${Math.floor(gate / 10)}`}
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); opacity: 0.3; }
          50% { transform: translateX(100%); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
