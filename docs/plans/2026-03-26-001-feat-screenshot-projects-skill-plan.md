---
title: "feat: Automated project screenshot capture skill"
type: feat
status: completed
date: 2026-03-26
---

# feat: Automated project screenshot capture skill

## Overview

Create a Claude Code command (`/screenshot-projects`) that automatically captures fresh screenshots of all project websites listed on the zaahir.ca portfolio projects page. The command runs a Playwright script that visits each project URL, captures a 1200x800 viewport screenshot, and saves it directly to `src/lib/assets/images/projects/`.

## Problem Statement

Project screenshots on the portfolio page go stale as the live sites evolve. Updating them is manual — visit each site, take a screenshot, resize it, save it to the right location. This friction means screenshots rarely get updated. An automated skill makes it a single command.

## Proposed Solution

Two components:

1. **`scripts/screenshot-projects.mjs`** — A Node.js script using Playwright that:
   - Parses project URLs and image slugs from `src/routes/projects/+page.svelte`
   - Visits each URL with a 1200x800 viewport at 2x device scale (for retina sharpness)
   - Waits for `domcontentloaded` + 3 second settle time
   - Captures a clipped PNG screenshot
   - Saves to `src/lib/assets/images/projects/<slug>.png`
   - Supports optional slug arguments to capture a subset

2. **`.claude/commands/screenshot-projects.md`** — A Claude Code command that:
   - Runs the script via `node scripts/screenshot-projects.mjs`
   - Reports which screenshots were updated/failed
   - Reminds the user to review the image diffs before committing

### Also included

- **Fix Uncovr URL**: Update `playuncovr.xyz` to `playuncovr.com` in the projects page
- **Delete `scripts/screenshot-homepage.mjs`**: Subsumed by the new script

## Technical Approach

### Parsing project data from +page.svelte

The script reads `src/routes/projects/+page.svelte` as a text file and uses regex to extract:

1. **Image import lines** (lines 6-11): Pattern `import \w+ from ".*?/projects/(.+?)\.png\?enhanced"` extracts slugs
2. **Project URL fields**: Pattern `url: "(https?://[^"]+)"` extracts URLs
3. **Matching**: Import order matches the projects array order (both are sequential in the file)

This is simpler than AST parsing and robust enough — the file format is stable and any breakage would be immediately visible (script errors out, no silent failures).

### Viewport and resolution

- CSS viewport: 1200x800
- `deviceScaleFactor: 2` for retina-quality output (actual pixels: 2400x1600)
- This matches existing high-quality screenshots while standardizing dimensions
- Images displayed via `enhanced-img` with `h-64 w-full object-cover object-top` — the extra resolution ensures sharpness on HiDPI displays

### Wait strategy for external sites

External sites have unknown DOM structures, so content-aware waits (like the e2e tests use) aren't feasible. Instead:

- `waitUntil: "domcontentloaded"` — faster and more reliable than `networkidle` for external sites
- `page.waitForTimeout(3000)` — settle time for JS frameworks to render, fonts to load, animations to play
- This is a pragmatic tradeoff. The 3-second wait handles most sites well.

### Error handling

- **Per-site failures are non-fatal**: If a site times out, returns an error, or is unreachable, the script logs the failure, preserves the existing screenshot (does NOT overwrite), and continues to the next site.
- **Navigation timeout**: 30 seconds per site. Generous enough for slow sites, short enough to not block indefinitely.
- **Exit code**: 0 if all succeeded, 1 if any failed (with details logged).

### zaahir.ca self-screenshot

Uses the production URL `https://zaahir.ca` (not localhost). Rationale: the screenshot should show what users actually see. The dev server doesn't need to be running.

## Acceptance Criteria

