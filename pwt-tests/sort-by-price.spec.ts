import { test, expect } from '@playwright/test';

test('Работоспособность сортировки по ценам', async({page}) =>{
  await page.goto('http://localhost:5173', {timeout: 0});

  await page.waitForResponse((resp) => resp.url().includes('/offers') && resp.status() === 200);

  const buttons =  await page.locator('.locations__item').all();

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    await button.click()
    await page.waitForTimeout(50)


    // low to high

    await page.click('.places__sorting-type');
    await page.click('text="Price: low to high"');
    await page.waitForTimeout(100)

    const pricesLowToHigh = (
      await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => parseInt(price.replace('€', '').trim()));


    for (let j = 1; j < pricesLowToHigh.length; j++) {
      expect(pricesLowToHigh[j]).toBeGreaterThanOrEqual(pricesLowToHigh[j-1]);
    }


    // high to low

    await page.click('.places__sorting-type');
    await page.click('text="Price: high to low"');
    await page.waitForTimeout(100)

    const pricesHighToLow = (
      await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => parseInt(price.replace('€', '').trim()));


    for (let j = 1; j < pricesHighToLow.length; j++) {
      expect(pricesHighToLow[j]).toBeLessThanOrEqual(pricesHighToLow[j-1]);
    }
  }
})
