import { localizedMetadata } from '@/components/LocalizedPage'
import { HomeExperience } from '@/app/page'

export const metadata = localizedMetadata('es', 'home')

export default function EsHomePage() {
  return <HomeExperience locale="es" />
}
