'use client'

import { useEffect } from 'react'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import type { CurrencyKey, SupporterTierKey } from '@/lib/field-guide/catalog'

type FieldGuidePurchaseCompleteTrackerProps = {
  tier: SupporterTierKey
  currency: CurrencyKey
}

export default function FieldGuidePurchaseCompleteTracker({ tier, currency }: FieldGuidePurchaseCompleteTrackerProps) {
  useEffect(() => {
    trackFieldGuideEvent({ event: 'field-guide-purchase-complete', tier, currency })
  }, [tier, currency])

  return null
}
