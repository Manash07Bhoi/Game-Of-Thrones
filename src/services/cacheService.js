const memoryCache = new Map();
const TTL = 24 * 60 * 60 * 1000; // 24 hours

export const getCachedData = (key) => {
  // Level 1: In-memory cache
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  // Level 2: localStorage cache
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    // Populate memory cache for faster subsequent access
    memoryCache.set(key, item.value);
    return item.value;
  } catch (error) {
    console.error('Local storage cache error', error);
    return null;
  }
};

export const setCachedData = (key, value) => {
  // Level 1
  memoryCache.set(key, value);

  // Level 2
  try {
    const item = {
      value: value,
      expiry: new Date().getTime() + TTL
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Local storage quota exceeded or unavailable', error);
  }
};