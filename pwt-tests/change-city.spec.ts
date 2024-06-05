import { test, expect, Locator } from '@playwright/test';

test('Работоспособность фильтрации с городами', async({page}) =>{
  await page.goto('http://localhost:5173', {timeout: 0});
  await page.waitForResponse((resp) => resp.url().includes('/offers') && resp.status() === 200);

  let cards: Locator[] = await page.locator('.place-card').all();
  let previousIds = new Array<String | null>(cards.length)
  for (let i = 0; i < cards.length; i++) {
    previousIds[i] = await cards[i].getAttribute('data-id')
  }

  const buttons =  await page.locator('.locations__item').all();

  for (let i = 1; i < buttons.length; i++) {
    const button = buttons[i]
    await button.click()

    await page.waitForTimeout(50)

    for (let j = 0; j < cards.length; j++) {
      const card = cards[j]
      const newId = await card.getAttribute('data-id')

      // При смене города у новых карточек должны быть другие id
      expect(newId).not.toEqual(previousIds[i])

      previousIds[i] = newId;
    }
  }
})
