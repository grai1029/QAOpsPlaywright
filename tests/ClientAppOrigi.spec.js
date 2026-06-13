const { test, expect } = require('@playwright/test');

test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "gyanendra.kulung.rai@gmail.com";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Sitl@651");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   //await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

})
