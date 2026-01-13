/**
 * Point d'entrée du serveur Express
 * Configure le serveur, les middlewares et les routes
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import des routes
const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/companies.routes');
const forumRoutes = require('./routes/forum.routes');

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// CORS : Permet les requêtes depuis le frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
  
// Parser JSON : Permet de lire les données JSON dans req.body
app.use(express.json());

// Parser URL-encoded : Permet de lire les données de formulaires
app.use(express.urlencoded({ extended: true }));

// Middleware de logging simple (pour le développement)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Intranet Cyberparc',
    version: '1.0.0',
    endpoints: {

      ///api : c’est juste un préfixe d’URL
      auth: '/api/auth',
      companies: '/api/companies',
      forum: '/api/forum'
    }
  });
});

// Routes d'authentification
app.use('/api/auth', authRoutes);

// TODO: Ajouter les autres routes
// app.use('/api/companies', companyRoutes);
// app.use('/api/forum', forumRoutes);

app.use('/api/companies', companyRoutes);
app.use('/api/forum', forumRoutes);
// ============================================
// GESTION DES ERREURS
// ============================================

// Route 404 : Route non trouvée
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path
  });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}\n`);
});
