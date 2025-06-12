const express = require('express')
const router = express.Router()
const Daily = require('../models/daily.model')

function catchError(res, message) {
    res.status(500).json(message)
}

router.get('/', async (req, res) => {
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

module.exports = router
