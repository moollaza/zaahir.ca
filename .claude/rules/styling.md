---
globs: ["*.svelte", "*.css", "src/app.css"]
---

# Styling & Theme

## Tailwind CSS v4

- CSS-first configuration (no tailwind.config)
- Utility-first with @theme syntax
- System UI font stack
- Mobile-first responsive design with Tailwind breakpoints

## Theme System

- CSS custom properties for theme variables in `app.css`
- Dark mode: automatic system preference detection with manual toggle
- Color palette: orange primary (#f97316), dark red accents (#dc2626)
- Theme preference persisted to localStorage via `src/lib/stores/theme.ts`

## Components

- Svelte 5 runes ($state, $effect) for reactivity
- `Nav.svelte` -- navigation with active states and theme toggle
- `ThemeToggle.svelte` -- dark/light mode toggle
- `PhotoModal.svelte` -- modal for photo gallery viewing
