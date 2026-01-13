/**
 * Middleware d'authentification
 * Vérifie la validité du token JWT dans les requêtes
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le token JWT
 * Ajoute req.user avec les informations du token si valide
 */
function verifyToken(req, res, next) {
  try {
    // 1. Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Token manquant. Vous devez être authentifié pour accéder à cette ressource.'
      });
    }

    // Le format attendu est: "Bearer TOKEN"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'Format du token invalide. Format attendu: Bearer TOKEN'
      });
    }

    const token = parts[1];

    // 2. Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Ajouter les informations de l'utilisateur à la requête
    req.user = decoded;

    // 4. Passer au middleware suivant
    next();
  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);

    // Gestion des différentes erreurs JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expiré. Veuillez vous reconnecter.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token invalide.'
      });
    }

    return res.status(500).json({
      error: 'Erreur lors de la vérification du token'
    });
  }
}

/**
 * Middleware pour vérifier que l'utilisateur a un rôle spécifique
 * @param {string[]} roles - Rôles autorisés (ex: ['ADMIN'])
 */
function requireRole(...roles) {
  return (req, res, next) => {
    // Ce middleware doit être utilisé après verifyToken
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentification requise'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Accès interdit. Vous n\'avez pas les permissions nécessaires.'
      });
    }

    next();
  };
}

module.exports = {
  verifyToken,
  requireRole
};
