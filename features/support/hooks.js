
const { Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager'); //update path ../../
const  playwright = require('@playwright/test');

Before(async function () { // execute before each scenario(test case)
    const browser = await playwright.chromium.launch({ headless: false }); //extra step in cucu
    const context = await browser.newContext(); //extra step in cucu
    this.page = await context.newPage();  //extra step in cucu
    this.poManager = new POManager(this.page);
});


After(function () {
    console.log("I'am the last to execute");
});

BeforeStep({tags: "@foo"}, function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot12.png'});
  }
});