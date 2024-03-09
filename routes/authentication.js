const express = require('express')
const router = express.Router()
const authenticationService = require('../services/authenticationService')

console.log("auth route")
router.route('/')
    .post(authenticationService.authenticate)


module.exports = router