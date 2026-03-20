'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RuneBackground from '@/components/RuneBackground'

interface Question {
  id: number
  text: string
  answers: {
    text: string
    temperament: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic'
  }[]
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'When faced with a challenge, you typically:',
    answers: [
      { text: 'Jump in enthusiastically and figure it out as you go', temperament: 'sanguine' },
      { text: 'Take charge and create a plan to conquer it', temperament: 'choleric' },
      { text: 'Analyze it carefully before taking action', temperament: 'melancholic' },
      { text: 'Take time to consider all perspectives', temperament: 'phlegmatic' },
    ],
  },
  {
    id: 2,
    text: 'In social situations, you are most likely to:',
    answers: [
      { text: 'Be the life of the party and connect with everyone', temperament: 'sanguine' },
      { text: 'Lead conversations and direct activities', temperament: 'choleric' },
      { text: 'Listen thoughtfully and engage in deep discussion', temperament: 'melancholic' },
      { text: 'Make people feel comfortable and supported', temperament: 'phlegmatic' },
    ],
  },
  {
    id: 3,
    text: 'Your work style is best described as:',
    answers: [
      { text: 'Flexible, adaptable, and spontaneous', temperament: 'sanguine' },
      { text: 'Driven, efficient, and results-oriented', temperament: 'choleric' },
      { text: 'Detail-oriented, methodical, and thorough', temperament: 'melancholic' },
      { text: 'Steady, reliable, and team-focused', temperament: 'phlegmatic' },
    ],
  },
  {
    id: 4,
    text: 'When things go wrong, you typically:',
    answers: [
      { text: 'Stay positive and move on to the next thing', temperament: 'sanguine' },
      { text: 'Quickly identify what went wrong and fix it', temperament: 'choleric' },
      { text: 'Reflect deeply on what could have been done better', temperament: 'melancholic' },
      { text: 'Support others and help stabilize the situation', temperament: 'phlegmatic' },
    ],
  },
  {
    id: 5,
    text: 'Your ideal weekend involves:',
    answers: [
      { text: 'Social activities, spontaneous adventures, and meeting new people', temperament: 'sanguine' },
      { text: 'Accomplishing goals and taking on new challenges', temperament: 'choleric' },
      { text: 'Focused time on a project or hobby you care about', temperament: 'melancholic' },
      { text: 'Peaceful time with close friends or family', temperament: 'phlegmatic' },
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic'>>({})
  const [showResults, setShowResults] = useState(false)

  const question = quizQuestions[currentQuestion]
  const isAnswered = currentQuestion in answers

  const handleAnswer = (temperament: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic') => {
    setAnswers({ ...answers, [currentQuestion]: temperament })
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getResults = () => {
    const counts = {
      sanguine: 0,
      choleric: 0,
      melancholic: 0,
      phlegmatic: 0,
    }

    Object.values(answers).forEach((temp) => {
      counts[temp]++
    })

    return Object.entries(counts).reduce((a, b) => (counts[b[0] as keyof typeof counts] > counts[a[0] as keyof typeof counts] ? b : a))
  }

  if (showResults) {
    const [resultTemp] = getResults()
    const resultMap = {
      sanguine: { title: 'The Bard', color: '#FFD700', description: 'You are The Bard - The enthusiastic connector who lights up every room with infectious energy and optimism.' },
      choleric: { title: 'The Commander', color: '#E63946', description: 'You are The Commander - The natural leader who takes charge, drives results, and turns vision into reality.' },
      melancholic: { title: 'The Strategist', color: '#4CC9F0', description: 'You are The Strategist - The deep thinker who sees patterns others miss and holds the world to high standards.' },
      phlegmatic: { title: 'The Guardian', color: '#52B788', description: 'You are The Guardian - The calm peacemaker who brings harmony, listens deeply, and holds teams together.' },
    }

    const result = resultMap[resultTemp as keyof typeof resultMap]

    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background pt-24 pb-16 relative overflow-hidden">
          <RuneBackground />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: result.color }}>
                Your Temperament
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-4 text-foreground">
                {result.title}
              </h1>
              <p className="text-lg text-foreground/70 mb-12">{result.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/temperament/${resultTemp}`}
                  className="px-8 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: result.color,
                    color: '#0D0D0F',
                    boxShadow: `0 0 24px ${result.color}60`,
                  }}
                >
                  Learn More
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 rounded-lg font-semibold border border-foreground/20 hover:bg-foreground/5 transition-all"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16 relative overflow-hidden">
        <RuneBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-foreground/60">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
              <div className="flex gap-2">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: i in answers ? '#FFD700' : i === currentQuestion ? '#FFD70080' : '#ffffff20',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD700] transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
              {question.text}
            </h2>

            {/* Answers */}
            <div className="space-y-3">
              {question.answers.map((answer) => (
                <button
                  key={answer.text}
                  onClick={() => handleAnswer(answer.temperament)}
                  className="w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-[#FFD700]/60 hover:bg-foreground/5"
                  style={{
                    borderColor: answers[currentQuestion] === answer.temperament ? '#FFD700' : 'rgba(255,255,255,0.1)',
                    backgroundColor: answers[currentQuestion] === answer.temperament ? 'rgba(255,215,0,0.08)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                      style={{
                        borderColor: answers[currentQuestion] === answer.temperament ? '#FFD700' : 'rgba(255,255,255,0.3)',
                        backgroundColor: answers[currentQuestion] === answer.temperament ? '#FFD700' : 'transparent',
                      }}
                    >
                      {answers[currentQuestion] === answer.temperament && (
                        <Check className="w-3 h-3" style={{ color: '#0D0D0F' }} />
                      )}
                    </div>
                    <span className="text-foreground/80">{answer.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-foreground/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: isAnswered ? '#FFD700' : '#FFD70040',
                color: '#0D0D0F',
              }}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
