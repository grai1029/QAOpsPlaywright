import { test, expect, Locator, Page } from '@playwright/test'
export class OrdersReviewPage {
    page: Page
    textField: Locator;
    coupanTextField: Locator;
    coupanApplyButton: Locator;
    coupanDisplayed: Locator;
    countryTextField: Locator;
    countyDropdown: Locator;
    labelText: Locator;
    placeOrderButton: Locator;

    constructor(page: any) {
        this.page = page;
        this.textField = page.locator("[class='input txt']");
        this.coupanTextField = page.locator("[name='coupon']");
        this.coupanApplyButton = page.locator("[type='submit']");
        this.coupanDisplayed = page.locator("text=* Coupon Applied");
        this.countryTextField = page.locator("[placeholder*='Country']");
        this.countyDropdown = page.locator(".ta-results");
        this.labelText = page.locator(".user__name [type='text']");
        this.placeOrderButton = page.locator(".action__submit");

    }

    async submitAndGetOrderId() {

        await this.countryTextField.pressSequentially("ind", { delay: 150 });
        const dropdown = this.countyDropdown;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {

            const text = await dropdown.locator("button").nth(i).textContent(); //Use of loop and condition for selecting single element from list of elements
            if (text === " India") {
                await dropdown.locator("button").nth(i).click(); // clicks India from dropdown
                break;
            }
        }
        //expect(this.labelText.first()).toHaveText(username); // checking email. locator(css css)
        await this.placeOrderButton.click(); // click on place order button

    }

}
