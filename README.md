# Game of Thrones: The Westeros Portal

An immersive, premium cinematic web experience dedicated to the world of *A Song of Ice and Fire*. This single-page application (SPA) serves as a deep dive into the great houses, legendary characters, epic battles, and ancient lore of the Seven Kingdoms.

## Features
* **Premium UI/UX:** Cinematic fade-ins, scroll-reveal interactions, GSAP-driven hero sections, and immersive typography.
* **Service-Oriented Architecture:** Abstracted data layer safely merging live API responses with local JSON and static fallback content.
* **Fully Responsive:** Custom mobile hamburger navigation, frosted glass overlays, and fluid CSS-grid layouts.
* **SPA Routing on GitHub Pages:** Implements a robust `404.html` query-parameter hack to ensure clean deep-linking (`/characters/jon-snow`) via React Router without relying on hash routing.
* **Performance Focused:** Employs a dual-tier caching strategy (Memory + LocalStorage with a 24hr TTL) to minimize network latency and protect against API rate limits.

## Technology Stack
* **Framework:** React 19 (via Vite)
* **Routing:** React Router v7 (`react-router-dom`)
* **Styling:** Pure CSS (CSS Variables, Flexbox, Grid, CSS Modules)
* **Animations:** GSAP & IntersectionObserver
* **Data Layer:** ThronesAPI, An API of Ice and Fire, custom JSON pipelines

## Architecture Overview
The frontend communicates entirely through `src/services/`. UI components never make direct `fetch` calls. Instead, components request data from `contentService.js`, which negotiates between external APIs (`thronesApi.js`, `iceAndFireApi.js`), the local cache (`cacheService.js`), and static fallbacks (`src/content/`). This guarantees 100% uptime even if third-party endpoints fail.

## Installation & Development
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local Vite development server.
4. Run `npm run build` to compile the production-ready assets into the `dist/` directory.

## Deployment
This project is configured for seamless deployment to **GitHub Pages** via **GitHub Actions**. Pushing to the `main` branch automatically triggers the `.github/workflows/deploy.yml` workflow.

## Project Structure
```
├── public/          # Static assets and redirect scripts
│   ├── data/        # Raw JSON datasets
│   └── 404.html     # SPA routing redirect handler
├── src/
│   ├── components/  # Reusable UI elements (Navbar, Cards, Headers)
│   ├── content/     # Static fallback content and unified schemas
│   ├── pages/       # Route-level components (Home, Lore, Details)
│   └── services/    # API, Caching, and Merging abstractions
├── docs/            # Project documentation and memory banks
└── package.json     # Project configuration
```

## Roadmap
See `docs/ROADMAP.md` for future feature development, including advanced search engines, interactive maps, and timeline views.

## Contributing
Contributions are welcome! Please read `docs/CONTRIBUTING.md` before submitting a Pull Request. Be sure to check the `.github/ISSUE_TEMPLATE` directory to format your bug reports or feature requests.

## Disclaimer
This project is a fan-made portfolio piece. All data, characters, and lore are the intellectual property of George R.R. Martin and HBO. No copyright infringement is intended.

## License
MIT License. See [LICENSE](LICENSE) for more information.