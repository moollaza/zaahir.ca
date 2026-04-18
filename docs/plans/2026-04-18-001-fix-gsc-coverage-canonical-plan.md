---
title: "fix: GSC coverage issues — canonical, trailing slash, 404"
type: fix
status: completed
date: 2026-04-18
---

# fix: GSC coverage issues — canonical, trailing slash, 404

## Overview

Google Search Console's 2026-04-17 coverage export flagged 8 non-critical pages across 5 reasons (no critical issues). Root causes sit in the SEO component, routing config, and sitemap. Ship one small PR that plants the missing canonical signals, normalizes URL form, adds a friendly error page, and refreshes `lastmod`. This should close 6 of the 8 flagged pages outright and make the remaining 2 easier to identify from URL-level GSC data.

## Problem Statement

From `~/Downloads/zaahir.ca-Coverage-2026-04-17/Non-critical issues.csv`:

| Reason                                    | Pages |
| ----------------------------------------- | ----- |
| Duplicate without user-selected canonical | 3     |
| Page with redirect                        | 2     |
| Soft 404                                  | 1     |
| Not found (404)                           | 1     |
| Alternate page with proper canonical tag  | 1     |

`Chart.csv` also shows a dip in indexed pages 2026-03-31 → 2026-04-05 (5 → 2 → 1) that auto-recovered on 2026-04-06 — indexing is unstable without clear canonical signals.

Inspection confirmed four structural gaps:

1. `src/lib/components/SEO.svelte:23-41` sets `og:url` and `twitter:url` but never emits `<link rel="canonical">`. Every one of the 5 pages uses this component, so _no page_ advertises a canonical. This is the direct cause of the 3 duplicate-no-canonical entries and the 1 alternate-with-canonical entry.
2. There is no `trailingSlash` export anywhere in `src/routes/`. SvelteKit's default serves `/about` and `/about/` as the same page with a 308 between them — two flavors, one canonical, hence the 2 "Page with redirect" entries.
3. `src/routes/+page.svelte:15` passes `url="https://zaahir.ca/"` (trailing slash) while every other page omits it. Mixed signals reinforce the duplicate problem.
4. No `src/routes/+error.svelte`. SvelteKit still returns a correct 404 status for unknown routes, but there's no branded error surface and nothing that would push back against a "Soft 404" verdict on edge pages.
5. `static/sitemap.xml` `<lastmod>` is `2025-01-07` across all 5 entries — stale, slows recrawl.

The specific URLs behind the 1 "Not found (404)" and 1 "Soft 404" are not in the CSV (summary-only export). They can be pulled separately from the Search Console URL Inspection API using the session's `GSC:OK` credentials, or exported per-reason from the GSC UI (Pages → click the issue → Export).

## Proposed Solution

Five small, focused changes:

1. **Canonical tag** — add `<link rel="canonical" href={url} />` to `SEO.svelte`. Every page already passes a full absolute URL, so no per-page edits beyond #3 below.
2. **Trailing slash policy** — new `src/routes/+layout.ts` exporting `trailingSlash = "never"`. Consolidates `/about/` → `/about` across every route in one place.
3. **Homepage URL** — in `src/routes/+page.svelte:15`, change `url="https://zaahir.ca/"` to `url="https://zaahir.ca"` so the homepage canonical matches the rest of the site and the sitemap entry shape.
4. **Friendly 404** — new `src/routes/+error.svelte` showing status + short message + link home, using `<SEO>` with a static title/description (no indexing concern since SvelteKit already sets 404 status).
5. **Sitemap refresh** — bump every `<lastmod>` in `static/sitemap.xml` from `2025-01-07` to `2026-04-18` to invite recrawl.

## Technical Considerations

