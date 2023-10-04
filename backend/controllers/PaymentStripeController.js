require("dotenv").config();

const Payment = require("../models/Payment");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY);
const { DateTime, Duration } = require("luxon");
const { createClient } = require("redis");

const [pro, business] = [
  "price_1NtcIbF5tWWOGM6IKDsRwONI",
  "price_1NtcJXF5tWWOGM6ILBfCtJ5o",
];

const [pro_test, business_test] = [
  "price_1Nx9PuF5tWWOGM6IJX58DSun",
  "price_1Nx9QTF5tWWOGM6IU05iQbyX",
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

const stripeSession = async (planId) => {
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

exports.subscribe = async (req, res) => {
  try {
    const { planPrice } = req.body;
    const user = req.user;
    let planId = null;
    console.log("====================================");
    console.log("planPrice, typeof --->>", planPrice, typeof planPrice);
    console.log("====================================");
    if (planPrice === 24) {
      planId = pro_test;
    } else {
      planId = business_test;
    }
    const session = await stripeSession(planId);

    console.log("====================================");
    console.log("session --->", session);
    console.log("====================================");
    const payment = new Payment({
      userId: user.id,
      subscription: {
        sessionId: session.id,
        status: "",
        planId: "",
        planType: "",
        startDate: "",
        willExpireOn: "",
        durationInDays: "",
      },
    });
    await payment.save();
    return res.json({ session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const client = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    var payment = await Payment.findOne({ userId: req.user.id }, null, {
      sort: {
        _id: -1,
      },
    });

    const session = await stripe.checkout.sessions.retrieve(
      payment.subscription.sessionId
    );
    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;
      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        console.log("====================================");
        console.log("subscription --->", subscription);
        console.log("====================================");
        let planId = subscription.plan.id;
        let planType = "";
        if (subscription.plan.amount === 28800) {
          planType = "pro";
        } else if (subscription.plan.amount === 57600) {
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
        payment.subscription.planType = planType;
        payment.subscription.subscriptionId = subscriptionId;
        payment.subscription.startDate = startDate;
        payment.subscription.willExpireOn = endDate;
        payment.subscription.durationInDays = durationInDays;

        payment.markModified("subscription");
        await payment.save();
        const subscriptionUser = await client.get(req.user.id);
        if (!subscriptionUser) {
          if (planType === "pro") {
            await client.set(
              req.user.id,
              JSON.stringify({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 100,
                aiArtRequestsPerMonth: 500,
              })
            );
          } else {
            await client.set(
              req.user.id,
              JSON.stringify({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 200,
                aiArtRequestsPerMonth: 1000,
              })
            );
          }
        } else {
          var object = JSON.parse(subscriptionUser);
          if (object instanceof Array) {
            if (planType === "pro") {
              object.push({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 100,
                aiArtRequestsPerMonth: 500,
              });
            } else {
              object.push({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 200,
                aiArtRequestsPerMonth: 1000,
              });
            }
            await client.set(req.user.id, JSON.stringify(object));
          } else if (object instanceof Object) {
            var array = [{ ...object }];
            if (planType === "pro") {
              array.push({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 100,
                aiArtRequestsPerMonth: 500,
              });
            } else {
              array.push({
                ...payment.subscription,
                aiStoriesRequestsPerMonth: 200,
                aiArtRequestsPerMonth: 1000,
              });
            }
            await client.set(req.user.id, JSON.stringify(array));
          }
        }
        return res
          .status(200)
          .json({ success: true, message: "Payment Successfull" });
      } catch (error) {
        return res.status(503).json({ success: false, error: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const payment = Payment.findOne({
      userId: req.user.id,
      "subscription.status": { $nin: ["expired", "cancelled"] },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
