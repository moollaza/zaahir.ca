---
globs: ["*.test.ts", "*.spec.ts", "e2e/**", "playwright.config.*"]
---

# Testing & Visual Regression

## E2E Testing (Playwright)

- 24 comprehensive tests covering desktop, mobile, tablet, and dark theme
- DRY utilities in `e2e/test-utils.ts` for maintainable test code
- Use content-aware waits (font + image loading detection), NOT networkidle

## Visual Regression (Argos)

- Argos integration for cross-platform visual testing (Linux CI vs macOS local)
- All pages tested on desktop, mobile, and dark theme screenshots
- Automatic screenshot uploads and PR status checks via CI
- Review visual diffs in Argos dashboard

## CI/CD

- GitHub Actions with Argos reporter for visual diff reviews
- Pre-commit hooks: Husky + lint-staged for automatic formatting (Prettier) and linting (ESLint)
