const mongoose = require('mongoose');
require('dotenv').config();
const Connection = require('./connection')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your first name'],
        trim: true,
        minlength: [3, 'First name must have at least 3 characters'],
        maxlength: [25, "First name can't be more than 25 characters"],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        //     'Password must be at least 8 characters long and not more than 20 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character'
        // ],
    },
    imageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dzqbzqgjm/image/upload/v1599098981/default-user-image_zqjqjg.png'
    }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    try {
        await Connection.create({ UserID: this._id })
    } catch (error) {
        next(error)
    }
    next()
})

module.exports = mongoose.model('User', UserSchema);