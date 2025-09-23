const express = require('express')
const router = express.Router()
const Word = require('../models/word.model')
const { catchError } = require('../helpers')

router.get('/', async (req, res) => {
    try {
        const words = await Word.find({})
        res.status(200).json(words)
    } catch (err) {
        catchError(res, err)
    }
})

router.post('/add', async (req, res) => {
    try {
        const task = await Word.create(req.body)
        res.status(200).json(task)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (id && id !== 'clear') {
            await Word.deleteOne({ id })
        } else {
            await Word.deleteMany({})
        }
        
        res.status(200).json({ message: 'Words deleted' })
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router