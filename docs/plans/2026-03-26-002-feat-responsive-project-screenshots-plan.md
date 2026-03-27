---
title: "feat: Responsive project screenshots with mobile capture"
type: feat
status: completed
date: 2026-03-26
---

# feat: Responsive project screenshots with mobile capture

## Overview

Add mobile viewport screenshots (375x667@2x) to the projects page alongside existing desktop screenshots. Show the appropriate screenshot based on screen size — mobile screenshots on small screens, desktop on larger screens.

## Problem Statement

Desktop screenshots (1200x800) look bad on mobile — the content is illegible when crammed into a narrow card with `object-cover`. Mobile visitors (a significant portion of portfolio traffic) see useless cropped images that don't showcase the projects.

## Proposed Solution

### 1. Script changes (`scripts/screenshot-projects.mjs`)

Add a second capture pass at mobile viewport (375x667@2x). For each project, save two files:

- `<slug>.png` — desktop (existing, unchanged)
- `<slug>-mobile.png` — mobile (new)

Both viewports use `deviceScaleFactor: 2` for retina quality.

### 2. Component changes (`src/routes/projects/+page.svelte`)

Add mobile image imports and update the `Project` interface to include a `mobileImage` field. Use Tailwind responsive classes to swap images:

- `<enhanced:img>` with desktop image: `hidden sm:block`
- `<enhanced:img>` with mobile image: `block sm:hidden`

This is pure CSS — no JS media query detection needed.

### 3. Image height adjustment

Current: `h-64` at all breakpoints. The mobile screenshot at 375x667 is taller (portrait), so adjust to `h-48 sm:h-64` to give a better proportion on mobile cards.

## Technical Approach

### Script modifications

```javascript
const VIEWPORTS = {
  desktop: { width: 1200, height: 800 },
  mobile: { width: 375, height: 667 },
};

// For each project, capture both viewports
// Desktop: <slug>.png (existing behavior)
// Mobile: <slug>-mobile.png (new)
```

The script creates two browser contexts (one per viewport) and captures both for each project. Sequential capture per project, reusing the page between captures by resizing.

### Component modifications

Add 6 new imports for mobile images:

```svelte
import repoRemoverMobileImg from "$lib/assets/images/projects/repo-remover-mobile.png?enhanced";
```

Update the Project interface:

```typescript
interface Project {
  // ... existing fields
  mobileImage: ImageSource;
}
```

Update the template — replace the single `<enhanced:img>` with two:

```svelte
<enhanced:img src={project.image} alt={project.title} class="hidden h-64 w-full object-cover object-top sm:block" />
<enhanced:img
  src={project.mobileImage}
  alt={project.title}
  class="block h-48 w-full object-cover object-top sm:hidden"
/>
```

## Acceptance Criteria

- [ ] `node scripts/screenshot-projects.mjs` captures 12 screenshots (6 desktop + 6 mobile)
- [ ] Mobile screenshots saved as `<slug>-mobile.png` in `src/lib/assets/images/projects/`
- [ ] Projects page shows desktop screenshots on `sm:` and above
- [ ] Projects page shows mobile screenshots below `sm:` breakpoint
- [ ] Mobile image height is `h-48`, desktop remains `h-64`
- [ ] Slug filter still works: `node scripts/screenshot-projects.mjs uncovr` captures both desktop and mobile for uncovr
- [ ] `bun run lint && bun run check && bun run build` passes

## Implementation Phases

### Phase 1: Update screenshot script

Modify `scripts/screenshot-projects.mjs` to:

1. Define both viewport configs
2. For each project, capture desktop then mobile screenshot
3. Save mobile as `<slug>-mobile.png`

**Files modified:** `scripts/screenshot-projects.mjs`

### Phase 2: Update projects page component

1. Add 6 mobile image imports
2. Add `mobileImage` to `Project` interface and each project entry
3. Replace single `<enhanced:img>` with responsive desktop/mobile pair
4. Adjust mobile height to `h-48`

**Files modified:** `src/routes/projects/+page.svelte`

### Phase 3: Update command documentation

Update `.claude/commands/screenshot-projects.md` to mention that both desktop and mobile screenshots are captured.

**Files modified:** `.claude/commands/screenshot-projects.md`

### Phase 4: Run and verify

1. Run `node scripts/screenshot-projects.mjs` to capture all 12 screenshots
2. Run `bun run lint && bun run check && bun run build`
3. Visual check on dev server at mobile and desktop widths

## Dependencies & Risks

- **12 screenshots doubles capture time** (~36s for 6 sites x 2 viewports). Acceptable for a manual dev tool.
- **Some sites may not be mobile-responsive** — their mobile screenshots may look odd. Accepted as-is; shows reality.
- **Image count doubles** — 12 PNGs instead of 6. Enhanced-img generates AVIF/WebP variants, so build output grows. Each mobile PNG is smaller than desktop (~200-400KB vs 70-630KB), so impact is moderate.

## Sources

- Existing script: `scripts/screenshot-projects.mjs`
- Projects page: `src/routes/projects/+page.svelte`
- Enhanced-img docs: project uses `@sveltejs/enhanced-img` v0.8.1
