import {test, expect, Locator, Page} from '@playwright/test'

export class DashboardPage {
    page: Page;
     products : Locator;
     productsText : Locator;
     cart  : Locator;

    constructor(page: any) {
        this.page = page,
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']")
    }

    async searchProductAddCart(productName: string) {
        await this.productsText.first().waitFor();
        const titles = this.productsText.allTextContents(); // Grabs name of products. b tagname
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) // Chaining concept
            {
                await this.products.nth(i).locator("text= Add To Cart").click(); // clicks on "add to cart". text Selector used
                break;
            }
            
        }


    }

    async navigateToCart() {

        await this.cart.click();
        await this.page.locator("div li").first().waitFor(); 

    }

}

//module.exports = { DashboardPage };