- **Canonical URL source.** The prop is already a full absolute URL per page. Keep using the passed `url` instead of deriving from `$app/state` — avoids the dev-vs-prod origin mismatch that would pollute canonicals on preview deployments.
- **`trailingSlash` is layout-level in SvelteKit.** Must live in `+layout.ts` (or per-page `+page.ts`). It cannot be configured in `svelte.config.js`. One root layout export covers all routes.
- **`+layout.ts` coexists with `+layout.svelte`.** Adding the `.ts` file does not change the layout component; it just provides route config. Safe to introduce.
- **`+error.svelte` inherits the root layout.** It will render inside `Nav.svelte` automatically — no additional chrome needed.
- **Cloudflare Pages redirects.** With `trailingSlash = "never"`, the Cloudflare adapter emits the 308 server-side. Google eventually learns the preferred form; no `_redirects` file needed.
- **Static sitemap.** Currently shipped from `static/sitemap.xml`. Keeping it static is fine for 5 URLs. Automating via a `+server.ts` endpoint is a nice-to-have, not in scope.
- **No-index on the error page?** Not required — SvelteKit returns a 4xx status, which Google does not index. Do not add `<meta name="robots" content="noindex">` (would be redundant and inconsistent with the 200-on-success pattern elsewhere).

## System-Wide Impact

- **Interaction graph.** `SEO.svelte` renders into every page's `<svelte:head>`. Adding the canonical tag propagates to all 5 routes in a single change. `hooks.server.ts` adds a `cache-control: no-transform` header on HTML responses — canonical and trailing-slash redirects both remain cacheable as usual.
- **Error propagation.** `trailingSlash = "never"` causes SvelteKit to issue a 308 for any `/path/` form. Existing internal links already use the no-slash form, so no app-level 308s in normal navigation; only bookmarked/indexed legacy URLs are affected (desired).
- **State lifecycle.** None — pure static/SSR output changes.
- **API surface parity.** `SEO.svelte` is the single surface for meta tags. No other component emits head tags.
- **Integration test scenarios.** Covered below in Acceptance Criteria verification.

## Acceptance Criteria

- [ ] `SEO.svelte` emits `<link rel="canonical" href={url} />` inside `<svelte:head>`.
- [ ] `src/routes/+layout.ts` exists and exports `trailingSlash = "never"`.
- [ ] `src/routes/+page.svelte:15` passes `url="https://zaahir.ca"` (no trailing slash).
- [ ] `src/routes/+error.svelte` renders a 404/error page with status code, short message, and a link back to `/`. Uses `<SEO>`.
- [ ] `static/sitemap.xml` shows `<lastmod>2026-04-18</lastmod>` on all 5 entries.
- [ ] `curl -sI http://localhost:4173/about/` (preview server) returns `308` with `location: /about`.
- [ ] `curl -s http://localhost:4173/about | rg 'rel="canonical"'` shows `<link rel="canonical" href="https://zaahir.ca/about">`. Repeat for `/`, `/projects`, `/photos`, `/contact`.
- [ ] `curl -sI http://localhost:4173/nonexistent-page` returns `404` and body contains content from the new `+error.svelte`.
- [ ] `bun run lint && bun run check && bun run build` passes.
- [ ] `bun test` passes (24 Playwright e2e). Update any tests that asserted trailing-slash behavior (none expected, but verify).

## Success Metrics

- In Search Console → Pages, clicking "Validate Fix" on each reason clears within 7–14 days.
- GSC URL Inspection on `https://zaahir.ca/about` reports "User-declared canonical" equal to "Google-selected canonical".
- Coverage chart returns to 5 indexed / 8 non-indexed baseline within 1 week and stays stable.

## Implementation Phases

### Phase 1: Canonical + URL normalization

1. Edit `src/lib/components/SEO.svelte`: add `<link rel="canonical" href={url} />` after the Twitter meta tags.
2. Edit `src/routes/+page.svelte`: change `url="https://zaahir.ca/"` → `url="https://zaahir.ca"`.

**Files modified:** `src/lib/components/SEO.svelte`, `src/routes/+page.svelte`

### Phase 2: Trailing slash + error page

1. Create `src/routes/+layout.ts` with:
   ```ts
   export const trailingSlash = "never";
   ```
