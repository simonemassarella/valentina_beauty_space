const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const listino = {
  trattamenti_estetici: [
    {
      categoria: 'VISO',
      servizi: [
        { nome: 'Pulizia profonda', prezzo: '€40' },
        { nome: 'Trattamento anti-age schiarente', prezzo: '€70' },
        { nome: 'Luminosità ritrovata', prezzo: '€60' },
      ],
    },
    {
      categoria: 'PIEDI',
      servizi: [
        { nome: 'Pedicure estetico', prezzo: '€23' },
        { nome: 'Pedicure con smalto semipermanente', prezzo: '€30' },
        { nome: 'Pedicure curativo', prezzo: '€30' },
        { nome: 'Pedicure curativo con smalto semipermamente', prezzo: '€40' },
        { nome: 'Rimozione smalto semipermanente', prezzo: '€10/€15' },
      ],
    },
    {
      categoria: 'EPILAZIONE',
      servizi: [
        { nome: 'Completa', prezzo: '€40' },
        { nome: 'Inguine', prezzo: '€8/€15' },
        { nome: 'Braccia', prezzo: '€12' },
        { nome: 'Labbro + sopracciglia', prezzo: '€8' },
        { nome: 'Labbro', prezzo: '€3' },
        { nome: 'Sopracciglia', prezzo: '€7/€10' },
        { nome: 'Mento', prezzo: '€6/€10' },
        { nome: 'Gamba intera', prezzo: '€20' },
        { nome: 'Mezza gamba', prezzo: '€15' },
        { nome: 'Ascelle', prezzo: '€8' },
        { nome: 'Glutei', prezzo: '€10' },
      ],
    },
    {
      categoria: 'UOMO',
      servizi: [
        { nome: 'Braccia', prezzo: '€15/€18' },
        { nome: 'Schiena', prezzo: '€20/€25' },
        { nome: 'Petto', prezzo: '€20/€25' },
        { nome: 'Gambe', prezzo: '€25' },
        { nome: 'Completo', prezzo: '€60' },
      ],
    },
    {
      categoria: 'CORPO',
      servizi: [
        { nome: 'Trattamento corpo/addome/glutei', prezzo: '€50/€80' },
        { nome: 'Endosphere (a seduta)', prezzo: '€100/€120' },
      ],
    },
  ],
  trattamenti_olistici: [
    {
      categoria: 'MASSAGGI',
      servizi: [
        { nome: 'Riflessologia plantare (50 min)', prezzo: '€40' },
        { nome: 'Viso con pietre preziose (40 min)', prezzo: '€35' },
        { nome: 'Bioenergetico personalizzato (60 min)', prezzo: '€60' },
        { nome: 'Bioenergetico personalizzato (90 min)', prezzo: '€80' },
        { nome: 'Bioenergetico Hotstone (90 min)', prezzo: '€90' },
        { nome: 'Decontratturante (60 min)', prezzo: '€50' },
        { nome: 'Decontratturante (40 min)', prezzo: '€35' },
        { nome: 'Emolinfatico/modellante (40 min)', prezzo: '€35' },
        { nome: 'Shiatsu (60 min)', prezzo: '€50' },
        { nome: 'Shiatsu (90 min)', prezzo: '€80' },
        { nome: 'Shiatsu (120 min)', prezzo: '€110' },
      ],
    },
  ],
  pacchetti_speciali: [
    { nome: 'Viso: Esfoliante + pulizia profonda', prezzo: '€90' },
    { nome: 'Relax: Massaggio + pulizia del viso', prezzo: '€90' },
    { nome: 'Benessere: Trattamento anti-age + riflessologia', prezzo: '€100' },
    { nome: 'Giornata Olistica: 3 ore di trattamenti a scelta', prezzo: '€150' },
  ],
};

function parsePrezzi(nome, prezzoStr) {
  const cleaned = prezzoStr.replace(/€/g, '').trim();
  const parts = cleaned.split('/').map((p) => p.trim()).filter(Boolean);
  const results = [];

  for (const part of parts) {
    const num = Number(part.replace(',', '.'));
    if (!Number.isNaN(num)) {
      const label = parts.length > 1 ? `${nome} (${part})` : nome;
      results.push({ name: label, price: num });
    }
  }

  if (results.length === 0) {
    console.warn('Prezzo non parsabile per servizio', nome, prezzoStr);
  }

  return results;
}

async function importGroup(groups, macroCategory) {
  for (const group of groups) {
    const category = group.categoria || macroCategory;

    for (const svc of group.servizi) {
      const parsed = parsePrezzi(svc.nome, svc.prezzo);
      // Estetici: durata default 30, Olistici/Massaggi: 60, Pacchetti: 90
      const baseDuration =
        macroCategory === 'MASSAGGI' || macroCategory === 'OLISTICO'
          ? 60
          : macroCategory === 'PACCHETTO'
            ? 90
            : 30;

      for (const variant of parsed) {
        await prisma.service.create({
          data: {
            name: variant.name,
            price: variant.price,
            duration: baseDuration,
            active: false,
            category,
          },
        });
      }
    }
  }
}

async function main() {
  console.log('Import servizi dal listino JSON...');

  await importGroup(listino.trattamenti_estetici, 'ESTETICO');
  await importGroup(listino.trattamenti_olistici, 'OLISTICO');

  for (const p of listino.pacchetti_speciali) {
    const parsed = parsePrezzi(p.nome, p.prezzo);
    for (const variant of parsed) {
      await prisma.service.create({
        data: {
          name: variant.name,
          price: variant.price,
          duration: 90,
          active: false,
          category: 'PACCHETTO',
        },
      });
    }
  }

  console.log('Import completato.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
