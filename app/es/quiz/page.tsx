import { localizedMetadata } from '@/components/LocalizedPage'
import { QuizExperience } from '@/app/quiz/page'

export const metadata = localizedMetadata('es', 'quiz')

export default function EsQuizPage() {
  return <QuizExperience locale="es" showSeo={false} />
}
