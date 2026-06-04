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
      // Try to find API data for images
      const apiChar = apiChars ? apiChars.find(c =>
        c.fullName.toLowerCase() === localChar.name.toLowerCase() ||
        c.firstName.toLowerCase() === localChar.name.toLowerCase()
      ) : null;

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

export const getLore = async () => {
  return Promise.resolve([]); // Lore static data wiped, requires future API integration
};

export const getEpisodes = async () => fetchLocalJSON('episodes.json');
export const getSeasons = async () => fetchLocalJSON('seasons.json');
export const getLocations = async () => fetchLocalJSON('locations.json');
export const getAnalytics = async () => fetchLocalJSON('analytics.json');
export const getSearchIndex = async () => fetchLocalJSON('search-index.json');

export const getScriptIndex = async () => fetchLocalJSON('script-lines-index.json');
export const getSeasonScript = async (seasonNumber) => fetchLocalJSON(`script-lines/season-${seasonNumber}.json`);