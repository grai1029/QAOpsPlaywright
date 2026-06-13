const {expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
        this.cartProducts = page.locator("div li").first();

    }

    async verifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    getProductLocator(productName) {

        return this.page.locator("h3:has-text('"+productName+"')"); // Product Name displayed in Cart page
    }

    async checkout() {
        await this.checkoutButton.click(); // click on check out

    }


}

module.exports = { CartPage };