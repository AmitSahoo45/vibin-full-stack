const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
    likes: [{
        type: String
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Comment', Comment)