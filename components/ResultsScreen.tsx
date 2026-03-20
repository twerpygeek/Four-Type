'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ScoreMap, TemperamentKey, getDominantAndSecondary, getMaskingWarning, resolveBlend } from '@/lib/scoringKey'
import { TEMPERAMENTS } from '@/lib/temperaments'
import { BLENDS, getBlendColors } from '@/lib/blends'
import ScoreChart from './ScoreChart'
import CinematicBackground from './CinematicBackground'
import ShareableCard from './ShareableCard'

interface ResultsScreenProps {
  heroName: string
  scores: ScoreMap
  onRetake: () => void
}

type Tab = 'strengths' | 'shadow' | 'communication' | 'partners' | 'deeper' | 'growth'

export default function ResultsScreen({ heroName, scores, onRetake }: ResultsScreenProps) {
  // Resolve the 15-type blend
  const blendResult = resolveBlend(scores)
  const blend = BLENDS[blendResult.blendKey]
  const blendColors = getBlendColors(blend)
  
  // Legacy temperament data for character images and some content
  const [dominant, secondary] = getDominantAndSecondary(scores)
  const masking = getMaskingWarning(scores)
  const t = TEMPERAMENTS[dominant]
  const sec = TEMPERAMENTS[secondary]
  
  // Primary color for styling (from blend)
  const primaryColor = blendColors.primary
  const secondaryColor = blendColors.secondary

  const [revealed, setRevealed] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('strengths')
  const [showShareCard, setShowShareCard] = useState(false)
  const [viewingClass, setViewingClass] = useState<TemperamentKey | null>(null)
  const viewingTemp = viewingClass ? TEMPERAMENTS[viewingClass] : null

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  function getInterpretation(): string {
    if (blendResult.flag === 'pure') {
      return `Pure ${t.name} — rare and singular`
    }
    if (blendResult.flag === 'triple') {
      return `Triple blend — the rarest type in the system`
    }
    if (blendResult.flag === 'bilingual') {
      return `Bilingual in two temperaments — ${t.name} and ${sec.name}`
    }
    if (masking === 'diagonal') {
      return `This rare diagonal combination may indicate masking — learned behavior vs. true wiring`
    }
    return blend.drive
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'strengths', label: 'Strengths' },
    { key: 'shadow', label: 'Shadow' },
    { key: 'deeper', label: 'Analysis' },
    { key: 'communication', label: 'Style' },
    { key: 'partners', label: 'Match' },
    { key: 'growth', label: 'Growth' },
  ]

  return (
    <main
      className="relative min-h-screen flex flex-col items-center px-4 pt-8 pb-16 gap-8"
      style={{ background: '#0D0D0F' }}
    >
      <CinematicBackground temperament={dominant} />

      <div className="relative z-10 w-full max-w-xl flex flex-col gap-8">
        {/* HERO REVEAL WITH CHARACTER */}
        <div
          className="flex flex-col items-center gap-6 text-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#64748B]">
            Your Character Class
          </p>

          {/* Character illustration with animated glow */}
          <div className="relative">
            {/* Animated glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-50 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${primaryColor}60 0%, transparent 70%)`,
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />
            
            {/* Rotating border effect */}
            <div
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center p-1"
              style={{
                background: `conic-gradient(from 0deg, ${primaryColor}, transparent, ${primaryColor})`,
                animation: 'rotate 12s linear infinite',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: '#0D0D0F',
                  boxShadow: `0 0 60px ${primaryColor}40, inset 0 0 30px ${primaryColor}15`,
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={t.characterImage}
                    alt={blend.name}
                    width={160}
                    height={160}
                    loading="eager"
                    className="object-contain w-auto h-full"
                    style={{
                      filter: `drop-shadow(0 0 20px ${primaryColor}60)`,
                      maxWidth: '100%',
                      maxHeight: '140px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sparkle decorations */}
            <div
              className="absolute top-2 right-4 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }}
            />
            <div
              className="absolute bottom-4 left-2 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '0.5s' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-serif text-sm text-[#64748B]">
              {heroName}, you are
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-black text-balance"
              style={{ color: primaryColor, textShadow: `0 0 40px ${primaryColor}50` }}
            >
              {blend.name.toUpperCase()}
            </h1>
            <p
              className="font-serif text-base font-semibold"
              style={{ color: '#E2E8F0' }}
            >
              {blend.blend}
            </p>
            {/* Dual color stripe showing the blend */}
            <div className="flex items-center justify-center gap-1 mt-2">
              <div 
                className="h-1.5 rounded-full" 
                style={{ backgroundColor: primaryColor, width: '40px' }}
              />
              {blend.secondary !== 'Pure' && blend.secondary !== 'Triple' && (
                <div 
                  className="h-1.5 rounded-full" 
                  style={{ backgroundColor: secondaryColor, width: '30px' }}
                />
              )}
            </div>
          </div>

          {/* RPG Class badge */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full border"
            style={{
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <span
              className="font-serif text-sm font-bold"
              style={{ color: primaryColor }}
            >
              {blend.rpgClass}
            </span>
          </div>

          {/* Interpretation badge */}
          <div
            className="px-4 py-2 rounded-full border text-xs font-sans text-center max-w-xs"
            style={{
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
              color: '#E2E8F0',
            }}
          >
            {getInterpretation()}
          </div>
          
          {/* MBTI & Enneagram hints */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className="px-2 py-1 rounded text-[10px] font-sans border"
              style={{ borderColor: `${primaryColor}30`, color: '#94A3B8' }}
            >
              Likely MBTI: {blend.mbti.join(' / ')}
            </span>
            <span
              className="px-2 py-1 rounded text-[10px] font-sans border"
              style={{ borderColor: `${primaryColor}30`, color: '#94A3B8' }}
            >
              Enneagram: {blend.enneagram[0]}
            </span>
          </div>
        </div>

        {/* LORE */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-3 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: `${primaryColor}30` }}
        >
          {/* Subtle glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: primaryColor }}
          />
          <p className="font-serif text-xs tracking-widest uppercase relative" style={{ color: primaryColor }}>
            Identity Lore
          </p>
          <blockquote
            className="font-sans text-sm text-[#94A3B8] leading-relaxed italic text-pretty relative"
          >
            &ldquo;{blend.lore}&rdquo;
          </blockquote>
          <p className="font-sans text-xs text-[#64748B] relative">
            <span style={{ color: primaryColor }}>Core Drive:</span> {blend.drive}
          </p>
          <p className="font-sans text-xs text-[#64748B] relative">
            <span style={{ color: primaryColor }}>Tagline:</span> {blend.tagline}
          </p>
        </div>

        {/* SCORE CHART */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
            Score Breakdown
          </p>
          <ScoreChart scores={scores} dominant={dominant} />

          {/* Secondary */}
          <div
            className="flex items-center gap-3 rounded-lg px-3 py-2 border"
            style={{ borderColor: `${sec.colorHex}30`, backgroundColor: `${sec.colorHex}08` }}
          >
            <Image
              src={sec.characterImage}
              alt={sec.title}
              width={32}
              height={40}
              className="object-contain opacity-70"
              style={{ width: '32px', height: '40px' }}
            />
            <p className="font-sans text-xs text-[#94A3B8]">
              Secondary: <span className="font-serif font-semibold" style={{ color: sec.colorHex }}>{sec.title}</span>
              <span className="text-[#64748B]"> ({sec.name})</span>
            </p>
          </div>

          {/* Masking warning */}
          {masking && (
            <div
              className="rounded-lg border px-3 py-2.5 flex gap-2"
              style={{ borderColor: '#E6394650', backgroundColor: '#E6394610' }}
            >
              <span className="text-[#E63946] text-xs mt-0.5 shrink-0">!</span>
              <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                {masking === 'diagonal'
                  ? 'This rare diagonal combination may indicate masking — learned behavior vs. true wiring. Take note.'
                  : 'Your scores suggest masking — you may have adapted your personality to meet external expectations. Focus on your dominant temperament for now.'}
              </p>
            </div>
          )}
        </div>

        {/* TABS */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          {/* Tab bar — scrollable on mobile */}
          <div
            className="flex border-b overflow-x-auto scrollbar-none"
            style={{ borderColor: '#2A2A40' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="shrink-0 px-3 py-3 font-serif text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  color: activeTab === tab.key ? primaryColor : '#64748B',
                  borderBottom: activeTab === tab.key ? `2px solid ${primaryColor}` : '2px solid transparent',
                  backgroundColor: activeTab === tab.key ? `${primaryColor}08` : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5">
            {activeTab === 'strengths' && (
              <ul className="flex flex-col gap-2">
                {blend.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'shadow' && (
              <ul className="flex flex-col gap-2">
                {blend.shadows.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    {w}
                  </li>
                ))}
                <li className="flex items-start gap-3 font-sans text-sm leading-relaxed mt-2 pt-3 border-t" style={{ borderColor: '#2A2A40', color: '#94A3B8' }}>
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                  <span><span className="font-semibold text-[#E2E8F0]">Under stress:</span> {blend.underStress}</span>
                </li>
              </ul>
            )}

            {activeTab === 'communication' && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-lg border px-4 py-3"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}08` }}
                >
                  <p className="font-serif text-xs uppercase tracking-widest mb-1" style={{ color: primaryColor }}>
                    Speak to {blend.name}
                  </p>
                  <p className="font-sans text-sm text-[#E2E8F0] leading-relaxed">
                    {blend.speakTo}
                  </p>
                </div>
                <div
                  className="rounded-lg border px-4 py-3"
                  style={{ borderColor: '#E6394640', backgroundColor: '#E6394608' }}
                >
                  <p className="font-serif text-xs uppercase tracking-widest mb-1 text-[#E63946]">
                    Never Do
                  </p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
                    {blend.neverDo}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#52B788]">Best Partners</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.bestPartners}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#E63946]">Friction With</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.frictionWith}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest" style={{ color: primaryColor }}>Famous {blend.name}s</p>
                  <p className="font-sans text-sm text-[#94A3B8]">{blend.famous.join(', ')}</p>
                </div>
              </div>
            )}

            {activeTab === 'deeper' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest" style={{ color: primaryColor }}>Identity Stack</p>
                  <div className="grid gap-2">
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">Primary Drive</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.drive}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">Likely MBTI</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.mbti.join(' / ')}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">Enneagram Pattern</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.enneagram.join(' or ')}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">RPG Class</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.rpgClass}</p>
                    </div>
                  </div>
                  <p className="font-sans text-[10px] text-[#4A5568] italic mt-1">
                    Inferred from your pattern — not definitive typing
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#FFD700]">In Relationships</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.inRelationships}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#4CC9F0]">At Work</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.atWork}</p>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="flex flex-col gap-4">
                <p className="font-sans text-sm text-[#64748B] italic">
                  Areas to develop for a more balanced life:
                </p>
                <ul className="flex flex-col gap-3">
                  {t.growthAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                      <span 
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                      >
                        {i + 1}
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ALL CLASSES */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-3"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
            All Character Classes
          </p>
          <p className="font-sans text-xs text-[#4A5568] -mt-1">
            Tap any class to learn more
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
              const cls = TEMPERAMENTS[key]
              const isUser = key === dominant
              return (
                <button
                  key={key}
                  onClick={() => setViewingClass(key)}
                  className="rounded-xl border p-3 flex items-center gap-3 relative overflow-hidden text-left transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                  style={{
                    borderColor: isUser ? cls.colorHex : `${cls.colorHex}20`,
                    backgroundColor: isUser ? `${cls.colorHex}12` : `${cls.colorHex}05`,
                  }}
                >
                  {isUser && (
                    <div
                      className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20 blur-2xl"
                      style={{ backgroundColor: cls.colorHex }}
                    />
                  )}
                  <Image
                    src={cls.characterImage}
                    alt={cls.title}
                    width={36}
                    height={44}
                    className="object-contain relative shrink-0"
                    style={{ opacity: isUser ? 1 : 0.6, width: '36px', height: '44px' }}
                  />
                  <div className="flex flex-col gap-0.5 relative min-w-0">
                    <p className="font-serif text-[11px] font-bold leading-tight" style={{ color: cls.colorHex }}>
                      {cls.title}
                      {isUser && <span className="ml-1 text-[8px] opacity-60">YOU</span>}
                    </p>
                    <p className="font-sans text-[10px] text-[#64748B]">{cls.name}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* SHAREABLE CARD SECTION */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
              Share Your Results
            </p>
            <button
              onClick={() => setShowShareCard(!showShareCard)}
              className="font-sans text-xs px-3 py-1 rounded-full border transition-all cursor-pointer"
              style={{
                borderColor: `${primaryColor}40`,
                color: primaryColor,
              }}
            >
              {showShareCard ? 'Hide' : 'Show'} Card
            </button>
          </div>

          {showShareCard && (
            <ShareableCard
              heroName={heroName}
              temperament={t}
              scores={scores}
            />
          )}

          {!showShareCard && (
            <p className="font-sans text-sm text-[#64748B] text-center py-4">
              Generate a shareable character card to post on social media
            </p>
          )}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowShareCard(true)}
            className="w-full font-serif text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden group"
            style={{
              borderColor: primaryColor,
              color: '#0D0D0F',
              backgroundColor: primaryColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = primaryColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor
              e.currentTarget.style.color = '#0D0D0F'
            }}
          >
            Share My Class
          </button>

          <button
            onClick={onRetake}
            className="w-full font-serif text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: '#2A2A40',
              color: '#64748B',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748B'
              e.currentTarget.style.color = '#E2E8F0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2A2A40'
              e.currentTarget.style.color = '#64748B'
            }}
          >
            Retake Quest
          </button>
        </div>

        <p className="font-sans text-center text-xs text-[#2A2A40]">
          TemperamentQuest &bull; Free forever &bull; Know Thyself.
        </p>
      </div>

      {/* CLASS DETAIL MODAL */}
      {viewingTemp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setViewingClass(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border p-5 flex flex-col gap-4"
            style={{
              backgroundColor: '#0D0D0F',
              borderColor: viewingTemp.colorHex,
              boxShadow: `0 0 60px ${viewingTemp.colorHex}30`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setViewingClass(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{ backgroundColor: `${viewingTemp.colorHex}20`, color: viewingTemp.colorHex }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-24 rounded-xl flex items-center justify-center border-2 overflow-hidden shrink-0"
                style={{ borderColor: viewingTemp.colorHex, backgroundColor: `${viewingTemp.colorHex}15` }}
              >
                <Image
                  src={viewingTemp.characterImage}
                  alt={viewingTemp.title}
                  width={80}
                  height={96}
                  className="object-contain w-full h-full"
                  style={{ filter: `drop-shadow(0 0 10px ${viewingTemp.colorHex}60)` }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl font-black" style={{ color: viewingTemp.colorHex }}>
                  {viewingTemp.title.toUpperCase()}
                </h3>
                <p className="font-sans text-sm text-[#94A3B8]">
                  {viewingTemp.name} &bull; {viewingTemp.language}
                </p>
                <p className="font-sans text-xs text-[#64748B]">{viewingTemp.rpgClass}</p>
              </div>
            </div>

            {/* Lore */}
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: `${viewingTemp.colorHex}30`, backgroundColor: `${viewingTemp.colorHex}08` }}
            >
              <p className="font-sans text-sm text-[#94A3B8] italic leading-relaxed">
                &ldquo;{viewingTemp.lore}&rdquo;
              </p>
            </div>

            {/* Core Need */}
            <div className="flex flex-col gap-1">
              <p className="font-serif text-xs uppercase tracking-widest" style={{ color: viewingTemp.colorHex }}>
                Core Need
              </p>
              <p className="font-sans text-sm text-[#E2E8F0]">{viewingTemp.coreNeed}</p>
            </div>

            {/* Strengths */}
            <div className="flex flex-col gap-2">
              <p className="font-serif text-xs uppercase tracking-widest text-[#52B788]">Strengths</p>
              <ul className="flex flex-col gap-1">
                {viewingTemp.strengths.slice(0, 4).map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-[#94A3B8]">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: viewingTemp.colorHex }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shadow */}
            <div className="flex flex-col gap-2">
              <p className="font-serif text-xs uppercase tracking-widest text-[#E63946]">Shadow Side</p>
              <ul className="flex flex-col gap-1">
                {viewingTemp.weaknesses.slice(0, 3).map((w, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-[#94A3B8]">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Famous */}
            <div className="flex flex-col gap-1">
              <p className="font-serif text-xs uppercase tracking-widest text-[#64748B]">
                Famous {viewingTemp.title}s
              </p>
              <p className="font-sans text-sm text-[#94A3B8]">{viewingTemp.famous.join(', ')}</p>
            </div>

            {viewingClass === dominant && (
              <div
                className="rounded-lg border px-3 py-2 text-center"
                style={{ borderColor: `${viewingTemp.colorHex}40`, backgroundColor: `${viewingTemp.colorHex}10` }}
              >
                <p className="font-serif text-xs font-bold" style={{ color: viewingTemp.colorHex }}>
                  This is your dominant type!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
  )
}
