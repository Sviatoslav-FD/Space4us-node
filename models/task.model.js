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
  link: {
    type: String,
    required: false,
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
  dateStart: {
    type: Date
  },
  dateEnd: {
    type: Date
  },
  list: {
    type: Array
  }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
