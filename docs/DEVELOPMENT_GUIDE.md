# Development Guide

Welcome to the Westeros Portal! This guide helps you navigate the local development workflow.

## Prerequisites
- Node.js (v20+)
- npm (v10+)

## Initial Setup
1. Clone the repository.
2. Run `npm install`.
3. Start the local server: `npm run dev`.
4. The site will be available at `http://localhost:5173/Game-Of-Thrones/` (the subpath is necessary to mirror GitHub Pages).

## Styling Philosophy
- **No Heavy CSS Frameworks:** We rely on raw CSS (`.css` files adjacent to their components) for ultimate control over cinematic animations.
- **Variables:** Global colors (Gold, Ash, Parchment, Blood) are defined in `src/App.css`. Use them to ensure visual consistency.
- **GSAP:** Used exclusively for complex timeline scrubs (like the `Hero.jsx` video). Standard reveal animations use native `IntersectionObserver` to keep bundle size low.

## Making Changes
- **Content:** Do not hardcode data into JSX. Update the fallback modules in `src/content/`.
- **Components:** Keep components purely presentational. Fetching logic must live in `src/services/contentService.js`.
- **Pre-commit:** Always run `npm run lint` and `npm run build` locally to verify production readiness before pushing.