- [ ] `node scripts/screenshot-projects.mjs` captures all 6 project screenshots
- [ ] `node scripts/screenshot-projects.mjs uncovr autobill` captures only those 2
- [ ] Failed sites are skipped without overwriting existing screenshots
- [ ] Screenshots are 2400x1600 actual pixels (1200x800 @ 2x scale)
- [ ] `.claude/commands/screenshot-projects.md` is a working Claude Code command
- [ ] `scripts/screenshot-homepage.mjs` is deleted
- [ ] Uncovr URL updated from `playuncovr.xyz` to `playuncovr.com` in `+page.svelte`
- [ ] `bun run lint && bun run check && bun run build` passes

## Implementation Phases

### Phase 1: URL fix and script cleanup

1. Update Uncovr URL in `src/routes/projects/+page.svelte`: `playuncovr.xyz` -> `playuncovr.com`
2. Delete `scripts/screenshot-homepage.mjs`

**Files modified:**

- `src/routes/projects/+page.svelte` (URL fix)
- `scripts/screenshot-homepage.mjs` (deleted)

### Phase 2: Screenshot script

Create `scripts/screenshot-projects.mjs`:

```javascript
// scripts/screenshot-projects.mjs
import { chromium } from "playwright";
import { readFileSync, writeFileSync, existsSync } from "fs";
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

  // Extract slugs from import lines
  const slugs = [...source.matchAll(/import \w+ from "\$lib\/assets\/images\/projects\/(.+?)\.png\?enhanced"/g)].map(
    (m) => m[1],
  );

  // Extract URLs from project array
  const urls = [...source.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);

  if (slugs.length !== urls.length) {
    throw new Error(`Mismatch: ${slugs.length} slugs vs ${urls.length} URLs`);
  }

  return slugs.map((slug, i) => ({ slug, url: urls[i] }));
}

async function captureScreenshot(page, project) {
  console.log(`  ${project.slug}: navigating to ${project.url}...`);
  await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT });
  await page.waitForTimeout(SETTLE_MS);

  const buffer = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width: VIEWPORT.width * DEVICE_SCALE, height: VIEWPORT.height * DEVICE_SCALE },
  });

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

  console.log(`Capturing ${projects.length} screenshot(s)...`);

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

  await browser.close();

  console.log(`\nDone. ${projects.length - failed.length}/${projects.length} succeeded.`);
  if (failed.length > 0) {
    console.error(`Failed: ${failed.join(", ")}`);
    process.exit(1);
  }
}

main();
```

**Files created:**

- `scripts/screenshot-projects.mjs`

### Phase 3: Claude Code command

Create `.claude/commands/screenshot-projects.md`:

```markdown
# Update Project Screenshots

Capture fresh screenshots of all project websites on the portfolio page.

## Steps

1. Run the screenshot script:
```

node scripts/screenshot-projects.mjs

```
Or for specific projects only:
```

node scripts/screenshot-projects.mjs <slug1> <slug2>

```
Available slugs: repo-remover, quick-budget, how-many-rakats, personal-website, uncovr, autobill

2. Review the captured screenshots by checking the git diff for changed images.

3. If any screenshots failed, investigate the failure and decide whether to retry or skip.

4. Do NOT commit automatically — let the user review the image changes first.
```

**Files created:**

- `.claude/commands/screenshot-projects.md`

### Phase 4: Verify

1. Run `node scripts/screenshot-projects.mjs` and verify all 6 screenshots are captured
2. Run `bun run lint && bun run check && bun run build` to ensure nothing is broken

## Dependencies & Risks

- **External site availability**: Sites may be temporarily down. Mitigated by skip-and-continue error handling.
- **Playwright dependency**: Already installed (`playwright` v1.53.0 in devDependencies).
- **Regex parsing fragility**: If the +page.svelte format changes significantly, the regex will fail. Mitigated by: the mismatch check throws a clear error, and the file format is simple and stable.
- **Cookie banners / interstitials**: Some sites may show banners. Accepted as-is — the user reviews screenshots before committing.

## Sources

- Existing script: `scripts/screenshot-homepage.mjs` (being replaced)
- E2E test patterns: `e2e/test-utils.ts` (content-aware waits, viewport sizes)
- Projects page: `src/routes/projects/+page.svelte` (source of truth for project data)
- Playwright config: `playwright.config.ts`
