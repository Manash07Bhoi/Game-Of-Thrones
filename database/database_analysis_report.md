# Game of Thrones Database Analysis Report

## 1. Inventory of Datasets

During the extraction and analysis process, the following data sources were identified in the `database` directory:

* **battles.csv** (and duplicates inside `archive/battles.csv`)
  * Shape: 38 rows, 25 columns
  * Purpose: Contains information about the major battles in the Game of Thrones universe.
  * Key columns: `name`, `year`, `attacker_king`, `defender_king`, `attacker_1` through `defender_4`, `battle_type`, `attacker_size`, `defender_size`, `attacker_commander`, `defender_commander`, `location`, `region`.
* **dataset.csv** (and duplicate inside `archive_1/dataset.csv`)
  * Shape: 73 rows, 9 columns
  * Purpose: Contains episode metadata, mapping episodes to seasons, directors, writers, and viewership.
  * Key columns: `No.overall`, `No. inseason`, `Title`, `Directed by`, `Written by`, `Original air date`, `U.S. viewers(millions)`, `Season`.
* **archive/character_deaths.csv**
  * Shape: 917 rows, 13 columns
  * Purpose: Tracks the deaths of characters across the books.
  * Key columns: `name`, `allegiances`, `death_year`, `book_of_death`, `death_chapter`, `gender`, `nobility`.
* **archive/character_predictions_pose.csv**
  * Shape: 1946 rows, 30 columns
  * Purpose: Detailed character information and survival predictions.
  * Key columns: `name`, `title`, `male`, `culture`, `house`, `spouse`, `isalive`, `age`, `popularity`.
* **game_of_thrones_csv/game-of-thrones.csv** (and duplicate in `archive_2/game-of-thrones.csv`)
  * Shape: 33,198 rows, 5 columns
  * Purpose: Contains the complete script/dialogue for the TV show.
  * Key columns: `Text`, `Speaker`, `Episode`, `Season`, `Show`.
* **archive/datapackage.json**
  * Contains metadata mapping to `battles.csv`, `character_deaths.csv`, and `character_predictions_pose.csv`.

## 2. Dataset Descriptions and Relationships

* **Characters & Houses (`character_predictions_pose.csv`, `character_deaths.csv`):** These two datasets represent characters. The predictions dataset contains rich demographic and hierarchical data (house, culture, age, popularity, spouses), while the deaths dataset specifically tracks when characters die. They can be joined on the character `name`.
* **Episodes (`dataset.csv`):** This is the definitive list of episodes for the TV show. It maps the overall episode number to the season and in-season episode number.
* **Scripts / Dialogue (`game-of-thrones.csv`):** This dataset contains line-by-line dialogue. It links to characters via the `Speaker` column and links to episodes/seasons via the `Episode` and `Season` columns.
* **Lore / Battles (`battles.csv`):** Contains historical data regarding battles. The commanders map to character names, and the kings map to character/house leaders. The `location` and `region` provide geographic (map) data.

## 3. Data Cleanup Recommendations

* **Duplicates:**
  * The root `battles.csv` and `dataset.csv` files are duplicates of files found in `archive.zip` and `archive_1.zip`. We preserved all files as requested, but a script ingesting this data must pick only one source path to prevent duplicate ingestion.
  * `game_of_thrones_csv/game-of-thrones.csv` and `archive_2/game-of-thrones.csv` are identical.
  * The script data has 425 duplicated rows that should be distincted during insertion.
* **Missing Data:**
  * `character_predictions_pose.csv` is missing many relations (`mother`, `heir`, `father`) and death dates.
  * `battles.csv` has heavily null fields for secondary attacking/defending houses (e.g., `attacker_4`).
  * `game-of-thrones.csv` has 8,356 missing `Speaker` rows, representing action/scene descriptions rather than spoken dialogue. These should be preserved but flagged as `is_action = true` instead of spoken lines.
* **Normalization Issues:**
  * `battles.csv` flattens the allied houses (`attacker_1`, `attacker_2`, etc.). This should be normalized into a `BattleFactions` junction table.

## 4. Recommended Database Architecture (Normalization Strategy)

To build a comprehensive Game of Thrones database for the website, the following relational database structure is recommended:

### Tables / Collections

1. **`Characters`**:
   * Sourced from: `character_predictions_pose.csv` and `character_deaths.csv`.
   * Columns: `id`, `name`, `title`, `gender`, `culture`, `house_id` (foreign key), `is_alive`, `death_year`, `popularity`.
2. **`Houses`**:
   * Sourced from: Extracting distinct values from `house` and `allegiances` across datasets.
   * Columns: `id`, `name`, `region_id`.
3. **`Locations / Regions`**:
   * Sourced from: Distinct `region` and `location` values in `battles.csv`.
   * Columns: `id`, `name`, `region`.
4. **`Seasons`**:
   * Sourced from: Distinct `Season` values in `dataset.csv`.
   * Columns: `id`, `season_number`.
5. **`Episodes`**:
   * Sourced from: `dataset.csv`.
   * Columns: `id`, `season_id` (foreign key), `episode_number`, `overall_number`, `title`, `air_date`, `director`, `writer`, `viewers_millions`.
6. **`ScriptLines`** (Search Functionality):
   * Sourced from: `game-of-thrones.csv`.
   * Columns: `id`, `episode_id` (foreign key), `character_id` (foreign key to `Speaker`), `text`, `is_action_description`.
7. **`Battles`** (Lore):
   * Sourced from: `battles.csv`.
   * Columns: `id`, `name`, `year`, `battle_type`, `location_id` (foreign key), `attacker_size`, `defender_size`, `attacker_outcome`.
8. **`BattleFactions`** (Junction Table):
   * Normalizes the `attacker_1...` and `defender_1...` columns.
   * Columns: `battle_id`, `house_id`, `role` (attacker/defender).
9. **`BattleCommanders`** (Junction Table):
   * Normalizes the comma-separated `attacker_commander` and `defender_commander` lists.
   * Columns: `battle_id`, `character_id`, `role` (attacker/defender).

## 5. Summary for Web Development

By extracting, cleaning, and normalizing these datasets, the frontend website can easily support:
* **Characters & Cast:** Powered by `Characters` and `Houses`.
* **Episodes & Seasons:** Powered by `Episodes` and `Seasons`.
* **Locations & Maps:** Derived from the `Locations` table seeded by battle data.
* **Lore & Dragons:** Powered by `Battles`. Note: Specific dragon data is sparse in these CSVs, so dragon data might need to be sourced from external APIs or manually appended, or extracted via regex from the script lines.
* **Search Functionality:** A full-text search index on the `ScriptLines` table will allow users to search for specific quotes or scenes across the entire show.
