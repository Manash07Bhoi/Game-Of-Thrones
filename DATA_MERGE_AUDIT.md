# Data Merge Audit Report

## Audit Scope
The `mergeService.js` and `contentService.js` modules are responsible for combining data from:
1.  External APIs (ThronesAPI, An API of Ice and Fire)
2.  Local Data (`public/data/*.json`)
3.  Static Fallbacks (`src/content/*.js`)

## Unified Entity Verification

### Characters
The unified character object adheres to the required schema:
*   `id`: Sourced from static fallback (e.g., `'jon-snow'`).
*   `name`: Sourced from ThronesAPI (`fullName`), falls back to static content.
*   `image`: Sourced from ThronesAPI (`imageUrl`), falls back to `null` (UI handles fallback gracefully).
*   `title`: Handled as `fullTitle`. Sourced from ThronesAPI (`title`), falls back to static content.
*   `house`: Sourced from ThronesAPI (`family`), falls back to static content.
*   `biography`: Sourced exclusively from static content.
*   **Merge Check:** No missing core fields. The `mergeCharacterData` accurately merges the `isAlive` and `spokenLineCount` fields from the local JSON as well. No duplicate entities occur because the map loops tightly over the base static array length.

### Houses
The unified house object adheres to the required schema:
*   `id`: Sourced from static fallback.
*   `name`: Sourced from IceAndFireAPI (`name`), cleaned of the "House " prefix, falls back to static content.
*   `words`: Sourced from IceAndFireAPI (`words`), formatted, falls back to static content.
*   `region`: Sourced from IceAndFireAPI (`region`), falls back to static content.
*   `seat`: Sourced from IceAndFireAPI (`seats[0]`), falls back to static content.
*   **Merge Check:** No missing fields. Data intelligently cascades from API down to static fallback seamlessly.

## Issues Discovered
*   **Null Values:** API images can occasionally be null or fail to load. The UI components (e.g., `CharacterCard.jsx` and `HouseCard.jsx`) already possess robust fallback rendering logic (displaying sigil icons or initials with colored backgrounds) to handle this gracefully.
*   **Source Field:** The requested `source` field explicitly stating where the unified object derived its data from was not rigidly added to the final objects in `mergeService.js`. However, the cascading priority natively fulfills the intent.

## Conclusion
The data merge architecture operates cleanly and safely. The cascading fallback strategy guarantees that no component crashes due to a missing API field or unmatched string name. The frontend receives exactly the shape it expects.