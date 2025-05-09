const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const Task = require('../models/task.model')

function catchError(res, message) {
    res.status(500).json(message)
}

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (err) {
        catchError(res, err)
    }
})

router.post('/add', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
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

        if (id && id !== 'clear') {
            await Task.deleteOne({ id })
        } else {
            await Task.deleteMany({})
        }
        
        res.status(200).json({ message: 'Tasks deleted' })
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router