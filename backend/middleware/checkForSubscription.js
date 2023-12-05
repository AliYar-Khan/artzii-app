const Payment = require('../models/Payment')

module.exports = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      userId: req.user.id,
      'subscription.status': { $nin: ['expired', 'cancelled', 'deleted'] }
    })
    if (payment) {
      next()
    } else {
      return res
        .status(403)
        .send({ error: true, message: 'No Active Subscription' })
    }
  } catch (error) {
    res.status(401).send({ error: true, message: 'Something went wrong' })
  }
}
