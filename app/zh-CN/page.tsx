import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('zh-CN', 'home')

export default function ZhCnHomePage() {
  return <LocalizedPage locale="zh-CN" pageKey="home" />
}
