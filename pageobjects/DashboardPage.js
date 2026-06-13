class DashboardPage {

    constructor(page) {
        this.page = page,
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']")
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName) {
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

    async navigateToOrders() {

        await this.orders.click();
        await this.page.locator("tbody").waitFor();

    }

}

module.exports = { DashboardPage };
