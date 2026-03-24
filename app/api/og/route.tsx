import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { BLENDS, BlendKey, getBlendColors } from '@/lib/blends'
import { TemperamentKey } from '@/lib/scoringKey'

export const runtime = 'edge'

// Character image URLs for each temperament
const CHARACTER_IMAGES: Record<TemperamentKey, string> = {
  Yellow: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-euLHMUxeRi6LvSmqlycXvdRStXiMmI.png',
  Red: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-vXB8vIN16kna1cGrklqseOHC3gASWk.png',
  Blue: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-41w0Pxn7bABu8gSFUNO21vLrx42NVP.png',
  Green: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-zhzjVLCvu9ZK1JKMFkSwdcY4YCabE5.png',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blendKey = searchParams.get('blend') as BlendKey | null
  const heroName = searchParams.get('name') || 'A Hero'
  
  // Default fallback
  if (!blendKey || !(blendKey in BLENDS)) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0D0D0F',
            fontFamily: 'serif',
          }}
        >
          <div style={{ fontSize: 72, color: '#FFD700', fontWeight: 'bold' }}>
            FOURTYPE
          </div>
          <div style={{ fontSize: 24, color: '#94A3B8', marginTop: 16 }}>
            Discover Your Temperament
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
  
  const blend = BLENDS[blendKey]
  const blendColors = getBlendColors(blend)
  const primaryColor = blendColors.primary
  const characterImage = CHARACTER_IMAGES[blend.primary]

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0D0D0F',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 30% 50%, ${primaryColor}25 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${primaryColor}15 0%, transparent 50%)`,
          }}
        />
        
        {/* Left side - Character */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Character glow */}
          <div
            style={{
              position: 'absolute',
              width: 350,
              height: 350,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
          {/* Character image */}
          <img
            src={characterImage}
            alt={blend.name}
            width={320}
            height={400}
            style={{
              objectFit: 'contain',
              filter: `drop-shadow(0 0 30px ${primaryColor}80)`,
              position: 'relative',
            }}
          />
        </div>
        
        {/* Right side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '60%',
            height: '100%',
            paddingRight: 60,
            paddingLeft: 20,
            position: 'relative',
          }}
        >
          {/* Top branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                backgroundColor: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#0D0D0F', fontSize: 18, fontWeight: 'bold' }}>F</span>
            </div>
            <span style={{ color: '#64748B', fontSize: 14, letterSpacing: '0.25em' }}>FOURTYPE</span>
          </div>

          {/* Hero name */}
          <div style={{ color: '#94A3B8', fontSize: 26, marginBottom: 8 }}>
            {heroName} is
          </div>
          
          {/* Blend name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: primaryColor,
              lineHeight: 1,
              marginBottom: 12,
              textShadow: `0 0 60px ${primaryColor}60`,
            }}
          >
            {blend.name.toUpperCase()}
          </div>
          
          {/* Blend type */}
          <div style={{ color: '#E2E8F0', fontSize: 28, marginBottom: 20 }}>
            {blend.blend}
          </div>
          
          {/* Color stripe + RPG Class */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div
                style={{
                  width: 60,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: primaryColor,
                }}
              />
              {blend.secondary !== 'Pure' && blend.secondary !== 'Triple' && (
                <div
                  style={{
                    width: 40,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: blendColors.secondary,
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: 30,
                border: `2px solid ${primaryColor}60`,
                backgroundColor: `${primaryColor}15`,
              }}
            >
              <span style={{ color: primaryColor, fontSize: 18, fontWeight: 'bold' }}>
                {blend.rpgClass}
              </span>
            </div>
          </div>
          
          {/* Tagline */}
          <div
            style={{
              color: '#CBD5E1',
              fontSize: 22,
              fontStyle: 'italic',
              maxWidth: 500,
              lineHeight: 1.4,
              marginBottom: 28,
            }}
          >
            &ldquo;{blend.tagline}&rdquo;
          </div>
          
          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 8,
              backgroundColor: `${primaryColor}20`,
              border: `1px solid ${primaryColor}40`,
            }}
          >
            <span style={{ color: '#E2E8F0', fontSize: 18 }}>
              What&apos;s your type?
            </span>
            <span style={{ color: primaryColor, fontSize: 18, fontWeight: 'bold' }}>
              fourtype.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
