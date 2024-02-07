import { test, expect } from '@playwright/test';
import { saveRawAd,getHouseAdDetailsFromRawAd, creaeteCSVReport } from '../services/services'
import type { House } from '../services/services'


test('Start', async ({ page }) => {
  // await page.goto('https://ikman.lk/en/ad/luxury-5-bedrooms-house-for-sale-in-boralesgamuwa-for-sale-colombo-7');

  // const price = await page.getByTestId('price').allTextContents();
  // const datePosted = await page.getByText('Posted on').allTextContents();
  // await page.getByRole('button', { name: 'Click to show phone number' }).click();
  // const contactNumber = await page.locator('div:right-of(:text("Call seller"))').allTextContents();
  // const Address = await page.locator('div:right-of(:text("Address:"))').allTextContents();
  // const Bedroom = await page.locator('div:right-of(:text("Bedrooms:"))').allTextContents();
  // const Bathroom = await page.locator('div:right-of(:text("Bathrooms:"))').allTextContents();
  // const HouseSize = await page.locator('div:right-of(:text("House size: "))').allTextContents();
  // const LandSize = await page.locator('div:right-of(:text("Land size: "))').allTextContents();

  // const metaDescription = await page.locator('meta[name="description"]');
  // const metaTitle = await page.locator('title');

//   const windowValue = await page.evaluate(() => {
//     // Access window variable
//     return window.initialData;
// });
// saveRawAd('./', windowValue)

// scrapePage()
let house, housese = []
for(let i =1; i++; i<=2){
  await page.goto(`https://ikman.lk/en/ads/colombo/houses-for-sale?sort=date&order=desc&buy_now=0&urgent=0&page=${i}`)
  const windowValue = await page.evaluate(() => {
    // Access window variable
    return window.initialData;
  });
  
  const ads = windowValue.serp.ads.data.ads as any[]
  for(const ad of ads){
    const url = `https://ikman.lk/en/ad/${ad.slug}`
    console.log(`scraping ${url}`)
    house = await scrapePage(page, url)
  
  }
  housese.push(house)
  
}
creaeteCSVReport('./', housese)
console.log("done")

});


async function scrapePage(page, url): Promise<House> {
  await page.goto(url);
  const windowValue = await page.evaluate(() => {
    // Access window variable
    return window.initialData;
  });
  const house = getHouseAdDetailsFromRawAd(windowValue);
  return house;
}