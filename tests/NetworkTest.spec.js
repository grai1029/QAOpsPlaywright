const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayLoad = { userEmail: "gyanendra.kulung.rai@gmail.com", userPassword: "Sitl@651" };
const orderPayLoad = { orders: [{ country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test.skip('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");


  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //click on orders tab request
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);

      route.fulfill( //send repose to browser
        {
          response,
          body,

        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*") //Request context disposed error if not used

  console.log(await page.locator(".mt-4").textContent());


});