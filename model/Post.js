const mongoose = require('mongoose')
const Schema = mongoose.schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }   
})

module.exports = mongoose.model('Post', postSchema)