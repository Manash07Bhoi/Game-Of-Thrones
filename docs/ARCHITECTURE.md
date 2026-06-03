# Architecture
The application employs a strict separation of concerns:
- **UI Layer (`src/components/`, `src/pages/`)**: Purely presentational. Handles layouts, GSAP animations, and IntersectionObservers. Consumes data only via `contentService.js`.
- **Service Layer (`src/services/`)**: Orchestrates data fetching. Responsible for interacting with external APIs, managing caching (`cacheService.js`), and normalizing/merging data (`mergeService.js`) to provide a consistent schema to the UI.
- **Routing**: Handled by `react-router-dom`. Uses a query-parameter rewrite strategy in `public/404.html` and `src/main.jsx` to natively support SPA deep linking on GitHub Pages.