'use client'

import { useState } from 'react'
import type { QuizCopy } from '@/lib/quiz-i18n'
import RuneBackground from './RuneBackground'

interface NameInputScreenProps {
  onStart: (name: string) => void
  copy: QuizCopy['name']
}

export default function NameInputScreen({ onStart, copy }: NameInputScreenProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError(copy.error)
      return
    }
    onStart(trimmed)
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#0D0D0F' }}
    >
      <RuneBackground />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md text-center"
      >
        {/* Hero video */}
        <div
          className="relative w-full max-w-xs rounded-xl overflow-hidden border-2"
          style={{ borderColor: '#FFD70040' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          >
            <source src="/videos/hero-intro.webm" type="video/webm" />
            <source src="/videos/hero-intro.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 30px rgba(255,215,0,0.1)' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#64748B]">
            {copy.eyebrow}
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: '#E2E8F0' }}
          >
            {copy.title}
          </h2>
          <p className="font-sans text-sm text-[#64748B] leading-relaxed">
            {copy.description}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder={copy.placeholder}
            maxLength={40}
            autoFocus
            className="w-full px-4 py-3 rounded-lg font-sans text-base border-2 bg-transparent outline-none transition-all duration-200 text-center"
            style={{
              borderColor: error ? '#E63946' : name ? '#FFD700' : '#2A2A40',
              color: '#E2E8F0',
              boxShadow: name && !error ? '0 0 15px rgba(255,215,0,0.15)' : 'none',
            }}
          />
          {error && (
            <p className="font-sans text-xs text-[#E63946]">{error}</p>
          )}
        </div>

        {/* Instructions */}
        <div
          className="w-full rounded-lg border p-4 text-left flex flex-col gap-2"
          style={{ borderColor: '#2A2A40', backgroundColor: '#1A1A2E' }}
        >
          <p className="font-serif text-xs text-[#FFD700] tracking-widest uppercase">{copy.rulesTitle}</p>
          <ul className="font-sans text-xs text-[#64748B] leading-relaxed space-y-1">
            {copy.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full font-serif text-base font-bold tracking-widest uppercase py-4 rounded-lg border-2 transition-all duration-300 cursor-pointer"
          style={{
            borderColor: '#FFD700',
            color: '#0D0D0F',
            backgroundColor: '#FFD700',
            opacity: name.trim() ? 1 : 0.5,
          }}
          onMouseEnter={(e) => {
            if (!name.trim()) return
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
          {copy.startButton}
        </button>
      </form>
    </main>
  )
}
