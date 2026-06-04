import { test, expect } from '@playwright/test';

const ROUTES = [
  { name: 'Home', path: '?/' },
  { name: 'Characters', path: '?/characters' },
  { name: 'CharacterDetail', path: '?/characters/char_jon-snow' },
  { name: 'Houses', path: '?/houses' },
  { name: 'HouseDetail', path: '?/houses/house_house-stark' },
  { name: 'Battles', path: '?/battles' },
  { name: 'BattleDetail', path: '?/battles/battle_battle-of-the-bastards' },
  { name: 'Episodes', path: '?/episodes' },
  { name: 'Seasons', path: '?/seasons' },
  { name: 'Locations', path: '?/locations' },
  { name: 'Analytics', path: '?/analytics' },
  { name: 'DataDashboard', path: '?/data' },
  { name: 'Scripts', path: '?/scripts' }
];

test.describe('Comprehensive Product Audit', () => {

  for (const route of ROUTES) {
    test(`Visual Audit: ${route.name}`, async ({ page }) => {
      // Navigate to the route
      const response = await page.goto(route.path);

      // Basic Data Integrity & Routing Check
      expect(response?.status()).toBeLessThan(400);

      // Give the page time to hydrate and animate GSAP elements if any exist
      await page.waitForTimeout(1000);

      // Capture screenshot for manual review of UI/UX, Design, and Spacing
      await page.screenshot({ path: `screenshots-audit/${page.context().browser()?.browserType().name()}-${route.name}.png`, fullPage: true });
    });
  }

  test('Navigation Audit: Mobile Menu', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();
    await page.goto('?/');
    await page.waitForTimeout(500);

    const menuBtn = page.locator('.got-mobile-menu-btn');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots-audit/Mobile-Menu-Open.png` });
    }
  });

  test('Navigation Audit: Search Overlay', async ({ page, isMobile }) => {
    if (isMobile) test.skip();
    await page.goto('?/');
    await page.waitForTimeout(500);

    // Find the global search button via text
    const searchBtn = page.getByRole('button', { name: /search/i });
    if (await searchBtn.isVisible()) {
      await searchBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots-audit/Desktop-Search-Overlay.png` });
    }
  });

});