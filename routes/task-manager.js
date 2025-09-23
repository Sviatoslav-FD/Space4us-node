const express = require('express')
const router = express.Router()
const Task = require('../models/task.model')
const { catchError } = require('../helpers')

router.get('/', async (req, res) => {;
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.post('/add', async (req, res) => {
    try {
        const tasks = await Task.insertMany(req.body)
        res.status(200).json(tasks)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        const task = await Task.updateOne({ _id: req.body._id }, { $set: req.body })
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
            result = await Task.deleteOne({ id })
        } else {
            await Task.deleteMany({})
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