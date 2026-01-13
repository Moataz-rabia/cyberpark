/**
 * Script de seed pour peupler la base de données avec des données de test
 * Exécuter avec : npm run prisma:seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données...\n');

  // Nettoyer les données existantes (optionnel)
  console.log('🧹 Nettoyage des données existantes...');
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  console.log('✅ Nettoyage terminé\n');

  // Créer un compte administrateur
  console.log('👤 Création du compte administrateur...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@cyberparc.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log(`✅ Admin créé : ${admin.email}\n`);

  // Créer des entreprises avec leurs comptes
  console.log('🏢 Création des entreprises et comptes...');

  const companies = [
    {
      name: 'TechInnovate',
      description: 'Startup spécialisée dans l\'IA et le machine learning',
      address: '123 Rue de la Tech, Tunis',
      website: 'https://techinnovate.tn',
      phone: '+216 71 234 567',
      sector: 'Intelligence Artificielle',
      email: 'contact@techinnovate.tn',
      password: 'tech123'
    },
    {
      name: 'WebSolutions Pro',
      description: 'Agence de développement web et mobile',
      address: '456 Avenue du Développement, Tunis',
      website: 'https://websolutions.tn',
      phone: '+216 71 345 678',
      sector: 'Développement Web',
      email: 'contact@websolutions.tn',
      password: 'web123'
    },
    {
      name: 'DataSecure',
      description: 'Expert en cybersécurité et protection des données',
      address: '789 Boulevard Sécurité, Tunis',
      website: 'https://datasecure.tn',
      phone: '+216 71 456 789',
      sector: 'Cybersécurité',
      email: 'contact@datasecure.tn',
      password: 'secure123'
    },
    {
      name: 'CloudMasters',
      description: 'Services cloud et infrastructure',
      address: '321 Rue du Cloud, Tunis',
      website: 'https://cloudmasters.tn',
      phone: '+216 71 567 890',
      sector: 'Cloud Computing',
      email: 'contact@cloudmasters.tn',
      password: 'cloud123'
    },
    {
      name: 'MobileFirst',
      description: 'Applications mobiles iOS et Android',
      address: '654 Avenue Mobile, Tunis',
      website: 'https://mobilefirst.tn',
      phone: '+216 71 678 901',
      sector: 'Développement Mobile',
      email: 'contact@mobilefirst.tn',
      password: 'mobile123'
    }
  ];

  for (const companyData of companies) {
    const { email, password, ...companyInfo } = companyData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'COMPANY',
        company: {
          create: companyInfo
        }
      },
      include: {
        company: true
      }
    });

    console.log(`✅ ${user.company.name} créée - Email: ${email} - Pass: ${password}`);
  }

  console.log('\n✨ Seeding terminé avec succès !\n');
  console.log('📊 Résumé :');
  console.log(`   - 1 compte admin (${admin.email} / admin123)`);
  console.log(`   - ${companies.length} entreprises créées`);
  console.log('\n💡 Vous pouvez vous connecter avec n\'importe quel compte d\'entreprise.');
  console.log('   Par exemple : contact@techinnovate.tn / tech123\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
