const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'countries.json'), 'utf8', function readFileCallback(error, data) {
        if (error) {
            res.json(error)
            return;
        }
        console.log(data);
        
        res.json(data)
    });
})

module.exports = router
