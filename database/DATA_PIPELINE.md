# Data Processing Pipeline

## Overview
The `pipeline.py` script transforms raw CSV and JSON datasets from the `database/` directory into normalized, production-ready JSON files in the `processed-data/` directory. The pipeline does not mutate the original data sources, preserving them for future reference.

## Pipeline Steps
1. **Extraction**:
   - Reads `battles.csv`, `dataset.csv`, `game-of-thrones.csv` (script lines), `character_deaths.csv`, and `character_predictions_pose.csv`.
2. **Deduplication**:
   - Identical lines in the script dataset are removed using `pandas.drop_duplicates()`.
3. **Normalization & ID Generation**:
   - Generates unique slugified IDs for all entities (e.g., `char_jon-snow`).
   - Resolves house associations by merging `allegiances` and `house` columns, standardizing names (e.g., prepending "House" where missing, cleaning up variations of Brotherhood Without Banners, Night's Watch, etc.).
   - Clean up character names to avoid ingesting script action lines and scene headings ("INT.", "CUT TO:") as characters.
   - Maps comma-separated commanders to character IDs.
   - Maps comma-separated attackers/defenders to house IDs.
4. **Data Aggregation (Analytics)**:
   - Aggregates script line counts for characters while parsing the dialogue.
   - Computes most spoken characters, character popularity rankings, and most viewed episodes into an `analytics.json` file.
5. **Chunking**:
   - Instead of writing a massive 30k+ line JSON file for script data, the script is chunked by season (e.g., `script-lines/season-1.json`), sorted properly by `episode_X_0X`. A metadata index `script-lines-index.json` is generated for frontend routing.
6. **Search Index**:
   - Generates a flat `search-index.json` optimized for client-side full-text search libraries.

## Execution
Run the pipeline using Python 3:
```bash
python3 database/pipeline.py
```
This requires the `pandas` package.
