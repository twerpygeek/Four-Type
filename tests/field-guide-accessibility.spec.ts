import { expect, test, type Page } from '@playwright/test'

type BrowserIssue = {
  kind: 'console' | 'failed-request' | 'response'
  value: string
}

function collectBrowserIssues(page: Page) {
  const issues: BrowserIssue[] = []

  page.on('console', (message) => {
    const value = message.text()

    if (message.type() === 'error' || /hydration/i.test(value)) {
      issues.push({ kind: 'console', value })
    }
  })
  page.on('requestfailed', (request) => {
    issues.push({ kind: 'failed-request', value: `${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}` })
  })
  page.on('response', (response) => {
    if (response.status() >= 400) {
      issues.push({ kind: 'response', value: `${response.status()} ${response.url()}` })
    }
  })

  return issues
}

async function expectNoBrowserIssues(issues: BrowserIssue[]) {
  expect(issues).toEqual([])
}

test('Field Guide keyboard controls preserve focus and analytics omit query credentials', async ({ page }) => {
  const issues = collectBrowserIssues(page)
  const analyticsBodies: string[] = []

  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/api/events') {
      analyticsBodies.push(request.postData() ?? '')
    }
  })

  await page.goto('/field-guide?token=browser-check&session_id=browser-session')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)

  const headingLevels = await page.locator('main h1, main h2, main h3').evaluateAll((headings) =>
    headings.map((heading) => Number(heading.tagName.slice(1))),
  )
  expect(headingLevels[0]).toBe(1)
  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(headingLevels[index]).toBeLessThanOrEqual(headingLevels[index - 1] + 1)
  }

  expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.hasAttribute('alt')))).toBe(true)
  expect(await page.locator('.interactive-book img, .field-guide-preview-page img').evaluateAll((images) => images.every((image) => image.getAttribute('alt')?.trim()))).toBe(true)
  expect(await page.locator('.field-guide-preview-thumbnails button').evaluateAll((buttons) => buttons.every((button) => button.textContent?.trim()))).toBe(true)
  expect(await page.locator('button').evaluateAll((buttons) => buttons.every((button) => {
    const name = button.getAttribute('aria-label') ?? button.textContent?.trim()
    return Boolean(name)
  }))).toBe(true)

  const book = page.getByRole('button', { name: /open the field guide page preview/i })
  await book.focus()
  await expect(book).toBeFocused()
  expect(await book.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: /enlarged preview/i })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByText(/2 of 8/i)).toBeVisible()

  await page.getByRole('button', { name: /close enlarged preview/i }).focus()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.locator('.field-guide-icon-button').last()).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: /close enlarged preview/i })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(book).toBeFocused()

  const commander = page.getByRole('radio', { name: /commander/i })
  await commander.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: /bard/i })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('radio', { name: /bard/i })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByRole('heading', { name: 'Energy and invitation' })).toBeVisible()

  await page.getByRole('button', { name: 'MYR' }).click()
  await expect(page.getByText('RM39', { exact: true })).toBeVisible()
  await page.waitForTimeout(100)
  expect(analyticsBodies.length).toBeGreaterThan(0)
  expect(analyticsBodies.join('\n')).not.toMatch(/browser-check|browser-session|token=|session_id=/i)
  await page.reload()
  await expect(page.getByText('RM39', { exact: true })).toBeVisible()
  await expectNoBrowserIssues(issues)
})

test('Field Guide respects reduced motion', async ({ page }) => {
  const issues = collectBrowserIssues(page)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/field-guide')
  const book = page.getByRole('button', { name: /open the field guide page preview/i })
  await book.hover()

  await expect(book).toHaveCSS('transform', 'none')
  expect(await book.evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(0.01)
  await expectNoBrowserIssues(issues)
})
