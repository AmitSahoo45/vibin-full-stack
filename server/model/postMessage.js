const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true })

const PostMessage = mongoose.model('PostMessage', postSchema)

module.exports = PostMessage;