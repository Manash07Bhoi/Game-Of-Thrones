# Lore Data Source Audit

## Overview
This audit details the verified datasets available in `processed-data/` to safely and authentically populate the Lore page without relying on generated or mock content.

## Datasets and Available Fields

### `metadata.json`
* **Record Count:** 1 record containing multiple counts
* **Available Fields:** `generatedAt`, `version`, `sourceDatasets`, `recordCounts` (seasons, episodes, houses, locations, characters, battles, scriptLines, searchIndexEntries)
* **Fields Consumed by Lore Page:** `recordCounts.houses`, `recordCounts.battles`, `recordCounts.locations`, `recordCounts.characters`, `recordCounts.episodes`, `recordCounts.seasons`, `recordCounts.scriptLines`

### `locations.json`
* **Record Count:** 27 records
* **Available Fields:** `id`, `name`, `region`
* **Fields Consumed by Lore Page:** `name`, `region` (to summarize Geography of Westeros and referenced battle locations)

### `houses.json`
* **Record Count:** 347 records
* **Available Fields:** `id`, `name`
* **Fields Consumed by Lore Page:** Overall count for Great Houses Overview.

### `battles.json`
* **Record Count:** 38 records
* **Available Fields:** `id`, `name`, `year`, `battleType`, `locationId`, `region`, `attackerSize`, `defenderSize`, `attackerOutcome`, `factions`, `commanders`
* **Fields Consumed by Lore Page:** `name`, `region`, `year`, `attackerSize`, `defenderSize` (to summarize Major Conflicts and total army sizes).

### `episodes.json` / `seasons.json`
* **Record Count:** 73 episodes, 8 seasons
* **Available Fields:** `id`, `seasonNumber`, `episodeNumber`, `overallNumber`, `title`, `directedBy`, `writtenBy`, `airDate`, `viewersMillions`
* **Fields Consumed by Lore Page:** Global counts, viewership summaries (Television Series Statistics).

### `analytics.json`
* **Record Count:** Analytics maps
* **Available Fields:** `characterPopularity`, `episodeAnalytics`, `mostSpokenCharacters`
* **Fields Consumed by Lore Page:** `mostSpokenCharacters` (Dialogue & Character Statistics).

### `script-lines-index.json`
* **Record Count:** 1 aggregate object
* **Available Fields:** `totalLines`, `seasons` (line count per season)
* **Fields Consumed by Lore Page:** `totalLines` (Dialogue Statistics).

