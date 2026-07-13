import { Suspense } from 'react'
import { QuizExperienceWithSearch } from '@/app/quiz/QuizClient'
import { localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('id', 'quiz')

export default function IndonesianQuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizExperienceWithSearch locale="id" />
    </Suspense>
  )
}
