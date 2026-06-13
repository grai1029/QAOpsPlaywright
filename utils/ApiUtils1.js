class ApiUtils1 {
    constructor(apiContext, loginPayLoad) // Added in constructor since login and api context is mandatory
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }
    async getToken() {

        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data: this.loginPayLoad
            });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    loginAndGoToEvents(page) {

        let response = {}; // Created Object - We want to return multiple properties i.e orderId and token
        response.token = await this.getToken(); //token is stored in response object as response.token
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });


    }

}