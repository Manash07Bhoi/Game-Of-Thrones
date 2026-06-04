# User Journey Audit

## 1. The Explorer Journey
*   **Path:** Home -> "Explore All Characters" -> Character Directory -> Click Card -> Character Profile.
*   **Friction:** High. The user arrives at the profile expecting Wikipedia-level depth, but instead finds "Biography unavailable" due to the strict data authenticity sweeps. The user journey essentially hits a dead end here.

## 2. The Search Journey
*   **Path:** Click Search -> Type "Bastards" -> Select Battle of the Bastards -> Battle Profile.
*   **Friction:** Low. The `fuse.js` fuzzy search works instantly, keyboard navigation works flawlessly, and the routing is instant. The battle profile is data-rich (tactical outcomes, commanders, sizes).

## 3. The Lore Journey
*   **Path:** Navbar -> The Realm (`/lore`).
*   **Friction:** Fatal. The user encounters a completely blank page because the fabricated historical eras were scrubbed from `loreContent.js`. This breaks trust in the application.