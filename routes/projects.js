const express = require('express')
const router = express.Router()
const Model = require('../models/project.model')
const { get, add, edit, remove } = require('../helpers')

router.get('/', (req, res) => get(req, res, Model))

router.post('/add', (req, res) => add(req, res, Model))

router.put('/edit', (req, res) => edit(req, res, Model))

router.delete('/delete/:id', (req, res) => remove(req, res, Model))

module.exports = router