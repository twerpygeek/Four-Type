'use client'

import { useState } from 'react'
import RuneBackground from './RuneBackground'

interface NameInputScreenProps {
  onStart: (name: string) => void
}

export default function NameInputScreen({ onStart }: NameInputScreenProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Your hero needs a name.')
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
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-serif text-2xl"
          style={{
            borderColor: '#FFD700',
            color: '#FFD700',
            boxShadow: '0 0 20px rgba(255,215,0,0.3)',
          }}
        >
          &#9775;
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#64748B]">
            Hero Initiation
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: '#E2E8F0' }}
          >
            Enter the name of your hero
          </h2>
          <p className="font-sans text-sm text-[#64748B] leading-relaxed">
            This quest will reveal the temperament you were born with — answer honestly, as your true self.
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
            placeholder="Your name or alias..."
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
          <p className="font-serif text-xs text-[#FFD700] tracking-widest uppercase">Quest Rules</p>
          <ul className="font-sans text-xs text-[#64748B] leading-relaxed space-y-1">
            <li>• Choose the ONE answer you most naturally identify with</li>
            <li>• Answer as your true self — not who you wish to be</li>
            <li>• Follow your first instinct; do not overthink</li>
            <li>• No temperament is better than any other</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full font-serif text-base font-bold tracking-widest uppercase py-4 rounded-lg border-2 transition-all duration-300"
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
          Begin the Assessment
        </button>
      </form>
    </main>
  )
}
