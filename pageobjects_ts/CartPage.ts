import {test, expect, Locator, Page} from '@playwright/test'

export class CartPage {

    checkoutButton: Locator;
    page: Page;

    constructor(page: any) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");

    }

    async checkout() {
       
        await this.checkoutButton.click(); // click on check out

    }




}

//module.exports = { CartPage };