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
    enum: ['backlog', 'week', 'in-progress', 'done'],
    default: 'backlog',
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
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
