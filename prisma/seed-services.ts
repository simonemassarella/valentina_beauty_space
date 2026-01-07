import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  // VISO
  { name: 'Pulizia profonda', category: 'Viso', price: 40, duration: 60 },
  { name: 'Trattamento anti-age schiarente', category: 'Viso', price: 70, duration: 60 },
  { name: 'Luminosità ritrovata', category: 'Viso', price: 60, duration: 50 },

  // PIEDI
  { name: 'Pedicure estetico', category: 'Piedi', price: 23, duration: 45 },
  { name: 'Pedicure con smalto semipermanente', category: 'Piedi', price: 30, duration: 60 },
  { name: 'Pedicure curativo', category: 'Piedi', price: 30, duration: 50 },
  { name: 'Pedicure curativo con smalto semipermanente', category: 'Piedi', price: 40, duration: 70 },
  { name: 'Rimozione smalto semipermanente', category: 'Piedi', price: 8, duration: 15 },

  // EPILAZIONE
  { name: 'Epilazione completa', category: 'Epilazione', price: 40, duration: 60 },
  { name: 'Epilazione inguine', category: 'Epilazione', price: 15, duration: 20 },
  { name: 'Epilazione braccia', category: 'Epilazione', price: 12, duration: 20 },
  { name: 'Epilazione labbro + sopracciglia', category: 'Epilazione', price: 8, duration: 15 },
  { name: 'Epilazione labbro', category: 'Epilazione', price: 3, duration: 10 },
  { name: 'Epilazione sopracciglia', category: 'Epilazione', price: 7, duration: 10 },
  { name: 'Epilazione mento', category: 'Epilazione', price: 6, duration: 10 },
  { name: 'Epilazione gamba intera', category: 'Epilazione', price: 20, duration: 30 },
  { name: 'Epilazione mezza gamba', category: 'Epilazione', price: 15, duration: 20 },
  { name: 'Epilazione ascelle', category: 'Epilazione', price: 8, duration: 15 },
  { name: 'Epilazione glutei', category: 'Epilazione', price: 10, duration: 15 },

  // UOMO
  { name: 'Epilazione braccia uomo', category: 'Uomo', price: 18, duration: 25 },
  { name: 'Epilazione schiena uomo', category: 'Uomo', price: 25, duration: 30 },
  { name: 'Epilazione petto uomo', category: 'Uomo', price: 25, duration: 30 },
  { name: 'Epilazione gambe uomo', category: 'Uomo', price: 25, duration: 35 },
  { name: 'Epilazione completo uomo', category: 'Uomo', price: 60, duration: 90 },

  // CORPO
  { name: 'Trattamento corpo/addome/glutei', category: 'Corpo', price: 80, duration: 60 },
  { name: 'Endospheres (a seduta)', category: 'Corpo', price: 120, duration: 45 },

  // MASSAGGI
  { name: 'Riflessologia plantare', category: 'Massaggi', price: 40, duration: 50 },
  { name: 'Massaggio viso con pietre preziose', category: 'Massaggi', price: 35, duration: 40 },
  { name: 'Massaggio bioenergetico personalizzato (60 min)', category: 'Massaggi', price: 60, duration: 60 },
  { name: 'Massaggio bioenergetico personalizzato (90 min)', category: 'Massaggi', price: 80, duration: 90 },
  { name: 'Massaggio bioenergetico Hotstone', category: 'Massaggi', price: 90, duration: 90 },
  { name: 'Massaggio decontratturante (60 min)', category: 'Massaggi', price: 50, duration: 60 },
  { name: 'Massaggio decontratturante (40 min)', category: 'Massaggi', price: 35, duration: 40 },
  { name: 'Massaggio emolinfatico/modellante', category: 'Massaggi', price: 35, duration: 40 },
  { name: 'Shiatsu (60 min)', category: 'Massaggi', price: 50, duration: 60 },
  { name: 'Shiatsu (90 min)', category: 'Massaggi', price: 80, duration: 90 },
  { name: 'Shiatsu (120 min)', category: 'Massaggi', price: 110, duration: 120 },

  // PACCHETTI SPECIALI
  { name: 'Pacchetto Viso: Esfoliante + pulizia profonda', category: 'Pacchetti', price: 90, duration: 90 },
  { name: 'Pacchetto Relax: Massaggio + pulizia del viso', category: 'Pacchetti', price: 90, duration: 90 },
  { name: 'Pacchetto Benessere: Trattamento anti-age + riflessologia', category: 'Pacchetti', price: 100, duration: 100 },
  { name: 'Giornata Olistica: 3 ore di trattamenti a scelta', category: 'Pacchetti', price: 150, duration: 180 },
];

async function main() {
  console.log('🌱 Seeding services...');

  // Disattiva tutti i servizi esistenti
  await prisma.service.updateMany({
    data: { active: false },
  });

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    });

    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          ...service,
          active: true,
        },
      });
      console.log(`✅ Updated: ${service.name}`);
    } else {
      await prisma.service.create({
        data: {
          ...service,
          active: true,
        },
      });
      console.log(`✅ Created: ${service.name}`);
    }
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
