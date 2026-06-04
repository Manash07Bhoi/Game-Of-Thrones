# Critical Issues Report

1.  **DOM Crash on Arrays (Critical)**
    *   `src/pages/Houses.jsx`, `src/pages/Analytics.jsx`, and `src/components/Section1.jsx` crash the application rendering engine completely.
    *   *Cause:* During the Data Authenticity sweep, fabricated arrays (like `house.famousMembers` and `house.timeline`) were scrubbed from the fallback data. The components attempt to `.map()` over these now `null` properties without optional chaining.

2.  **Blank Pages (High)**
    *   The `/lore` page is entirely empty.
    *   *Cause:* The `LORE_DATA` array was completely wiped because it was not backed by an API or processed dataset, violating the authenticity rule.

3.  **Empty Character Profiles (Medium)**
    *   98% of minor characters currently display "Biography unavailable."
    *   *Cause:* The algorithmic biography generator (which parsed house affiliations and spoken line counts into paragraphs) was deleted during the authenticity sweep.

*(Note: Per the Phase 12 instructions, these issues are documented but must NOT be automatically fixed during this phase).*