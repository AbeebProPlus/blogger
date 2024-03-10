const express = require('express')
const router = express.Router()
const postService = require('../services/postService')


console.log("post route")
router.route('/')
    .post(postService.createPost)
    .put(postService.updatePost)

module.exports = router