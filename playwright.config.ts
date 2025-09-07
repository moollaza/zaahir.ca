import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "e2e",
  testMatch: "**/*.{test,spec}.{js,ts}",
  use: {
    baseURL: "http://localhost:4173",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  expect: {
    // Configure screenshot comparison
    toHaveScreenshot: {
      // Reduce flakiness by allowing small differences
      threshold: 0.2,
      animations: "disabled",
    },
  },
});
