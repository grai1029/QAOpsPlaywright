import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('india');
  await page.getByText('India').click();
  await page.getByText('I agree with the term &').click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByText('Please choose your delivery').click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
});