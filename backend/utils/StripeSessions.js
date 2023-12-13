require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

exports.stripeSessionForPackages = async (planId) => {
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
      allow_promotion_codes: true,
      success_url: `${process.env.FRONT_END}/success`,
      cancel_url: `${process.env.FRONT_END}/cancel`
    })

    return session
  } catch (error) {
    return error
  }
}

exports.stripeSessionForAICredits = async (qty) => {
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
