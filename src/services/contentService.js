import { CHARACTERS_DATA } from '../content/charactersContent';
import { HOUSES_DATA } from '../content/housesContent';
import { BATTLES_DATA } from '../content/battlesContent';
import { LORE_DATA } from '../content/loreContent';
import { fetchThronesCharacters } from './thronesApi';
import { fetchIceAndFireHouses } from './iceAndFireApi';
import { mergeCharacterData, mergeHouseData } from './mergeService';

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

  // Merge the data based on the base static content
  return CHARACTERS_DATA.map(baseChar => {
    // Attempt to match by name (naive matching for this phase)
    const apiChar = apiChars ? apiChars.find(c => c.firstName === baseChar.name || c.fullName.includes(baseChar.name)) : null;
    const localChar = localChars ? localChars.find(c => c.name.includes(baseChar.name)) : null;

    return mergeCharacterData(baseChar, apiChar, localChar);
  });
};

export const getCharacterById = async (id) => {
  const chars = await getCharacters();
  return chars.find(c => c.id === id);
}

export const getHouses = async () => {
  // We can fetch page 1-3 to get a bunch of houses, but for performance in this phase,
  // we'll just pull page 1 of IceAndFire (which might not have the main ones immediately,
  // so static fallbacks will be heavily utilized, or we'd need to fetch specific house IDs)
  // For safety and speed, we will fetch one page just to demonstrate the architecture.
  const apiHouses = await fetchIceAndFireHouses(1, 50);

  return HOUSES_DATA.map(baseHouse => {
    // Attempt to match by name
    const apiHouse = apiHouses ? apiHouses.find(h => h.name.toUpperCase().includes(baseHouse.name)) : null;
    return mergeHouseData(baseHouse, apiHouse);
  });
};

export const getHouseById = async (id) => {
  const houses = await getHouses();
  return houses.find(h => h.id === id);
}

export const getBattles = async () => {
  // For battles, we rely on the local json and static content
  const localBattles = await fetchLocalJSON('battles.json');

  return BATTLES_DATA.map(baseBattle => {
    // Just merging the static content for now, as we don't have an external API for battles
    const localBattle = localBattles ? localBattles.find(b => b.name.includes(baseBattle.name)) : null;
    return {
      ...baseBattle,
      // Add any local json specific fields if they exist
      region: localBattle?.region || null
    };
  });
};

export const getBattleById = async (id) => {
  const battles = await getBattles();
  return battles.find(b => b.id === id);
}

export const getLore = async () => {
  // Lore relies entirely on static content currently
  return Promise.resolve(LORE_DATA);
};