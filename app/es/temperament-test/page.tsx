import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('es', 'temperament-test')

export default function EsTemperamentTestPage() {
  return <LocalizedPage locale="es" pageKey="temperament-test" />
}
