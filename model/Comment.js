const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date
    },
    comments: [this]
});

module.exports = mongoose.model('Comment', commentSchema);
