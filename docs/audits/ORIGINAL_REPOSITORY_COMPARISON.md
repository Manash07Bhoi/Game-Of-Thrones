# Original Repository Comparison Audit

We compared the original `https://github.com/divyashrma18/GOT` repository against the current modified repository to trace where static assets were meant to be used and verify missing features.

## Files Assessed

### Components & Pages
* **Original `Hero.jsx`:** The original `Hero.jsx` is extremely intricate, driving a robust scroll-based animation for multiple sections (`CHAPTERS`) that seems to have been either heavily refactored or simplified in the current iteration.
* **Original `Section1.jsx`:** Contained hard-coded `HOUSES` data with static links to `/images/one.jpg`, `two.jpg`, `three.png`, etc., as well as house descriptions and words.
* **`Houses.jsx`, `Characters.jsx`, `Battles.jsx`, `Lore.jsx`:** These did not exist in the original repository. The original repo appeared to be a single-page application mostly consisting of `App.jsx`, `Hero.jsx`, and `Section1.jsx`.

### Assets
* **Original `public/images/`:**
  * `one.jpg` (House Stark sigil backdrop)
  * `two.jpg` (House Lannister sigil backdrop)
  * `three.png` (House Targaryen sigil backdrop)
  * `four.webp` (House Baratheon sigil backdrop)
  * `five.jpg` (House Greyjoy sigil backdrop)
  * `six.jpg` (House Tyrell sigil backdrop)
* **Original `public/video/one.mp4`:** The immersive background loop for the Hero component.

## Conclusions
The reason these images (`one.jpg`, etc.) are failing to render or are missing in our current repo is because the static arrays inside `Section1.jsx` were deleted in favor of API fetching (the `mergeService.js` and `contentService.js` integrations). Our recent fixes restored these image mappings to `mergeService.js`, but we must guarantee they actually render in `Section1.jsx` or `HouseCard.jsx` without breaking.
