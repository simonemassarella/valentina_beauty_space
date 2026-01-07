import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allServices = await prisma.service.findMany({ where: { active: true } });
  const serviceIds = allServices.map(s => ({ id: s.id }));
  
  await prisma.operator.update({
    where: { id: 'valentina' },
    data: { services: { set: serviceIds } },
  });
  
  await prisma.operator.update({
    where: { id: 'sabrina' },
    data: { services: { set: serviceIds } },
  });
  
  console.log('✅ Assegnati ' + allServices.length + ' servizi a entrambe le operatrici');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
