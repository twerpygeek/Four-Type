import { HomeExperience } from '@/app/page'
import { localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('id', 'home')

export default function IndonesianHomePage() {
  return <HomeExperience locale="id" />
}
