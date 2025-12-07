const mongoose = require('mongoose')

function sendResponse(res, data, status = 200) {
    res.status(status).json(data)
}

function catchError(res, message) {
    res.status(500).json(message)
}

async function get (req, res, Model) {
    try {
        const items = await Model.find(req.params)
        sendResponse(res, items)
    } catch (err) {
        catchError(res, err)
    }
}

async function add (req, res, Model) {
    try {
        await Model.create(req.body)
        const items = await Model.find({})
        sendResponse(res, items)
    } catch (err) {
        catchError(res, err.message)
    }
}

async function edit (req, res, Model) {
    try {
        const _id = new mongoose.Types.ObjectId(req.body._id)
        const item = await Model.updateOne({ _id }, { $set: req.body })
        sendResponse(res, item)
    } catch (err) {
        catchError(res, err.message)
    }
}

async function remove (req, res, Model) {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id)
        
        let result

        if (_id && _id !== 'clear') {
            result = await Model.deleteOne({ _id })
        } else {
            await Model.deleteMany({})
        }

        if (result && result.deletedCount === 0) {
            return sendResponse(res, { message: 'Item not found' }, 404)
        }
        
        const items = await Model.find({})
        sendResponse(res, items)
    } catch (err) {
        catchError(res, err.message)
    }
}

module.exports = {
    catchError,
    sendResponse,
    get,
    add,
    edit,
    remove
}