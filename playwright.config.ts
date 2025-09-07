import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter. Upload on CI only.
    ["@argos-ci/playwright/reporter", { uploadToArgos: !!process.env.CI }],
  ],
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "e2e",
  testMatch: "**/*.{test,spec}.{js,ts}",

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  // Setup test debugging on CI.
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  expect: {
    // Configure screenshot comparison
    toHaveScreenshot: {
      // Reduce flakiness by allowing small differences
      threshold: 0.2,
      animations: "disabled",
    },
  },
});
