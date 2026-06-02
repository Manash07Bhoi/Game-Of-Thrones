# Database Structure Overview

This project uses a flattened JSON file system acting as a document-based database for the frontend application.

## Entity Relationships

- **Characters**: Foreign key `houseId` links to **Houses**.
- **Episodes**: Foreign key `seasonId` links to **Seasons**.
- **Battles**: Foreign key `locationId` links to **Locations**. Factions and Commanders arrays contain foreign keys to **Houses** and **Characters**, respectively.
- **Script Lines**: Foreign keys `characterId`, `episodeId`, and `seasonId` map dialogue to speakers and chronological events.

## Directory Structure

```
processed-data/
├── analytics.json           # Derived statistics
├── battles.json             # Historical lore and battles
├── characters.json          # Cast and characters
├── episodes.json            # TV Show episodes
├── houses.json              # Factions and noble families
├── locations.json           # Geographic points of interest
├── metadata.json            # Pipeline generation metadata
├── script-lines-index.json  # Manifest for chunked dialogue
├── search-index.json        # Unified client-side search index
├── seasons.json             # TV Show seasons
└── script-lines/            # Chunked script files
    ├── season-1.json
    ├── season-2.json
    └── ...
```

This structure completely isolates the raw data (`database/`) from the consumable APIs (`processed-data/`), allowing dynamic UI generation on the frontend.
