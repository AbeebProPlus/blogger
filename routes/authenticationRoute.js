const express = require('express')
const router = express.Router()
const authenticationService = require('../services/authenticationService')

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Endpoint to authenticate a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated. Returns access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Bad request. Email/Username and password are required.
 *       401:
 *         description: Unauthorized. Password does not match.
 *       403:
 *         description: Forbidden. User does not exist or email not verified.
 *       500:
 *         description: Internal server error.
 */

router.route('/')
    .post(authenticationService.authenticate)


module.exports = router