import { localizedMetadata } from '@/components/LocalizedPage'
import { HomeExperience } from '@/app/page'

export const metadata = localizedMetadata('zh-CN', 'home')

export default function ZhCnHomePage() {
  return <HomeExperience locale="zh-CN" />
}
