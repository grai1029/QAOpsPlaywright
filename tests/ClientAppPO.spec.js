const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const {customtest} = require('../utils/test-base')

//JSON->String->Js Object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for (const data of dataset) {
   test(`Client App login for ${data.productName}`, async ({ page }) => { // runs twice with different test data name
      //js file- Login js, DashboardPage
      const poManager = new POManager(page);

      const loginPage = poManager.getLoginPage(); // grabs object of LoginPage Class using POManager object
      await loginPage.goTo();
      await loginPage.validLogin(data.username, data.password);

      const dashboardPage = poManager.getDashboardPage(); // grabs object of Dashboard Class using POManager object
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.verifyProductIsDisplayed(data.productName);
      await cartPage.checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect();
      const orderId = await ordersReviewPage.submitAndGetOrderId();
      console.log(orderId);

      await dashboardPage.navigateToOrders();
      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

   });

}


 customtest(`Client App login`, async ({ page,testDataForOrder }) => {  //Fixture example
      //js file- Login js, DashboardPage
      //js file- Login js, DashboardPage
      const poManager = new POManager(page);

      const loginPage = poManager.getLoginPage(); // grabs object of LoginPage Class using POManager object
      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

      const dashboardPage = poManager.getDashboardPage(); // grabs object of Dashboard Class using POManager object
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
      await cartPage.checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect();
      const orderId = await ordersReviewPage.submitAndGetOrderId();
      console.log(orderId);
      await dashboardPage.navigateToOrders();

      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
   });