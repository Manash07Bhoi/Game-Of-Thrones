# Processed Data Schema

This document outlines the JSON schema of the output files located in the `processed-data/` directory. These files are optimized for frontend consumption.

## `characters.json`
* **id**: `string` (Unique slugified identifier, e.g., `char_jon-snow`)
* **name**: `string` (Character name)
* **title**: `string | null` (Titles held)
* **isMale**: `boolean | null`
* **culture**: `string | null`
* **houseId**: `string | null` (Foreign key to `houses.json`)
* **isAlive**: `boolean | null`
* **popularity**: `float` (0.0 to 1.0)
* **spokenLineCount**: `integer` (Number of lines spoken in the script)

## `houses.json`
* **id**: `string` (e.g., `house_house-stark`)
* **name**: `string` (e.g., `House Stark`)

## `episodes.json`
* **id**: `string` (e.g., `episode_1_01`)
* **seasonId**: `string` (e.g., `season_1`)
* **episodeNumber**: `integer`
* **overallNumber**: `integer`
* **title**: `string`
* **directedBy**: `string`
* **writtenBy**: `string`
* **airDate**: `string` (YYYY-MM-DD)
* **viewersMillions**: `float | null`

## `seasons.json`
* **id**: `string`
* **seasonNumber**: `integer`
* **episodes**: `string[]` (Array of episode IDs)

## `battles.json`
* **id**: `string`
* **name**: `string`
* **year**: `integer | null`
* **battleType**: `string | null`
* **locationId**: `string | null`
* **region**: `string | null`
* **attackerSize**: `float | null`
* **defenderSize**: `float | null`
* **attackerOutcome**: `string | null`
* **factions**: `object` (`attackers`: `string[]`, `defenders`: `string[]`) (House IDs)
* **commanders**: `object` (`attackers`: `string[]`, `defenders`: `string[]`) (Character IDs)

## `locations.json`
* **id**: `string`
* **name**: `string`
* **region**: `string | null`

## `script-lines/season-X.json`
* **id**: `string`
* **seasonId**: `string`
* **episodeId**: `string`
* **characterId**: `string | null` (Null if action description)
* **text**: `string`
* **isAction**: `boolean`

## `search-index.json`
A unified array for client-side search indexing (Fuse.js/MiniSearch).
* **id**: `string`
* **type**: `"character" | "house" | "episode" | "battle" | "location" | "quote"`
* **title**: `string`
* **content**: `string` (Searchable text payload)
* **url**: `string` (Route path for frontend navigation)
* **character**: `string` (Only for quotes)
* **season**: `string` (Only for quotes/episodes)
* **episode**: `string` (Only for quotes)
