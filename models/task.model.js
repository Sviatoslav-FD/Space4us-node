const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  projectId: {
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
    enum: ['backlog', 'week', 'in-progress', 'done'],
    default: 'backlog',
  },
  weekStart: {
    type: Date
  },
  weekEnd: {
    type: Date
  }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
