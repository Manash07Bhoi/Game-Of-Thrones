import { CHARACTERS_DATA } from '../content/charactersContent';
import { HOUSES_DATA } from '../content/housesContent';
import { BATTLES_DATA } from '../content/battlesContent';
import { LORE_DATA } from '../content/loreContent';
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

  // If the API call succeeds, we want the FULL catalog. If it fails, fallback to the static legendary CHARACTERS_DATA.
  if (apiChars && apiChars.length > 0) {
    return apiChars.map(apiChar => {
      // Find matching static data (if it's a legendary character) for quotes/bios
      const baseChar = CHARACTERS_DATA.find(c => c.name === apiChar.firstName || c.name === apiChar.fullName) || {
        id: apiChar.id.toString(), // fallback id
        name: apiChar.fullName,
        fullTitle: apiChar.title,
        house: apiChar.family,
        biography: 'A resident of Westeros.',
        achievements: [],
        relationships: [],
        quote: '',
        bg: '#1a1f26',
        accent: '#c9a84c',
        sigilIcon: '♔'
      };

      const localChar = localChars ? localChars.find(c => c.name === apiChar.fullName) : null;

      return mergeCharacterData(baseChar, apiChar, localChar);
    });
  }

  // Fallback if ThronesAPI entirely fails
  return CHARACTERS_DATA.map(baseChar => {
    const localChar = localChars ? localChars.find(c => c.name.includes(baseChar.name)) : null;
    return mergeCharacterData(baseChar, null, localChar);
  });
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

  // Map over the static base houses to enrich them, but also grab from local JSON to flesh out the catalog
  let mergedHouses = HOUSES_DATA.map(baseHouse => {
    const apiHouse = apiHouses ? apiHouses.find(h => h.name.toUpperCase().includes(baseHouse.name)) : null;
    const localHouse = localHouses ? localHouses.find(h => h.name.toUpperCase().includes(baseHouse.name)) : null;
    return mergeHouseData(baseHouse, apiHouse, localHouse);
  });

  // If localHouses exist, we could optionally append ones we don't have static data for.
  // For now, we return the enriched static array to maintain premium layouts,
  // but if you wanted the full list you could append here.
  return mergedHouses;
};

export const getHouseById = async (id) => {
  const houses = await getHouses();
  return houses.find(h => h.id === id);
}

export const getBattles = async () => {
  const localBattles = await fetchLocalJSON('battles.json');

  if (localBattles && localBattles.length > 0) {
    return localBattles.map(localBattle => {
      // Find matching static fallback if it exists for flavor text
      const baseBattle = BATTLES_DATA.find(b => b.name === localBattle.name) || null;
      return mergeBattleData(baseBattle, localBattle);
    });
  }

  // Pure fallback if local JSON fails
  return BATTLES_DATA.map(baseBattle => mergeBattleData(baseBattle, null));
};

export const getBattleById = async (id) => {
  const battles = await getBattles();
  return battles.find(b => b.id === id);
}

export const getLore = async () => {
  return Promise.resolve(LORE_DATA);
};

export const getEpisodes = async () => fetchLocalJSON('episodes.json');
export const getSeasons = async () => fetchLocalJSON('seasons.json');
export const getLocations = async () => fetchLocalJSON('locations.json');
export const getAnalytics = async () => fetchLocalJSON('analytics.json');
export const getSearchIndex = async () => fetchLocalJSON('search-index.json');