const base = require('@playwright/test');
exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "gyanendra.kulung.rai@gmail.com",
            password: "Sitl@651",
            productName: "ZARA COAT 3"

        }
    }
)
