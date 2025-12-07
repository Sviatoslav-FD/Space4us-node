const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  list: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Model = mongoose.model('Daily', ModelSchema)

module.exports = Model
