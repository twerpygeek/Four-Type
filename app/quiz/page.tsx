'use client'

import { useState, useEffect } from 'react'
import { AnswerLetter } from '@/lib/questions'
import { calculateScores, ScoreMap } from '@/lib/scoringKey'
import NameInputScreen from '@/components/NameInputScreen'
import QuestionScreen from '@/components/QuestionScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultsScreen from '@/components/ResultsScreen'

type Stage = 'name' | 'quiz' | 'loading' | 'results'

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>('name')
  const [heroName, setHeroName] = useState('')
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({})
  const [scores, setScores] = useState<ScoreMap>({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })

  // Handle name submission
  function handleNameSubmit(name: string) {
    setHeroName(name)
    setStage('quiz')
  }

  // Handle quiz completion
  function handleQuizComplete(quizAnswers: Record<number, AnswerLetter>) {
    setAnswers(quizAnswers)
    const calculatedScores = calculateScores(quizAnswers)
    setScores(calculatedScores)
    setStage('loading')
  }

  // Handle loading complete
  function handleLoadingComplete() {
    setStage('results')
  }

  // Handle retake
  function handleRetake() {
    setAnswers({})
    setScores({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
    setStage('name')
  }

  // Render the appropriate stage
  switch (stage) {
    case 'name':
      return <NameInputScreen onStart={handleNameSubmit} />

    case 'quiz':
      return <QuestionScreen heroName={heroName} onComplete={handleQuizComplete} />

    case 'loading':
      return <LoadingScreen heroName={heroName} onComplete={handleLoadingComplete} />

    case 'results':
      return <ResultsScreen heroName={heroName} scores={scores} onRetake={handleRetake} />

    default:
      return null
  }
}
