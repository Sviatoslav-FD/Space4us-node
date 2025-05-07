const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    // fs.readFile('countries.json', 'utf8', function readFileCallback(err, data) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(data);
        
    //     res.json(data)
    // });

    res.json([
        {
            "flag": "United States",
            "code": "US"
        },
        {
            "flag": "Canada",
            "code": "CA"
        },
        {
            "flag": "Mexico",
            "code": "MX"
        }
    ])
})

module.exports = router
