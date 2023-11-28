require('dotenv').config()
const cors = require('cors')
const express = require('express')
const userRoutes = require('./routes/UserRoutes')
const designerRoutes = require('./routes/DesignRoutes')
const paymentRoutes = require('./routes/PaymentRoutes')
const aiRoutes = require('./routes/AIRoutes')
const connection = require('./config/db')
const PORT = process.env.PORT
const app = express()
connection()
// const bodyParser = require('body-parser');
const PaymentStripeController = require('./controllers/PaymentStripeController')
// const redis = require("redis");
// async function start() {
//   const client = redis.createClient();
//   await client.connect();

//   await client.get("mykey", "Hello from node redis");
//   const myKeyValue = await client.get("64ea4c3df15756b9737638f7");
//   console.log(JSON.parse(myKeyValue));
// }

// start();

app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment-stripe/webhook') {
    next() // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next) // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
})
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'x-auth-token',
      'X-Requested-With',
      'Accept',
      'Access-Control-Allow-Headers',
      'Access-Control-Request-Headers',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials'
    ]
  })
)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes)
app.use('/api/design', designerRoutes)
app.use('/api/payment-stripe', paymentRoutes)
app.post(
  '/api/payment-stripe/webhook',
  express.raw({ type: 'application/json' }),
  PaymentStripeController.webHookStripe
)
app.use('/api/ai', aiRoutes)

app.listen(PORT, function () {
  console.log(`Artzii backend listening on port ${PORT}!`)
})
