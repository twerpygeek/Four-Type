import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperience } from '@/app/quiz/QuizClient'

export const metadata = localizedMetadata('es', 'quiz')

export default function EsQuizPage() {
  return <QuizExperience locale="es" />
}
