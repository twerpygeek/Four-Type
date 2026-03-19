'use client'

const LEVEL_GATES = [10, 20, 30, 40]

interface XPProgressBarProps {
  current: number
  total: number
  heroName: string
}

export default function XPProgressBar({ current, total, heroName }: XPProgressBarProps) {
  const pct = (current / total) * 100

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs text-[#64748B]">
          {heroName}
        </span>
        <span className="font-serif text-xs" style={{ color: '#FFD700' }}>
          Quest {current} of {total}
        </span>
      </div>

      {/* XP Bar */}
      <div className="relative w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
        {/* Fill */}
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC)',
            boxShadow: '0 0 8px rgba(255,215,0,0.6)',
          }}
        />

        {/* Level gate markers */}
        {LEVEL_GATES.slice(0, -1).map((gate) => {
          const markerPct = (gate / total) * 100
          return (
            <div
              key={gate}
              className="absolute top-0 h-full w-px"
              style={{
                left: `${markerPct}%`,
                backgroundColor: '#0D0D0F',
                opacity: 0.7,
              }}
            />
          )
        })}
      </div>

      {/* Level labels */}
      <div className="relative w-full h-4">
        {LEVEL_GATES.map((gate) => {
          const markerPct = (gate / total) * 100
          const reached = current >= gate
          return (
            <div
              key={gate}
              className="absolute -translate-x-1/2 flex flex-col items-center gap-0.5"
              style={{ left: `${markerPct}%` }}
            >
              <span
                className="font-sans text-[9px] font-bold transition-colors duration-300"
                style={{ color: reached ? '#FFD700' : '#2A2A40' }}
              >
                Q{gate}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
