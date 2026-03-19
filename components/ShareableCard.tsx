'use client'

import React, { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { Temperament } from '@/lib/temperaments'
import { TEMPERAMENTS } from '@/lib/temperaments'
import { TemperamentKey, getDominantAndSecondary, resolveBlend } from '@/lib/scoringKey'
import { BLENDS, getBlendColors, Blend } from '@/lib/blends'

interface ShareableCardProps {
  heroName: string
  temperament: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
}

export default function ShareableCard({ heroName, temperament, scores }: ShareableCardProps) {
  const [dominant, secondary] = getDominantAndSecondary(scores)
  const secTemperament = TEMPERAMENTS[secondary]
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const dominantPct = Math.round((scores[dominant] / total) * 100)
  const secondaryPct = Math.round((scores[secondary] / total) * 100)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Resolve blend
  const blendResult = resolveBlend(scores)
  const blend = BLENDS[blendResult.blendKey]
  const blendColors = getBlendColors(blend)

  const traits = blend.strengths.slice(0, 3).map((s) => {
    const match = s.match(/^([^—;]+)/)
    return match ? match[1].trim() : s.slice(0, 40)
  })

  const handleDownload = useCallback(async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const W = 210
      const color = temperament.colorHex
      const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return [r, g, b]
      }
      const [cr, cg, cb] = hexToRgb(color)

      // ── Background ──────────────────────────────────────────────
      doc.setFillColor(13, 13, 15)
      doc.rect(0, 0, 210, 297, 'F')

      // ── Header band ─────────────────────────────────────────────
      doc.setFillColor(cr, cg, cb)
      doc.rect(0, 0, 210, 38, 'F')

      // Overlay dark tint on header
      doc.setFillColor(0, 0, 0)
      doc.setGState(doc.GState({ opacity: 0.45 }))
      doc.rect(0, 0, 210, 38, 'F')
      doc.setGState(doc.GState({ opacity: 1 }))

      // Header text
      doc.setTextColor(cr, cg, cb)
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.text('TYPEQUEST', W / 2, 14, { align: 'center' })

      doc.setTextColor(200, 200, 200)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text('Temperament Assessment Report', W / 2, 21, { align: 'center' })

      // Hero name + type
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${heroName}  ·  ${temperament.title.toUpperCase()}  ·  ${temperament.name}`, W / 2, 31, { align: 'center' })

      // ── Section helper ───────────────────────────────────────────
      let y = 48
      const section = (title: string) => {
        doc.setFillColor(cr, cg, cb)
        doc.setGState(doc.GState({ opacity: 0.15 }))
        doc.rect(14, y - 4, W - 28, 8, 'F')
        doc.setGState(doc.GState({ opacity: 1 }))
        doc.setDrawColor(cr, cg, cb)
        doc.setLineWidth(0.5)
        doc.line(14, y + 4, W - 14, y + 4)
        doc.setTextColor(cr, cg, cb)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(title.toUpperCase(), 16, y + 1)
        y += 10
      }

      const body = (text: string, indent = 16) => {
        doc.setTextColor(180, 190, 200)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        const lines = doc.splitTextToSize(text, W - indent - 14)
        doc.text(lines, indent, y)
        y += lines.length * 5 + 2
      }

      const bullet = (text: string, bulletColor = [cr, cg, cb] as [number, number, number]) => {
        doc.setFillColor(...bulletColor)
        doc.circle(18, y - 1.5, 1, 'F')
        doc.setTextColor(180, 190, 200)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        const lines = doc.splitTextToSize(text, W - 36)
        doc.text(lines, 22, y)
        y += lines.length * 5 + 1
      }

      const gap = (extra = 4) => { y += extra }

      // ── Identity ─────────────────────────────────────────────────
      section('Identity')
      body(`Archetype: ${temperament.archetype}`)
      body(`RPG Class: ${temperament.rpgClass}`)
      body(`Love Language: ${temperament.language}`)
      body(`Core Need: ${temperament.coreNeed}`)
      gap()

      // ── Score Breakdown ───────────────────────────────────────────
      section('Score Breakdown')
      const total = Object.values(scores).reduce((a, b) => a + b, 0)
      const barColors: Record<TemperamentKey, [number, number, number]> = {
        Yellow: [255, 215, 0],
        Red: [230, 57, 70],
        Blue: [76, 201, 240],
        Green: [82, 183, 136],
      }
      ;(Object.keys(scores) as TemperamentKey[]).forEach((key) => {
        const pct = Math.round((scores[key] / total) * 100)
        const t2 = TEMPERAMENTS[key]
        const [br, bg2, bb] = barColors[key]
        const barW = ((W - 60) * scores[key]) / total

        doc.setTextColor(180, 190, 200)
        doc.setFontSize(8)
        doc.setFont('helvetica', key === temperament.key ? 'bold' : 'normal')
        doc.text(`${t2.name} (${t2.title})`, 16, y)

        doc.setFillColor(30, 30, 50)
        doc.roundedRect(60, y - 4, W - 74, 5, 1, 1, 'F')
        doc.setFillColor(br, bg2, bb)
        if (barW > 0) doc.roundedRect(60, y - 4, barW, 5, 1, 1, 'F')

        doc.setTextColor(br, bg2, bb)
        doc.setFont('helvetica', 'bold')
        doc.text(`${pct}%`, W - 12, y, { align: 'right' })

        y += 8
      })
      gap()

      // ── Lore ──────────────────────────────────────────────────────
      section('Class Lore')
      body(`"${temperament.lore}"`)
      gap()

      // ── Deep Analysis ─────────────────────────────────────────────
      section('Deep Analysis')
      body(temperament.deeperAnalysis)
      gap()

      // ── Strengths ─────────────────────────────────────────────────
      section('Strengths')
      temperament.strengths.forEach((s) => bullet(s))
      gap()

      // Page 2 ──────────────────────────────────────────────────────
      doc.addPage()
      doc.setFillColor(13, 13, 15)
      doc.rect(0, 0, 210, 297, 'F')
      y = 20

      // ── Shadow Side ───────────────────────────────────────────────
      section('Shadow Side')
      temperament.weaknesses.forEach((w) => bullet(w, [230, 57, 70]))
      body(`Under stress: ${temperament.underStress}`)
      gap()

      // ── Behavioral Traits ─────────────────────────────────────────
      section('Behavioral Traits')
      temperament.behavioralTraits.forEach((b) => bullet(b))
      gap()

      // ── In Relationships ───────────────────��─────────────────────
      section('In Relationships')
      body(temperament.inRelationships)
      gap()

      // ── At Work ───────────────────────────────────────────────────
      section('At Work')
      body(temperament.atWork)
      gap()

      // ── Communication Style ───────────────────────────────────────
      section('Communication Style')
      temperament.communication.forEach((c) => bullet(c))
      body(`How to speak their language: ${temperament.speakTheir}`)
      gap()

      // ── Growth Areas ─────────────────────────────────────────────
      section('Growth Areas')
      temperament.growthAreas.forEach((g, i) => bullet(`${i + 1}. ${g}`))
      gap()

      // ── Best Match ────────────────────────────────────────────────
      section('Compatibility')
      body(`Best partners: ${temperament.bestPartners}`)
      body(`Friction with: ${temperament.frictionWith}`)
      body(`Famous ${temperament.title}s: ${temperament.famous.join(', ')}`)
      gap()

      // ── Footer ────────────────────────────────────────────────────
      doc.setDrawColor(cr, cg, cb)
      doc.setGState(doc.GState({ opacity: 0.3 }))
      doc.line(14, 282, W - 14, 282)
      doc.setGState(doc.GState({ opacity: 1 }))
      doc.setTextColor(80, 90, 110)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text('TypeQuest · Free Temperament Assessment · typequest.app', W / 2, 288, { align: 'center' })
      ;[1, 2].forEach((pg) => {
        doc.setPage(pg)
        doc.setTextColor(60, 70, 85)
        doc.setFontSize(7)
        doc.text(`Page ${pg} of 2`, W - 14, 292, { align: 'right' })
      })

      doc.save(`typequest-${temperament.name.toLowerCase()}-${heroName.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setIsDownloading(false)
    }
  }, [heroName, temperament, scores, isDownloading])

  const handleCopyText = useCallback(async () => {
    const text = `I am ${blend.name} (${blend.blend}). What's yours?\n\n"${blend.tagline}"\n\nDiscover your character class free at typequest.app`
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [blend])

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* The shareable card */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-4 w-full"
        style={{
          backgroundColor: '#0D0D0F',
          border: `2px solid ${blendColors.primary}`,
        }}
      >
        {/* Glow background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${blendColors.primary}40 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Character image */}
            <div
              className="shrink-0 w-16 h-20 rounded-xl flex items-center justify-center border-2 overflow-hidden"
              style={{
                borderColor: blendColors.primary,
                backgroundColor: `${blendColors.primary}15`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={temperament.characterImage}
                alt={temperament.title}
                crossOrigin="anonymous"
                style={{ height: '68px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="font-sans text-[11px] text-[#64748B] truncate">{heroName}</p>
              <h2
                className="font-serif text-xl font-black leading-tight break-words"
                style={{ color: blendColors.primary }}
              >
                {blend.name.toUpperCase()}
              </h2>
              <p className="font-sans text-xs text-[#94A3B8] leading-snug">
                {blend.blend}
              </p>
              <p className="font-sans text-[11px] text-[#64748B] leading-snug">
                {blend.rpgClass}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${blendColors.primary}40, transparent)` }}
          />

          {/* Key Traits */}
          <div className="flex flex-col gap-2">
            <p className="font-serif text-[9px] tracking-[0.3em] uppercase text-[#64748B]">Key Strengths</p>
            {traits.map((trait, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{ backgroundColor: blendColors.primary }}
                />
                <p className="font-sans text-sm text-[#E2E8F0] leading-snug">{trait}</p>
              </div>
            ))}
          </div>

          {/* Score summary */}
          <div className="flex gap-2">
            <div
              className="flex-1 rounded-lg px-3 py-2 border"
              style={{ borderColor: `${blendColors.primary}40`, backgroundColor: `${blendColors.primary}10` }}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">Primary</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.primary }}>
                {temperament.name} <span className="text-[#94A3B8] font-normal">({dominantPct}%)</span>
              </p>
            </div>
            <div
              className="flex-1 rounded-lg px-3 py-2 border"
              style={{ borderColor: `${blendColors.secondary}30`, backgroundColor: `${blendColors.secondary}08` }}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">Secondary</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.secondary }}>
                {secTemperament.name} <span className="text-[#94A3B8] font-normal">({secondaryPct}%)</span>
              </p>
            </div>
          </div>

          {/* Score bar */}
          <div className="flex gap-0.5 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
            {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
              const colors: Record<TemperamentKey, string> = {
                Yellow: '#FFD700', Red: '#E63946', Blue: '#4CC9F0', Green: '#52B788',
              }
              const t = Object.values(scores).reduce((a, b) => a + b, 0)
              const pct = (scores[key] / t) * 100
              return (
                <div
                  key={key}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: colors[key],
                    opacity: key === temperament.key ? 1 : 0.35,
                  }}
                />
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="font-serif text-[9px] tracking-[0.15em] uppercase text-[#3A3A50]">TypeQuest</p>
            <p className="font-sans text-[9px] text-[#3A3A50]">typequest.app</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
          style={{
            borderColor: blendColors.primary,
            color: '#0D0D0F',
            backgroundColor: blendColors.primary,
          }}
          onMouseEnter={(e) => {
            if (isDownloading) return
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = blendColors.primary
          }}
          onMouseLeave={(e) => {
            if (isDownloading) return
            e.currentTarget.style.backgroundColor = blendColors.primary
            e.currentTarget.style.color = '#0D0D0F'
          }}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
          </svg>
          {isDownloading ? 'Generating...' : 'PDF Report'}
        </button>

        <ShareTextButton color={blendColors.primary} onCopy={handleCopyText} />
      </div>
    </div>
  )
}

function ShareTextButton({
  color,
  onCopy,
}: {
  color: string
  onCopy: () => Promise<boolean>
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    const success = await onCopy()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border transition-all duration-200 cursor-pointer"
      style={{
        borderColor: `${color}40`,
        color: color,
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.backgroundColor = `${color}10`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Copy Text
        </>
      )}
    </button>
  )
}
