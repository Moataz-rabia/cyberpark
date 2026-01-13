/**
 * Service d'authentification
 * Contient la logique métier pour l'inscription, la connexion et la gestion des utilisateurs
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - Données de l'utilisateur
 * @returns {Promise<Object>} Utilisateur créé (sans le mot de passe)
 */
async function register({ email, password, role = 'COMPANY', companyName }) {
  // 1. Vérifier si l'email existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Cet email est déjà utilisé');
  }

  // 2. Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Créer l'utilisateur
  let userData = {
    email,
    password: hashedPassword,
    role
  };

  // Si c'est une entreprise, créer aussi la company
  if (role === 'COMPANY' && companyName) {
    userData.company = {
      create: {
        name: companyName,
        address: company.address || null,
        phone: company.phone || null,
        email: company.email || null,
        website: company.website || null,
          description: company.description || null,
          industry: company.industry || null
      }
    };
  }

  const user = await prisma.user.create({
    data: userData,
    include: {
      company: true
    }
  });

  // 4. Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Connexion d'un utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe en clair
 * @returns {Promise<Object>} Token JWT et informations utilisateur
 */
async function login(email, password) {
  // 1. Trouver l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      company: true
    }
  });

  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // 2. Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // 3. Générer un token JWT
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1m' }
  );

  // 4. Retourner le token et les infos utilisateur (sans le mot de passe)
  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword
  };
}

/**
 * Récupérer un utilisateur par son ID
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Object>} Utilisateur (sans le mot de passe)
 */
async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      company: true
    }
  });

  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = {
  register,
  login,
  getUserById
};
