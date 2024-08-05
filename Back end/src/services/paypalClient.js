const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
    let clientId = 'YOUR_SANDBOX_CLIENT_ID'; // Replace with your actual client ID
    let clientSecret = 'YOUR_SANDBOX_CLIENT_SECRET'; // Replace with your actual client secret
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };