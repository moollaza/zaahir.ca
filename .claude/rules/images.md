---
globs: ["src/lib/assets/**", "*.svelte", "static/**"]
---

# Image Optimization

- Use `@sveltejs/enhanced-img` for all images -- automatically generates AVIF, WebP, and original formats
- Import with `?enhanced` query and use `<enhanced:img>` component
- Asset images go in `src/lib/assets/images/` for Vite processing
  - `photos/` -- photo gallery images (AVIF/WebP/JPEG)
  - `projects/` -- project screenshot images (AVIF/WebP/PNG)
- Only truly static files (robots.txt, favicon, social.png) go in `static/`
- Performance baseline: enhanced-img achieves dramatic reductions (e.g., 619kB -> 6.61kB AVIF)
