import { createCheckoutPostHandler } from '@/lib/field-guide/checkout-route'
import { createRateLimiter } from '@/lib/field-guide/rate-limit'
import { vercelPrivateBlobStore } from '@/lib/field-guide/blob-server'
import { createFieldGuideCheckout } from '@/lib/field-guide/stripe'

export const POST = createCheckoutPostHandler({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  createCheckout: createFieldGuideCheckout,
  rateLimit: createRateLimiter({
    store: vercelPrivateBlobStore,
    action: 'checkout',
    capacity: 60,
    windowMs: 60_000,
  }),
})
