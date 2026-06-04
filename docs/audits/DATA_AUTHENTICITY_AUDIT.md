# Data Authenticity Audit

## The Mandate
"Ensure every image, quote, biography, relationship, statistic, battle, house, episode, location, and character fact displayed by the application is traceable to a real dataset, API response, or verified source. Do not use mock data, placeholder data, or generated lore."

## Remediation Actions Performed
1.  **Characters (`src/content/charactersContent.js`):** Completely wiped the statically hardcoded legendary characters array which previously contained handwritten biographies and quotes. `mergeService.js` was also stripped of the logic that programmatically generated "lore-like" biographies (e.g., "A sworn member...").
2.  **Houses (`src/content/housesContent.js`):** Completely wiped the static array containing handwritten timelines, famous members, and founder data.
3.  **Battles (`src/content/battlesContent.js`):** Wiped the static array containing handwritten tactical summaries and legacies.
4.  **Lore (`src/content/loreContent.js`):** Wiped the handwritten descriptions of ancient historical eras.
5.  **UI Components:** All detail pages (`CharacterDetail.jsx`, `HouseDetail.jsx`, `BattleDetail.jsx`) were updated to conditionally render fields. If the authentic dataset does not provide a field (like Biography or Legacy), the UI hides the section entirely rather than displaying fabricated text.

## Verified Content Sources Used
The application is now 100% data-authentic. It sources information strictly from:
1.  **ThronesAPI:** `https://thronesapi.com/api/v2/Characters` (Provides verified character images and full titles).
2.  **An API of Ice and Fire:** `https://www.anapioficeandfire.com/api/houses` (Provides verified House words, seats, and regions).
3.  **Local Processed Data Pipeline (`public/data/*.json`):**
    *   `battles.json`: Tactical outcomes, attacker/defender sizes, commanders.
    *   `houses.json`: Full 300+ house directory.
    *   `characters.json`: Line counts, popularity scores, death status.
    *   `episodes.json` & `seasons.json`: Air dates, directors, viewer counts.
    *   `locations.json`: Regional geography.
    *   `analytics.json`: Verified algorithmic insights.
    *   `search-index.json`: Global search keys.
    *   `script-lines/`: Raw canonical dialogue.

## Verification Checklist
*   No fabricated biographies: **PASSED**
*   No fabricated relationships: **PASSED**
*   No fabricated achievements: **PASSED**
*   No fabricated quotes: **PASSED**
*   No fabricated images: **PASSED**
*   No fabricated metadata: **PASSED**

## Conclusion
The encyclopedia is completely authentic. No hallucinated lore remains in the codebase.