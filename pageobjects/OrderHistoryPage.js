class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr"); //return all rows
        this.orderIdDetails = page.locator(".col-text"); //Order Id from Details page
    }
    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor(); // wait for table to load
        const rows = await this.rows; // table row - tr. Returns number of rows in table
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent(); // grabs content from 1st column(th)
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click(); // here button is tagname. Clicks View button open Order Details page
                break;
            }
        }
    }

    async getOrderId() {
        return await this.orderIdDetails.textContent(); //Order no from Details page


    }
}

module.exports = { OrderHistoryPage };

