---
globs: ["src/lib/components/SEO.svelte", "src/routes/**", "static/robots.txt", "static/sitemap.xml"]
---

# SEO & Analytics

## SEO

- Reusable `SEO.svelte` component for consistent meta tags on every page
- Complete Open Graph + Twitter Card support for social media previews
- XML sitemap at `/sitemap.xml`, robots.txt with sitemap reference
- All buttons/links must have proper `aria-label` attributes

## Fathom Analytics

- Privacy-focused analytics, site ID: `NKUUIGYT`
- Custom events count interactions (not "track"):
  - Nav clicks: `nav_about_click`, `nav_projects_click`, etc.
  - Project interactions: `project_demo_repo_remover`, `project_github_personal_website`
  - Photo views: `photo_view_faraglioni_islets`, etc.
- Implementation: `countNavClick()`, `countProjectClick()` functions
