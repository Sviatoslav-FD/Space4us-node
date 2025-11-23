const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }, // unique, lowercase
    passwordHash: {
        type: String,
        required: true
    }, // bcrypt/argon2
    username: {
        type: String,
        required: true
    },
    avatar: String,
    emailVerified: Boolean,
    isActive: Boolean,
    createdAt: {
        type: Date,
        required: true,
        auto: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        auto: true,
        default: Date.now
    },
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system'
        }
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User