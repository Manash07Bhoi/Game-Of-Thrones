# Memory Bank

## Vision
*   **Project Goals:** To construct a structurally sound, highly performant, serverless/static portal for exploring the lore of Game of Thrones.
*   **Long-Term Direction:** Evolve into a comprehensive encyclopedia utilizing a dedicated database (e.g., Supabase) and advanced client-side search indexing without sacrificing the cinematic frontend experience.

## Architecture Decisions
*   **Routing:** `react-router-dom` using `BrowserRouter` with a base URL to support subdirectories on GitHub Pages.
*   **GitHub Pages:** A vanilla JavaScript snippet in `public/404.html` catches deep links and redirects them as query parameters. `src/main.jsx` intercepts these and silently rewrites the browser history, allowing the router to pick them up without 404s.
*   **Service Layer:** Separates UI from data fetching entirely. Ensures components never crash if endpoints change or fail.
*   **Cache Decisions:** 2-tier cache. Memory map for instant SPA transitions, `localStorage` for cross-session performance, operating on a 24-hour TTL to prevent stale data.
*   **Data Merging:** Custom logic prioritizes Live API data, filling in missing fields with Local JSON processed datasets, and ultimately falling back to Hardcoded Static content modules.

## APIs
*   **ThronesAPI:** Fast, reliable, provides image URLs.
*   **Ice and Fire API:** Slower, highly paginated, dense with metadata. Handled carefully in the service layer to avoid hanging the UI.

## Deployment
*   **GitHub Pages & Actions:** Configured to automatically run `npm ci` and `npm run build`, and then deploy the `dist/` output artifact whenever the `main` branch is updated.

## Future Features
*   Character profiles
*   House profiles
*   Search
*   Timeline
*   Maps
*   Family trees
*   Cast database