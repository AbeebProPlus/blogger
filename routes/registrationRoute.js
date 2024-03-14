const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');
/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully. Email confirmation link sent.
 *       400:
 *         description: Bad request. Required fields missing.
 *       409:
 *         description: User with the provided email or username already exists.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /registration/confirm-email:
 *   get:
 *     summary: Confirm user email
 *     description: Endpoint to confirm user email after registration.
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Confirmation token sent to the user's email.
 *     responses:
 *       200:
 *         description: Email confirmed successfully.
 *       400:
 *         description: Bad request. Token is missing.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */


router.post('/', registrationService.registerUser);

router.get('/confirm-email', registrationService.confirmEmail);

module.exports = router;
