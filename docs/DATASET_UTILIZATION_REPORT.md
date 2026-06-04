# Dataset Utilization Report

## Integrated Datasets

### `battles.json`
*   **Records:** 38
*   **Used:** Yes
*   **Route:** `/battles`, `/battles/:id`, `/` (Home summary)
*   **Service:** `contentService` (`getBattles`, `getBattleById`), `mergeService` (`mergeBattleData`)
*   **Components:** `BattleCard`, `Battles` (Page), `BattleDetail` (Page)

### `characters.json`
*   **Records:** 2,580
*   **Used:** Yes
*   **Route:** `/characters`, `/characters/:id`, `/` (Home summary)
*   **Service:** `contentService` (`getCharacters`, `getCharacterById`), `mergeService` (`mergeCharacterData`)
*   **Components:** `CharacterCard`, `Characters` (Page), `CharacterDetail` (Page)

### `houses.json`
*   **Records:** 347
*   **Used:** Yes
*   **Route:** `/houses`, `/houses/:id`, `/` (Home summary)
*   **Service:** `contentService` (`getHouses`, `getHouseById`), `mergeService` (`mergeHouseData`)
*   **Components:** `HouseCard`, `Houses` (Page), `HouseDetail` (Page), `Section1` (Component)

### `episodes.json`
*   **Records:** 73
*   **Used:** Yes
*   **Route:** `/episodes`
*   **Service:** `contentService` (`getEpisodes`)
*   **Components:** `Episodes` (Page)

### `seasons.json`
*   **Records:** 8
*   **Used:** Yes
*   **Route:** `/seasons`
*   **Service:** `contentService` (`getSeasons`)
*   **Components:** `Seasons` (Page)

### `locations.json`
*   **Records:** 27
*   **Used:** Yes
*   **Route:** `/locations`
*   **Service:** `contentService` (`getLocations`)
*   **Components:** `Locations` (Page)

### `analytics.json`
*   **Records:** 3 (Top-level objects: characterPopularity, topSpeakers, houseBattleRecords)
*   **Used:** Yes
*   **Route:** `/analytics`
*   **Service:** `contentService` (`getAnalytics`)
*   **Components:** `Analytics` (Page)

### `search-index.json`
*   **Records:** 20,963
*   **Used:** Yes
*   **Route:** Global (Rendered on all routes)
*   **Service:** `contentService` (`getSearchIndex`)
*   **Components:** `Navbar`

---

## Unused Datasets

### `metadata.json`
*   **Records:** 4
*   **Used:** No
*   **Notes:** Contains pipeline execution metadata. Currently not displayed in any footer or about page.

### `script-lines-index.json`
*   **Records:** 3
*   **Used:** No
*   **Notes:** Manifest file for the chunked scripts. Never fetched by `contentService`.

### `script-lines/*`
*   **Records:** ~32,769 total lines across 8 files (`season-1.json` through `season-8.json`).
*   **Used:** No
*   **Notes:** This is the most significant unused asset in the repository. The data pipeline generates massive chronological dialogue chunks, but the React application currently has no "Scripts", "Quotes", or "Transcripts" viewer route to consume them.

---

## Unused Routes & Components
*   **Routes:** There are no unused routes. Every defined path in `App.jsx` connects to a live page.
*   **Components:** There are no unused components. Every component in `src/components/` is imported and rendered either universally (like `Navbar`) or conditionally within pages.

## Conclusion
The application heavily utilizes 8 of the 11 processed datasets, representing almost all core metadata (battles, houses, characters, locations, tv-metadata, and search). However, **over 32,000 records of valuable script-line data remain entirely unused**. Integrating this script data (potentially inside Episode details or a dedicated Script viewer) represents the most significant remaining content opportunity.