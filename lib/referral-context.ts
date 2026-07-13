import { BLENDS } from './blends'
import { decodeShareId, type DecodedShareResult } from './share-id'

export type ReferralContext =
  | { status: 'none' }
  | { status: 'invalid'; shareId: string }
  | { status: 'valid'; shareId: string; inviter: DecodedShareResult }

export function parseReferralContext(rawId: string): ReferralContext {
  const shareId = rawId.trim().slice(0, 500)
  if (!shareId) return { status: 'none' }

  const inviter = decodeShareId(shareId)
  if (!inviter || !BLENDS[inviter.blendKey]) {
    return { status: 'invalid', shareId }
  }

  return { status: 'valid', shareId, inviter }
}
