'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { QUESTIONS, AnswerLetter, Question } from '@/lib/questions'
import XPProgressBar from './XPProgressBar'
import CinematicBackground from './CinematicBackground'
import VideoBackground from './VideoBackground'

interface QuestionScreenProps {
  heroName: string
  onComplete: (answers: Record<number, AnswerLetter>) => void
}

const LEVEL_GATE_MESSAGES: Record<number, string> = {
  10: 'Level Up! You\'ve crossed the first threshold.',
  20: 'Level Up! The oracle grows attentive.',
  30: 'Level Up! Your true nature emerges.',
}

const SECTION_NAMES: Record<number, string> = {
  1: 'CHAPTER I',
  2: 'CHAPTER II',
  3: 'CHAPTER III',
  4: 'CHAPTER IV',
}

export default function QuestionScreen({ heroName, onComplete }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({})
  const [selected, setSelected] = useState<AnswerLetter | null>(null)
  const [levelMsg, setLevelMsg] = useState<string | null>(null)
  const [cardVisible, setCardVisible] = useState(true)
  const [chapterTransition, setChapterTransition] = useState<string | null>(null)
  const sparkCanvasRef = useRef<HTMLCanvasElement>(null)

  const currentQ: Question = QUESTIONS[currentIndex]
  const questionNumber = currentIndex + 1
  const prevSection = currentIndex > 0 ? QUESTIONS[currentIndex - 1].section : 1

  // Spark particle burst on answer selection
  const spawnSparks = useCallback((x: number, y: number) => {
    const canvas = sparkCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#FFD700', '#E63946', '#4CC9F0', '#52B788', '#FFFFFF']
    const sparks: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = []

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3
      const speed = 2 + Math.random() * 4
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      })
    }

    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let alive = false
      sparks.forEach((spark) => {
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vy += 0.15 // gravity
        spark.life -= 0.025

        if (spark.life > 0) {
          alive = true
          ctx.globalAlpha = spark.life
          ctx.fillStyle = spark.color
          ctx.shadowColor = spark.color
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (alive && frame < 60) {
        requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()
  }, [])

  function handleSelect(letter: AnswerLetter, event: React.MouseEvent) {
    if (selected) return
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
    setSelected(letter)

    setTimeout(() => {
      const newAnswers = { ...answers, [questionNumber]: letter }
      setAnswers(newAnswers)

      // Check level gate
      const msg = LEVEL_GATE_MESSAGES[questionNumber]
      if (msg) {
        setLevelMsg(msg)
        setTimeout(() => setLevelMsg(null), 2500)
      }

      if (currentIndex + 1 >= QUESTIONS.length) {
        onComplete(newAnswers)
      } else {
        // Check section transition
        const nextQ = QUESTIONS[currentIndex + 1]
        if (nextQ.section !== currentQ.section) {
          // Show chapter transition
          setChapterTransition(SECTION_NAMES[nextQ.section])
          setTimeout(() => {
            setChapterTransition(null)
            setCardVisible(false)
            setTimeout(() => {
              setCurrentIndex((prev) => prev + 1)
              setSelected(null)
              setCardVisible(true)
            }, 300)
          }, 1500)
        } else {
          // Normal transition
          setCardVisible(false)
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1)
            setSelected(null)
            setCardVisible(true)
          }, 300)
        }
      }
    }, 400)
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selected || chapterTransition) return
      const map: Record<string, AnswerLetter> = { a: 'A', b: 'B', c: 'C', d: 'D', '1': 'A', '2': 'B', '3': 'C', '4': 'D' }
      const letter = map[e.key.toLowerCase()]
      if (letter) {
        const btn = document.getElementById(`answer-${letter}`)
        if (btn) btn.click()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, chapterTransition])

  // Resize spark canvas
  useEffect(() => {
    const canvas = sparkCanvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const answerLetterColors: Record<string, string> = {
    A: '#FFD700',
    B: '#E63946',
    C: '#4CC9F0',
    D: '#52B788',
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-start justify-start px-4 pt-6 pb-10 overflow-hidden"
      style={{ background: '#0D0D0F' }}
    >
      <VideoBackground questionNumber={questionNumber} overlayOpacity={0.35} />

      {/* Spark particle canvas */}
      <canvas
        ref={sparkCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      {/* Chapter transition overlay */}
      {chapterTransition && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(13, 13, 15, 0.95)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div className="text-center">
            <p className="font-serif text-xs tracking-[0.5em] uppercase text-[#64748B] mb-2">
              Entering
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-black text-[#FFD700]"
              style={{
                textShadow: '0 0 40px rgba(255,215,0,0.5)',
                animation: 'pulseGlow 1.5s ease infinite',
              }}
            >
              {chapterTransition}
            </h2>
          </div>
        </div>
      )}

      {/* Level up toast */}
      {levelMsg && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 font-serif text-sm px-6 py-3 rounded-lg border-2 text-center"
          style={{
            backgroundColor: '#1A1A2E',
            borderColor: '#FFD700',
            color: '#FFD700',
            boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,215,0,0.1)',
            animation: 'slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: Object.values(answerLetterColors)[currentQ.section - 1],
              boxShadow: `0 0 8px ${Object.values(answerLetterColors)[currentQ.section - 1]}`,
            }}
          />
          <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#64748B]">
            Section {currentQ.section}: {currentQ.sectionLabel}
          </span>
        </div>

        {/* Stone Tablet Quest Card */}
        <div
          className="relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300"
          style={{
            background: 'rgba(26, 26, 46, 0.85)',
            borderImage: 'linear-gradient(135deg, #FFD700 0%, transparent 30%, transparent 70%, #FFD700 100%) 1',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 0 40px rgba(255,200,0,0.08), inset 0 0 60px rgba(0,0,0,0.4)',
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Quest number badge */}
          <div className="relative flex items-center justify-between">
            <span
              className="font-serif text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)',
                border: '1px solid rgba(255,215,0,0.3)',
                color: '#FFD700',
              }}
            >
              Quest {questionNumber}
            </span>
            <span className="font-sans text-xs text-[#64748B]">
              {questionNumber} / {QUESTIONS.length}
            </span>
          </div>

          {/* Instruction */}
          <div className="relative flex flex-col gap-2">
            <p
              className="text-xs text-[#94A3B8] italic leading-relaxed"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              {currentQ.instruction}
            </p>
            {currentQ.text && (
              <p
                className="font-serif text-base text-[#E2E8F0] font-medium leading-relaxed tracking-wide"
                style={{ letterSpacing: '0.02em' }}
              >
                {currentQ.text}
              </p>
            )}
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
            }}
          />

          {/* Answer options */}
          <div className="relative flex flex-col gap-3">
            {currentQ.answers.map((answer) => {
              const letterColor = answerLetterColors[answer.letter]
              const isSelected = selected === answer.letter
              const isHovered = false // We'll handle this with CSS

              return (
                <button
                  key={answer.letter}
                  id={`answer-${answer.letter}`}
                  onClick={(e) => handleSelect(answer.letter, e)}
                  disabled={!!selected}
                  className="group w-full flex items-start gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer disabled:cursor-default relative overflow-hidden"
                  style={{
                    background: isSelected
                      ? `linear-gradient(90deg, ${letterColor}20 0%, transparent 100%)`
                      : 'transparent',
                    borderLeft: `3px solid ${isSelected ? letterColor : 'rgba(42, 42, 64, 0.5)'}`,
                    boxShadow: isSelected ? `0 0 20px ${letterColor}30, inset 0 0 30px ${letterColor}10` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (selected) return
                    e.currentTarget.style.borderLeftColor = letterColor
                    e.currentTarget.style.background = `linear-gradient(90deg, ${letterColor}10 0%, transparent 100%)`
                  }}
                  onMouseLeave={(e) => {
                    if (selected) return
                    e.currentTarget.style.borderLeftColor = 'rgba(42, 42, 64, 0.5)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Rune seal letter badge */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold transition-all duration-200 mt-0.5 relative"
                    style={{
                      background: isSelected
                        ? `radial-gradient(circle, ${letterColor} 0%, ${letterColor}80 100%)`
                        : `radial-gradient(circle, ${letterColor}30 0%, ${letterColor}10 100%)`,
                      color: isSelected ? '#0D0D0F' : letterColor,
                      boxShadow: isSelected ? `0 0 15px ${letterColor}60` : `inset 0 0 10px ${letterColor}20`,
                      border: `1px solid ${letterColor}40`,
                    }}
                  >
                    {/* Inner glow ring */}
                    <div
                      className="absolute inset-0.5 rounded-md border opacity-50"
                      style={{ borderColor: letterColor }}
                    />
                    {answer.letter}
                  </div>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-200 italic"
                    style={{
                      color: isSelected ? '#E2E8F0' : '#94A3B8',
                      fontFamily: "'Crimson Text', serif",
                    }}
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes pulseGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(255,215,0,0.5); }
          50% { text-shadow: 0 0 60px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.4); }
        }
      `}</style>
    </main>
  )
}
