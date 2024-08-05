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
                    currency_code: 'VND',
                    value: orderInfo.totalAmount // Make sure to replace with actual order amount
                }
            }]
        });

        const response = await paypalClient.client().execute(request);
        return {
            status: 'OK',
            message: 'PayPal order created successfully!',
            data: response.result
        };
    } catch (error) {
        return { status: 'ERROR', message: `${error.message}` };
    }
};

const capturePayPalOrder = async (orderId) => {
    try {
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
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