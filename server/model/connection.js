const mongoose = require('mongoose')

const ConnectionSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    connectedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    connectionRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    requestSent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    profileViewer: [{
        ViewedAt: { type: Date, default: Date.now },
        ViewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }]
})

module.exports = mongoose.model('Connection', ConnectionSchema)