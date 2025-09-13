const express = require('express')
const router = express.Router()
const Daily = require('../models/daily.model')
const { authenticateToken } = require('../middleware')

function catchError(res, message) {
    res.status(500).json(message)
}

router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Daily.find({ date: req.query.date })
        res.status(200).json(tasks)
    } catch (err) {
        catchError(res, err)
    }
})

router.post('/add', async (req, res) => {
    try {
        const task = await Daily.create(req.body)
        res.status(200).json(task)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        // const task = await Daily.updateOne({ _id: req.body._id }, { $set: req.body })
        const task = await Daily.updateMany({ _id: { $in: req.body._id } }, { $set: req.body })
        res.status(200).json(task)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        let result

        if (id && id !== 'clear') {
            result = await Daily.deleteOne({ id })
        } else {
            await Daily.deleteMany({})
        }

        if (result && result.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' })
        }
        
        res.status(200).json({ message: 'Tasks deleted' })
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router
