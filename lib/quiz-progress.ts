export type CompletedChapter = 1 | 2 | 3

const COMPLETED_CHAPTERS: Partial<Record<number, CompletedChapter>> = {
  12: 1,
  19: 2,
  24: 3,
}

export function getCompletedChapter(answeredCount: number) {
  return COMPLETED_CHAPTERS[answeredCount]
}
