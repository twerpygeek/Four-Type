import { BLENDS } from './blends'
import { getProfileEmailPreview } from './result-virality'
import type { LeadCapturePayload } from './google-sheets-leads'
import { getSubtypeByBlendKey } from './subtypes'

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FOURTYPE_EMAIL_FROM
  const replyTo = process.env.FOURTYPE_EMAIL_REPLY_TO

  if (!apiKey || !from) return null

  return { apiKey, from, replyTo }
}

export function isProfileEmailConfigured() {
  return getEmailConfig() !== null
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getProfileEmail(payload: LeadCapturePayload) {
  const blend = BLENDS[payload.blendKey as keyof typeof BLENDS]

  if (!blend) {
    return {
      subject: 'Your FourType profile',
      text: `Thanks for joining FourType.\n\nYour result: ${payload.resultName}\n${payload.shareUrl}\n\nTake the quiz again or share it with a friend: https://www.fourtype.com/quiz`,
      html: `<p>Thanks for joining FourType.</p><p>Your result: <strong>${escapeHtml(payload.resultName)}</strong></p><p><a href="${escapeHtml(payload.shareUrl)}">Open your share page</a></p><p><a href="https://www.fourtype.com/quiz">Take the quiz again</a></p>`,
    }
  }

  const preview = getProfileEmailPreview(blend)
  const subtype = getSubtypeByBlendKey(payload.blendKey)
  const subtypeUrl = subtype ? `https://www.fourtype.com/subtype/${subtype.slug}` : 'https://www.fourtype.com/blog/subtypes'
  const shareUrl = payload.shareUrl || 'https://www.fourtype.com/quiz'
  const subject = `Your FourType profile: ${blend.name}`
  const text = [
    `Your FourType profile: ${blend.name}`,
    '',
    preview.oneSentence,
    '',
    `What people may misread: ${preview.misunderstood}`,
    '',
    `Your growth move this week: ${preview.challenge}`,
    '',
    `Open your result: ${shareUrl}`,
    `Take the quiz again or send it to a friend: https://www.fourtype.com/quiz`,
  ].join('\n')
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <p style="font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: #64748b;">FourType Profile</p>
      <h1 style="font-family: Georgia, serif; font-size: 30px; margin: 0 0 12px;">${escapeHtml(blend.name)}</h1>
      <p style="font-size: 17px;">${escapeHtml(preview.oneSentence)}</p>
      <div style="border-left: 4px solid #eab308; padding-left: 16px; margin: 22px 0;">
        <p style="margin: 0; color: #475569;"><strong>What people may misread:</strong><br>${escapeHtml(preview.misunderstood)}</p>
      </div>
      <p><strong>Your growth move this week:</strong><br>${escapeHtml(preview.challenge)}</p>
      <p><a href="${escapeHtml(shareUrl)}">Open your share page</a></p>
      <p><a href="${escapeHtml(subtypeUrl)}">Read your deeper subtype profile</a></p>
      <p style="font-size: 13px; color: #64748b;">FourType is a self-reflection tool, not a clinical diagnosis.</p>
    </div>
  `

  return { subject, text, html }
}

export async function sendProfileEmail(payload: LeadCapturePayload) {
  const config = getEmailConfig()

  if (!config) {
    return { sent: false, skipped: true }
  }

  const email = getProfileEmail(payload)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: payload.email,
      reply_to: config.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Profile email failed: ${message}`)
  }

  return { sent: true, skipped: false }
}
