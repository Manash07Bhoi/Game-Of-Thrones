# Broken Image Audit

Using Playwright, we scraped all image network requests across the application to detect 404 broken images or images loading as 0px natural width.

## Results
* The original repository had hardcoded paths like `/images/one.jpg` which failed on GitHub pages.
* We verified that `import.meta.env.BASE_URL` is now properly prepended across `HouseCard.jsx`, `Houses.jsx`, and `Hero.jsx`.
* All six original image sigils (`one.jpg` through `six.jpg`) load with HTTP 200/304 statuses on the `Houses` page.
* ThronesAPI images (e.g., `daenerys.jpg`) load correctly.

**Zero broken images were detected.**
