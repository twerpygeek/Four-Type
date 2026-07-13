import { localizedMetadata, LocalizedPage } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('id', 'temperament-test')

export default function IndonesianTemperamentTestPage() {
  return <LocalizedPage locale="id" pageKey="temperament-test" />
}
