# zaahir.ca

Personal portfolio website. Live at zaahir.ca.

## Stack

SvelteKit + Svelte 5, Tailwind CSS v4, TypeScript, Playwright + Argos visual regression, Cloudflare Workers

## Constraints

- Images must use `@sveltejs/enhanced-img` with `?enhanced` query and `<enhanced:img>` component
- Privacy-focused analytics only (Fathom, site ID `NKUUIGYT`)
- All pages need SEO component with Open Graph + Twitter Card meta tags

## Commands

```bash
export PATH="$HOME/.bun/bin:$PATH"
bun run dev           # dev server
bun run build         # production build
bun run lint          # prettier + eslint
bun run check         # svelte-check
bun test              # playwright e2e (24 tests)
bun run format        # prettier --write
```

Run `bun run lint && bun run check && bun run build` before every commit.

## Workflow

Uses superpowers workflow. For cross-project standards, see ~/projects/project-hub/standards/.

## Details

- `.claude/rules/` -- images, testing, SEO/analytics, styling
- AGENTS.md is a symlink to this file
