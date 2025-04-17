const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        
        res.json(data)
    });    
})

router.post('/add', (req, res) => {
    fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        
        const tasks = data ? JSON.parse(data) : []
        tasks.push(req.body)
        const json = JSON.stringify(tasks)
        fs.writeFile('tasks.json', json, 'utf8', () => {
            console.log('File written successfully');
            fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                res.json(data)
            });    
        })
    });
})

router.post('/edit', (req, res) => {
    fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        
        const tasks = data ? JSON.parse(data) : []
        const taskIndex = tasks.findIndex(task => task.id === req.body.id)
        tasks.splice(taskIndex, 1, req.body)
        const json = JSON.stringify(tasks)
        fs.writeFile('tasks.json', json, 'utf8', () => {
            console.log('File written successfully');
            fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                res.json(data)
            });    
        })
    });
})

router.delete('/delete/:id', (req, res) => {
    fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        
        if (req.params.id !== 'clear') {
            const tasks = data ? JSON.parse(data) : []
            const taskIndex = tasks.findIndex(task => task.id === req.params.id)
            tasks.splice(taskIndex, 1)
            const json = JSON.stringify(tasks)

            fs.writeFile('tasks.json', json, 'utf8', () => {
                fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    res.json(data)
                });    
            })
        } else {
            fs.writeFile('tasks.json', '[]', 'utf8', () => {
                fs.readFile('tasks.json', 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    res.json(data)
                });    
            })
        }

    });    
})

module.exports = router