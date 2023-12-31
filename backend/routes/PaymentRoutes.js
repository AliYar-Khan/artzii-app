// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const PaymentStripeController = require('../controllers/PaymentStripeController')
const auth = require('../middleware/authenticate')

// Create a new customer
router.post('/addCustomer', auth, PaymentStripeController.addCustomer)

// subscribe a package
router.post('/subscribe-session', auth, PaymentStripeController.subscribe)

// buy credits
router.post('/buy-credits-session', auth, PaymentStripeController.buyAICredits)

// check payment
router.post('/payment-success', auth, PaymentStripeController.paymentSuccess)

router.post(
  '/payment-success-credits',
  auth,
  PaymentStripeController.paymentSuccessCredits
)

// cancel subscription
router.post(
  '/cancel-subscription',
  auth,
  PaymentStripeController.cancelSubscription
)

module.exports = router
