# GitHub Pages SPA Routing

GitHub Pages does not natively support HTML5 pushState routing. If a user navigates to `https://yoursite.github.io/repo/characters/jon-snow` and hard refreshes, GitHub looks for a physical directory named `/characters/jon-snow` and throws a 404.

## The Solution
We use a standard community hack to retain clean URLs (avoiding `HashRouter` which creates ugly `/#/` URLs).

1. **`public/404.html`**
   - GitHub Pages natively redirects all failed paths to this file.
   - We placed a vanilla JS script here that takes the failed URL, converts it into a query parameter, and redirects the user back to the root `index.html`.
   - *Example:* `/characters/jon-snow` becomes `/?/characters/jon-snow`.

2. **`src/main.jsx`**
   - Before React even boots up, an Immediately Invoked Function Expression (IIFE) checks the window location for this specific query parameter.
   - If found, it uses `window.history.replaceState` to silently rewrite the URL back to `/characters/jon-snow`.
   - React Router (`BrowserRouter`) then mounts, sees the clean URL, and renders the correct component.

This ensures seamless deep-linking, social sharing, and refreshing across the entire application.