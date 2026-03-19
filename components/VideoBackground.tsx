'use client'

import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  /** 1-40 question number for temperature control */
  questionNumber?: number
  /** Overlay opacity (0-1) */
  overlayOpacity?: number
}

export default function VideoBackground({ questionNumber = 20, overlayOpacity = 0.4 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Auto-play video with muted audio
    video.muted = true
    video.loop = true
    video.play().catch((error) => {
      console.log('[v0] Video autoplay failed:', error.message)
    })
  }, [])

  // Progress through assessment darkens the overlay (early = light, late = dark)
  const progressOverlay = Math.min(overlayOpacity + (questionNumber - 1) / 40 * 0.3, 0.7)

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-background z-0 pointer-events-none">
      {/* Video element */}
      <video
        ref={videoRef}
        src="/videos/test-journey.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
      />

      {/* Color temperature gradient overlay - shifts from warm (early) to cool (late) */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, 
            rgba(255, 200, 100, ${0.15 - questionNumber / 200}) 0%,
            rgba(76, 201, 240, ${questionNumber / 500}) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay that increases with progress */}
      <div
        className="absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300"
        style={{
          backgroundColor: `rgba(13, 13, 15, ${progressOverlay})`,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
