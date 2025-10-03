const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
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
  projectId: {
    type: String,
    required: true,
  },
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
