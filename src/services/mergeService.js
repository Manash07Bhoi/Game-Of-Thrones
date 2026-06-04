export const mergeCharacterData = (baseContent, apiChar, localData) => {
  // We prioritize API data where available, fallback to localData (processed json), then baseContent (static fallback)
  const defaultBg = '#1a1f26';
  const defaultAccent = '#c9a84c';

  return {
    id: localData?.id || apiChar?.id?.toString() || baseContent?.id || Math.random().toString(),
    name: apiChar?.fullName || localData?.name || baseContent?.name,
    fullTitle: apiChar?.title || localData?.title || baseContent?.fullTitle || '',
    image: apiChar?.imageUrl || baseContent?.image || null, // API image
    house: apiChar?.family || baseContent?.house || localData?.houseId?.replace('house_house-', 'House ') || 'Unknown House',
    // Add local dataset metadata if we have it
    popularity: localData?.popularity || null,
    spokenLineCount: localData?.spokenLineCount || 0,
    isAlive: localData?.isAlive ?? null,

    // Aesthetic Fallbacks
    biography: baseContent?.biography ||
      (localData?.houseId ? `A sworn member or affiliate of ${localData.houseId.replace('house_house-', 'House ').replace(/-/g, ' ')}. ` : '') +
      (localData?.spokenLineCount > 0 ? `This character appears in the recorded histories, speaking ${localData.spokenLineCount} times during the events of the wars to come.` : `A character residing in the Seven Kingdoms during the tumultuous wars for the Iron Throne.`),
    achievements: baseContent?.achievements || [],
    relationships: baseContent?.relationships || [],
    quote: baseContent?.quote || (localData?.spokenLineCount > 0 ? "Their words are recorded in the annals of history." : ''),
    bg: baseContent?.bg || defaultBg,
    accent: baseContent?.accent || defaultAccent,
    sigilIcon: baseContent?.sigilIcon || '♔'
  };
};

export const mergeHouseData = (baseContent, apiHouse, localHouse) => {
  // apiHouse: An API of Ice and Fire
  // localHouse: public/data/houses.json
  // baseContent: static fallback

  return {
    ...baseContent,
    id: localHouse?.id || baseContent?.id || Math.random().toString(),
    name: apiHouse?.name?.replace('House ', '') || localHouse?.name?.replace('House ', '') || baseContent?.name,
    words: apiHouse?.words ? `"${apiHouse.words}"` : baseContent?.words,
    region: apiHouse?.region || baseContent?.region,
    seat: (apiHouse?.seats && apiHouse.seats[0]) ? apiHouse.seats[0] : baseContent?.seat
  };
};

export const mergeBattleData = (baseContent, localBattle) => {
  // localBattle is from processed-data battles.json
  // baseContent is static fallback (if exists)
  return {
    id: localBattle?.id || baseContent?.id || Math.random().toString(),
    name: localBattle?.name || baseContent?.name,
    location: localBattle?.region || baseContent?.location,
    year: localBattle?.year ? `${localBattle.year} AC` : baseContent?.year,
    background: baseContent?.background || localBattle?.battleType || 'No tactical background available.',
    description: baseContent?.description || `A ${localBattle?.battleType || 'battle'} fought in ${localBattle?.region || 'Westeros'}.`,
    commanders: localBattle?.commanders ? [...(localBattle.commanders.attackers || []), ...(localBattle.commanders.defenders || [])] : baseContent?.commanders || [],
    participants: localBattle?.factions ? [...(localBattle.factions.attackers || []), ...(localBattle.factions.defenders || [])] : baseContent?.participants || [],
    outcome: localBattle?.attackerOutcome ? `Attacker ${localBattle.attackerOutcome}` : baseContent?.outcome || 'Unknown',
    significance: baseContent?.significance || `Attackers: ${localBattle?.attackerSize || 'Unknown'}, Defenders: ${localBattle?.defenderSize || 'Unknown'}`,
    legacy: baseContent?.legacy || ''
  };
};