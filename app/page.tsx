'use client'

import { useState } from 'react'
import LandingScreen from '@/components/LandingScreen'
import NameInputScreen from '@/components/NameInputScreen'
import QuestionScreen from '@/components/QuestionScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultsScreen from '@/components/ResultsScreen'
import { AnswerLetter } from '@/lib/questions'
import { calculateScores, ScoreMap } from '@/lib/scoringKey'

type AppState = 'landing' | 'name' | 'assessment' | 'loading' | 'results'

export default function TemperamentQuestApp() {
  const [state, setState] = useState<AppState>('landing')
  const [heroName, setHeroName] = useState('')
  const [scores, setScores] = useState<ScoreMap | null>(null)

  function handleBegin() {
    setState('name')
  }

  function handleStart(name: string) {
    setHeroName(name)
    setState('assessment')
  }

  function handleAssessmentComplete(answers: Record<number, AnswerLetter>) {
    const computed = calculateScores(answers)
    setScores(computed)
    setState('loading')
  }

  function handleLoadingComplete() {
    setState('results')
  }

  function handleRetake() {
    setScores(null)
    setHeroName('')
    setState('landing')
  }

  return (
    <>
      {state === 'landing' && (
        <LandingScreen onBegin={handleBegin} />
      )}
      {state === 'name' && (
        <NameInputScreen onStart={handleStart} />
      )}
      {state === 'assessment' && (
        <QuestionScreen heroName={heroName} onComplete={handleAssessmentComplete} />
      )}
      {state === 'loading' && (
        <LoadingScreen heroName={heroName} onComplete={handleLoadingComplete} />
      )}
      {state === 'results' && scores && (
        <ResultsScreen heroName={heroName} scores={scores} onRetake={handleRetake} />
      )}
    </>
  )
}
