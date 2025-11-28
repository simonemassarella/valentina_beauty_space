'use client';

import Link from 'next/link';
import Image from 'next/image';

const EXPERIENCES = [
  {
    key: 'endospheres',
    name: 'Endospheres corpo',
    description: 'Trattamenti rimodellanti e drenanti per gambe leggere e silhouette più armoniosa.',
    imageSrc: '/endospheres-logo.svg',
    imageAlt: 'Trattamento Endospheres corpo',
    bullets: [
      'Aiuta a migliorare il microcircolo e il drenaggio dei liquidi',
      'Ideale per gambe pesanti, ritenzione e sensazione di gonfiore',
      'Percorsi personalizzati in base alla tua esigenza',
    ],
  },
  {
    key: 'laser',
    name: 'Laser diodo',
    description: 'Epilazione progressivamente definitiva per viso e corpo, in totale sicurezza.',
    imageSrc: '/feature-1.svg',
    imageAlt: 'Illustrazione trattamento laser diodo',
    bullets: [
      'Riduzione progressiva del pelo nelle zone desiderate',
      'Trattamenti mirati su viso, ascelle, inguine, gambe e schiena',
      'Protocollo studiato in base al fototipo e all’area da trattare',
    ],
  },
  {
    key: 'viso',
    name: 'Percorso viso luminosità',
    description: 'Cicli di trattamenti per una pelle più uniforme, luminosa e distesa.',
    imageSrc: '/feature-2.svg',
    imageAlt: 'Illustrazione percorso viso luminosità',
    bullets: [
      'Detersione profonda e trattamenti illuminanti su misura',
      'Focus su macchie, grana irregolare e segni di stanchezza',
      'Programmi in più sedute per risultati visibili nel tempo',
    ],
  },
  {
    key: 'massaggio',
    name: 'Massaggio rilassante',
    description:
      'Momento di benessere decontratturante per schiena, spalle e zone di maggiore tensione.',
    imageSrc: '/feature-3.svg',
    imageAlt: 'Illustrazione massaggio rilassante',
    bullets: [
      'Aiuta ad allentare tensioni muscolari e mentali',
      'Perfetto dopo giornate intense o periodi di stress',
      'Disponibile in diverse durate, anche come percorso',
    ],
  },
];

export default function EsperienzePage() {
  return (
    <div className="page-animated">
      {/* Hero esperienze */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="1">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <p className="home-section-kicker text-uppercase text-muted mb-2">
                Le nostre esperienze
              </p>
              <h1 className="home-section-title mb-3">
                I trattamenti più amati
                <br />
                dalle nostre clienti.
              </h1>
              <p className="home-section-subtitle text-muted mb-4">
                Una selezione di servizi pensati per farti sentire più leggera, luminosa e in
                equilibrio. Puoi prenotare direttamente online oppure parlarne con noi per
                costruire un percorso completo.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link href="/bookings" className="btn btn-primary btn-lg">
                  Prenota ora
                </Link>
                <Link href="/services" className="btn btn-outline-primary btn-lg">
                  Vai al listino completo
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="services-hero-image">
                <Image
                  src="/Background.svg"
                  alt="Dettaglio delle esperienze di benessere del centro"
                  width={900}
                  height={600}
                  className="img-fluid w-100"
                  style={{ objectFit: 'cover', maxHeight: '340px' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi in evidenza */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8">
              <p className="home-section-kicker text-uppercase text-muted mb-2">
                Servizi in evidenza
              </p>
              <h2 className="home-section-title mb-2">Le nostre esperienze più richieste</h2>
              <p className="home-section-subtitle text-muted mb-0">
                Scegli il trattamento che più senti tuo: dal rimodellante corpo al massaggio
                rilassante, fino ai percorsi viso luminosità e all’epilazione laser di ultima
                generazione.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {EXPERIENCES.map((exp, index) => (
              <div className="col-md-6 col-lg-3" key={exp.key}>
                <div
                  className="card card-soft home-feature-card h-100 reveal-on-scroll"
                  data-reveal-order={2 + index}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                      <Image
                        src={exp.imageSrc}
                        alt={exp.imageAlt}
                        width={64}
                        height={64}
                        className="mb-2"
                      />
                    </div>
                    <h3 className="h5 mb-2">{exp.name}</h3>
                    <p className="text-muted mb-3">{exp.description}</p>
                    <ul className="small text-muted mb-3">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-auto d-flex flex-wrap gap-2">
                      <Link href="/bookings" className="btn btn-primary btn-sm">
                        Prenota questo servizio
                      </Link>
                      <Link href="/services" className="btn btn-outline-primary btn-sm">
                        Vedi dettagli e listino
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="6">
        <div className="container">
          <div className="card home-cta-banner border-0 p-4 p-md-5">
            <div className="row align-items-center g-3">
              <div className="col-lg-8">
                <p className="home-section-kicker text-uppercase text-muted mb-2">
                  Non sai da dove iniziare?
                </p>
                <h2 className="home-section-title mb-2">
                  Parliamone insieme e scegliamo la tua prossima esperienza.
                </h2>
                <p className="home-section-subtitle text-muted mb-0">
                  Possiamo consigliarti il trattamento o il percorso più adatto a te e programmare
                  il tuo momento di relax passo dopo passo.
                </p>
              </div>
              <div className="col-lg-4">
                <div className="d-flex flex-wrap justify-content-lg-end gap-2 mt-3 mt-lg-0">
                  <Link href="/bookings" className="btn btn-primary">
                    Prenota una consulenza
                  </Link>
                  <Link href="/services" className="btn btn-outline-primary">
                    Vai al listino prezzi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}