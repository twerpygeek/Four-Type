import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('zh-CN', 'temperament-test')

export default function ZhCnTemperamentTestPage() {
  return <LocalizedPage locale="zh-CN" pageKey="temperament-test" />
}
