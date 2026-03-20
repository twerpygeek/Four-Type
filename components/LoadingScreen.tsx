'use client'

import { useEffect, useState } from 'react'

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
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ORACLE_MESSAGES.length)
    }, 700)

    const startTime = Date.now()
    const duration = 3500
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 gap-10 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0D0D0F 50%, #000000 100%)' }}
    >
      {/* Ambient glow effects */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)' }} 
      />
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#FFD700]/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#FFD700]/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#FFD700]/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#FFD700]/20 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm text-center">
        {/* Spinning rune circle */}
        <div className="relative w-28 h-28">
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#FFD70030' }}
          />
          <div
            className="absolute inset-2 rounded-full border"
            style={{ borderColor: '#FFD70015' }}
          />
          <div
            className="absolute inset-0 rounded-full border-t-2"
            style={{ borderColor: '#FFD700', animation: 'spin 1.5s linear infinite' }}
          />
          <div
            className="absolute inset-3 rounded-full border-b"
            style={{ borderColor: '#FFD70060', animation: 'spinReverse 3s linear infinite' }}
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
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #B8860B, #FFD700)',
                boxShadow: '0 0 10px rgba(255,215,0,0.5)',
              }}
            />
          </div>
          <p className="font-sans text-xs text-[#64748B]">Calculating your destiny...</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </main>
  )
}
