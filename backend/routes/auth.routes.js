/**
 * Routes d'authentification
 * Définit les endpoints pour l'inscription et la connexion
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.Controller.js');
const { verifyToken } = require('../middleware/auth.middleware.js');

/**
 * POST /api/auth/register
 * Inscription d'un nouvel utilisateur
 *
 * Body requis:
 * {
 *   "email": "user@example.com",
 *   "password": "motdepasse",
 *   "role": "COMPANY", // ou "ADMIN"
 *   "companyName": "Mon Entreprise" // requis si role = "COMPANY"
 * }
 */
router.post('/register', authController.handleRegister);

/**
 * POST /api/auth/login
 * Connexion d'un utilisateur
 *
 * Body requis:
 * {
 *   "email": "user@example.com",
 *   "password": "motdepasse"
 * }
 *
 * Retourne:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "user": { ... }
 * }
 */
router.post('/login', authController.handleLogin);

/**
 * GET /api/auth/me
 * Récupère les informations de l'utilisateur connecté
 *
 * Headers requis:
 * Authorization: Bearer TOKEN
 */
router.get('/me', verifyToken, authController.handleGetMe);

module.exports = router;
