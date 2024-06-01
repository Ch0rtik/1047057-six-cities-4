import { test, expect } from '@playwright/test';

test('Загрузка данных карточек с сервера', async({page}) =>{
  await page.goto('http://localhost:5173', {timeout: 0});

  await page.waitForResponse((resp) => resp.url().includes('/offers') && resp.status() === 200);

  const cards = await page.locator('.place-card').all();

  // При корректной загрузке, на главной странице должны отобразиться 20 карточек

  expect(cards.length).toEqual(20);
})
