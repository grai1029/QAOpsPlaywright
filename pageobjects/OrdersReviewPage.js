const {expect } = require('@playwright/test');

class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.emailId = page.locator(".user__name [type='text']").first();
        this.countryTextField = page.locator("[placeholder*='Country']");
        this.countyDropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");// Order Id displayed in Thank you page

    }

    async searchCountryAndSelect() {

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
        // expect(this.emailId).toHaveText(username); // checking email. locator(css css)

    }

    async submitAndGetOrderId() {
        await this.placeOrderButton.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. "); // assertion Confirmation page is displayed
        const orderId = this.orderId.textContent(); //Parent and Child class used. Captures Order from Confirmation page/Thank yu page
        return orderId;

    }

}

module.exports = { OrdersReviewPage };