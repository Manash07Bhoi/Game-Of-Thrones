# API Integrations
1. **ThronesAPI**: Used primarily for character data (Names, Titles, Families, and Images). Endpoint: `https://thronesapi.com/api/v2/Characters`. Highly stable.
2. **An API of Ice and Fire**: Used primarily for deep House metadata (Seats, Regions, Words, Founders). Endpoint: `https://www.anapioficeandfire.com/api/houses`. Heavily paginated.
Both APIs are requested via their respective service files and passed through a normalization step to merge with local/fallback data to prevent UI breakage if the API is missing fields or rate-limits the user.