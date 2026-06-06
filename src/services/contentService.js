import { fetchThronesCharacters } from './thronesApi';
import { fetchIceAndFireHouses } from './iceAndFireApi';
import { mergeCharacterData, mergeHouseData, mergeBattleData } from './mergeService';

// Fetches the processed local JSON data as a fallback
const fetchLocalJSON = async (filename) => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/${filename}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error(`Failed to load local JSON ${filename}`, e);
  }
  return null;
};

export const getCharacters = async () => {
  // Try APIs and Local Data
  const [apiChars, localChars] = await Promise.all([
    fetchThronesCharacters(),
    fetchLocalJSON('characters.json')
  ]);

  // Use the massive local JSON as the absolute source of truth for the catalog length (2,580 records)
  if (localChars && localChars.length > 0) {
    return localChars.map(localChar => {
      // Try to find API data for images. Strict matching to prevent minor chars inheriting major char portraits.
      const apiChar = apiChars ? apiChars.find(c => {
        const apiName = c.fullName.toLowerCase();
        const localName = localChar.name.toLowerCase();
        return apiName === localName ||
               // Special case for characters with titles in API but not local, or vice versa, but must be very strict.
               (apiName.includes(localName) && localName.length > 5 && localName !== "jon" && localName !== "arya");
      }) : null;

      return mergeCharacterData(null, apiChar, localChar);
    });
  }

  // Pure fallback if python dataset fails entirely
  if (apiChars && apiChars.length > 0) {
    return apiChars.map(apiChar => mergeCharacterData(null, apiChar, null));
  }

  return [];
};

export const getCharacterById = async (id) => {
  const chars = await getCharacters();
  return chars.find(c => c.id === id);
}

export const getHouses = async () => {
  const [apiHouses, localHouses] = await Promise.all([
    fetchIceAndFireHouses(1, 50),
    fetchLocalJSON('houses.json')
  ]);

  if (localHouses && localHouses.length > 0) {
    return localHouses.map(localHouse => {
      // Find matching API data if it exists
      const apiHouse = apiHouses ? apiHouses.find(h =>
        h.name.toUpperCase().includes(localHouse.name.toUpperCase())
      ) : null;
      return mergeHouseData(null, apiHouse, localHouse);
    });
  }

  // Fallback if local JSON is missing (just map over the API payload directly)
  if (apiHouses && apiHouses.length > 0) {
    return apiHouses.map(apiHouse => mergeHouseData(null, apiHouse, null));
  }

  return [];
};

export const getHouseById = async (id) => {
  const houses = await getHouses();
  return houses.find(h => h.id === id);
}

export const getBattles = async () => {
  const localBattles = await fetchLocalJSON('battles.json');

  if (localBattles && localBattles.length > 0) {
    return localBattles.map(localBattle => {
      return mergeBattleData(null, localBattle);
    });
  }

  return [];
};

export const getBattleById = async (id) => {
  const battles = await getBattles();
  return battles.find(b => b.id === id);
}

export const getEpisodes = async () => fetchLocalJSON('episodes.json');
export const getSeasons = async () => fetchLocalJSON('seasons.json');
export const getLocations = async () => fetchLocalJSON('locations.json');
export const getAnalytics = async () => fetchLocalJSON('analytics.json');

export const getLore = async () => {
  const [metadata, locations, battles, analytics, scriptIndex] = await Promise.all([
    fetchLocalJSON('metadata.json'),
    getLocations(),
    getBattles(),
    getAnalytics(),
    getScriptIndex()
  ]);

  if (!metadata) return [];

  const lore = [];

  lore.push({
    id: 'realm_overview',
    title: 'Realm Overview',
    subtitle: 'A Land of Ice and Fire',
    content: `Westeros is home to ${metadata.recordCounts.characters.toLocaleString()} named characters belonging to ${metadata.recordCounts.houses} noble houses and factions. Across ${metadata.recordCounts.locations} recorded major regions and seats of power, the history of the Seven Kingdoms has been defined by loyalty, betrayal, and war.`
  });

  if (battles && battles.length > 0) {
    const totalAttackers = battles.reduce((acc, b) => acc + (b.attackerSize || 0), 0);
    const totalDefenders = battles.reduce((acc, b) => acc + (b.defenderSize || 0), 0);

    // Sort battles by year, filtering out nulls
    const sortedBattles = [...battles].filter(b => b.year).sort((a, b) => parseInt(a.year) - parseInt(b.year));
    let earliestYear = sortedBattles.length > 0 ? sortedBattles[0].year : 'Unknown';
    let latestYear = sortedBattles.length > 0 ? sortedBattles[sortedBattles.length - 1].year : 'Unknown';

    lore.push({
      id: 'major_conflicts',
      title: 'Major Conflicts',
      subtitle: 'Wars that Shaped Westeros',
      content: `The database records ${metadata.recordCounts.battles} major battles stretching from ${earliestYear} to ${latestYear}. These conflicts involved vast numbers of soldiers, with combined recorded attacking forces of over ${totalAttackers.toLocaleString()} men and defending forces exceeding ${totalDefenders.toLocaleString()}.`
    });
  }

  if (locations && locations.length > 0) {
    const regionCounts = {};
    locations.forEach(loc => {
      if (loc.region && loc.region !== "Unknown") {
        regionCounts[loc.region] = (regionCounts[loc.region] || 0) + 1;
      }
    });

    // Find top 3 most referenced regions
    const topRegions = Object.entries(regionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([region]) => region);

    lore.push({
      id: 'geography',
      title: 'Geography of Westeros',
      subtitle: 'The Varied Landscapes',
      content: `Westeros spans vast, wildly differing climates and topographies. Key regions where major historical events and battles occurred include ${topRegions.join(', ')} and many others. From the frozen reaches beyond the Wall to the deserts of Dorne, geography dictates destiny.`
    });
  }

  lore.push({
    id: 'series_statistics',
    title: 'Television Series Statistics',
    subtitle: 'The Epic Visual Retelling',
    content: `The events of this era are immortalized across ${metadata.recordCounts.seasons} seasons and ${metadata.recordCounts.episodes} episodes. The series features a massive, intertwined narrative that dominated global viewership.`
  });

  if (scriptIndex && analytics && analytics.mostSpokenCharacters) {
    const topSpeakers = analytics.mostSpokenCharacters.slice(0, 3).map(c => c.name);
    lore.push({
      id: 'dialogue_statistics',
      title: 'Dialogue & Character Statistics',
      subtitle: 'The Words Spoken',
      content: `A total of ${scriptIndex.totalLines.toLocaleString()} spoken lines of dialogue are recorded across the series history. The political maneuvering and storytelling were heavily driven by key figures such as ${topSpeakers.join(', ')}, who account for a significant portion of all recorded dialogue.`
    });
  }

  return lore;
};
export const getSearchIndex = async () => fetchLocalJSON('search-index.json');

export const getScriptIndex = async () => fetchLocalJSON('script-lines-index.json');
export const getSeasonScript = async (seasonNumber) => fetchLocalJSON(`script-lines/season-${seasonNumber}.json`);