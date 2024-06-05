import { test, expect, Locator } from '@playwright/test';

test('Работоспособность перехода по карточкам', async({page}) =>{
  await page.goto('http://localhost:5173', {timeout: 0});
  await page.waitForResponse((resp) => resp.url().includes('/offers') && resp.status() === 200);

  let card = await page.locator('.place-card').first();

  const id = await card.getAttribute('data-id')

  await page.locator('.place-card__name').first().click()

  await page.waitForSelector('.page__main--offer');

  expect(page.url()).toContain(id)
})
