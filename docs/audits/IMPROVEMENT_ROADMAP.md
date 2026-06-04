# Improvement Roadmap

## Phase 13: Remediation & Content Extraction
1.  Apply optional chaining (`?.`) to all array maps in UI components to stop the fatal DOM crashes.
2.  Data Mine the `script-lines/` dataset to extract character-specific quotes and episode appearances, injecting them into the `CharacterDetail` profiles to backfill the missing biographies with authentic, canonical data.

## Phase 14: UX Polish
1.  Implement `loading="lazy"` on all `<img>` tags within `CharacterCard.jsx` to improve bandwidth usage on the infinite scroll directory.
2.  Add CSS `:focus-visible` outlines to all interactive cards and search results to improve keyboard accessibility.
3.  Add explicit "No Records Found" illustrations to empty search or empty data states.

## Phase 15: Advanced Data Visualization
1.  **D3.js Family Trees:** Integrate a data visualization library to programmatically render family lineages on the `HouseDetail.jsx` pages using the IceAndFire API relationships.
2.  **Interactive Map:** Render a zoomable map plotting the `locations.json` coordinates.