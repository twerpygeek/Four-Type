'use client'

import { useState, useEffect, useCallback } from 'react'
import { QUESTIONS, AnswerLetter, Question } from '@/lib/questions'
import XPProgressBar from './XPProgressBar'
import RuneBackground from './RuneBackground'

interface QuestionScreenProps {
  heroName: string
  onComplete: (answers: Record<number, AnswerLetter>) => void
}

const LEVEL_GATE_MESSAGES: Record<number, string> = {
  10: 'Level Up! You\'ve crossed the first threshold.',
  20: 'Level Up! The oracle grows attentive.',
  30: 'Level Up! Your true nature emerges.',
}

export default function QuestionScreen({ heroName, onComplete }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({})
  const [selected, setSelected] = useState<AnswerLetter | null>(null)
  const [levelMsg, setLevelMsg] = useState<string | null>(null)
  const [cardVisible, setCardVisible] = useState(true)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([])

  const currentQ: Question = QUESTIONS[currentIndex]
  const questionNumber = currentIndex + 1

  const spawnParticles = useCallback((x: number, y: number) => {
    const colors = ['#FFD700', '#E63946', '#4CC9F0', '#52B788']
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
    }, 800)
  }, [])

  function handleSelect(letter: AnswerLetter, event: React.MouseEvent) {
    if (selected) return
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2)
    setSelected(letter)

    setTimeout(() => {
      const newAnswers = { ...answers, [questionNumber]: letter }
      setAnswers(newAnswers)

      // Check level gate
      const msg = LEVEL_GATE_MESSAGES[questionNumber]
      if (msg) {
        setLevelMsg(msg)
        setTimeout(() => setLevelMsg(null), 2000)
      }

      if (currentIndex + 1 >= QUESTIONS.length) {
        onComplete(newAnswers)
      } else {
        // Animate card out
        setCardVisible(false)
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1)
          setSelected(null)
          setCardVisible(true)
        }, 300)
      }
    }, 400)
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selected) return
      const map: Record<string, AnswerLetter> = { a: 'A', b: 'B', c: 'C', d: 'D', '1': 'A', '2': 'B', '3': 'C', '4': 'D' }
      const letter = map[e.key.toLowerCase()]
      if (letter) {
        const btn = document.getElementById(`answer-${letter}`)
        if (btn) btn.click()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const sectionColors: Record<number, string> = {
    1: '#FFD70030',
    2: '#E6394630',
    3: '#4CC9F030',
    4: '#52B78830',
  }

  const answerLetterColors: Record<string, string> = {
    A: '#FFD700',
    B: '#E63946',
    C: '#4CC9F0',
    D: '#52B788',
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-start justify-start px-4 pt-6 pb-10"
      style={{ background: '#0D0D0F' }}
    >
      <RuneBackground />

      {/* Particle burst */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50"
          style={{ left: p.x, top: p.y }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 4px ${p.color}`,
                animation: `particle-${i} 0.8s ease-out forwards`,
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Level up toast */}
      {levelMsg && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 font-serif text-sm px-6 py-3 rounded-lg border-2 text-center"
          style={{
            backgroundColor: '#1A1A2E',
            borderColor: '#FFD700',
            color: '#FFD700',
            boxShadow: '0 0 20px rgba(255,215,0,0.4)',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          {levelMsg}
        </div>
      )}

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-6">
        {/* Progress bar */}
        <XPProgressBar current={questionNumber} total={QUESTIONS.length} heroName={heroName} />

        {/* Section label */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: Object.values(answerLetterColors)[currentQ.section - 1],
              boxShadow: `0 0 6px ${Object.values(answerLetterColors)[currentQ.section - 1]}`,
            }}
          />
          <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#64748B]">
            Section {currentQ.section}: {currentQ.sectionLabel}
          </span>
        </div>

        {/* Quest Card */}
        <div
          className="rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-300"
          style={{
            backgroundColor: '#1A1A2E',
            borderColor: sectionColors[currentQ.section] ?? '#2A2A40',
            boxShadow: `0 0 40px ${sectionColors[currentQ.section] ?? '#2A2A4020'}`,
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Quest number badge */}
          <div className="flex items-center justify-between">
            <span
              className="font-serif text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ borderColor: '#2A2A40', color: '#64748B' }}
            >
              Quest {questionNumber}
            </span>
            <span className="font-sans text-xs text-[#64748B]">
              {questionNumber} / {QUESTIONS.length}
            </span>
          </div>

          {/* Instruction */}
          <div className="flex flex-col gap-1">
            <p className="font-sans text-xs text-[#64748B] italic leading-relaxed">
              {currentQ.instruction}
            </p>
            {currentQ.text && (
              <p className="font-sans text-sm text-[#E2E8F0] font-medium leading-relaxed">
                {currentQ.text}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ backgroundColor: '#2A2A40' }} />

          {/* Answer options */}
          <div className="flex flex-col gap-3">
            {currentQ.answers.map((answer) => {
              const letterColor = answerLetterColors[answer.letter]
              const isSelected = selected === answer.letter
              return (
                <button
                  key={answer.letter}
                  id={`answer-${answer.letter}`}
                  onClick={(e) => handleSelect(answer.letter, e)}
                  disabled={!!selected}
                  className="group w-full flex items-start gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer disabled:cursor-default"
                  style={{
                    borderColor: isSelected ? letterColor : '#2A2A40',
                    backgroundColor: isSelected ? `${letterColor}15` : 'transparent',
                    boxShadow: isSelected ? `0 0 15px ${letterColor}30` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (selected) return
                    e.currentTarget.style.borderColor = `${letterColor}60`
                    e.currentTarget.style.backgroundColor = `${letterColor}08`
                  }}
                  onMouseLeave={(e) => {
                    if (selected) return
                    e.currentTarget.style.borderColor = '#2A2A40'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {/* Letter badge */}
                  <div
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-serif text-xs font-bold transition-all duration-200 mt-0.5"
                    style={{
                      backgroundColor: isSelected ? letterColor : `${letterColor}20`,
                      color: isSelected ? '#0D0D0F' : letterColor,
                    }}
                  >
                    {answer.letter}
                  </div>
                  <p
                    className="font-sans text-sm leading-relaxed transition-colors duration-200"
                    style={{ color: isSelected ? '#E2E8F0' : '#94A3B8' }}
                  >
                    {answer.text}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="font-sans text-center text-[10px] text-[#2A2A40]">
          Press A, B, C, or D to answer quickly
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </main>
  )
}
