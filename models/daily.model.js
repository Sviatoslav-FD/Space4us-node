const mongoose = require('mongoose')

const DailySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  dependencies: {
    type: [String],
    required: false,
  },
  marks: {
    type: [String],
    required: false,
  },
})

const Daily = mongoose.model('Daily', DailySchema)

module.exports = Daily
