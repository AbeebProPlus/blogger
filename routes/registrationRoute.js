const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: User registration operations
 */

/**
 * @swagger
 * /registration/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags: [Registration]
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

router.post('/register', registrationService.registerUser);

/**
 * @swagger
 * /registration/confirm-email:
 *   get:
 *     summary: Confirm user email
 *     description: Endpoint to confirm user email after registration.
 *     tags: [Registration]
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

router.get('/confirm-email', registrationService.confirmEmail);
/**
 * @swagger
 * /registration/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Endpoint to initiate the forgot password process.
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *       400:
 *         description: Bad request. Email is missing.
 *       500:
 *         description: Internal server error.
 */

router.post('/forgot-password', registrationService.forgotPassword);
/**
 * @swagger
 * /registration/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Endpoint to reset user password.
 *     tags: [Registration]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Bad request. Token or new password is missing.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

router.post('/reset-password', registrationService.resetPassword);

module.exports = router;
