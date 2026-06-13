const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager'); //update path ../../
const { expect } = require('@playwright/test'); //removed test as its not used in BDD
const { playwright } = require('@playwright/test'); //added playwright for using to add browser

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const products = this.page.locator(".cart-body");
    const loginPage = this.poManager.getLoginPage(); // grabs object of LoginPage Class using POManager object
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {

    this.dashboardPage = this.poManager.getDashboardPage(); // grabs object of Dashboard Class using POManager object
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the Cart', async function (productName) {

    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkout();
});

When('Enter vaild details and Place the Order', async function () {

    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect();
    this.orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log("Order ID is " + this.orderId);
});

Then('Verify order is present in OrderHistory', async function () {
    await this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent()); //error message when wrong us and pwd
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
})
