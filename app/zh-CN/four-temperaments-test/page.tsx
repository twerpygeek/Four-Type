import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('zh-CN', 'four-temperaments-test')

export default function ZhCnFourTemperamentsTestPage() {
  return <LocalizedPage locale="zh-CN" pageKey="four-temperaments-test" />
}
