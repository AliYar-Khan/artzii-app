const mongoose = require('mongoose')

const designSchema = mongoose.Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  },
  pages: {
    type: [mongoose.Schema.Types.Mixed]
  },
  width: {
    type: mongoose.Schema.Types.Mixed
  },
  height: {
    type: mongoose.Schema.Types.Mixed
  },
  scale: {
    type: Number
  },
  unit: {
    type: String,
    default: 'px',
    enum: ['px', 'pt', 'mm', 'cm', 'in']
  },
  dpi: {
    type: Number
  }
})

module.exports = mongoose.model('design', designSchema)
