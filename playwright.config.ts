import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3113',
    trace: 'on-first-retry',
  },
  globalSetup: './tests/playwright-global-setup.ts',
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'runtime_root="$(dirname "$(dirname "$(dirname "$(command -v pnpm)")")")"; backup_dir="$(mktemp -d)"; if [ -d .next ]; then mv .next "$backup_dir/next"; fi; PATH="$runtime_root/node/bin:$PATH" FIELD_GUIDE_E2E=1 pnpm build && FIELD_GUIDE_E2E=1 pnpm start --port 3113',
    url: 'http://127.0.0.1:3113/field-guide',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
