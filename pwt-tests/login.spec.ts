import { test, expect } from '@playwright/test';

test('Работоспособность формы логина', async({page}) =>{
  await page.goto('http://localhost:5173/login', {timeout: 0});

  // Пароль бец цифр
  await page.fill('input[name="email"]', 'mail@mail.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);
  expect(page.url()).toBe('http://localhost:5173/login');

  // Пароль с цифрами
  await page.fill('input[name="email"]', 'mail@mail.com');
  await page.fill('input[name="password"]', 'password100');
  await page.click('button[type="submit"]');

  await page.waitForSelector('.page__main--index', {timeout: 3000});
  expect(page.url()).toBe('http://localhost:5173/');
})

