const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Endpoint to create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created the post.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update a post
 *     description: Endpoint to update an existing post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the post.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Get a post
 *     description: Endpoint to get a post by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the post.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a post
 *     description: Endpoint to delete a post by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the post.
 *       400:
 *         description: Bad request. Invalid input.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Internal server error.
 */

router.route('/')
    .post(postService.createPost)
    .put(postService.updatePost)
    .get(postService.getPost)
    .delete(postService.deletePost);

module.exports = router;