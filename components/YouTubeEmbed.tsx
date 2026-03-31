'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export function YouTubeEmbed({ videoId, title = 'Video', className = '' }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // YouTube thumbnail URL (high quality)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-black ${className}`} style={{ aspectRatio: '16 / 9' }}>
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <div className="relative w-full h-full">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to lower quality thumbnail if maxresdefault fails
                (e.currentTarget as HTMLImageElement).src = fallbackThumbnail
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors" />
          </div>

          {/* Play Button */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            aria-label="Play video"
          >
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-2xl">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </button>
        </>
      ) : (
        /* Playing state */
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
