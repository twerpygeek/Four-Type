import { execFileSync } from 'node:child_process'

function trackedDiff() {
  return [
    execFileSync('git', ['diff', '--no-ext-diff', '--binary', 'HEAD', '--'], { encoding: 'utf8' }),
    execFileSync('git', ['diff', '--no-ext-diff', '--binary', '--cached'], { encoding: 'utf8' }),
  ].join('\n')
}

export default function playwrightGlobalSetup() {
  const before = trackedDiff()

  return () => {
    if (trackedDiff() !== before) {
      throw new Error('Playwright changed tracked files during the browser run')
    }
  }
}
