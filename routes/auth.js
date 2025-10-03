require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()

    // Generate JWT token
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET)

    const user = await User.findOne({ email })

    res.json({ _id: user._id, token, username, email })
})

router.post('/login', async (req, res) => {
    const { _id, email, password } = req.body

    // Find user by email
    const user = await User.findOne({ _id, email })
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET)

    res.json({ _id: user._id, token, username: user.username, email: user.email })
})

router.get('/profile', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) return res.sendStatus(401)
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        try {
            if (err) return res.sendStatus(403)
            const { _id } = await User.findOne({ email: user.email })
            res.json({ ...user, _id })
        } catch (err) {
            res.status(400).json({ message: 'User not found' })
        }
    })
})

module.exports = router
