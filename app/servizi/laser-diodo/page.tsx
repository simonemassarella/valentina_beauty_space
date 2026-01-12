import Image from 'next/image';
import Link from 'next/link';

export default function LaserDiodoPage() {
  const benefits = [
    { title: 'Epilazione definitiva', desc: 'Riduzione permanente dei peli superflui fino al 90%' },
    { title: 'Adatto a tutti i fototipi', desc: 'Tecnologia sicura per tutti i tipi di pelle' },
    { title: 'Trattamento veloce', desc: 'Sedute rapide anche per aree estese del corpo' },
    { title: 'Indolore', desc: 'Sistema di raffreddamento integrato per il massimo comfort' },
    { title: 'Pelle liscia', desc: 'Risultati visibili già dalle prime sedute' },
    { title: 'Niente più irritazioni', desc: 'Addio a follicolite, peli incarniti e irritazioni da rasoio' },
  ];

  const areas = [
    'Viso e baffetti',
    'Ascelle',
    'Braccia',
    'Inguine e bikini',
    'Gambe complete',
    'Schiena e petto',
  ];

  return (
    <div className="page-animated">
      {/* Hero Section */}
      <section className="home-section home-section-light reveal-on-scroll py-5" data-reveal-order="1" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Link href="/servizi" className="text-muted text-decoration-none small">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Servizi
                </Link>
              </div>
              <p className="home-section-kicker text-uppercase text-muted mb-2 reveal-on-scroll" data-reveal-order="1">
                Epilazione Definitiva
              </p>
              <h1 className="home-section-title mb-4 reveal-on-scroll" data-reveal-order="2">
                Laser <span className="text-primary">Diodo</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                La tecnologia più avanzata per l&apos;epilazione definitiva. Dì addio ai peli superflui 
                con un trattamento sicuro, efficace e praticamente indolore.
              </p>
              <div className="d-flex flex-wrap gap-2 reveal-on-scroll" data-reveal-order="4">
                <Link href="/bookings" className="btn btn-primary btn-lg">
                  Prenota ora
                </Link>
                <Link href="/servizi" className="btn btn-outline-primary btn-lg">
                  Altri servizi
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-hero-image reveal-on-scroll" data-reveal-order="2">
                <Image
                  src="/laser-diodo.jpg"
                  alt="Laser Diodo - Epilazione definitiva"
                  width={600}
                  height={500}
                  className="img-fluid w-100 rounded-4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="3">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8 mx-auto">
              <div className="card card-soft p-4 p-lg-5">
                <h2 className="h3 mb-4 home-section-title">Come funziona il Laser Diodo</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  Il laser a diodo emette un fascio di luce concentrato che viene assorbito dalla melanina 
                  presente nel bulbo pilifero. Questo processo, chiamato fototermolisi selettiva, distrugge 
                  il follicolo senza danneggiare i tessuti circostanti, impedendo la ricrescita del pelo.
                </p>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  La nostra tecnologia di ultima generazione è dotata di un sistema di raffreddamento 
                  integrato che rende il trattamento confortevole e adatto anche alle zone più sensibili. 
                  I risultati sono progressivi e duraturi nel tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="4">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <p className="text-uppercase text-muted small mb-2 home-section-kicker">Zone trattabili</p>
              <h2 className="h3 home-section-title mb-4">Aree di intervento</h2>
              <p className="text-muted">
                Il laser diodo può essere utilizzato su tutto il corpo, dalle zone più piccole 
                come il viso alle aree più estese come le gambe complete.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {areas.map((area, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="card card-soft p-3 h-100 reveal-on-scroll" data-reveal-order={5 + index}>
                      <div className="d-flex align-items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span className="small">{area}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="11">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2 home-section-kicker">I benefici</p>
            <h2 className="h3 home-section-title">Perché scegliere il Laser Diodo</h2>
          </div>
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card card-soft h-100 p-4 reveal-on-scroll" data-reveal-order={12 + index}>
                  <div className="d-flex align-items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="h6 mb-2">{benefit.title}</h3>
                      <p className="text-muted small mb-0">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="18">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card card-soft p-4 p-lg-5" style={{ background: 'var(--vel-surface-soft)' }}>
                <div className="d-flex align-items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-1">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  <div>
                    <h3 className="h5 mb-3">Valutazione personalizzata</h3>
                    <p className="text-muted mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                      Prima di iniziare il percorso di epilazione laser, è necessaria una consulenza 
                      per valutare il tuo fototipo e definire il protocollo più adatto. Contattaci 
                      per una valutazione gratuita e senza impegno.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="19">
        <div className="container">
          <div className="home-cta-banner card-soft d-flex flex-column flex-lg-row align-items-center p-4 p-lg-5">
            <div className="flex-grow-1 col-lg-7">
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Prenota il tuo trattamento</p>
              <h2 className="h4 mb-2 home-section-title">Pronta a dire addio ai peli superflui?</h2>
              <p className="text-muted small mb-lg-0">
                Prenota una consulenza gratuita per scoprire il percorso laser più adatto a te.
              </p>
            </div>
            <div className="mt-3 mt-lg-0 ms-lg-auto d-flex flex-column flex-lg-row gap-2">
              <Link href="/bookings" className="btn btn-primary btn-lg">
                Prenota ora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
