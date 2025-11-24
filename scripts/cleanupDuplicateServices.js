const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Pulizia servizi duplicati...');

  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' },
  });

  const groups = new Map();

  for (const s of services) {
    // Chiave: stesso nome (case-insensitive) e stesso prezzo
    const key = `${(s.name || '').trim().toUpperCase()}||${s.price}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }

  let toDeleteIds = [];

  for (const [_key, list] of groups.entries()) {
    if (list.length <= 1) continue;

    // Tieni sempre il primo (più vecchio) e prova a rimuovere tutti gli altri
    const [keep, ...rest] = list;

    for (const s of rest) {
      // Non toccare i servizi che hanno prenotazioni collegate
      // così non rompiamo nulla di già usato.
      // Se non ha booking, è sicuro eliminarlo perché esiste già un gemello (keep).
      // eslint-disable-next-line no-await-in-loop
      const count = await prisma.booking.count({ where: { serviceId: s.id } });
      if (count === 0) {
        toDeleteIds.push(s.id);
      }
    }
  }

  if (toDeleteIds.length === 0) {
    console.log('Nessun duplicato da rimuovere.');
  } else {
    console.log(`Rimuovo ${toDeleteIds.length} servizi duplicati...`);
    await prisma.service.deleteMany({ where: { id: { in: toDeleteIds } } });
    console.log('Pulizia completata.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
