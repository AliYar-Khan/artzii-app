const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY);

exports.handleSubscriptionCreated = async (data) => {};
exports.handleSubscriptionDeleted = async (data) => {};
exports.handleSubscriptionUpdated = async (data) => {};
exports.handleInvoicePaymentSucceeded = async (data) => {};
