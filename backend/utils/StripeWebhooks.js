const Payment = require('../models/Payment')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const User = require('../models/User')
const payment = require('../models/Payment')

exports.handleSubscriptionCreated = async (data) => {
  const currentPeriodEnd = data.current_period_end * 1000
  const currentPeriodStart = data.current_period_start * 1000
  const customer = await stripe.customers.retrieve(data?.customer)
  const user = await User.findOne({ email: customer.email })
  let savedUser = user
  if (!user && customer.email) {
    const userObject = new User({
      name: customer.name,
      address: `${customer.address.line1} ${customer.address.line2}`,
      city: customer.address.city,
      state: customer.address.state,
      country: customer.address.country,
      zipCode: customer.address.postal_code,
      phoneNumber: customer.phone,
      email: customer.email
    })
    savedUser = await userObject.save()
  }
  if (savedUser) {
    const payment = new Payment({
      userId: savedUser.id,
      subscription: {
        sessionId: '',
        status: data.status,
        planId: data.plan.id,
        planType: data.plan.type,
        subscriptionId: data.id,
        startDate: currentPeriodStart,
        willExpireOn: currentPeriodEnd,
        durationInDays: 365,
        customer: data.customer,
        itemId: data.items.data[0].id
      }
    })
    await payment.save()
  }
}

exports.handleSubscriptionDeleted = async (data) => {
  const findPyament = await payment.findOneAndUpdate(
    { 'subscription.subscriptionId': data.id },
    {
      $set: {
        'subscription.status': 'deleted'
      }
    },
    { new: true }
  )
  if (paymentDocument) {
    console.log('Payment updated successfully:', paymentDocument)
  } else {
    console.log('Payment not found for subscriptionId:', data.id)
  }
}

exports.handleSubscriptionUpdated = async (data) => {
  const currentPeriodStart = new Date(data.current_period_start * 1000) // Convert seconds to milliseconds
  const currentPeriodEnd = new Date(data.current_period_end * 1000) // Convert seconds to milliseconds

  try {
    const paymentDocument = await payment.findOneAndUpdate(
      { 'subscription.subscriptionId': data.id },
      {
        $set: {
          'subscription.status': data.status,
          'subscription.sessionId': '',
          'subscription.planId': data.plan.id,
          'subscription.subscriptionId': data.id,
          'subscription.startDate': currentPeriodStart,
          'subscription.willExpireOn': currentPeriodEnd,
          'subscription.durationInDays': 365,
          'subscription.customer': data.customer,
          'subscription.itemId': data.items.data[0].id
        }
      },
      { new: true }
    )

    if (paymentDocument) {
      console.log('Payment updated successfully:', paymentDocument)
    } else {
      console.log('Payment not found for subscriptionId:', data.id)
    }
  } catch (error) {
    console.error('Error updating payment:', error)
  }
}
exports.handleInvoicePaymentSucceeded = async (data) => {}

exports.handleCustomerCreated = async (data) => {
  const customer = data
  const userFound = await User.findOne({ email: customer.email })
  if (!userFound && customer.email) {
    const user = await User({
      name: customer.name,
      address: `${customer.address.line1} ${customer.address.line2}`,
      city: customer.address.city,
      state: customer.address.state,
      country: customer.address.country,
      zipCode: customer.address.postal_code,
      phoneNumber: customer.phone,
      email: customer.email
    })
    user.save()
  }
}
