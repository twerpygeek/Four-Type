import { expect, test } from '@playwright/test'

const routes = [
  '/relationships',
  '/blog/couples-discussion-guide-by-temperament',
  '/blog/parenting-by-temperament',
]

const viewports = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]

test('relationship cluster routes remain usable on desktop and mobile', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport)

    for (const route of routes) {
      const response = await page.goto(route)
      expect(response?.status(), `${route} should render`).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.locator('main a[href="/quiz"]').filter({ hasText: /quiz/i }).first()).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)

      const relatedGuides = page.locator('section').filter({
        has: page.getByRole('heading', { level: 2, name: /keep exploring|related temperament/i }),
      })
      const relatedGuide = relatedGuides.getByRole('link').first()
      await expect(relatedGuide).toBeVisible()

      const href = await relatedGuide.getAttribute('href')
      expect(href, `${route} should expose a related guide`).toMatch(/^\//)
      const relatedResponse = await page.goto(href!)
      expect(relatedResponse?.status(), `${href} should be reachable from ${route}`).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
  }
})
