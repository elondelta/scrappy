import { test, expect } from '@playwright/test';
import { saveRawAd } from '../services/services'

test('Start', async ({ page }) => {
  await page.goto('https://ikman.lk/en/ad/luxury-5-bedrooms-house-for-sale-in-boralesgamuwa-for-sale-colombo-7');

  const price = await page.getByTestId('price').allTextContents();
  const datePosted = await page.getByText('Posted on').allTextContents();
  await page.getByRole('button', { name: 'Click to show phone number' }).click();
  const contactNumber = await page.locator('div:right-of(:text("Call seller"))').allTextContents();
  const Address = await page.locator('div:right-of(:text("Address:"))').allTextContents();
  const Bedroom = await page.locator('div:right-of(:text("Bedrooms:"))').allTextContents();
  const Bathroom = await page.locator('div:right-of(:text("Bathrooms:"))').allTextContents();
  const HouseSize = await page.locator('div:right-of(:text("House size: "))').allTextContents();
  const LandSize = await page.locator('div:right-of(:text("Land size: "))').allTextContents();

  const metaDescription = await page.locator('meta[name="description"]');
  const metaTitle = await page.locator('title');

  const windowValue = await page.evaluate(() => {
    // Access window variable
    return window.initialData;
});
saveRawAd('./', windowValue)
console.log("done")

});