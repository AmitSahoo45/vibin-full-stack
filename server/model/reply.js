const mongoose = require('mongoose')

const Reply = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    CommentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    reply: {
        type: String,
        required: true,
    },
    likes: [{
        type: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Reply', Reply)

