import { Suspense } from 'react'
import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperienceWithSearch } from '@/app/quiz/QuizClient'

export const metadata = localizedMetadata('zh-CN', 'quiz')

export default function ZhCnQuizPage() {
  return <Suspense fallback={null}><QuizExperienceWithSearch locale="zh-CN" /></Suspense>
}
