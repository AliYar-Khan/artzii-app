const mongoose = require('mongoose')

const paymentsSchema = mongoose.Schema({
  userId: {
    type: String
  },
  subscription: {
    type: mongoose.Schema.Types.Mixed
  }
})

module.exports = mongoose.model('payments', paymentsSchema)
