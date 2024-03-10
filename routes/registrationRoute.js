const express = require('express')
const router = express.Router()
const registrationService = require('../services/registrationService')

console.log("Registration route")
router.route('/')
    .post(registrationService.registerUser)

module.exports = router