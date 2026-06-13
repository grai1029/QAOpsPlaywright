const {test, expect} = require('@playwright/test')

//test.describe.configure({mode: 'parallel'}); // test cases run parallely
//test.describe.configure({mode: 'serial'}); // test case run sequentially

test(`@Web Popup validations`, async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    // Assert Hidden Element:
    await expect(page.locator("#displayed-text")).toBeVisible(); //
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    //Java Popup Example:
    await page.on('dialog',dialog => dialog.accept()); // syntax to handle dialog box and click on OK btn
    await page.locator("#confirmbtn").click();
    //Mouse Hover example:
    await page.locator("#mousehover").hover(); // method for mouse hover
    //Frames example:
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]); // Join 13,522 Happy Subscibers!
})

test.skip("Screenshot & Visual Comaprision", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible(); 
    await page.locator("#displayed-text").screenshot({path: 'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: 'screenshot.png'});

});


test.skip("Visual Testing", async({page}) =>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});

