export const mergeCharacterData = (baseContent, apiChar, localData) => {
  // We prioritize API data where available, fallback to localData (processed json), then baseContent (static fallback)
  return {
    ...baseContent,
    name: apiChar?.fullName || baseContent.name,
    fullTitle: apiChar?.title || baseContent.fullTitle,
    image: apiChar?.imageUrl || null, // API image
    house: apiChar?.family || baseContent.house,
    // Add local dataset metadata if we have it
    popularity: localData?.popularity || null,
    spokenLineCount: localData?.spokenLineCount || 0,
    isAlive: localData?.isAlive ?? null
  };
};

export const mergeHouseData = (baseContent, apiHouse) => {
  return {
    ...baseContent,
    name: apiHouse?.name?.replace('House ', '') || baseContent.name,
    words: apiHouse?.words ? `"${apiHouse.words}"` : baseContent.words,
    region: apiHouse?.region || baseContent.region,
    seat: (apiHouse?.seats && apiHouse.seats[0]) ? apiHouse.seats[0] : baseContent.seat
  };
};