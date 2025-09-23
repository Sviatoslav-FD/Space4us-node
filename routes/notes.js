const express = require('express')
const router = express.Router()
const Note = require('../models/note.model')
const { sendResponse, catchError } = require('../helpers')
const mongoose = require('mongoose')

router.get('/', async (_, res) => {
    try {
        const notes = await Note.find({})
        sendResponse(res, notes)
    } catch (err) {
        catchError(res, err)
    }
})

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        const note = await Note.create(req.body)
        sendResponse(res, note)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        const note = await Note.updateOne({ _id: req.body._id }, { $set: req.body })
        sendResponse(res, note)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id)
        
        let result

        if (_id && _id !== 'clear') {
            result = await Note.deleteOne({ _id })
        } else {
            await Note.deleteMany({})
        }

        if (result && result.deletedCount === 0) {
            return sendResponse(res, { message: 'Note not found' }, 404)
        }
        
        sendResponse(res, { message: 'Notes deleted' })
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router