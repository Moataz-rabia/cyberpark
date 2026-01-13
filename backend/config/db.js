/**
 * Configuration et initialisation de Prisma Client
 * Ce fichier exporte une instance unique de PrismaClient utilisée dans toute l'application
 */

const { PrismaClient } = require('@prisma/client');

// Création de l'instance Prisma
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Gestion de la fermeture propre de la connexion
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
