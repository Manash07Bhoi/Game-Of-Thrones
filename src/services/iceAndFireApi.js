// API Documentation: https://anapioficeandfire.com/
import { getCachedData, setCachedData } from './cacheService';

const BASE_URL = 'https://www.anapioficeandfire.com/api';

// Example utility to fetch multiple pages if needed, though for now we might fetch specific houses
export const fetchIceAndFireHouses = async (page = 1, pageSize = 50) => {
  const cacheKey = `iceandfire_houses_${page}_${pageSize}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`${BASE_URL}/houses?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error('IceAndFire API failed');
    const data = await res.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('fetchIceAndFireHouses error', error);
    return null;
  }
};