import 'server-only'

import {
  BlobPreconditionFailedError,
  get,
  issueSignedToken,
  presignUrl,
  put,
} from '@vercel/blob'
import {
  createPrivateAssetUrl,
  type BlobSigningAdapter,
  type PrivateBlobStore,
} from './blob'

function blobWriteError(error: unknown): Error {
  if (error instanceof BlobPreconditionFailedError) {
    return Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
  }

  const details = error as { message?: unknown; status?: unknown; statusCode?: unknown }
  if (
    details?.status === 409
    || details?.statusCode === 409
    || (typeof details?.message === 'string' && /already exists/i.test(details.message))
  ) {
    return Object.assign(new Error('Blob already exists'), { code: 'already-exists' })
  }

  return error instanceof Error ? error : new Error('Blob write failed')
}

const vercelBlobSigner: BlobSigningAdapter = {
  issueSignedToken,
  presignUrl,
}

export const vercelPrivateBlobStore: PrivateBlobStore = {
  async get(pathname, options) {
    const result = await get(pathname, options)
    if (!result || result.statusCode !== 200 || !result.stream) return null

    return {
      body: await new Response(result.stream).text(),
      etag: result.blob.etag,
    }
  },
  async put(pathname, body, options) {
    try {
      const result = await put(pathname, body, options)
      return { etag: result.etag }
    } catch (error) {
      throw blobWriteError(error)
    }
  },
}

export function createVercelPrivateAssetUrl(pathname: string, now = Date.now(), requestedTtlMs?: number) {
  return createPrivateAssetUrl(pathname, vercelBlobSigner, now, requestedTtlMs)
}
