const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');

// Registration route
router.post('/', registrationService.registerUser);

// Email confirmation route
router.get('/confirm-email', registrationService.confirmEmail);

module.exports = router;
