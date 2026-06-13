const { test, expect } = require('@playwright/test');

test.skip('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "gyanendra.kulung.rai@gmail.com"; // used for login and assertion later
   const productName = 'ZARA COAT 3'; // used in for loop and if condition later
   const products = page.locator(".card-body"); // returns all products in page
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Sitl@651");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents(); // Grabs name of products. b tagname
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) // Chaining concept
      {
         await products.nth(i).locator("text= Add To Cart").click(); // clicks on "add to cart". text Selector used
         break;
      }
      //await page.pause();
   }

   await page.locator("[routerlink*='cart']").click(); // click on Cart tab
   //await page.pause();
   await page.locator("div li").first().waitFor(); // waits for first order in cart page to display.
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // h3 tagname. Returns true
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click(); // click on check out

   //Payment page(Place Order page):
   //   await page.locator("[class='input txt']").first().fill("123");
   //   await page.locator("[class='input txt']").nth(1).fill("Gyanendra Rai");
   //   await page.locator("[name='coupon']").fill("rahulshettyacademy");
   //   await page.locator("[type='submit']").click(); //click on apply
   //   expect(page.locator("text=* Coupon Applied")).toHaveText("* Coupon Applied"); //check if applied coupan is displayed
   //   await page.pause();
   //await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) //does not work
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {

      const text = await dropdown.locator("button").nth(i).textContent(); //Use of loop and condition for selecting single element from list of elements
      if (text === " India") {
         await dropdown.locator("button").nth(i).click(); // clicks India from dropdown
         break;
      }
   }
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // checking email. locator(css css)
   await page.locator(".action__submit").click(); // click on place order button

   //Order Confirmation Page:
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assertion Confirmation page is displayed
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();//Parent and Child class used. Captures OrderId from Confirmation page
   console.log(orderId);
   const prod = await page.locator("[class='title']").first().textContent(); //  ZARA COAT 3
   //await page.pause();
   console.log(prod);
   expect(page.locator("[class='title']").first()).toHaveText(productName);

   //Orders List page:
   await page.locator("button[routerlink*='myorders']").click(); // click on ORDERS tab in orderc onfirmation page
   await page.locator("tbody").waitFor(); // table body - tbody wait for table to load as it takes time to load
   const rows = await page.locator("tbody tr"); // table row - tr. Returns number of rows in table
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent(); // grabs content from 1st column(th)
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click(); // here button is tagname. Clicks View button open Order Summary
         break;
      }
   }

   //Order Summary page:
   const orderIdDetails = await page.locator(".col-text").textContent(); // Captures Oder No from Order View/Details page
   expect(orderId.includes(orderIdDetails)).toBeTruthy(); // orderId.includes(orderIdDetails)) returns true
   const country = await page.locator(".text").last().textContent();
   console.log(country); // Country - India 
   const arrayText = country.split("-"); //   0 place - Country, 1 place - India
   const text1 = arrayText[1].trim(); //India
   console.log(text1);
   //expect(await page.locator(".text").last().textContent()).toHaveText("text1");
});  
