# Service Layer

The Service Layer abstracts all data retrieval away from the UI. React components do not use `fetch()`.

## Core Services
*   **`contentService.js`**: The main entry point for the UI. Exports `getHouses()`, `getCharacters()`, etc. It handles the `Promise.all` orchestration between APIs and local data.
*   **`cacheService.js`**: Intercepts outgoing requests.
    *   **Level 1 (Memory):** Uses a JavaScript `Map`. Returns data instantly across SPA route transitions.
    *   **Level 2 (LocalStorage):** Persists data between browser sessions with a 24-hour TTL (Time To Live). Prevents the application from spamming external APIs on hard refreshes.
*   **`mergeService.js`**: Unifies the raw API responses into UI-friendly schemas.
*   **`thronesApi.js` & `iceAndFireApi.js`**: Isolated modules dedicated entirely to knowing the exact endpoints and header requirements of external resources.

## Benefits
If the project migrates to a dedicated backend (like Supabase or Firebase) in the future, *not a single React component will need to change*. You only need to update `contentService.js` to point to the new backend.