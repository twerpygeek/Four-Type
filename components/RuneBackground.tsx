'use client'

import { useEffect, useRef } from 'react'

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ']

interface Rune {
  x: number
  y: number
  char: string
  speed: number
  opacity: number
  size: number
  rotation: number
  rotSpeed: number
}

export default function RuneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const runes: Rune[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function spawnRune(): Rune {
      return {
        x: Math.random() * (canvas?.width ?? window.innerWidth),
        y: (canvas?.height ?? window.innerHeight) + 20,
        char: RUNES[Math.floor(Math.random() * RUNES.length)],
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.08 + Math.random() * 0.12,
        size: 10 + Math.random() * 16,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
      }
    }

    // Seed with initial runes spread across the screen
    for (let i = 0; i < 30; i++) {
      const r = spawnRune()
      r.y = Math.random() * (canvas.height ?? window.innerHeight)
      runes.push(r)
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Occasionally spawn new runes
      if (Math.random() < 0.05 && runes.length < 50) {
        runes.push(spawnRune())
      }

      for (let i = runes.length - 1; i >= 0; i--) {
        const r = runes[i]
        r.y -= r.speed
        r.rotation += r.rotSpeed

        ctx.save()
        ctx.globalAlpha = r.opacity
        ctx.translate(r.x, r.y)
        ctx.rotate(r.rotation)
        ctx.font = `${r.size}px serif`
        ctx.fillStyle = '#FFD700'
        ctx.fillText(r.char, 0, 0)
        ctx.restore()

        if (r.y < -20) {
          runes.splice(i, 1)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
