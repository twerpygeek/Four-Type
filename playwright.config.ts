import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3107',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'runtime_root="$(dirname "$(dirname "$(dirname "$(command -v pnpm)")")")"; PATH="$runtime_root/node/bin:$PATH" FIELD_GUIDE_E2E=1 NEXT_DIST_DIR=.next-playwright pnpm dev --port 3107',
    url: 'http://127.0.0.1:3107/field-guide',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
