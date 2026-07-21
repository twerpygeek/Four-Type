export type InteractionPoint = {
  x: number
  y: number
}

export type PreviewSwipeDirection = -1 | 1

export function getWrappedPreviewIndex(index: number, direction: PreviewSwipeDirection, count: number) {
  return ((index + direction) % count + count) % count
}

export function getPreviewSwipeDirection(start: InteractionPoint, end: InteractionPoint): PreviewSwipeDirection | null {
  const horizontalDistance = end.x - start.x
  const verticalDistance = end.y - start.y

  if (Math.abs(horizontalDistance) <= 50 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) {
    return null
  }

  return horizontalDistance < 0 ? 1 : -1
}

export function consumePreviewClickGuard(didSwipe: boolean) {
  return {
    didSwipe: false,
    shouldSuppressClick: didSwipe,
  }
}

export function getCompassFocusIndex(index: number, key: string, count: number) {
  if (key === 'ArrowRight' || key === 'ArrowDown') {
    return (index + 1) % count
  }

  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    return (index + count - 1) % count
  }

  if (key === 'Home') return 0
  if (key === 'End') return count - 1

  return null
}
