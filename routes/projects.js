const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Project = require('../models/project.model')
const { sendResponse, catchError } = require('../helpers')

router.get('/', async (req, res) => {;
    try {
        const projects = await Project.find({})
        sendResponse(res, projects)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        const projects = await Project.create(req.body)
        sendResponse(res, projects)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.put('/edit', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.body._id)
        const project = await Project.updateOne({ _id }, { $set: req.body })
        sendResponse(res, project)
    } catch (err) {
        catchError(res, err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id)
        let result

        if (_id && _id !== 'clear') {
            result = await Project.deleteOne({ _id })
        } else {
            await Project.deleteMany({})
        }

        if (result && result.deletedCount === 0) {
            return res.status(404).json({ message: 'Project not found' })
        }
        
        res.status(200).json({ message: 'Tasks deleted' })
    } catch (err) {
        catchError(res, err.message)
    }
})

router.post('/tasks/add', async (req, res) => {
    try {
        const { projectId, status, formData } = req.body
        const project = await Project.findById(projectId)
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }
        project[status].push(formData)
        await project.save()
        sendResponse(res, project)
    } catch (err) {
        catchError(res, err.message)
    }
})

module.exports = router