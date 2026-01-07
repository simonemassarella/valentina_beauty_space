import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding operators and admin user...');

  // Crea operatrici
  const valentina = await prisma.operator.upsert({
    where: { id: 'valentina' },
    update: {},
    create: {
      id: 'valentina',
      name: 'Valentina Gaudiano',
      startHour: 9,
      endHour: 19,
    },
  });
  console.log('✅ Operatrice creata:', valentina.name);

  const sabrina = await prisma.operator.upsert({
    where: { id: 'sabrina' },
    update: {},
    create: {
      id: 'sabrina',
      name: 'Sabrina Muccitelli',
      startHour: 9,
      endHour: 18,
    },
  });
  console.log('✅ Operatrice creata:', sabrina.name);

  // Associa servizi alle operatrici
  const allServices = await prisma.service.findMany({ where: { active: true } });
  
  // Valentina: massaggi e trattamenti olistici
  const valentinaServices = allServices.filter(s => 
    s.category === 'Massaggi' || s.category === 'Pacchetti'
  );
  
  // Sabrina: estetica, epilazione, corpo
  const sabrinaServices = allServices.filter(s => 
    s.category !== 'Massaggi' && s.category !== 'Pacchetti'
  );

  await prisma.operator.update({
    where: { id: 'valentina' },
    data: {
      services: {
        connect: valentinaServices.map(s => ({ id: s.id })),
      },
    },
  });
  console.log(`✅ Associati ${valentinaServices.length} servizi a Valentina`);

  await prisma.operator.update({
    where: { id: 'sabrina' },
    data: {
      services: {
        connect: sabrinaServices.map(s => ({ id: s.id })),
      },
    },
  });
  console.log(`✅ Associati ${sabrinaServices.length} servizi a Sabrina`);

  // Crea utente admin (cambia email e password!)
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@valentina.it' },
    update: {},
    create: {
      name: 'Admin',
      surname: 'Sistema',
      email: 'admin@valentina.it',
      phone: '0000000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin creato:', admin.email);

  console.log('🎉 Seeding completato!');
  console.log('\n⚠️  IMPORTANTE: Cambia la password admin dal pannello!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
