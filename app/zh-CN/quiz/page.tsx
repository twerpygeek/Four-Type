import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperience } from '@/app/quiz/QuizClient'

export const metadata = localizedMetadata('zh-CN', 'quiz')

export default function ZhCnQuizPage() {
  return <QuizExperience locale="zh-CN" />
}
