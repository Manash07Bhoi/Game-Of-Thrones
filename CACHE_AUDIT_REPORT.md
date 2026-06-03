# Cache Audit Report

## Memory Cache (Level 1)
*   **Mechanism:** Implemented using a JavaScript `Map()` instance inside `cacheService.js`.
*   **Behavior:** Stores API responses (`thronesapi_characters`, `iceandfire_houses_1_50`) as key-value pairs during a single user session.
*   **Verification:** Verified via code review. Because it's an in-memory Map, it executes synchronously and bypasses the `localStorage` parser, providing near-instant O(1) reads for subsequent requests across page transitions within the SPA.

## LocalStorage Cache (Level 2)
*   **Mechanism:** Implemented using the browser's `window.localStorage` API.
*   **Behavior:** Data is stringified and saved alongside a calculated `expiry` timestamp.
*   **Verification:** Verified via code review. Handles quota exceptions safely via `try/catch`.

## TTL Expiration
*   **Mechanism:** TTL is set to `24 * 60 * 60 * 1000` (24 hours).
*   **Behavior:** Upon fetching from cache, the service checks if `now.getTime() > item.expiry`.
*   **Verification:** Verified. If expired, `localStorage.removeItem(key)` is triggered, `null` is returned, and the system seamlessly falls back to making a fresh API network request.

## Conclusion
The caching architecture is highly robust. It effectively minimizes network overhead for rapid SPA transitions (via Memory Map) while preserving state across hard refreshes and distinct sessions (via localStorage). The graceful error handling ensures that incognito browsing or quota limits will simply bypass the cache rather than crash the application.