require("dotenv").config();

const Payment = require("../models/Payment");
const {
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  handleInvoicePaymentSucceeded,
} = require("../utils/StripeWebhooks");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY);
const { DateTime, Duration } = require("luxon");

const [lite, pro, business, ai_credit] = [
  "price_1O2EtpF5tWWOGM6I0szZirTo",
  "price_1O2EwjF5tWWOGM6IizCUqvut",
  "price_1O2Ep3F5tWWOGM6IXCusa2VB",
  "price_1O2FB9F5tWWOGM6Iey4mojug",
];

const [lite_test, pro_test, business_test, ai_credit_test] = [
  "price_1O6Ug9F5tWWOGM6IzVp5TkjE",
  "price_1O6UhkF5tWWOGM6I6QiscDcM",
  "price_1O6UirF5tWWOGM6IwkI73sK1",
  "price_1O6UjtF5tWWOGM6IUWYbv6lk",
];
exports.addCustomer = async (req, res) => {
  try {
    const payment = { userId: req.user.id, ...req.body };

    const newPayment = new Payment({ ...payment });
    await newPayment.save();
    return res.status(200).json({ success: true, payment: newPayment._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.webHookStripe = async (req, res) => {
  try {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.header("Stripe-Signature"),
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    console.log("====================================");
    console.log("event.type ====>>>", event.type);
    console.log("====================================");
    const dataObject = event.data.object;
    console.log("====================================");
    console.log("dataObject --->", dataObject);
    console.log("====================================");
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(dataObject);
        res.json({ received: true });
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(dataObject);
        res.json({ received: true });
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(dataObject);
        res.json({ received: true });
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(dataObject);
        res.json({ received: true });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("====================================");
    console.log("error in webhook ===>", error);
    console.log("====================================");
    res.json({ received: false });
  }
  // Return a response to acknowledge receipt of the event
};

const stripeSessionForPackages = async (planId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return session;
  } catch (error) {
    return error;
  }
};

const stripeSessionForAICredits = async (quantity) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI-credits",
            },
            unit_amount: 4,
          },
          quantity: quantity,
        },
      ],
      success_url: "http://localhost:3000/success?aicredits=true",
      cancel_url: "http://localhost:3000/cancel?aicredits=false",
    });
    return session;
  } catch (error) {
    return error;
  }
};

exports.subscribe = async (req, res) => {
  try {
    const { planPrice } = req.body;
    const user = req.user;
    let planId = null;
    let planType = "";
    if (planPrice == "9.99") {
      planId = lite_test;
      planType = "lite";
    } else if (planPrice == "23.99") {
      planId = pro_test;
      planType = "pro";
    } else if (planPrice == "47.99") {
      planId = business_test;
      planType = "business";
    }
    console.log("====================================");
    console.log("planPrice --->", planPrice);
    console.log("====================================");
    const session = await stripeSessionForPackages(planId);
    console.log("====================================");
    console.log("session --->", session);
    console.log("====================================");
    const payment = new Payment({
      userId: user.id,
      subscription: {
        sessionId: session.id,
        status: "",
        planId: planId,
        planType: planType,
        startDate: "",
        willExpireOn: "",
        durationInDays: "",
      },
    });
    await payment.save();
    return res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    var payment = await Payment.findOne({ userId: req.user.id }, null, {
      sort: {
        _id: -1,
      },
    });

    const session = await stripe.checkout.sessions.retrieve(
      payment.subscription.sessionId
    );
    console.log("====================================");
    console.log("session --->", session);
    console.log("====================================");
    if (session.payment_status === "paid" && session.subscription) {
      const subscriptionId = session.subscription;
      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        console.log("====================================");
        console.log("subscription ---->>", subscription);
        console.log("====================================");

        let planId = subscription.plan.id;
        let planType = "";
        if (subscription.plan.amount === 11988) {
          planType = "lite";
        } else if (subscription.plan.amount === 28788) {
          planType = "pro";
        } else if (subscription.plan.amount === 57588) {
          planType = "business";
        }

        const startDate = DateTime.fromSeconds(
          subscription.current_period_start
        ).toLocaleString("YYYY-MM-DD");
        const endDate = DateTime.fromSeconds(
          subscription.current_period_end
        ).toLocaleString("YYYY-MM-DD");

        const durationInSeconds =
          (subscription.current_period_end -
            subscription.current_period_start) *
          1000;
        const durationInDays =
          Duration.fromMillis(durationInSeconds).as("days");
        payment.subscription.status = "paid";
        payment.subscription.sessionId = "";
        payment.subscription.planId = planId;
        payment.subscription.subscriptionId = subscriptionId;
        payment.subscription.startDate = startDate;
        payment.subscription.willExpireOn = endDate;
        payment.subscription.durationInDays = durationInDays;
        payment.subscription.customer = subscription.customer;
        payment.subscription.itemId = subscription.items.data[0].id;
        payment.markModified("subscription");
        await payment.save();
        return res.status(200).json({
          success: true,
          message: "Payment Successfull",
          package: payment.subscription.planType,
        });
      } catch (error) {
        return res.status(503).json({ success: false, error: error.message });
      }
    }
    // else {
    //   return res
    //     .status(200)
    //     .json({ success: false, message: "Payment Unsuccessfull" });
    // }
    else {
      planType = "ai-credits";
      const startDate = DateTime.now().toLocaleString("YYYY-MM-DD");
      const endDate = DateTime.now()
        .plus({ days: 365 })
        .toLocaleString("YYYY-MM-DD");
      payment.subscription.sessionId = "";
      payment.subscription.status = "paid";
      payment.subscription.planId = "";
      payment.subscription.planType = planType;
      payment.subscription.startDate = startDate;
      payment.subscription.willExpireOn = endDate;
      payment.subscription.durationInDays = 365;
      payment.markModified("subscription");
      await payment.save();
    }

    return res
      .status(200)
      .json({ success: true, message: "Payment Successfull" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.paymentSuccessCredits = async (req, res) => {
  try {
    var payment = await Payment.findOne({ userId: req.user.id }, null, {
      sort: {
        _id: -1,
      },
    });

    const session = await stripe.checkout.sessions.retrieve(
      payment.subscription.sessionId
    );
    console.log("====================================");
    console.log("session --->", session.payment_status);
    console.log("====================================");
    if (session.payment_status === "paid") {
      const startDate = DateTime.now().toLocaleString("YYYY-MM-DD");
      const endDate = DateTime.now()
        .plus({ days: 365 })
        .toLocaleString("YYYY-MM-DD");
      payment.subscription.sessionId = "";
      payment.subscription.status = "paid";
      payment.subscription.startDate = startDate;
      payment.subscription.willExpireOn = endDate;
      payment.subscription.durationInDays = 365;
      payment.markModified("subscription");
      await payment.save();
      return res.status(200).json({
        success: true,
        message: "Payment Successfull",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.buyAICredits = async (req, res) => {
  try {
    const credits = req.body.noOfCredits;
    const user = req.user;
    const session = await stripeSessionForAICredits(credits);
    const payment = new Payment({
      userId: user.id,
      subscription: {
        sessionId: session.id,
        status: "",
        planId: "",
        noOfCredits: credits,
        planType: "credits",
        startDate: "",
        willExpireOn: "",
        durationInDays: "",
      },
    });
    await payment.save();
    return res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      userId: req.user.id,
      "subscription.status": { $nin: ["expired", "cancelled"] },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