2. Create `src/routes/+error.svelte`:

   ```svelte
   <script lang="ts">
     import { page } from "$app/state";
     import SEO from "$lib/components/SEO.svelte";
   </script>

   <SEO
     title="Page not found — Zaahir Moolla"
     description="The page you're looking for doesn't exist."
     url={`https://zaahir.ca${page.url.pathname}`}
   />

   <div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
     <p class="text-6xl font-bold">{page.status}</p>
     <p class="mt-4 text-xl text-muted-foreground">
       {page.error?.message ?? "Page not found"}
     </p>
     <a href="/" class="mt-8 text-accent underline">Go home</a>
   </div>
   ```

**Files modified:** `src/routes/+layout.ts` (new), `src/routes/+error.svelte` (new)

### Phase 3: Sitemap refresh

1. Edit `static/sitemap.xml`: replace every `<lastmod>2025-01-07</lastmod>` with `<lastmod>2026-04-18</lastmod>`.

**Files modified:** `static/sitemap.xml`

### Phase 4: Verify and ship

1. `bun run lint && bun run check && bun run build`
2. `bun run preview` and execute the curl checks listed in Acceptance Criteria.
3. `bun test`
4. Commit + PR. After merge, resubmit the sitemap and click "Validate Fix" in GSC for each flagged reason.

### Phase 5 (follow-up, not required for this PR)

Fetch URL-level detail from Search Console for the "Not found (404)" and "Soft 404" pages — either by GSC UI export or by calling the URL Inspection API with the session's `GSC:OK` credentials. Depending on what surfaces:

- If it's a legacy URL (e.g., `/resume`, `/blog`, `/experience`): add a Cloudflare `_redirects` entry or a `+server.ts` redirect to the best replacement.
- If it's a pages.dev preview URL: accept as expected, or add a `robots.txt` on the preview domain to disallow crawling.
- If it's a `?utm_*` or `#hash` variant of a real page: the new canonical tag fixes it on its own.
- If it's a thin page (soft 404): extend the page content.

## Dependencies & Risks

- **Low risk overall.** All five changes are additive or single-value edits. No schema, no external service contract changes.
- **Risk: existing e2e tests.** Tests in `e2e/` assert page navigation but not trailing slash. Verify `bun test` still passes — a test written against `/about/` would now follow a 308 and might hit timing edge cases. Not expected, but check.
- **Risk: old shared links.** Any `/about/` URL shared externally will now 308 once — benign, cacheable, but counts as a single "redirect" hop until indexes propagate.
- **Risk: Cloudflare cache.** A stale HTML cache could continue serving pages without the canonical tag for up to the cache TTL. `hooks.server.ts` already sets `max-age=0, must-revalidate`, so this is a non-issue.

## Sources & References

### Origin

- **Approved harness plan:** `~/.claude/plans/system-instruction-you-are-working-sunny-summit.md`
- **GSC export:** `~/Downloads/zaahir.ca-Coverage-2026-04-17/` (`Non-critical issues.csv`, `Chart.csv`, `Metadata.csv`, empty `Critical issues.csv`)

### Internal References

- `src/lib/components/SEO.svelte:23-41` — head tag emission (add canonical here)
- `src/routes/+page.svelte:15` — homepage URL (normalize)
- `src/routes/+layout.svelte` — root layout (sibling for new `+layout.ts`)
- `src/hooks.server.ts:3-15` — cache-control handling (unaffected)
- `static/sitemap.xml:5,11,17,23,29` — every `<lastmod>` to bump
- `svelte.config.js` — adapter config (no change)
- `.claude/rules/seo-analytics.md` — SEO conventions this PR extends

### External References

- SvelteKit `trailingSlash` docs: https://svelte.dev/docs/kit/page-options#trailingslash
- SvelteKit `+error.svelte` docs: https://svelte.dev/docs/kit/routing#error
- Google Search Console "Duplicate without user-selected canonical": https://support.google.com/webmasters/answer/7440203#duplicate_without_canonical
- Google canonical tag guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
