import { allContentPages } from '@/lib/seo-content'
import { getAllSubtypes } from '@/lib/subtypes'
import { localizedLocales, localizedPages, localizedPath, type LocalizedPageKey } from '@/lib/localized-content'

export const dynamic = 'force-static'

export function GET() {
  const subtypes = getAllSubtypes()
  const lines = [
    '# FourType',
    '',
    'FourType is a free four temperaments quiz covering Choleric, Sanguine, Melancholic, Phlegmatic, blended subtypes, relationship patterns, work patterns, and practical temperament education.',
    '',
    '## Core routes',
    '- Home: https://www.fourtype.com',
    '- Free temperament quiz: https://www.fourtype.com/quiz - 40-question FourType test with score spread, subtype result, strengths, blind spots, and shareable result card',
    '- Four Temperaments Test: https://www.fourtype.com/four-temperaments-test',
    '- Temperament Test Guide: https://www.fourtype.com/temperament-test',
    '- Blog: https://www.fourtype.com/blog',
    '- What is a temperament test: https://www.fourtype.com/what-is-temperament-test',
    '',
    '## High-intent temperament resources',
    ...allContentPages.map((page) => `- ${page.title}: https://www.fourtype.com${page.href} - ${page.description}`),
    '',
    '## Localized temperament resources',
    ...Object.keys(localizedLocales).flatMap((locale) => (
      (Object.keys(localizedPages[locale as keyof typeof localizedPages]) as LocalizedPageKey[]).map((pageKey) => {
        const page = localizedPages[locale as keyof typeof localizedPages][pageKey]
        return `- ${page.title} (${locale}): https://www.fourtype.com${localizedPath(locale as keyof typeof localizedPages, pageKey)} - ${page.description}`
      })
    )),
    '',
    '## Temperament subtype profiles',
    ...subtypes.map((subtype) => `- ${subtype.name}: https://www.fourtype.com/subtype/${subtype.slug} - ${subtype.tagline}`),
    '',
    '## Markdown mirrors',
    '- FourType: https://www.fourtype.com/index.md',
    '- FourType Quiz: https://www.fourtype.com/quiz.md - AI-readable quiz overview, result structure, comparison notes, answering guidance, and FAQ',
    '- FourType Blog: https://www.fourtype.com/blog.md',
    '- What Is a Temperament Test: https://www.fourtype.com/what-is-temperament-test.md',
    ...allContentPages.map((page) => `- ${page.title}: https://www.fourtype.com${page.href}.md`),
    ...subtypes.map((subtype) => `- ${subtype.name}: https://www.fourtype.com/subtype/${subtype.slug}.md`),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
