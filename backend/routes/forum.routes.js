/**
 * Routes du forum
 * Définit les endpoints pour les discussions et posts du forum
 */

const express = require('express');
const router = express.Router();

// TODO: Ajouter les contrôleurs et middlewares nécessaires
// const forumController = require('../controllers/forum.controller');
// const { verifyToken } = require('../middleware/auth.middleware');

/**
 * GET /api/forum/posts
 * Récupère tous les posts du forum
 */
router.get('/posts', (req, res) => {
  // TODO: Implémenter la logique pour récupérer les posts
  res.json({ message: 'Forum posts endpoint - à implémenter' });
});

/**
 * POST /api/forum/posts
 * Crée un nouveau post dans le forum
 */
router.post('/posts', (req, res) => {
  // TODO: Implémenter la logique pour créer un post
  res.json({ message: 'Create post endpoint - à implémenter' });
});

module.exports = router;
