import { fulfillProductionFieldGuideCheckout } from '@/lib/field-guide/fulfillment-server'
import { getStripe } from '@/lib/field-guide/stripe'
import { createWebhookPostHandler } from '@/lib/field-guide/webhook'

export const runtime = 'nodejs'

type StripeWebhookClient = {
  webhooks: {
    constructEvent: (payload: string, signature: string, secret: string) => {
      type: string
      data: { object: unknown }
    }
  }
}

export const POST = createWebhookPostHandler({
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  constructEvent: (rawBody, signature, secret) => (
    (getStripe() as unknown as StripeWebhookClient).webhooks.constructEvent(rawBody, signature, secret)
  ),
  fulfill: fulfillProductionFieldGuideCheckout,
})
