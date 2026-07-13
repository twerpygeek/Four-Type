import { Suspense } from 'react'
import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperienceWithSearch } from '@/app/quiz/QuizClient'

export const metadata = localizedMetadata('es', 'quiz')

export default function EsQuizPage() {
  return <Suspense fallback={null}><QuizExperienceWithSearch locale="es" /></Suspense>
}
