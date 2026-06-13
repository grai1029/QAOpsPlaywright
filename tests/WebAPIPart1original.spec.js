const { test, expect, request } = require('@playwright/test'); // request library(0bject) used for API
const loginPayLoad = { userEmail: "gyanendra.kulung.rai@gmail.com", userPassword: "Sitl@651" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;

test.beforeAll(async () => //runs before all test cases
{
    //Log in using API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        });
    expect(loginResponse.ok()).toBeTruthy(); // To check status code is Ok
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    //Create order using API call
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },

        })
    const orderResponseJson = await orderResponse.json(); //extract json response and store in orderResponseJson
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0]; //Grabs order number from Order Confirmation page (Thank You..)
    console.log(orderId);

}); //test case ends


test('@API Login with token only, Search Order Number in Orders page and see its details', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");  // Login page url, logs in directly
    await page.locator("button[routerlink*='myorders']").click(); // Click Orders tab
    await page.locator("tbody").waitFor(); // wait for table to load
    const rows = await page.locator("tbody tr"); //returns number of rows
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent(); //th denotes column 1
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click(); // Click View button
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();// extract Order number from Order Details page
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); //true orderId is created by API and compared with OrderId displayed in Orders page /view section


});
