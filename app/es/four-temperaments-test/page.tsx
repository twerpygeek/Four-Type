import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('es', 'four-temperaments-test')

export default function EsFourTemperamentsTestPage() {
  return <LocalizedPage locale="es" pageKey="four-temperaments-test" />
}
