const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addOperatorAndActivateServices() {
  console.log('Aggiungo operatore e attivo servizi...');

  try {
    // Attiva tutti i servizi esistenti
    const updatedServices = await prisma.service.updateMany({
      where: { active: false },
      data: { active: true },
    });
    console.log(`Attivati ${updatedServices.count} servizi`);
  } catch (error) {
    console.error('Errore durante l\'attivazione servizi:', error);
  }

  try {
    // Crea operatore Valentina
    const operator = await prisma.operator.create({
      data: {
        name: 'Valentina',
        startHour: 9,
        endHour: 18,
      },
    });
    console.log('Operatore creato:', operator.name);

    // Collega operatore a tutti i servizi
    const services = await prisma.service.findMany({
      where: { active: true },
    });

    for (const service of services) {
      await prisma.service.update({
        where: { id: service.id },
        data: {
          operators: {
            connect: { id: operator.id }
          }
        },
      });
    }
    console.log(`Operatore collegato a ${services.length} servizi`);

  } catch (error) {
    console.error('Errore durante creazione operatore:', error);
  }

  console.log('Operazione completata!');
}

addOperatorAndActivateServices()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
