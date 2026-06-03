// API Documentation: https://thronesapi.com/
import { getCachedData, setCachedData } from './cacheService';

const BASE_URL = 'https://thronesapi.com/api/v2';

export const fetchThronesCharacters = async () => {
  const cacheKey = 'thronesapi_characters';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`${BASE_URL}/Characters`);
    if (!res.ok) throw new Error('ThronesAPI failed');
    const data = await res.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('fetchThronesCharacters error', error);
    return null;
  }
};