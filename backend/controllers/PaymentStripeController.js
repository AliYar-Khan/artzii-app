/* eslint-disable eqeqeq */
require('dotenv').config()

const Payment = require('../models/Payment')
const {
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  handleInvoicePaymentSucceeded,
  handleCustomerCreated
} = require('../utils/StripeWebhooks')
// const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const { DateTime, Duration } = require('luxon')

const [
  lite,
  pro,
  business
  // ai_credit
] = [
  'price_1O2EtpF5tWWOGM6I0szZirTo',
  'price_1O2EwjF5tWWOGM6IizCUqvut',
  'price_1O2Ep3F5tWWOGM6IXCusa2VB'
  // 'price_1O2FB9F5tWWOGM6Iey4mojug'
]

// const [lite_test, pro_test, business_test, ai_credit_test] = [
//   'price_1O6Ug9F5tWWOGM6IzVp5TkjE',
//   'price_1O6UhkF5tWWOGM6I6QiscDcM',
//   'price_1O6UirF5tWWOGM6IwkI73sK1',
//   'price_1O6UjtF5tWWOGM6IUWYbv6lk'
// ]
exports.addCustomer = async (req, res) => {
  try {
    const payment = { userId: req.user.id, ...req.body }

    const newPayment = new Payment({ ...payment })
    await newPayment.save()
    return res.status(200).json({ success: true, payment: newPayment._id })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.webHookStripe = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature']

    let event

    try {
      const body = req.body.toString('utf8')
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log(`Webhook Error1: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    const dataObject = event.data.object
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(dataObject)
        res.json({ received: true })
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(dataObject)
        res.json({ received: true })
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(dataObject)
        res.json({ received: true })
        break
      case 'customer.created':
        await handleCustomerCreated(dataObject)
        res.json({ received: true })
        break
      case 'payment_intent.succeeded':
        await handleInvoicePaymentSucceeded(dataObject)
        res.json({ received: true })
        break
      default:
        break
    }
  } catch (error) {
    console.log('====================================')
    console.log('error in webhook ===>', error)
    console.log('====================================')
    res.json({ received: false })
  }
  // Return a response to acknowledge receipt of the event
}

const stripeSessionForPackages = async (planId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planId,
          quantity: 1
        }
      ],
      success_url: `${process.env.FRONT_END}/success`,
      cancel_url: `${process.env.FRONT_END}/cancel`
    })

    return session
  } catch (error) {
    return error
  }
}

const stripeSessionForAICredits = async (qty) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI-credits'
            },
            unit_amount: 4
          },
          quantity: qty
        }
      ],
      success_url: `${process.env.FRONT_END}/success?aicredits=true`,
      cancel_url: `${process.env.FRONT_END}/cancel?aicredits=false`
    })
    return session
  } catch (error) {
    return error
  }
}

exports.subscribe = async (req, res) => {
  try {
    const { planPrice } = req.body
    const user = req.user
    let plnId = null
    let plnType = ''
    if (planPrice == '9.99') {
      plnId = lite
      plnType = 'lite'
    } else if (planPrice == '23.99') {
      plnId = pro
      plnType = 'pro'
    } else if (planPrice == '47.99') {
      plnId = business
      plnType = 'business'
    }

    const session = await stripeSessionForPackages(plnId)

    const payment = new Payment({
      userId: user.id,
      subscription: {
        sessionId: session.id,
        status: '',
        planId: plnId,
        planType: plnType,
        startDate: '',
        willExpireOn: '',
        durationInDays: ''
      }
    })
    await payment.save()
    return res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.paymentSuccess = async (req, res) => {
  try {
    const payment = await Payment.findOne({ userId: req.user.id }, null, {
      sort: {
        _id: -1
      }
    })

    const session = await stripe.checkout.sessions.retrieve(
      payment.subscription.sessionId
    )

    if (session.payment_status === 'paid' && session.subscription) {
      const subscriptionId = session.subscription
      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        const plnId = subscription.plan.id

        const startDate = DateTime.fromSeconds(
          subscription.current_period_start
        ).toLocaleString('YYYY-MM-DD')
        const endDate = DateTime.fromSeconds(
          subscription.current_period_end
        ).toLocaleString('YYYY-MM-DD')

        const durationInSeconds =
          (subscription.current_period_end -
            subscription.current_period_start) *
          1000
        const durationInDays = Duration.fromMillis(durationInSeconds).as('days')
        payment.subscription.status = 'paid'
        payment.subscription.sessionId = ''
        payment.subscription.planId = plnId
        payment.subscription.subscriptionId = subscriptionId
        payment.subscription.startDate = startDate
        payment.subscription.willExpireOn = endDate
        payment.subscription.durationInDays = durationInDays
        payment.subscription.customer = subscription.customer
        payment.subscription.itemId = subscription.items.data[0].id
        payment.markModified('subscription')
        await payment.save()
        return res.status(200).json({
          success: true,
          message: 'Payment Successfull',
          package: payment.subscription.planType
        })
      } catch (error) {
        return res.status(503).json({ success: false, error: error.message })
      }
    } else {
      const planType = 'ai-credits'
      const startDate = DateTime.now().toLocaleString('YYYY-MM-DD')
      const endDate = DateTime.now()
        .plus({ days: 365 })
        .toLocaleString('YYYY-MM-DD')
      payment.subscription.sessionId = ''
      payment.subscription.status = 'paid'
      payment.subscription.planId = ''
      payment.subscription.planType = planType
      payment.subscription.startDate = startDate
      payment.subscription.willExpireOn = endDate
      payment.subscription.durationInDays = 365
      payment.markModified('subscription')
      await payment.save()
    }

    return res
      .status(200)
      .json({ success: true, message: 'Payment Successfull' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.paymentSuccessCredits = async (req, res) => {
  try {
    const payment = await Payment.findOne({ userId: req.user.id }, null, {
      sort: {
        _id: -1
      }
    })

    const session = await stripe.checkout.sessions.retrieve(
      payment.subscription.sessionId
    )
    console.log('====================================')
    console.log('session --->', session.payment_status)
    console.log('====================================')
    if (session.payment_status === 'paid') {
      const startDate = DateTime.now().toLocaleString('YYYY-MM-DD')
      const endDate = DateTime.now()
        .plus({ days: 365 })
        .toLocaleString('YYYY-MM-DD')
      payment.subscription.sessionId = ''
      payment.subscription.status = 'paid'
      payment.subscription.startDate = startDate
      payment.subscription.willExpireOn = endDate
      payment.subscription.durationInDays = 365
      payment.markModified('subscription')
      await payment.save()
      return res.status(200).json({
        success: true,
        message: 'Payment Successfull'
      })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.buyAICredits = async (req, res) => {
  try {
    const credits = req.body.noOfCredits
    const user = req.user
    const session = await stripeSessionForAICredits(credits)
    const payment = new Payment({
      userId: user.id,
      subscription: {
        sessionId: session.id,
        status: '',
        planId: '',
        noOfCredits: credits,
        planType: 'credits',
        startDate: '',
        willExpireOn: '',
        durationInDays: ''
      }
    })
    await payment.save()
    return res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.cancelSubscription = async (req, res) => {
  try {
    // const payment = await Payment.findOne({
    //   userId: req.user.id,
    //   'subscription.status': { $nin: ['expired', 'cancelled'] }
    // })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
