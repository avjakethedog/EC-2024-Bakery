const paypalClient = require('./paypalClient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const createPayPalOrder = async (orderInfo) => {
    try {
        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: orderInfo.totalAmount // Make sure to replace with actual order amount
                }
            }]
        });

        const response = await paypalClient.client().execute(request);
        const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

        return {
            status: 'OK',
            message: 'PayPal order created successfully!',
            approvalUrl: approvalUrl, // Return the approval URL
            data: response.result
        };
    } catch (error) {
        return { status: 'ERROR', message: `${error.message}` };
    }
};


const capturePayPalOrder = async (orderinfo) => {
    try {
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderinfo.orderIdPaypal);
        request.requestBody({});

        const response = await paypalClient.client().execute(request);
        return {
            status: 'OK',
            message: 'PayPal order captured successfully!',
            data: response.result
        };
    } catch (error) {
        return { status: 'ERROR', message: `${error.message}` };
    }
};

module.exports = {
    createPayPalOrder,
    capturePayPalOrder
};