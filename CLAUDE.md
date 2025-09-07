# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Starts Vite dev server with hot reloading
- **Build for production**: `npm run build` - Builds optimized production bundle
- **Preview production build**: `npm run preview` - Preview production build locally
- **Type checking & Accessibility**: `npm run check` - Run Svelte type checking and accessibility linting
- **Linting**: `npm run lint` - Run ESLint and Prettier checks
- **Formatting**: `npm run format` - Format code with Prettier
- **E2E tests**: `npm test` - Run Playwright end-to-end tests

## Architecture Overview

This is a personal portfolio website built with **SvelteKit** (using **Svelte 5**) and styled with **Tailwind CSS v4**.

### Important Documentation Links

- **Svelte 5**: https://svelte.dev/docs/svelte/overview
- **Svelte 5 Migration Guide**: https://svelte.dev/docs/svelte/v5-migration-guide
- **SvelteKit**: https://svelte.dev/docs/kit/
- **Tailwind CSS**: https://tailwindcss.com/docs/

### Project Structure

- **src/routes/**: SvelteKit file-based routing
  - `+layout.svelte`: Main layout with Nav and theme initialization
  - `+page.svelte`: Homepage with hero section and animations
  - `about/+page.svelte`: About page with interests and bio
  - `projects/+page.svelte`: Project showcase with optimized images
  - `photos/+page.svelte`: Photo gallery with modal viewer
  - `contact/+page.svelte`: Contact methods and social links

- **src/lib/**: Shared library code ($lib alias)
  - `components/`: Reusable Svelte 5 components
    - `Nav.svelte`: Navigation with active states and theme toggle
    - `ThemeToggle.svelte`: Dark/light mode toggle
    - `PhotoModal.svelte`: Modal for photo gallery viewing
    - `SEO.svelte`: Reusable SEO component for Open Graph and Twitter Cards
  - `assets/images/`: Optimized images processed by Vite
    - `photos/`: Photo gallery images (AVIF/WebP/JPEG)
    - `projects/`: Project screenshot images (AVIF/WebP/PNG)
  - `stores/`: Svelte stores
    - `theme.ts`: Theme management with localStorage persistence
  - `types.ts`: TypeScript type definitions

- **static/**: Static files served as-is (no processing)
  - `robots.txt`: SEO configuration with sitemap reference
  - `sitemap.xml`: XML sitemap for search engines
  - `favicon.ico`, `social.png`: Site metadata assets

### Modern Tech Stack

- **Svelte 5**: Latest version with new reactivity model ($state, $effect)
- **SvelteKit**: Full-stack framework with Vite
- **TypeScript**: Full type safety throughout
- **Tailwind CSS v4**: Latest version with CSS-first configuration
- **Vite**: Build tool for fast development and optimized builds
- **@sveltejs/enhanced-img**: Automatic image optimization (AVIF/WebP generation)
- **Fathom Analytics**: Privacy-focused analytics with custom event tracking
- **Playwright**: End-to-end testing framework with visual regression testing

### Theme System

- **CSS Custom Properties**: Theme variables defined in `app.css`
- **Dark Mode**: Automatic system preference detection with manual toggle
- **Color Palette**: Orange primary (#f97316) with dark red accents (#dc2626)
- **Persistence**: Theme preference saved to localStorage

### Build System

- **Vite**: Modern build tool replacing Rollup/Webpack
- **SvelteKit Adapter**: Vercel adapter for deployment
- **TypeScript**: Compile-time type checking
- **ESLint + Prettier**: Code quality and formatting

### Styling Approach

- **Tailwind CSS v4**: Utility-first with new @theme syntax
- **System Fonts**: Using system UI font stack
- **CSS Custom Properties**: For theme variables and smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Image Optimization

- **@sveltejs/enhanced-img**: Automatically generates AVIF, WebP, and original formats
- **Asset Organization**: Images in `src/lib/assets/images/` for Vite processing
- **Static Files**: Only truly static files (robots.txt, favicon, etc.) in `static/`
- **Usage**: Import with `?enhanced` query and use `<enhanced:img>` component
- **Performance**: Dramatic file size reductions (619kB → 6.61kB AVIF)

### Analytics

- **Fathom Analytics**: Privacy-focused analytics with site ID `NKUUIGYT`
- **Custom Events**: Counting user interactions instead of "tracking"
  - Nav clicks: `nav_about_click`, `nav_projects_click`, etc.
  - Project interactions: `project_demo_repo_remover`, `project_github_personal_website`
  - Photo views: `photo_view_faraglioni_islets`, etc.
- **Implementation**: Functions like `countNavClick()`, `countProjectClick()`

### SEO & Performance

- **SEO Component**: Reusable `SEO.svelte` component for consistent meta tags
- **Open Graph**: Complete social media preview support (Facebook, Twitter, etc.)
- **Sitemap**: XML sitemap at `/sitemap.xml` for search engine discovery
- **Robots.txt**: Proper search engine crawler configuration
- **Performance**: Image optimization with AVIF/WebP formats

### Testing & Quality

- **E2E Testing**: Comprehensive Playwright test suite with visual regression
- **Cross-browser**: Tests run on desktop Chrome and mobile (iPhone 12)
- **Visual Testing**: Screenshots to catch UI regressions automatically
- **CI/CD**: GitHub Actions with parallel jobs and smart caching

### Development Tools

- **Node Version**: Managed with `.node-version` file (Node 22.12+)
- **Quality Checks**: `npm run check` catches TypeScript and accessibility issues
- **Accessibility**: All buttons/links have proper `aria-label` attributes
- **Hot Reloading**: Fast development with Vite HMR

### Deployment

- **Vercel**: Deployed via @sveltejs/adapter-vercel
- **Static Generation**: Pre-rendered for optimal performance
