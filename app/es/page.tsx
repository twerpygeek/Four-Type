import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('es', 'home')

export default function EsHomePage() {
  return <LocalizedPage locale="es" pageKey="home" />
}
