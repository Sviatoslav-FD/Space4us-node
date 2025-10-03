const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['in-progress', 'archived', 'completed'],
    default: 'in-progress',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  weekStart: {
    type: Date,
    required: false,
  },
  weekEnd: {
    type: Date,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  backlog: [{
    type: {},
    ref: 'Task',
  }],
  week: [{
    type: {},
    ref: 'Task',
  }],
  'in-progress': [{
    type: {},
    ref: 'Task',
  }],
  done: [{
    type: {},
    ref: 'Task',
  }],
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
