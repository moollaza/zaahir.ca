import { expect, type Page } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

// Common viewport sizes
export const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
} as const;

// Page routes
export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
  photos: "/photos",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type ViewportKey = keyof typeof VIEWPORTS;

/**
 * Better waiting strategy than networkidle
 * Waits for content to be actually ready
 */
async function waitForPageReady(page: Page, route: RouteKey): Promise<void> {
  // Wait for main content to be visible
  await expect(page.locator("main")).toBeVisible();

  // Wait for navigation to be present
  await expect(page.locator("nav")).toBeVisible();

  // Route-specific waits
  switch (route) {
    case "home":
      await expect(page.locator("h1")).toBeVisible();
      break;
    case "about":
      await expect(page.getByText("About Me")).toBeVisible();
      break;
    case "projects":
      await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
      // Wait for at least one project to be visible
      await expect(page.locator("text=Repo Remover")).toBeVisible();
      break;
    case "contact":
      await expect(page.getByText("Get in touch")).toBeVisible();
      break;
    case "photos":
      await expect(page.getByRole("heading", { name: "Photos" })).toBeVisible();
      // Wait for at least one image to be visible
      await expect(page.locator("img").first()).toBeVisible();
      break;
  }

  // Wait for any images to load (important for visual tests)
  await page
    .waitForFunction(
      () => {
        const images = Array.from(document.querySelectorAll("img"));
        return images.every((img) => img.complete || img.naturalWidth > 0);
      },
      { timeout: 5000 },
    )
    .catch(() => {
      // Continue if images don't load within timeout
      console.warn("Some images may not have loaded completely");
    });

  // Wait for fonts to load
  await page
    .waitForFunction(() => document.fonts.ready, { timeout: 3000 })
    .catch(() => {
      console.warn("Fonts may not have loaded completely");
    });

  // Small delay to ensure any CSS transitions/animations settle
  await page.waitForTimeout(200);
}

/**
 * Navigate to a page and wait for it to be ready
 */
export async function navigateAndWait(page: Page, route: RouteKey): Promise<void> {
  await page.goto(ROUTES[route]);
  await waitForPageReady(page, route);
}

/**
 * Set viewport size
 */
export async function setViewport(page: Page, viewport: ViewportKey): Promise<void> {
  await page.setViewportSize(VIEWPORTS[viewport]);
}

/**
 * Enable dark theme
 */
export async function enableDarkTheme(page: Page): Promise<void> {
  await page.emulateMedia({ colorScheme: "dark" });
}

/**
 * Take a visual regression test screenshot with consistent naming
 */
export async function takeVisualSnapshot(
  page: Page,
  route: RouteKey,
  options: {
    viewport?: ViewportKey;
    theme?: "dark";
    suffix?: string;
  } = {},
): Promise<void> {
  const { viewport, theme, suffix } = options;

  // Build screenshot name
  const parts = [route];
  if (viewport && viewport !== "desktop") parts.push(viewport);
  if (theme) parts.push(theme);
  if (suffix) parts.push(suffix);

  const screenshotName = parts.join("-");
  await argosScreenshot(page, screenshotName);
}

/**
 * Complete page test flow: navigate, wait, and screenshot
 */
export async function testPageVisuals(
  page: Page,
  route: RouteKey,
  options: {
    viewport?: ViewportKey;
    theme?: "dark";
    suffix?: string;
  } = {},
): Promise<void> {
  const { viewport = "desktop", theme } = options;

  // Set up page state
  if (viewport !== "desktop") {
    await setViewport(page, viewport);
  }

  if (theme === "dark") {
    await enableDarkTheme(page);
  }

  // Navigate and capture
  await navigateAndWait(page, route);
  await takeVisualSnapshot(page, route, options);
}

/**
 * Test all pages with given configuration
 */
export async function testAllPagesVisuals(
  page: Page,
  options: {
    viewport?: ViewportKey;
    theme?: "dark";
  } = {},
): Promise<void> {
  const routes: RouteKey[] = ["home", "about", "projects", "contact", "photos"];

  for (const route of routes) {
    await testPageVisuals(page, route, options);
  }
}

/**
 * Get the expected page title for assertions
 */
export function getExpectedTitle(route: RouteKey): string {
  const titles = {
    home: "Zaahir Moolla",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    photos: "Photos",
  };

  return titles[route];
}

/**
 * Assert navigation works correctly
 */
export async function assertNavigation(page: Page, route: RouteKey): Promise<void> {
  await expect(page).toHaveURL(ROUTES[route]);

  // Check that the main content loaded
  switch (route) {
    case "home":
      await expect(page.getByRole("heading", { name: "Zaahir Moolla" })).toBeVisible();
      break;
    case "about":
      await expect(page.locator("h2").first()).toContainText("About Me");
      break;
    case "projects":
      await expect(page.locator("h2").first()).toContainText("Projects");
      break;
    case "contact":
      await expect(page.locator("h2").first()).toContainText("Get in touch");
      break;
    case "photos":
      await expect(page.locator("h2").first()).toContainText("Photos");
      break;
  }
}
