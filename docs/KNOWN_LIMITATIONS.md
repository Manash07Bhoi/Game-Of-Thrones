# Known Limitations

While v1.0.0 represents a production-ready application, there are several known limitations due to dataset constraints and the static hosting environment.

## 1. Character Portrait Scarcity
*   **Limitation:** Out of 2,580 character records, only 53 possess verified live portrait images from the `ThronesAPI`.
*   **Handling:** We strictly enforce a "No Fabricated Imagery" rule. Minor characters utilize our Premium Fallback Portrait system (Sigil, House Colors, Initials) instead of stock or AI-generated photos.

## 2. API Dependency Risks
*   **Limitation:** The application relies on `ThronesAPI` and `An API of Ice and Fire`. If these servers experience downtime, live images and specific metadata will fail to load.
*   **Handling:** The application employs a 24-hour `localStorage` cache and a fallback `mergeService.js` that defaults to static properties if the network request fails. The app will not crash, but it may look sparser.

## 3. Paginated API Bottlenecks
*   **Limitation:** `An API of Ice and Fire` limits house requests to 50 per page. Due to performance constraints on client-side fetching, we only pull the first page.
*   **Handling:** If a minor house does not exist in page 1, the app gracefully falls back to local JSON without throwing an error.

## Future Roadmap Opportunities
*   **Database Migration:** Moving `public/data/*.json` to a dedicated Supabase/PostgreSQL backend to enable GraphQL queries, eliminating the need to load massive JSON arrays client-side.
*   **Interactive Maps:** A zoomable D3.js or Leaflet integration for `locations.json`.
*   **Family Trees:** Programmatic lineage visualizations mapping the intricate relationships of the Great Houses.