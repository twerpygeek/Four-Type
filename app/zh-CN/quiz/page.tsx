import { LocalizedPage, localizedMetadata } from '@/components/LocalizedPage'

export const metadata = localizedMetadata('zh-CN', 'quiz')

export default function ZhCnQuizPage() {
  return <LocalizedPage locale="zh-CN" pageKey="quiz" />
}
