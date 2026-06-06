# Character Image Audit (v2)

* **Total Characters (from processed data):** 2580
* **Characters with Portraits:** 80
* **Characters Missing Portraits:** 2500
* **Broken Portrait URLs:** 0
* **Mapping Failures:** 2500

## Notes
The ThronesAPI provides portraits for a small subset of the 2580 characters known to the realm. The current mapping logic matches by `fullName` or `firstName` (ignoring case). A massive discrepancy (2500) is expected because the local dataset is an exhaustive catalogue of every minor character, whereas the public ThronesAPI only covers major characters (~53).

### Required Fixes
1. In `contentService.js`, `firstName` matching is too broad. For instance, a minor character named "Jon (some guard)" will erroneously match the API portrait for "Jon Snow" because they share a first name. The matching must be strict on `fullName` or highly confident substrings.
