import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { BLENDS, BlendKey, getBlendColors } from '@/lib/blends'

export const runtime = 'edge'

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

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0D0D0F',
          fontFamily: 'serif',
          position: 'relative',
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
            background: `radial-gradient(ellipse at top left, ${primaryColor}30 0%, transparent 50%), radial-gradient(ellipse at bottom right, ${primaryColor}20 0%, transparent 50%)`,
          }}
        />
        
        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: 60,
            position: 'relative',
          }}
        >
          {/* Top branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#0D0D0F', fontSize: 24, fontWeight: 'bold' }}>F</span>
            </div>
            <span style={{ color: '#64748B', fontSize: 18, letterSpacing: '0.3em' }}>FOURTYPE</span>
          </div>

          {/* Hero name */}
          <div style={{ color: '#94A3B8', fontSize: 28, marginBottom: 12 }}>
            {heroName} is
          </div>
          
          {/* Blend name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: primaryColor,
              textAlign: 'center',
              lineHeight: 1,
              marginBottom: 16,
              textShadow: `0 0 60px ${primaryColor}60`,
            }}
          >
            {blend.name.toUpperCase()}
          </div>
          
          {/* Blend type */}
          <div style={{ color: '#E2E8F0', fontSize: 32, marginBottom: 24 }}>
            {blend.blend}
          </div>
          
          {/* Color stripe */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            <div
              style={{
                width: 80,
                height: 8,
                borderRadius: 4,
                backgroundColor: primaryColor,
              }}
            />
            {blend.secondary !== 'Pure' && blend.secondary !== 'Triple' && (
              <div
                style={{
                  width: 60,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: blendColors.secondary,
                }}
              />
            )}
          </div>
          
          {/* RPG Class */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 32px',
              borderRadius: 40,
              border: `2px solid ${primaryColor}60`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <span style={{ color: primaryColor, fontSize: 24, fontWeight: 'bold' }}>
              {blend.rpgClass}
            </span>
          </div>
          
          {/* Tagline */}
          <div
            style={{
              color: '#94A3B8',
              fontSize: 24,
              fontStyle: 'italic',
              marginTop: 32,
              maxWidth: 800,
              textAlign: 'center',
            }}
          >
            &ldquo;{blend.tagline}&rdquo;
          </div>
          
          {/* CTA */}
          <div style={{ color: '#64748B', fontSize: 20, marginTop: 40 }}>
            Discover your temperament at fourtype.com
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
