import { expect, test } from "@playwright/test";
import { navigateAndWait, testPageVisuals, assertNavigation, type RouteKey } from "./test-utils";

test.describe("Site Navigation", () => {
  const routes: RouteKey[] = ["home", "about", "projects", "contact", "photos"];

  for (const route of routes) {
    test(`${route} page loads and displays main content`, async ({ page }) => {
      await navigateAndWait(page, route);
      await assertNavigation(page, route);
    });
  }
});

test.describe("Navigation Links", () => {
  test("can navigate between pages using nav menu", async ({ page }) => {
    // Start at homepage
    await navigateAndWait(page, "home");
    await assertNavigation(page, "home");

    // Navigate to About
    await page.click("nav a[href='/about']");
    await assertNavigation(page, "about");

    // Navigate to Projects
    await page.click("nav a[href='/projects']");
    await assertNavigation(page, "projects");

    // Navigate to Contact
    await page.click("nav a[href='/contact']");
    await assertNavigation(page, "contact");

    // Navigate to Photos
    await page.click("nav a[href='/photos']");
    await assertNavigation(page, "photos");

    // Navigate back to Home
    await page.click("nav a[href='/']");
    await assertNavigation(page, "home");
  });
});

test.describe("Theme Toggle", () => {
  test("theme toggle button works", async ({ page }) => {
    await navigateAndWait(page, "home");

    // Find theme toggle button
    const themeToggle = page
      .locator("button")
      .filter({ hasText: /theme|dark|light/i })
      .or(page.locator("[aria-label*='theme']"))
      .or(
        page
          .locator("button")
          .filter({ has: page.locator("svg") })
          .first(),
      );

    // Check if theme toggle is present and clickable
    if ((await themeToggle.count()) > 0) {
      await expect(themeToggle).toBeVisible();
      await themeToggle.click();

      // Wait a bit for theme change animation
      await page.waitForTimeout(500);

      // Click again to toggle back
      await themeToggle.click();
    }
  });
});

test.describe("Desktop Visual Regression Tests", () => {
  const routes: RouteKey[] = ["home", "about", "projects", "contact", "photos"];

  for (const route of routes) {
    test(`${route} page desktop screenshot`, async ({ page }) => {
      await testPageVisuals(page, route, { viewport: "desktop" });
    });
  }
});

test.describe("Mobile Visual Regression Tests", () => {
  const routes: RouteKey[] = ["home", "about", "projects", "contact", "photos"];

  for (const route of routes) {
    test(`${route} page mobile screenshot`, async ({ page }) => {
      await testPageVisuals(page, route, { viewport: "mobile" });
    });
  }
});

test.describe("Dark Theme Visual Tests", () => {
  test("homepage dark theme screenshot", async ({ page }) => {
    await testPageVisuals(page, "home", { theme: "dark" });
  });

  test("about page dark theme screenshot", async ({ page }) => {
    await testPageVisuals(page, "about", { theme: "dark" });
  });

  test("projects page dark theme screenshot", async ({ page }) => {
    await testPageVisuals(page, "projects", { theme: "dark" });
  });

  test("mobile homepage dark theme screenshot", async ({ page }) => {
    await testPageVisuals(page, "home", { viewport: "mobile", theme: "dark" });
  });
});

test.describe("Tablet Visual Tests", () => {
  test("homepage tablet screenshot", async ({ page }) => {
    await testPageVisuals(page, "home", { viewport: "tablet" });
  });
});

test.describe("Responsive Design", () => {
  test("site works on mobile viewport", async ({ page }) => {
    await testPageVisuals(page, "home", { viewport: "mobile" });
    await testPageVisuals(page, "about", { viewport: "mobile" });
    await testPageVisuals(page, "projects", { viewport: "mobile" });
  });

  test("site works on tablet viewport", async ({ page }) => {
    await testPageVisuals(page, "home", { viewport: "tablet" });
  });
});
