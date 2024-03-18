const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./Comment');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
    lastUdatedOn: {
        type: Date,
    },
    comments: [Comment.schema]
});

module.exports = mongoose.model('Post', postSchema);
