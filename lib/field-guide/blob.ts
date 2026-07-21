export const MAX_PRIVATE_ASSET_URL_TTL_MS = 15 * 60 * 1_000

export type PrivateBlobPutOptions = {
  access: 'private'
  addRandomSuffix: false
  allowOverwrite: boolean
  contentType: 'application/json'
  ifMatch?: string
}

export type PrivateBlobRecord = {
  body: string
  etag: string
}

export type PrivateBlobStore = {
  get: (pathname: string, options: { access: 'private'; useCache: false }) => Promise<PrivateBlobRecord | null>
  put: (pathname: string, body: string, options: PrivateBlobPutOptions) => Promise<{ etag: string }>
}

type IssuedSignedToken = {
  delegationToken: string
  clientSigningToken: string
  validUntil: number
}

type PrivateAssetTokenOptions = {
  pathname: string
  operations: ['get']
  validUntil: number
}

type PrivateAssetUrlOptions = {
  pathname: string
  operation: 'get'
  validUntil: number
  access: 'private'
}

export type BlobSigningAdapter = {
  issueSignedToken: (options: PrivateAssetTokenOptions) => Promise<IssuedSignedToken>
  presignUrl: (token: IssuedSignedToken, options: PrivateAssetUrlOptions) => Promise<{ presignedUrl: string }>
}

function assertPrivatePathname(pathname: string) {
  if (
    typeof pathname !== 'string'
    || pathname.length === 0
    || pathname.length > 1_024
    || pathname.includes('..')
    || pathname.includes('*')
    || pathname.includes('?')
    || pathname.startsWith('/')
  ) {
    throw new Error('Private asset pathname is invalid')
  }
}

export async function createPrivateAssetUrl(
  pathname: string,
  signer: BlobSigningAdapter,
  now = Date.now(),
  requestedTtlMs = MAX_PRIVATE_ASSET_URL_TTL_MS,
) {
  assertPrivatePathname(pathname)
  if (!Number.isSafeInteger(now) || !Number.isFinite(requestedTtlMs) || requestedTtlMs <= 0) {
    throw new Error('Private asset expiry is invalid')
  }

  const validUntil = now + Math.min(requestedTtlMs, MAX_PRIVATE_ASSET_URL_TTL_MS)
  const signedToken = await signer.issueSignedToken({
    pathname,
    operations: ['get'],
    validUntil,
  })
  const { presignedUrl } = await signer.presignUrl(signedToken, {
    pathname,
    operation: 'get',
    validUntil,
    access: 'private',
  })

  return presignedUrl
}
