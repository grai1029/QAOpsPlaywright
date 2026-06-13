const {test, expect} = require('@playwright/test')
let webContext;

test.beforeAll( async({browser})=>
{
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("#userEmail").fill("gyanendra.kulung.rai@gmail.com");
 await page.locator("#userPassword").fill("Sitl@651")
 await page.locator("[value='Login']").click();
 await page.waitForLoadState('networkidle');
 await context.storageState({path: 'state.json'});
 webContext = await browser.newContext({storageState:'state.json'});

})

test('Test Case 1', async ()=> {

   const productName = 'ZARA COAT 3';
   // cut from here
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator(".card-body b").first().waitFor();
   const products = page.locator(".card-body");

   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name :"Checkout"}).click();
   //Payment page(Place Order page):
   await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150}); 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
})

test('Test Case 2', async ()=> {
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");
   const  titles = page.locator(".card-body b").allTextContents();
   console.log(titles);
})


test('Test Case 3', async ()=> {
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");
   const  titles = page.locator(".card-body b").allTextContents();
   console.log(titles);
})