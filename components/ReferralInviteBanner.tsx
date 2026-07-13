import Image from 'next/image'
import { BLENDS } from '@/lib/blends'
import type { DecodedShareResult } from '@/lib/share-id'
import { TEMPERAMENTS } from '@/lib/temperaments'
import type { QuizLocale } from '@/lib/quiz-i18n'

const copy = {
  en: {
    eyebrow: 'A friend challenged you',
    title: (name: string) => `${name} wants to compare FourTypes`,
    body: 'Finish the test to reveal your shared strengths, likely friction, and the best way to communicate.',
  },
  'zh-CN': {
    eyebrow: '朋友向你发起了挑战',
    title: (name: string) => `${name} 想和你比较 FourType`,
    body: '完成测试，了解你们共同的优势、可能的摩擦，以及更好的沟通方式。',
  },
  es: {
    eyebrow: 'Un amigo te ha retado',
    title: (name: string) => `${name} quiere comparar sus FourTypes`,
    body: 'Completa el test para descubrir fortalezas compartidas, posibles fricciones y cómo comunicarse mejor.',
  },
} satisfies Record<QuizLocale, { eyebrow: string; title: (name: string) => string; body: string }>

export default function ReferralInviteBanner({ inviter, locale }: { inviter: DecodedShareResult; locale: QuizLocale }) {
  const blend = BLENDS[inviter.blendKey]
  const temperament = TEMPERAMENTS[blend.primary]
  const text = copy[locale]

  return (
    <section className="w-full rounded-lg border border-[#FFD700]/35 bg-[#1A1A2E]/90 p-4 text-left">
      <div className="flex items-center gap-4">
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-[#FFD700]/30 bg-[#0D0D0F]">
          <Image src={temperament.characterImage} alt={blend.name} fill sizes="72px" className="object-contain p-1" />
        </div>
        <div className="min-w-0">
          <p className="font-serif text-[10px] uppercase tracking-[0.24em] text-[#FFD700]">{text.eyebrow}</p>
          <h1 className="mt-1 font-serif text-lg font-bold leading-tight text-[#E2E8F0] break-words">
            {text.title(inviter.heroName)}
          </h1>
          <p className="mt-1 font-sans text-xs leading-relaxed text-[#94A3B8]">
            {inviter.heroName}: {blend.name}
          </p>
        </div>
      </div>
      <p className="mt-3 font-sans text-xs leading-relaxed text-[#94A3B8]">{text.body}</p>
    </section>
  )
}
