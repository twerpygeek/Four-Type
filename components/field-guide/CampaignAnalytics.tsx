'use client'

import type { ComponentProps } from 'react'
import { trackFourTypeEvent, type FourTypeEventName, type FourTypeEventPayload } from '@/lib/analytics'

type FieldGuideEventName = Extract<FourTypeEventName, `field-guide-${string}`>

export type FieldGuideEventPayload = Omit<FourTypeEventPayload, 'event'> & {
  event: FieldGuideEventName
}

export function trackFieldGuideEvent(payload: FieldGuideEventPayload) {
  trackFourTypeEvent(payload)
}

type CampaignCtaLinkProps = ComponentProps<'a'> & {
  analyticsEvent: FieldGuideEventPayload
}

export function CampaignCtaLink({ analyticsEvent, onClick, ...props }: CampaignCtaLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          trackFieldGuideEvent(analyticsEvent)
        }
      }}
    />
  )
}
