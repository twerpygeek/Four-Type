'use client'

import { useEffect, useState } from 'react'
import RuneBackground from './RuneBackground'

interface LoadingScreenProps {
  heroName: string
  onComplete: () => void
}

const ORACLE_MESSAGES = [
  'Consulting the ancient scrolls...',
  'Weighing your answers against the four winds...',
  'The oracle peers into your soul...',
  'Aligning your nature with the stars...',
  'Your destiny is being forged...',
]

export default function LoadingScreen({ heroName, onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [runeVisible, setRuneVisible] = useState(true)

  useEffect(() => {
    // Cycle through oracle messages
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ORACLE_MESSAGES.length)
    }, 700)

    // Animate progress bar over 3 seconds
    const startTime = Date.now()
    const duration = 3000
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(progressInterval)
        clearInterval(msgInterval)
        setTimeout(onComplete, 400)
      }
    }, 30)

    // Rune pulsing
    const runeInterval = setInterval(() => {
      setRuneVisible((v) => !v)
    }, 500)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
      clearInterval(runeInterval)
    }
  }, [onComplete])

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 gap-10"
      style={{ background: '#0D0D0F' }}
    >
      <RuneBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm text-center">
        {/* Spinning rune circle */}
        <div className="relative w-28 h-28">
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: '#FFD70030',
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-t-2"
            style={{
              borderColor: '#FFD700',
              animation: 'spin 1.5s linear infinite',
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-serif text-4xl"
            style={{
              color: '#FFD700',
              opacity: runeVisible ? 1 : 0.3,
              transition: 'opacity 0.3s ease',
              textShadow: '0 0 20px rgba(255,215,0,0.8)',
            }}
          >
            ᛟ
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#64748B]">
            The Oracle Speaks
          </p>
          <h2 className="font-serif text-2xl font-bold" style={{ color: '#E2E8F0' }}>
            {heroName}...
          </h2>
          <p
            className="font-sans text-sm text-[#64748B] min-h-[1.5rem] transition-opacity duration-300"
            key={messageIndex}
          >
            {ORACLE_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: '#1A1A2E' }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #B8860B, #FFD700)',
                boxShadow: '0 0 10px rgba(255,215,0,0.5)',
              }}
            />
          </div>
          <p className="font-sans text-xs text-[#64748B]">
            Calculating your destiny...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}
