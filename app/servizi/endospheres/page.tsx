import Image from 'next/image';
import Link from 'next/link';

export default function EndospheresPage() {
  const benefits = [
    { title: 'Rimodellamento corporeo', desc: 'Ridefinisce i contorni del corpo in modo naturale e non invasivo' },
    { title: 'Riduzione cellulite', desc: 'Combatte efficacemente la cellulite e la pelle a buccia d\'arancia' },
    { title: 'Drenaggio linfatico', desc: 'Stimola il sistema linfatico favorendo l\'eliminazione dei liquidi' },
    { title: 'Tonificazione muscolare', desc: 'Rassoda e tonifica i tessuti migliorando l\'elasticità della pelle' },
    { title: 'Circolazione migliorata', desc: 'Attiva la microcircolazione per una pelle più sana e luminosa' },
    { title: 'Risultati visibili', desc: 'Effetti evidenti già dalle prime sedute con risultati duraturi' },
  ];

  const areas = [
    'Gambe e cosce',
    'Glutei',
    'Addome',
    'Braccia',
    'Fianchi',
    'Schiena',
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
                Rimodellamento Corporeo
              </p>
              <h1 className="home-section-title mb-4 reveal-on-scroll" data-reveal-order="2">
                Endosphères <span className="text-primary">Therapy</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                La tecnologia rivoluzionaria per il rimodellamento corporeo. Un trattamento non invasivo 
                che combatte cellulite, ritenzione idrica e inestetismi, donando al corpo tonicità e armonia.
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
                  src="/endospheres-corpo.jpg"
                  alt="Endosphères Therapy - Rimodellamento corporeo"
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
                <h2 className="h3 mb-4 home-section-title">Come funziona Endosphères Therapy</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  Endosphères Therapy utilizza un sistema di microvibrazioni compressive generate da 
                  55 sfere rotanti in silicone. Questa tecnologia brevettata agisce in profondità sui 
                  tessuti, stimolando la circolazione sanguigna e linfatica, riducendo gli accumuli 
                  adiposi e migliorando visibilmente la texture della pelle.
                </p>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  Il trattamento è completamente indolore e piacevole. Ogni seduta viene personalizzata 
                  in base alle tue esigenze specifiche, garantendo risultati ottimali e duraturi nel tempo.
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
                Endosphères Therapy può essere applicata su diverse zone del corpo, 
                adattandosi alle tue esigenze specifiche per un risultato armonioso e naturale.
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
            <h2 className="h3 home-section-title">Perché scegliere Endosphères</h2>
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
                      Il trattamento Endosphères richiede una valutazione personalizzata per definire 
                      il protocollo più adatto alle tue esigenze. Contattaci per una consulenza gratuita 
                      e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.
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
              <h2 className="h4 mb-2 home-section-title">Pronta a riscoprire il tuo corpo?</h2>
              <p className="text-muted small mb-lg-0">
                Prenota una consulenza per scoprire il percorso Endosphères più adatto a te.
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
