import { test, expect } from '@playwright/test';
test('Работоспособность формы отправки комментария', async({page}) =>{
  const TEXT = 'Текст для формы комментария длиной больше пятидесяти символов чтобы он наверняка прошёл';
  const RATING = 'perfect'

  await page.goto('http://localhost:5173', {timeout: 0});

  // Нет формы без входа
  await page.waitForSelector('.cities__card');
  await page.locator('.place-card__name').first().click();
  await page.waitForSelector('.page__main--offer');

  let isFormVisible = await page.isVisible('.reviews__form');

  expect(isFormVisible).toBeFalsy

  // Вход
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'mail@mail.com');
  await page.fill('input[name="password"]', 'password100');
  await page.click('button[type="submit"]');

  // Форма есть
  await page.waitForSelector('.cities__card');
  await page.locator('.place-card__name').first().click();
  await page.waitForSelector('.page__main--offer');

  isFormVisible = await page.isVisible('.reviews__form');
  expect(isFormVisible).toBeTruthy

  // Отправка комментария
  await page.fill('[name="review"]', TEXT);
  await page.getByTitle(RATING).click();

  await page.click('button[type="submit"]');

  await page.waitForResponse(
    (resp) => resp.url().includes('/comments') && resp.status() === 201
  );

  const reviewText = await page
      .locator('.reviews__text')
      .first()
      .textContent();
    const reviewAuthor = (await page
      .locator('.reviews__user-name')
      .first()
      .textContent())
      ?.trim();
    const reviewRating = await page
      .locator('.reviews__stars')
      .first().locator('span').first()
      .getAttribute('style');

    expect(reviewText).toBe(TEXT);
    expect(reviewAuthor).toBe('mail');
    expect(reviewRating).toBe('width: 100%;')
})
