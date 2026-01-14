/**
 * Contrôleur d'authentification
 * Gère les requêtes HTTP et les réponses pour l'authentification
 */

const authService = require('../services/auth.service.js');

/**
 * Gère l'inscription d'un nouvel utilisateur
 * POST /api/auth/register
 */
async function handleRegister(req, res) {
  try {
    const { email, password, role, companyName } = req.body;

    // Validation des données
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email et mot de passe sont requis'
      });
    }

    if (role === 'COMPANY' && !companyName) {
      return res.status(400).json({
        error: 'Le nom de l\'entreprise est requis pour un compte entreprise'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email invalide'
      });
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }
    /* Appel du service(fi 3odh ma na3ti kan email w password w role w companyName)na3tih kolchi fi body
    const user = await authService.register({
      email,
      password,
      role,
      companyName
    });*/

    // Appel du service — passer tout le corps de la requête au service
    // (le service fera le mapping/whitelist des champs attendus)
    const user = await authService.register(req.body);

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);

    // Si c'est une erreur métier (ex: email déjà utilisé)
    if (error.message === 'Cet email est déjà utilisé') {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({
      error: 'Erreur lors de l\'inscription'
    });
  }
}

/**
 * Gère la connexion d'un utilisateur
 * POST /api/auth/login
 */
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email et mot de passe sont requis'
      });
    }

    // Appel du service
    const result = await authService.login(email, password);

    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);

    // Si c'est une erreur d'authentification
    if (error.message === 'Email ou mot de passe incorrect') {
      return res.status(401).json({ error: error.message });
    }

    res.status(500).json({
      error: 'Erreur lors de la connexion'
    });
  }
}

/**
 * Récupère les informations de l'utilisateur connecté
 * GET /api/auth/me
 */
async function handleGetMe(req, res) {
  try {
    // req.user est ajouté par le middleware auth.middleware.js
    const user = await authService.getUserById(req.user.userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération du profil'
    });
  }
}

module.exports = {
  handleRegister,
  handleLogin,
  handleGetMe
};
