import { expect, type Locator, type Page } from '@playwright/test';
let message1 : string = "Hi";
message1 = "bye";
console.log(message1);
let age1 : number = 30;
console.log(age1);
let isActive : boolean = false;
let numberArry : number[] = [1,2,3];
let data: any = "this could be anything";
data = 42;


class CartPage {
    page: Page; // import see above
    checkoutButton: Locator; // return type is locator

    constructor(page: any) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");

    }

    async checkout() {
        //const bool = await this.page.locator("h3:has-text('"+productName"')").isVisible();
        //expect(bool).toBeTruthy();
        await this.checkoutButton.click(); // click on check out

    }
}