


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const customerId = event.pathParameters.customerId;
    const customer = {'customerID': customerId, 'customerName': "CustomerN"+ customerId};


return {
    statusCode: 200,
 headers: {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Headers": "*",
     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, X-Content-Type-Options:nosniff, Accept,Authorization",
     "Access-Control-Allow-Methods":"GET, POST, PUT, PATCH, DELETE, OPTIONS"
 }, 
    body: JSON.stringify(customer),
};
};
