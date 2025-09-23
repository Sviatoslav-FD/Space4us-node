function sendResponse(res, data, status = 200) {
    res.status(status).json(data)
}

function catchError(res, message) {
    res.status(500).json(message)
}

module.exports = {
    catchError,
    sendResponse
}