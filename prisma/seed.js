const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Inizio seed del database...');

  // Crea operatori
  const operator1 = await prisma.operator.create({
    data: {
      name: 'Valentina',
      startHour: 9,
      endHour: 18,
    },
  });

  const operator2 = await prisma.operator.create({
    data: {
      name: 'Giulia',
      startHour: 10,
      endHour: 19,
    },
  });

  console.log('Operatori creati:', operator1.name, operator2.name);

  // Crea servizi base
  const services = [
    {
      name: 'Taglio Base',
      category: 'Capelli',
      description: 'Taglio e piega',
      duration: 60,
      price: 35.0,
      operators: {
        connect: [{ id: operator1.id }, { id: operator2.id }]
      }
    },
    {
      name: 'Colore',
      category: 'Capelli',
      description: 'Colorazione completa',
      duration: 120,
      price: 60.0,
      operators: {
        connect: [{ id: operator1.id }]
      }
    },
    {
      name: 'Manicure',
      category: 'Unghie',
      description: 'Manicure base con smalto',
      duration: 45,
      price: 25.0,
      operators: {
        connect: [{ id: operator2.id }]
      }
    },
    {
      name: 'Pedicure',
      category: 'Unghie',
      description: 'Pedicure completo',
      duration: 60,
      price: 35.0,
      operators: {
        connect: [{ id: operator2.id }]
      }
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
    console.log('Servizio creato:', service.name);
  }

  // Crea settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      sendWhatsAppReminders: true,
      reminderHour: 8,
      timezone: 'Europe/Rome',
    },
  });

  console.log('Seed completato con successo!');
}

main()
  .catch((e) => {
    console.error('Errore durante il seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
