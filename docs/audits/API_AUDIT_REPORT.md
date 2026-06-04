# API Reliability Audit

## 1. ThronesAPI
*   **Endpoint:** `https://thronesapi.com/api/v2/Characters`
*   **Health:** Operational (200 OK).
*   **CORS:** No CORS issues detected.
*   **Response Structure:** Returns a flat JSON array of character objects.
    *   Fields: `id`, `firstName`, `lastName`, `fullName`, `title`, `family`, `image`, `imageUrl`.
*   **Observation:** The API is fast and stable. The `imageUrl` field correctly points to absolute URLs hosting the character images. It serves as an excellent primary source for character data.

## 2. An API of Ice and Fire
*   **Endpoint:** `https://www.anapioficeandfire.com/api/houses`
*   **Health:** Operational (200 OK).
*   **CORS:** No CORS issues detected.
*   **Response Structure:** Returns a paginated JSON array of house objects. Relies heavily on pagination headers (Link: rel="next").
    *   Fields: `url`, `name`, `region`, `coatOfArms`, `words`, `titles`, `seats`, `currentLord`, `heir`, `overlord`, `founded`, `founder`, `diedOut`, `ancestralWeapons`, `cadetBranches`, `swornMembers`.
*   **Observation:** The API is stable and extremely data-rich. However, because it is heavily paginated (45 pages), pulling specific houses requires either fetching all pages or searching by specific exact string matches. Our service layer gracefully handles this by querying page 1 and safely falling back to local/static content if the desired house isn't in that specific chunk, ensuring no UI breakage.

## Conclusion
Both external APIs are functional, correctly structured, and reliably accessible from the frontend without CORS blockages. The fallback architecture is perfectly positioned to handle any unexpected downtime or rate-limiting.