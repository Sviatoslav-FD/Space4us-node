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
        await Note.create(req.body)
        const notes = await Note.find({})
        sendResponse(res, notes)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        const note = await Note.updateOne({ id: req.body.id }, { $set: req.body })
        sendResponse(res, note)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        
        let result

        if (id && id !== 'clear') {
            result = await Note.deleteOne({ id })
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