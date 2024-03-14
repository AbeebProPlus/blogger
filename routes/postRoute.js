const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const ROLE = require('../config/roles');
const verifyRole = require('../middleware/security/verifyRole');

/**
 * @swagger
 * tags:
 *   name: Blog Post
 *   description: Operations related to blog posts
 */

/**
 * @swagger
 * /blog_post/new:
 *   post:
 *     summary: Create a new post
 *     description: Endpoint to create a new post.
 *     tags: [Blog Post]
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
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 * 
 * /blog_post/edit:
 *   put:
 *     summary: Update a post
 *     description: Endpoint to update an existing post.
 *     tags: [Blog Post]
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
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 * 
 * /blog_post/one:
 *   get:
 *     summary: Get a post
 *     description: Endpoint to get a post by ID.
 *     tags: [Blog Post]
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
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 * 
 * /blog_post/remove:
 *   delete:
 *     summary: Delete a post
 *     description: Endpoint to delete a post by ID.
 *     tags: [Blog Post]
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
 *     security:
 *       - bearerAuth: []  # Applying JWT security for this operation
 */

router.post('/new', verifyRole(ROLE.Admin), postService.createPost);
router.put('/edit', verifyRole(ROLE.User), postService.updatePost);
router.get('/one', postService.getPost);
router.delete('/remove', verifyRole(ROLE.Admin), postService.deletePost);

module.exports = router;