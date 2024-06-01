import { test, expect } from '@playwright/test';
test('Работоспособность странички и кнопок добавления в «Избранное»', async({page, browserName}) =>{
  const EMAIL = `${browserName}@mail.com`

  // Перенаправления
  await page.goto('http://localhost:5173', {timeout: 0});
  await page.waitForSelector('.cities__card');

  await page.locator('.place-card__bookmark-button').first().click();
  await page.waitForURL('http://localhost:5173/login');

  await page.goto('http://localhost:5173', {timeout: 0});
  await page.waitForSelector('.cities__card');

  await page.locator('.place-card__name').first().click();
  await page.waitForSelector('.page__main--offer');

  await page.locator('.offer__bookmark-button').first().click();
  await page.waitForURL('http://localhost:5173/login');

  await page.goto('http://localhost:5173/favorites');
  await page.waitForURL('http://localhost:5173/login');

  // Логин
  await page.goto('http://localhost:5173/login', {timeout: 0});

  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="password"]', 'password100');
  await page.click('button[type="submit"]');

  // Добавление на главной странице
  await page.waitForURL('http://localhost:5173');
  await page.waitForTimeout(300);

  const isFavVisible = await page.isVisible('.place-card__bookmark-button--active');
  if (isFavVisible) {
    await page.locator('.place-card__bookmark-button').first().click();
  }

  let locator = page.locator('.place-card__bookmark-button--active');
  await expect(locator).toHaveCount(0);

  await page.locator('.place-card__bookmark-button').first().click();
  await page.waitForSelector('.place-card__bookmark-button--active', {timeout: 5000})

  // На странице предложения
  await page.locator('.place-card__name').first().click();
  await page.waitForSelector('.offer__bookmark-button--active');

  // На странице «Избранное» убираем из избранного
  await page.goto('http://localhost:5173/favorites');
  await page.waitForSelector('.place-card__bookmark-button--active', {timeout: 5000})
  await page.locator('.place-card__bookmark-button').first().click();
  await page.waitForTimeout(300)

  // Возвращаемся на главную
  await page.goto('http://localhost:5173');
  locator = page.locator('.place-card__bookmark-button--active');
  await expect(locator).toHaveCount(0);

  // Переходим на страницу предложения и добавляем обратно
  await page.locator('.place-card__name').first().click();
  locator = page.locator('.offer__bookmark-button--active');
  await expect(locator).toHaveCount(0);

  await page.locator('.offer__bookmark-button').first().click();
  await page.waitForSelector('.offer__bookmark-button--active', {timeout: 5000})

})
