const Payment = require('../models/Payment')
module.exports = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      userId: req.user.id,
      'subscription.status': { $nin: ['expired', 'cancelled'] }
    })
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const key = currentMonth + '/' + currentYear
    console.log('====================================')
    console.log('key --->', key)
    console.log('====================================')
    if (!payment) {
      return res.status(403).send('No Active Subscription')
    } else if (payment.subscription.usage) {
      console.log('====================================')
      console.log('payment --->', JSON.stringify(payment))
      console.log('====================================')
      if (key in payment.subscription.usage) {
        const usageData = payment.subscription.usage[key]
        const storyTokens = usageData.storyTokens
        if (payment.subscription.planType === 'lite' && storyTokens < 100000) {
          next()
        } else if (
          payment.subscription.planType === 'pro' &&
          storyTokens < 240000
        ) {
          next()
        } else if (
          payment.subscription.planType === 'enterprice' &&
          storyTokens < 480000
        ) {
          next()
        } else {
          return res.status(403).send('Monthly limit reach')
        }
      } else {
        next()
      }
    } else {
      next()
    }
  } catch (error) {
    res.status(401).send({ error: true, message: 'Something went wrong' })
  }
}
