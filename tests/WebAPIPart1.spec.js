const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils') // import ApiUtils class
const loginPayLoad = { userEmail: "gyanendra.kulung.rai@gmail.com", userPassword: "Sitl@651" };
const orderPayLoad = { orders: [{ country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response; //stores return values from createorder() in later

test.beforeAll(async () =>  // Calls CreateOrder() which returns token and orderid
{
   const apiContext = await request.newContext();
   const apiUtils = new ApiUtils(apiContext, loginPayLoad); //Create ApiUtils Class object. Triggers constructor in ApiUtils class
   response = await apiUtils.createOrder(orderPayLoad); // Creates order and returns orderId and token
});

//Test Case - Create Order with success, Get token and orderid from ApiUtils.js
test('@API Created Order in ApiUtils class is displayed in Orders list page', async ({ page }) => {
   await page.addInitScript(value => { //Bypass login
      window.localStorage.setItem('token', value) //playwright adds token in window section
   }, response.token);

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("button[routerlink*='myorders']").click(); //click on Orders tab
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {    //orderID created by Create Order method is matching in Orders page
         await rows.nth(i).locator("button").first().click(); // Click on VIEW button
         break;
      }

   }
   const orderIdDetails = await page.locator(".col-text").textContent(); // Grabs orderID in Order Details page
   //await page.pause();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy(); // orderID used here
});
