'use client'

import { useEffect, useState } from 'react'
import { ScoreMap, TemperamentKey } from '@/lib/scoringKey'
import { TEMPERAMENTS } from '@/lib/temperaments'
import type { QuizCopy } from '@/lib/quiz-i18n'

interface ScoreChartProps {
  scores: ScoreMap
  dominant: TemperamentKey
  copy?: QuizCopy['results']
}

const ORDER: TemperamentKey[] = ['Yellow', 'Red', 'Blue', 'Green']

export default function ScoreChart({ scores, dominant, copy }: ScoreChartProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  const total = 40

  return (
    <div className="flex flex-col gap-3 w-full">
      {ORDER.map((key) => {
        const t = TEMPERAMENTS[key]
        const title = copy?.classTitles[key] ?? t.title
        const name = copy?.temperamentNames[key] ?? t.name
        const score = scores[key]
        const pct = (score / total) * 100
        const isDominant = key === dominant

        return (
          <div key={key} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDominant && (
                  <span
                    className="font-serif text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                    style={{ borderColor: t.colorHex, color: t.colorHex }}
                  >
                    {copy?.dominant ?? 'Dominant'}
                  </span>
                )}
                <span
                  className="font-serif text-xs font-semibold"
                  style={{ color: t.colorHex }}
                >
                  {title}
                </span>
                <span className="font-sans text-xs text-[#64748B]">
                  {name}
                </span>
              </div>
              <span
                className="font-serif text-sm font-bold"
                style={{ color: isDominant ? t.colorHex : '#E2E8F0' }}
              >
                {score}
              </span>
            </div>

            {/* Bar */}
            <div
              className="w-full h-2.5 rounded-full overflow-hidden"
              style={{ backgroundColor: '#1A1A2E' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: animated ? `${pct}%` : '0%',
                  backgroundColor: t.colorHex,
                  boxShadow: isDominant ? `0 0 8px ${t.colorHex}` : 'none',
                  transitionDelay: `${ORDER.indexOf(key) * 100}ms`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
