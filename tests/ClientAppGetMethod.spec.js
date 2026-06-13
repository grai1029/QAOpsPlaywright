const { test, expect } = require('@playwright/test');

test('@Get  Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "gyanendra.kulung.rai@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Sitl@651");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name :"Checkout"}).click();
   //Payment page(Place Order page):
   // await page.locator("[class='input txt']").first().fill("123");
   // await page.locator("[class='input txt']").nth(1).fill("Gyanendra Rai");
   // await page.locator("[name='coupon']").fill("rahulshettyacademy");
   // await page.getByRole("button",{name :"Apply Coupon"}).click();
   // expect(page.getByText("* Coupon Applied"));
   await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150}); 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
})