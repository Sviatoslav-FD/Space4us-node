const express = require('express')
const router = express.Router()
const Question = require('../models/interview.model')
const { sendResponse, catchError } = require('../helpers')
const mongoose = require('mongoose')

router.get('/', async (_, res) => {
    try {
        const questions = await Question.find()
        sendResponse(res, questions)
    } catch (err) {
        catchError(res, err)
    }
})

router.post('/add', async (req, res) => {
    try {
        await Question.create(req.body)
        const questions = await Question.find()
        sendResponse(res, questions)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.body._id)
        await Question.updateOne({ _id }, { $set: req.body })
        const questions = await Question.find()
        sendResponse(res, questions)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id)
        
        let result

        if (_id && _id !== 'clear') {
            result = await Question.deleteOne({ _id })
        } else {
            await Question.deleteMany({})
        }

        if (result && result.deletedCount === 0) {
            return sendResponse(res, { message: 'Question not found' }, 404)
        }
        
        const questions = await Question.find()
        sendResponse(res, questions)
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router