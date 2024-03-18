const express = require('express');
const router = express.Router();
const authenticationService = require('../services/authenticationService');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Endpoint to authenticate a user.
 *     tags: [Authentication]
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

router.post('/login', authenticationService.authenticate);

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: Change user password
 *     description: Endpoint to change the user's password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Bad request. User ID, old password, and new password are required.
 *       401:
 *         description: Unauthorized. Old password does not match the current password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 */

router.put('/change-password', authenticationService.changePassword);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out of account
 *     description: Endpoint to log out user.
 *     tags: [Authentication]
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 */

router.post('/logout', authenticationService.logout);

module.exports = router;
