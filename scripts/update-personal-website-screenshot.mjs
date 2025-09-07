import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync, mkdirSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function updatePersonalWebsiteScreenshot() {
  console.log("🚀 Starting browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Set viewport size to match project screenshot dimensions
    // Other screenshots appear to be optimized for 1200x800 with object-cover
    await page.setViewportSize({ width: 1200, height: 800 });

    console.log("📸 Navigating to live zaahir.ca...");
    await page.goto("https://zaahir.ca", {
      waitUntil: "networkidle",
      timeout: 30000
    });

    // Wait for fonts and animations to load/complete
    await page.waitForFunction(() => document.fonts.ready);
    await page.waitForTimeout(3000);

    // Wait for main content to be visible
    await page.waitForSelector('h1', { timeout: 10000 });

    console.log("📷 Taking screenshot...");
    const screenshot = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 800 },
    });

    // Ensure assets directory exists
    const assetsDir = join(__dirname, "../src/lib/assets/images/projects");
    mkdirSync(assetsDir, { recursive: true });

    // Save screenshot
    const outputPath = join(assetsDir, "personal-website.png");
    writeFileSync(outputPath, screenshot);
    console.log(`✅ Screenshot saved to: ${outputPath}`);

    // Update the projects page to use the new image
    console.log("🔄 Updating projects page...");
    const projectsPagePath = join(__dirname, "../src/routes/projects/+page.svelte");
    let projectsContent = readFileSync(projectsPagePath, "utf-8");

    // Add the import for the new image
    const personalWebsiteImport = `  import personalWebsiteImg from "$lib/assets/images/projects/personal-website.png?enhanced";`;

    // Find the imports section and add the new import
    if (!projectsContent.includes("personalWebsiteImg")) {
      projectsContent = projectsContent.replace(
        /import uncovrImg.*?;/,
        `$&\n${personalWebsiteImport}`
      );
    }

    // Update the Personal Website project to use the new image
    projectsContent = projectsContent.replace(
      /title: "Personal Website",[\s\S]*?image: uncovrImg,/,
      `title: "Personal Website",
      description: "The website you are on right now, my little corner of the internet.",
      url: "https://zaahir.ca",
      github: "https://github.com/moollaza/zaahir.ca",
      tech: "SvelteKit, Tailwind",
      image: personalWebsiteImg,`
    );

    // Write the updated content back
    writeFileSync(projectsPagePath, projectsContent);
    console.log("✅ Projects page updated!");

    console.log("\n🎉 Personal website screenshot updated successfully!");
    console.log("📝 Next steps:");
    console.log("   1. Review the changes with 'git diff'");
    console.log("   2. Create a new branch: 'git checkout -b update-personal-website-screenshot'");
    console.log("   3. Commit changes: 'git add . && git commit -m \"Update personal website screenshot\"'");
    console.log("   4. Push and create PR against main branch");

  } catch (error) {
    console.error("❌ Error capturing screenshot:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

updatePersonalWebsiteScreenshot();
