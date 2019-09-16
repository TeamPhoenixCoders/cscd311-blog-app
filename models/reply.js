const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
    },
    postedAt: {
        type: Date,
        default: new Date()
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
