'use client'

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnswerLetter } from '@/lib/questions'
import { calculateScores, ScoreMap } from '@/lib/scoringKey'
import { getQuizCopy, getQuizQuestions, type QuizLocale } from '@/lib/quiz-i18n'
import { decodeShareId } from '@/lib/share-id'
import NameInputScreen from '@/components/NameInputScreen'
import QuestionScreen from '@/components/QuestionScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultsScreen from '@/components/ResultsScreen'

type Stage = 'name' | 'quiz' | 'loading' | 'results'

export function QuizExperienceWithSearch({ locale = 'en' }: { locale?: QuizLocale }) {
  const searchParams = useSearchParams()

  return <QuizExperience locale={locale} comparisonId={searchParams.get('compare') || ''} />
}

export function QuizExperience({ locale = 'en', comparisonId = '' }: { locale?: QuizLocale; comparisonId?: string }) {
  const comparison = useMemo(() => decodeShareId(comparisonId), [comparisonId])
  const [stage, setStage] = useState<Stage>('name')
  const [heroName, setHeroName] = useState('')
  const [scores, setScores] = useState<ScoreMap>({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
  const copy = getQuizCopy(locale)
  const questions = getQuizQuestions(locale)

  function handleNameSubmit(name: string) {
    setHeroName(name)
    setStage('quiz')
  }

  function handleQuizComplete(quizAnswers: Record<number, AnswerLetter>) {
    const calculatedScores = calculateScores(quizAnswers)
    setScores(calculatedScores)
    setStage('loading')
  }

  function handleLoadingComplete() {
    setStage('results')
  }

  function handleRetake() {
    setScores({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
    setStage('name')
  }

  let screen: ReactNode
  switch (stage) {
    case 'name':
      screen = <NameInputScreen onStart={handleNameSubmit} copy={copy.name} />
      break

    case 'quiz':
      screen = <QuestionScreen heroName={heroName} onComplete={handleQuizComplete} copy={copy.question} questions={questions} />
      break

    case 'loading':
      screen = <LoadingScreen heroName={heroName} onComplete={handleLoadingComplete} copy={copy.loading} />
      break

    case 'results':
      screen = <ResultsScreen heroName={heroName} scores={scores} onRetake={handleRetake} copy={copy.results} locale={locale} comparison={comparison} />
      break

    default:
      screen = null
  }

  return screen
}
