const express = require('express')
const router = express.Router()
const commentService = require('../services/commentService')

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a new comment
 *     description: Endpoint to add a new comment on a post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added the comment to the post.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: User or Post not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/', commentService.commentOnPost);

/**
 * @swagger
 * /comments:
 *   put:
 *     summary: Update a comment
 *     description: Endpoint to update an existing comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the comment.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: Comment or Post not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/', commentService.updateComment);

module.exports = router;
