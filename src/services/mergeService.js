const houseStyles = {
  stark: { bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)', accent: '#8fafc4', icon: '🐺', sigil_url: 'images/one.jpg' },
  lannister: { bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 100%)', accent: '#d4a84b', icon: '🦁', sigil_url: 'images/two.jpg' },
  targaryen: { bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 100%)', accent: '#c0392b', icon: '🐉', sigil_url: 'images/three.png' },
  baratheon: { bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 100%)', accent: '#c9a84c', icon: '🦌', sigil_url: 'images/four.webp' },
  greyjoy: { bg: 'linear-gradient(135deg, #050810 0%, #0a1020 100%)', accent: '#b8a040', icon: '🦑', sigil_url: 'images/five.jpg' },
  martell: { bg: 'linear-gradient(135deg, #1a0a00 0%, #2b1200 100%)', accent: '#d35400', icon: '☀️' },
  tyrell: { bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 100%)', accent: '#5a9e48', icon: '🌹', sigil_url: 'images/six.jpg' },
  arryn: { bg: 'linear-gradient(135deg, #0a141f 0%, #14283d 100%)', accent: '#a3c2d1', icon: '🦅' },
  tully: { bg: 'linear-gradient(135deg, #05141c 0%, #0a2938 100%)', accent: '#c0392b', icon: '🐟' },
  default: { bg: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)', accent: '#8a8a8a', icon: '♔' }
};

export const mergeCharacterData = (baseContent, apiChar, localData) => {
  // Determine house string for mapping
  const houseStr = (apiChar?.family || baseContent?.house || localData?.houseId || 'Unknown').toLowerCase();
  let styleKey = 'default';
  for (const key of Object.keys(houseStyles)) {
    if (houseStr.includes(key)) {
      styleKey = key;
      break;
    }
  }

  const { bg, accent, icon } = houseStyles[styleKey];

  const fullTitle = apiChar?.title || localData?.title || baseContent?.fullTitle || '';
  const titleLower = fullTitle.toLowerCase();
  let characterType = 'Commoner';
  if (titleLower.includes('king') || titleLower.includes('khal')) characterType = 'King';
  else if (titleLower.includes('queen') || titleLower.includes('khaleesi')) characterType = 'Queen';
  else if (titleLower.includes('lord')) characterType = 'Lord';
  else if (titleLower.includes('lady')) characterType = 'Lady';
  else if (titleLower.includes('ser ') || titleLower.includes('knight')) characterType = 'Knight';
  else if (titleLower.includes('maester')) characterType = 'Maester';

  return {
    id: localData?.id || apiChar?.id?.toString() || baseContent?.id || Math.random().toString(),
    name: apiChar?.fullName || localData?.name || baseContent?.name,
    fullTitle: fullTitle,
    image: apiChar?.imageUrl || baseContent?.image || null, // API image
    house: apiChar?.family || baseContent?.house || localData?.houseId?.replace('house_house-', 'House ').replace(/-/g, ' ') || 'Unknown House',

    // Add local dataset metadata if we have it
    popularity: localData?.popularity || null,
    spokenLineCount: localData?.spokenLineCount || 0,
    isAlive: localData?.isAlive ?? null,
    characterType,

    // Authentic Data Only
    biography: null, // Hardcoded static biographies scrubbed
    achievements: null,
    relationships: null,
    quote: null,

    // Thematic Styles
    bg: baseContent?.bg || bg,
    accent: baseContent?.accent || accent,
    sigilIcon: baseContent?.sigilIcon || icon,
    initials: (apiChar?.fullName || localData?.name || baseContent?.name || 'U N').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  };
};

export const mergeHouseData = (baseContent, apiHouse, localHouse) => {
  // apiHouse: An API of Ice and Fire
  // localHouse: public/data/houses.json
  // baseContent: static fallback

  const houseName = apiHouse?.name?.replace('House ', '') || localHouse?.name?.replace('House ', '') || baseContent?.name || 'Unknown';
  let styleKey = 'default';
  for (const key of Object.keys(houseStyles)) {
    if (houseName.toLowerCase().includes(key)) {
      styleKey = key;
      break;
    }
  }
  const { bg, accent, icon, sigil_url } = houseStyles[styleKey];

  return {
    ...baseContent,
    id: localHouse?.id || baseContent?.id || Math.random().toString(),
    name: houseName,
    words: (apiHouse?.words && apiHouse.words !== "None" && apiHouse.words !== "Unknown") ? `"${apiHouse.words}"` : (localHouse?.words ? `"${localHouse.words}"` : baseContent?.words),
    region: (apiHouse?.region && apiHouse.region !== "None" && apiHouse.region !== "Unknown") ? apiHouse.region : (localHouse?.region || baseContent?.region),
    seat: (apiHouse?.seats && apiHouse.seats[0] && apiHouse.seats[0] !== "None" && apiHouse.seats[0] !== "Unknown") ? apiHouse.seats[0] : (localHouse?.seat || baseContent?.seat),
    history: localHouse?.history || baseContent?.history || null,
    founder: localHouse?.founder || baseContent?.founder || null,
    famousMembers: localHouse?.famousMembers || baseContent?.famousMembers || [],

    // UI/Thematic properties
    bg: baseContent?.bg || bg,
    accent: baseContent?.accent || accent,
    sigil: baseContent?.sigil || icon,
    sigil_url: baseContent?.sigil_url || sigil_url || null
  };
};

export const mergeBattleData = (baseContent, localBattle) => {
  // localBattle is from processed-data battles.json
  // Authentic mapping only.
  return {
    id: localBattle?.id || Math.random().toString(),
    name: localBattle?.name,
    location: localBattle?.locationId?.replace('loc_', '')?.replace(/-/g, ' ') || baseContent?.location || 'Unknown Location',
    region: localBattle?.region || baseContent?.region || 'Unknown Region',
    year: localBattle?.year ? `${localBattle.year} AC` : baseContent?.year,
    battleType: localBattle?.battleType || baseContent?.battleType,
    commanders: localBattle?.commanders ? [...(localBattle.commanders.attackers || []), ...(localBattle.commanders.defenders || [])].map(c => c.replace('char_', '').replace(/-/g, ' ')) : baseContent?.commanders || [],
    participants: localBattle?.factions ? [...(localBattle.factions.attackers || []), ...(localBattle.factions.defenders || [])].map(f => f.replace('house_house-', 'House ').replace(/-/g, ' ')) : baseContent?.participants || [],
    outcome: localBattle?.attackerOutcome ? `Attacker ${localBattle.attackerOutcome}` : baseContent?.outcome,
    attackerSize: localBattle?.attackerSize || baseContent?.attackerSize,
    defenderSize: localBattle?.defenderSize || baseContent?.defenderSize,
    background: baseContent?.background || localBattle?.background || null,
    legacy: baseContent?.legacy || localBattle?.legacy || null,
    significance: baseContent?.significance || localBattle?.significance || null
  };
};