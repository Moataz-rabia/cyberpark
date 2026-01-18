/**
 * Routes du forum
 * Définit les endpoints pour les discussions et posts du forum
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * GET /api/forum/posts
 * Récupère tous les posts du forum
 */
router.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true, author: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

/**
 * POST /api/forum/posts
 * Crée un nouveau post dans le forum
 */
router.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

/**
 * GET /api/forum/posts/:postId/comments
 * Récupère les commentaires d'un post spécifique
 */
router.get('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { author: true },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

/**
 * POST /api/forum/posts/:postId/comments
 * Ajoute un commentaire à un post
 */
router.post('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { content, authorId } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: { content, postId: parseInt(postId), authorId },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
