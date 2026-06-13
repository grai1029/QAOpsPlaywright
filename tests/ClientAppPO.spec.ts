
 import {test, expect} from '@playwright/test'
// import { CartPage } from '../pageobjects_ts/CartPage';
// import { OrdersReviewPage } from '../pageobjects_ts/OrdersReviewPage';
// import { POManager } from '../pageobjects_ts/POManager';
// import { customtest } from '../utils/test-base';

// //JSON->String->Js Object
// const dataset = JSON.parse(JSON.stringify(import('../utils/placeorderTestData.json')));

// for (const data of dataset) {
//    test.skip(`Client App login for ${data.productName}`, async ({ page }) => { // runs twice with different test data name
//       //js file- Login js, DashboardPage
//       const poManager = new POManager(page);
//       const loginPage = poManager.getLoginPage(); // grabs object of LoginPage Class using POManager object
//       await loginPage.goTo();
//       await loginPage.validLogin(data.username, data.password);
//       const dashboardPage = poManager.getDashboardPage(); // grabs object of Dashboard Class using POManager object
//       await dashboardPage.searchProductAddCart(data.productName);
//       await dashboardPage.navigateToCart();
//       const cartPage = new CartPage(page);
//       await cartPage.checkout();
//       const ordersReviewPage = new OrdersReviewPage(page);
//       await ordersReviewPage.submitAndGetOrderId();

//       //Order Confirmation Page:
//       await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assertion Confirmation page is displayed
//       const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();//Parent and Child class used. Captures Order
//       console.log(orderId);
//       const prod = await page.locator("[class='title']").first().textContent(); //  ZARA COAT 3
//       //await page.pause();
//       console.log(prod);
//       expect(page.locator("[class='title']").first()).toHaveText(data.productName);

//       //Orders List page:
//       await page.locator("button[routerlink*='myorders']").click(); // click on ORDERS tab in orderc onfirmation page
//       await page.locator("tbody").waitFor(); // table body - tbody wait for table to load as it takes time to load
//       const rows = await page.locator("tbody tr"); // table row - tr. Returns number of rows in table
//       for (let i = 0; i < await rows.count(); ++i) {
//          const rowOrderId = await rows.nth(i).locator("th").textContent(); // grabs content from 1st column(th)
//          if (orderId.includes(rowOrderId)) {
//             await rows.nth(i).locator("button").first().click(); // here button is tagname. Clicks View button open Order Summary
//             break;
//          }
//       }

//       //Order Summary page:
//       const orderIdDetails = await page.locator(".col-text").textContent(); // Captures Oder no from Order Summary page
//       expect(orderId.includes(orderIdDetails)).toBeTruthy(); // orderId.includes(orderIdDetails)) returns true
//       const country = await page.locator(".text").last().textContent();
//       console.log(country); // Country - India 
//       const arrayText = country.split("-"); //   0 place - Country, 1 place - India
//       const text1 = arrayText[1].trim(); //India
//       console.log(text1);
//       const text2 = await page.locator(".text").last().textContent()
//       expect(text2.includes(text1)); //Self practice
//    });

// }


//  customtest(`Client App login`, async ({ page,testDataForOrder }) => { 
//       //js file- Login js, DashboardPage
//       const poManager = new POManager(page);
//       const loginPage = poManager.getLoginPage(); // grabs object of LoginPage Class using POManager object
//       await loginPage.goTo();
//       await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
//       const dashboardPage = poManager.getDashboardPage(); // grabs object of Dashboard Class using POManager object
//       await dashboardPage.searchProductAddCart(testDataForOrder.productName);
//       await dashboardPage.navigateToCart();
//       const cartPage = new CartPage(page);
//       await cartPage.checkout();
//       const ordersReviewPage = new OrdersReviewPage(page);
//       await ordersReviewPage.submitAndGetOrderId();

//       //Order Confirmation Page:
//       await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assertion Confirmation page is displayed
//       const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();//Parent and Child class used. Captures Order
//       console.log(orderId);
//       const prod = await page.locator("[class='title']").first().textContent(); //  ZARA COAT 3
//       //await page.pause();
//       console.log(prod);
//       expect(page.locator("[class='title']").first()).toHaveText(testDataForOrder.productName);

//       //Orders List page:
//       await page.locator("button[routerlink*='myorders']").click(); // click on ORDERS tab in orderc onfirmation page
//       await page.locator("tbody").waitFor(); // table body - tbody wait for table to load as it takes time to load
//       const rows = await page.locator("tbody tr"); // table row - tr. Returns number of rows in table
//       for (let i = 0; i < await rows.count(); ++i) {
//          const rowOrderId = await rows.nth(i).locator("th").textContent(); // grabs content from 1st column(th)
//          if (orderId.includes(rowOrderId)) {
//             await rows.nth(i).locator("button").first().click(); // here button is tagname. Clicks View button open Order Summary
//             break;
//          }
//       }

//       //Order Summary page:
//       const orderIdDetails = await page.locator(".col-text").textContent(); // Captures Oder no from Order Summary page
//       expect(orderId.includes(orderIdDetails)).toBeTruthy(); // orderId.includes(orderIdDetails)) returns true
//       const country = await page.locator(".text").last().textContent();
//       console.log(country); // Country - India 
//       const arrayText = country.split("-"); //   0 place - Country, 1 place - India
//       const text1 = arrayText[1].trim(); //India
//       console.log(text1);
//       const text2 = await page.locator(".text").last().textContent()
//       expect(text2.includes(text1)); //Self practice
//    });