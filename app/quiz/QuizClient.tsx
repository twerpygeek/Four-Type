'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnswerLetter } from '@/lib/questions'
import { calculateScores, ScoreMap } from '@/lib/scoringKey'
import { getQuizCopy, getQuizQuestions, type QuizLocale } from '@/lib/quiz-i18n'
import { parseReferralContext } from '@/lib/referral-context'
import { trackFourTypeEvent } from '@/lib/analytics'
import type { CompletedChapter } from '@/lib/quiz-progress'
import NameInputScreen from '@/components/NameInputScreen'
import QuestionScreen from '@/components/QuestionScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultsScreen from '@/components/ResultsScreen'
import ReferralInviteBanner from '@/components/ReferralInviteBanner'

type Stage = 'name' | 'quiz' | 'loading' | 'results'

export function QuizExperienceWithSearch({ locale = 'en' }: { locale?: QuizLocale }) {
  const searchParams = useSearchParams()

  return <QuizExperience locale={locale} comparisonId={searchParams.get('compare') || ''} />
}

export function QuizExperience({ locale = 'en', comparisonId = '' }: { locale?: QuizLocale; comparisonId?: string }) {
  const referral = useMemo(() => parseReferralContext(comparisonId), [comparisonId])
  const [stage, setStage] = useState<Stage>('name')
  const [heroName, setHeroName] = useState('')
  const [scores, setScores] = useState<ScoreMap>({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
  const copy = getQuizCopy(locale)
  const questions = getQuizQuestions(locale)
  const trackedEvents = useRef(new Set<string>())

  function trackOnce(key: string, payload: Parameters<typeof trackFourTypeEvent>[0]) {
    if (trackedEvents.current.has(key)) return
    trackedEvents.current.add(key)
    trackFourTypeEvent(payload)
  }

  useEffect(() => {
    if (referral.status === 'valid') {
      trackOnce(`invite-open:${referral.shareId}`, {
        event: 'invite-open',
        locale,
        inviterBlendKey: referral.inviter.blendKey,
        shareId: referral.shareId,
        source: 'compare-query',
      })
    } else if (referral.status === 'invalid') {
      trackOnce(`invalid-share-id:${referral.shareId}`, {
        event: 'invalid-share-id',
        locale,
        shareId: referral.shareId,
        source: 'compare-query',
      })
    }
  }, [locale, referral])

  function handleNameSubmit(name: string) {
    const isReferred = referral.status === 'valid'
    trackOnce(`${isReferred ? 'referred' : 'direct'}-quiz-start`, {
      event: isReferred ? 'referred-quiz-start' : 'quiz-start',
      locale,
      inviterBlendKey: isReferred ? referral.inviter.blendKey : undefined,
      shareId: isReferred ? referral.shareId : undefined,
      source: isReferred ? 'referred-name-submit' : 'name-submit',
    })
    setHeroName(name)
    setStage('quiz')
  }

  function handleQuizComplete(quizAnswers: Record<number, AnswerLetter>) {
    const isReferred = referral.status === 'valid'
    trackOnce(`${isReferred ? 'referred' : 'direct'}-quiz-complete`, {
      event: isReferred ? 'referred-quiz-complete' : 'quiz-complete',
      locale,
      inviterBlendKey: isReferred ? referral.inviter.blendKey : undefined,
      shareId: isReferred ? referral.shareId : undefined,
      question: questions.length,
      source: isReferred ? 'referred-quiz' : 'quiz',
    })
    const calculatedScores = calculateScores(quizAnswers)
    setScores(calculatedScores)
    setStage('loading')
  }

  function handleProgress(answeredCount: number, completedChapter?: CompletedChapter) {
    if (!completedChapter) return
    const isReferred = referral.status === 'valid'
    trackOnce(`chapter-complete:${completedChapter}`, {
      event: 'chapter-complete',
      locale,
      inviterBlendKey: isReferred ? referral.inviter.blendKey : undefined,
      shareId: isReferred ? referral.shareId : undefined,
      chapter: completedChapter,
      question: answeredCount,
      source: isReferred ? 'referred-quiz' : 'quiz',
    })
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
      screen = (
        <NameInputScreen
          onStart={handleNameSubmit}
          copy={copy.name}
          banner={referral.status === 'valid' ? <ReferralInviteBanner inviter={referral.inviter} locale={locale} /> : undefined}
        />
      )
      break

    case 'quiz':
      screen = <QuestionScreen heroName={heroName} onComplete={handleQuizComplete} onProgress={handleProgress} copy={copy.question} questions={questions} />
      break

    case 'loading':
      screen = <LoadingScreen heroName={heroName} onComplete={handleLoadingComplete} copy={copy.loading} />
      break

    case 'results':
      screen = <ResultsScreen heroName={heroName} scores={scores} onRetake={handleRetake} copy={copy.results} locale={locale} comparison={referral.status === 'valid' ? referral.inviter : null} />
      break

    default:
      screen = null
  }

  return screen
}
