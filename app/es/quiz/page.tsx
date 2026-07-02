import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('es', 'quiz')

export default function EsQuizPage() {
  return <LocalizedPage locale="es" pageKey="quiz" />
}
