import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SVELTE_PATH = join(ROOT, "src/routes/projects/+page.svelte");
const IMAGES_DIR = join(ROOT, "src/lib/assets/images/projects");

const VIEWPORT = { width: 1200, height: 800 };
const DEVICE_SCALE = 2;
const NAV_TIMEOUT = 30000;
const SETTLE_MS = 3000;

function parseProjects() {
  const source = readFileSync(SVELTE_PATH, "utf-8");

  // Build varName -> slug mapping from import lines
  const varToSlug = new Map();
  for (const m of source.matchAll(/import (\w+) from "\$lib\/assets\/images\/projects\/([\w-]+)\.png\?enhanced"/g)) {
    varToSlug.set(m[1], m[2]);
  }

  // Extract image varName and url from each project entry in the array
  const projects = [];
  for (const m of source.matchAll(/url:\s*"(https?:\/\/[^"]+)"[\s\S]*?image:\s*(\w+)/g)) {
    const url = m[1];
    const varName = m[2];
    const slug = varToSlug.get(varName);
    if (!slug) {
      throw new Error(`No image import found for variable: ${varName}`);
    }
    projects.push({ slug, url });
  }

  if (projects.length === 0) {
    throw new Error("No projects found in component");
  }

  return projects;
}

async function captureScreenshot(page, project) {
  console.log(`  ${project.slug}: navigating to ${project.url}...`);
  await page.goto(project.url, {
    waitUntil: "domcontentloaded",
    timeout: NAV_TIMEOUT,
  });
  await page.waitForTimeout(SETTLE_MS);

  const buffer = await page.screenshot({ type: "png" });

  const outPath = join(IMAGES_DIR, `${project.slug}.png`);
  writeFileSync(outPath, buffer);
  console.log(`  ${project.slug}: saved (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const allProjects = parseProjects();
  const filterSlugs = process.argv.slice(2);

  const projects = filterSlugs.length > 0 ? allProjects.filter((p) => filterSlugs.includes(p.slug)) : allProjects;

  if (projects.length === 0) {
    console.error("No matching projects found. Available slugs:", allProjects.map((p) => p.slug).join(", "));
    process.exit(1);
  }

  console.log(`Capturing ${projects.length} screenshot(s)...\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await context.newPage();

  const failed = [];

  for (const project of projects) {
    try {
      await captureScreenshot(page, project);
    } catch (err) {
      console.error(`  ${project.slug}: FAILED - ${err.message}`);
      failed.push(project.slug);
    }
  }

  await context.close();
  await browser.close();

  console.log(`\nDone. ${projects.length - failed.length}/${projects.length} succeeded.`);
  if (failed.length > 0) {
    console.error(`Failed: ${failed.join(", ")}`);
    process.exit(1);
  }
}

main();
