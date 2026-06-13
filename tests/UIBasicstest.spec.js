const { test, expect } = require('@playwright/test');

test('@Web Browser Context Playwright test', async ({ browser }) => {
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css', route => route.abort()); //blocks css response
    page.route('**/*.{jpg,png,jpeg}', route => route.abort()); //blocks image
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("test");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent()); //error message when wrong us and pwd
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    
    // type- fill()
    await userName.fill(""); // wipes out existing data
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());



});

test('Browser Context Playwright test assignment', async ({ browser }) => {
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const signIn = page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    await userName.fill("test");
    await page.locator("[type='password']").fill("Sitl@651");
    await signIn.click();
    await userName.fill("");
    await userName.fill("gyanendra.kulung.rai@gmail.com");
    await signIn.click();
    console.log(await page.locator(".card-body b").first().textContent());
    console.log(await page.locator(".card-body b").nth(1).textContent());



});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('UI controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title - assertion
    //const userName = page.locator("#username");
    // const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click(); // popup
    console.log(await page.locator(".radiotextsty").last().isChecked()); //returns "true" if checked
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); // Pass assertion
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked(); // returns Pass
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // if unchecked returns false. And we expect it to be false
    await expect(documentLink).toHaveAttribute("class", "blinkingTexts")
});


test('@Child windows handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page:pending,rejected,fulfilled
            documentLink.click(),

        ]) //new page is opened
    //"Please email us at mentor@rahulshettyacademy.com with below template to receive response"
    // we want - rahulshettyacademy.com
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const text1 = arrayText[1]; // rahulshettyacademy.com with....
    const arrayText2 = text1.split(" ");
    const domain = arrayText2[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    //await page.pause();
    console.log(await page.locator("#username").inputValue());
})