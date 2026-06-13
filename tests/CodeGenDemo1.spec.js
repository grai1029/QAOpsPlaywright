import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.getByRole('combobox', { name: 'Search' }).fill('rahul shetty academy');
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Drahul%2Bshetty%2Bacademy%26sca_esv%3Dd915882ffb3cd600%26source%3Dhp%26ei%3DWUH6aKi-D6aTseMPw9mL4Qw%26iflsig%3DAOw8s4IAAAAAaPpPaXCje7cHynPtEjQ5MY72QlMF3-vx%26ved%3D0ahUKEwjozpC9ybqQAxWmSWwGHcPsIswQ4dUDCBA%26uact%3D5%26oq%3Drahul%2Bshetty%2Bacademy%26gs_lp%3DEgdnd3Mtd2l6IhRyYWh1bCBzaGV0dHkgYWNhZGVteTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIqztQAFjQL3AAeACQAQCYAZcCoAH3GaoBBjIuMTMuNbgBA8gBAPgBAZgCFKAChRvCAg4QLhiABBixAxjHARjRA8ICCBAAGIAEGLEDwgILEC4YgAQYsQMYgwHCAgUQLhiABMICERAuGIAEGLEDGIMBGMcBGNEDwgIIEC4YgAQYsQPCAggQLhixAxiABMICCxAAGIAEGLEDGIMBwgILEAAYgAQYigUYsQPCAgsQLhiABBjHARivAZgDAJIHBjIuMTIuNqAHl80BsgcGMi4xMi42uAeFG8IHCDAuMS4xNy4yyAdn%26sclient%3Dgws-wiz%26sei%3DZkH6aM3iCLnKseMP0PmswA4&q=EgQxzzMHGOaC6ccGIjDX1i-2df6ZKy5QZcVSFj9tkD0_hVPqXnKkdGH1tqgnTd088xov8ROWV5nNQZIJEkwyAVJaAUM');
  await page.locator('iframe[name="a-7q2aw6tzb89q"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-7q2aw6tzb89q"]').contentFrame().locator('[id="\\31 0"]').click();
  await page.locator('iframe[name="c-7q2aw6tzb89q"]').contentFrame().locator('[id="\\31 3"]').click();
  await page.locator('iframe[name="c-7q2aw6tzb89q"]').contentFrame().locator('[id="\\31 4"]').click();
  await page.locator('iframe[name="c-7q2aw6tzb89q"]').contentFrame().locator('[id="\\31 5"]').click();
  await page.locator('iframe[name="c-7q2aw6tzb89q"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.locator('#carousel-example-generic').getByRole('link', { name: 'JOIN NOW' }).click();
});

