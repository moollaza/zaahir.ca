import { expect, test } from "@playwright/test";

test.describe("Site Navigation", () => {
  test("homepage loads and displays main content", async ({ page }) => {
    await page.goto("/");

    // Check main heading is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check navigation is present
    await expect(page.locator("nav")).toBeVisible();
  });

  test("about page loads and displays content", async ({ page }) => {
    await page.goto("/about");

    // Check page has content
    await expect(page.locator("h2")).toContainText("About Me");

    // Check there's some biographical content
    await expect(page.locator("text=front-end developer")).toBeVisible();
    await expect(page.locator("text=DuckDuckGo")).toBeVisible();
  });

  test("projects page loads and displays projects", async ({ page }) => {
    await page.goto("/projects");

    // Check projects heading
    await expect(page.locator("h2")).toContainText("Projects");

    // Check at least one project is displayed
    await expect(page.locator("text=Repo Remover")).toBeVisible();

    // Check external links are present
    await expect(page.locator("a[href*='github.com']").first()).toBeVisible();
  });

  test("contact page loads and displays form", async ({ page }) => {
    await page.goto("/contact");

    // Check contact heading
    await expect(page.locator("h2")).toContainText("Get in touch");

    // Check contact method links are present
    await expect(page.locator("a[href*='mailto:']").first()).toBeVisible();
    await expect(page.locator("a[href*='github.com']").first()).toBeVisible();
    await expect(page.locator("a[href*='bsky.app']").first()).toBeVisible();
  });

  test("photos page loads and displays images", async ({ page }) => {
    await page.goto("/photos");

    // Check photos heading
    await expect(page.locator("h2")).toContainText("Photos");

    // Check at least one image is present
    await expect(page.locator("img").first()).toBeVisible();
  });
});

test.describe("Navigation Links", () => {
  test("can navigate between pages using nav menu", async ({ page }) => {
    await page.goto("/");

    // Navigate to About
    await page.click("nav a[href='/about']");
    await expect(page).toHaveURL("/about");
    await expect(page.locator("h2").first()).toContainText("About Me");

    // Navigate to Projects
    await page.click("nav a[href='/projects']");
    await expect(page).toHaveURL("/projects");
    await expect(page.locator("h2").first()).toContainText("Projects");

    // Navigate to Contact
    await page.click("nav a[href='/contact']");
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("h2").first()).toContainText("Get in touch");

    // Navigate to Photos
    await page.click("nav a[href='/photos']");
    await expect(page).toHaveURL("/photos");
    await expect(page.locator("h2").first()).toContainText("Photos");

    // Navigate back to Home
    await page.click("nav a[href='/']");
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});

test.describe("Theme Toggle", () => {
  test("theme toggle button works", async ({ page }) => {
    await page.goto("/");

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

test.describe("Visual Regression Tests", () => {
  test("homepage visual snapshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage.png");
  });

  test("about page visual snapshot", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("about.png");
  });

  test("projects page visual snapshot", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("projects.png");
  });

  test("contact page visual snapshot", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("contact.png");
  });

  test("photos page visual snapshot", async ({ page }) => {
    await page.goto("/photos");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("photos.png");
  });
});

test.describe("Responsive Visual Tests", () => {
  test("mobile homepage snapshot", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage-mobile.png");
  });

  test("tablet homepage snapshot", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage-tablet.png");
  });
});

test.describe("Responsive Design", () => {
  test("site works on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check main content is still visible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();

    // Navigate to other pages to ensure they work on mobile
    await page.goto("/about");
    await expect(page.locator("h2").first()).toBeVisible();

    await page.goto("/projects");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("site works on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Check main content is still visible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });
});
