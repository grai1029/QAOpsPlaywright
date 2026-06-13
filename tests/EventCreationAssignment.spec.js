const {test, expect} = require('@playwright/test');
test.skip('Event Creattion', async ({page})=>
{
 const email = "gyanendra.kulung.rai@gmail.com"   
 await page.goto("https://eventhub.rahulshettyacademy.com");
 await page.getByPlaceholder("you@email.com").fill(email);
 await page.getByLabel("Password").fill("Testing@1");
 await page.locator("#login-btn").click();
 await page.waitForLoadState('networkidle');
 console.log(await page.getByText("Discover & Book").isVisible());
 const dashboard = await page.getByText("Discover & Book").isVisible()
 expect(dashboard).toBeTruthy(); //Login Success check
 await page.getByRole('button', {name: "Admin"}).click();

})