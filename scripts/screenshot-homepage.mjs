import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function captureHomepage() {
  console.log("Starting browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Set viewport size for consistent screenshots
    await page.setViewportSize({ width: 1200, height: 800 });

    console.log("Navigating to homepage...");
    await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

    // Wait for animations to complete
    await page.waitForTimeout(2000);

    console.log("Taking screenshot...");
    const screenshot = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 1200, height: 800 },
    });

    // Ensure assets directory exists
    const assetsDir = join(__dirname, "../src/lib/assets/images/projects");
    mkdirSync(assetsDir, { recursive: true });

    // Save screenshot
    const outputPath = join(assetsDir, "personal-website.png");
    writeFileSync(outputPath, screenshot);

    console.log(`Screenshot saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureHomepage();
