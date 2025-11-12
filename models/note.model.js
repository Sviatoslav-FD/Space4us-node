const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
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

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
