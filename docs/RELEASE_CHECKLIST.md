# Release Checklist

Before marking a phase complete or preparing for a public release, verify the following:

### Build & Deploy
- [ ] `npm run build` succeeds with no errors.
- [ ] No extraneous warnings during the Vite build process.
- [ ] `npm run preview` confirms local production build operates correctly.
- [ ] GitHub Actions (`.github/workflows/deploy.yml`) is green and active.

### Code Quality
- [ ] `npm run lint` yields 0 errors.
- [ ] React Hooks have exhaustive dependencies (no missing arrays in `useEffect`).
- [ ] No direct DOM manipulation outside of specific `useRef` scopes (e.g., GSAP, IntersectionObserver).

### Architecture & UI
- [ ] Mobile navigation overlay correctly locks background scroll.
- [ ] Mobile navigation handles z-index correctly (covers content, below Navbar).
- [ ] Fallback data successfully renders if external API fetches are simulated to fail.
- [ ] All deep-links navigate correctly on GitHub pages without 404ing permanently.

### Documentation
- [ ] `README.md` is up to date.
- [ ] `CHANGELOG.md` reflects latest additions.
- [ ] Developer Credit ("Created and Developed by Roshan") is preserved.