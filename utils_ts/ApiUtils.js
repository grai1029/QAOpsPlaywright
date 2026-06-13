class ApiUtils //used in WebAPIPart1.spec.js. This has methods to create token and create order
{
constructor(apiContext, loginPayLoad) //  apicontext & login payload used to get token which come from main file
{
 this.apiContext = apiContext; 
 this.loginPayLoad = loginPayLoad;
}

async getToken() //used in createorder()
{
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
     data: this.loginPayLoad
    });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
}

async createOrder(orderPayLoad)
{ 
    let response ={}; // Create Object - We want to return multiple properties i.e orderId and token stored in respone
    response.token = await this.getToken(); //token is stored in response object as response.token
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
{
    data : orderPayLoad,
    headers :{
        'Authorization': response.token,
        'Content-Type' :'application/json'
    }
});
const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
const orderId = orderResponseJson.orders[0]
response.orderId = orderId; // order is stored in response object as response.orderId
return response; // response is object which has 2 properties (response.token and response.orderId)
}

}
module.exports = {ApiUtils}; // Makes this class available publicly