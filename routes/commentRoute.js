const express = require('express')
const router = express.Router()
const commentService = require('../services/commentService')

router.route('/')
    .post(commentService.commentOnPost)
    .put(commentService.updateComment)

module.exports = router