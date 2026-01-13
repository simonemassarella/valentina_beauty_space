import Image from 'next/image';
import Link from 'next/link';

export default function MassaggioEmolinfaticoPage() {
  const steps = [
    { title: 'Accoglienza', desc: 'Momento di ascolto per comprendere le tue esigenze specifiche.' },
    { title: 'Preparazione', desc: 'Applicazione di oli specifici per favorire il drenaggio.' },
    { title: 'Trattamento', desc: 'Manovre lente e ritmate per attivare circolazione e sistema linfatico.' },
    { title: 'Rilassamento finale', desc: 'Momento di integrazione per assorbire i benefici del trattamento.' },
  ];

  const indications = ['Gambe gonfie o pesanti', 'Ritenzione idrica', 'Cellulite', 'Stanchezza cronica', 'Periodi di detox', 'Stress emotivo'];

  const benefits = [
    'Drenaggio profondo e naturale',
    'Miglioramento della microcircolazione',
    'Alleggerimento del corpo',
    'Detossinazione dei tessuti',
    'Rilassamento profondo',
    'Pelle più tonica e luminosa',
  ];

  const faqs = [
    { q: 'Quanto dura il trattamento?', a: 'Una seduta completa dura circa 60 minuti, tempo ideale per un drenaggio efficace.' },
    { q: 'Quante sedute sono consigliate?', a: 'Per risultati ottimali si consigliano cicli di 6-8 sedute, una o due volte a settimana.' },
    { q: 'È indicato in gravidanza?', a: 'Il massaggio linfatico può essere adattato in gravidanza, ma è necessaria una valutazione preventiva.' },
  ];

  return (
    <div className="page-animated">
      {/* Hero Section */}
      <section className="home-section home-section-light reveal-on-scroll py-5" data-reveal-order="1" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="text-center">
            <nav className="mb-4">
              <Link href="/" className="text-muted text-decoration-none small">Home</Link>
              <span className="text-muted mx-2">/</span>
              <Link href="/servizi" className="text-muted text-decoration-none small">Servizi</Link>
              <span className="text-muted mx-2">/</span>
              <span className="small">Massaggio Emolinfatico</span>
            </nav>
            <p className="home-section-kicker text-uppercase text-muted mb-3 reveal-on-scroll" data-reveal-order="1">
              Leggerezza, Detox, Benessere
            </p>
            <h1 className="home-section-title display-4 mb-4 reveal-on-scroll" data-reveal-order="2">
              Massaggio <span className="text-primary">Emolinfatico</span>
            </h1>
            <p className="home-section-subtitle text-muted mx-auto mb-0 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.15rem', maxWidth: '650px' }}>
              Un trattamento dolce ma profondo per stimolare il sistema circolatorio e linfatico, favorendo drenaggio e leggerezza.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="about-hero-image rounded-4 overflow-hidden">
            <Image src="/detox.jpg" alt="Massaggio Emolinfatico" width={1200} height={500} className="img-fluid w-100" style={{ objectFit: 'cover', maxHeight: '500px' }} priority />
          </div>
        </div>
      </section>

      {/* About + Sidebar Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="3">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <h2 className="h3 mb-4 home-section-title">Il Trattamento</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                Il massaggio emolinfatico unisce manovre lente, ritmate e armoniose, studiate per attivare la circolazione sanguigna e il flusso linfatico, aiutando il corpo a eliminare tossine e liquidi in eccesso.
              </p>
              <p className="text-muted mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                Ma non solo: questo trattamento lavora anche sul piano emozionale, favorendo un rilassamento profondo e un senso di connessione con sé stessi.
              </p>

              {/* Indications */}
              <h3 className="h4 mb-4 home-section-title">Indicato per</h3>
              <div className="row g-2 mb-5">
                {indications.map((ind, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="card card-soft p-3 text-center h-100">
                      <span className="small">{ind}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <h3 className="h4 mb-4 home-section-title">Cosa aspettarti durante la seduta</h3>
              <div className="mb-5">
                {steps.map((step, index) => (
                  <div key={index} className="d-flex gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '48px', height: '48px', background: 'var(--vel-surface-soft)', color: 'var(--vel-primary)', fontWeight: '600' }}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="h6 mb-2">{step.title}</h4>
                      <p className="text-muted mb-0 small">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="card card-soft p-4 sticky-top" style={{ top: '100px' }}>
                <h3 className="h5 mb-4">Dettagli Servizio</h3>
                <div className="border-bottom pb-3 mb-3">
                  <p className="text-muted small mb-1">Durata</p>
                  <p className="mb-0 fw-medium">60 minuti</p>
                </div>
                <div className="border-bottom pb-3 mb-3">
                  <p className="text-muted small mb-1">Categoria</p>
                  <p className="mb-0 fw-medium">Massaggio Drenante</p>
                </div>
                <div className="pb-3 mb-3">
                  <p className="text-muted small mb-1">Prezzo</p>
                  <p className="mb-0 fw-medium">A partire da €55</p>
                </div>
                <Link href="/bookings" className="btn btn-primary w-100">Prenota ora</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="4">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-8">
                  <Image src="/detox.jpg" alt="Benefici" width={400} height={300} className="img-fluid rounded-4 w-100" style={{ objectFit: 'cover', height: '280px' }} />
                </div>
                <div className="col-4">
                  <Image src="/trattamenti-estetici.jpg" alt="Detox" width={200} height={300} className="img-fluid rounded-4 w-100" style={{ objectFit: 'cover', height: '280px' }} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <p className="text-uppercase text-muted small mb-2 home-section-kicker">I benefici</p>
              <h2 className="h3 home-section-title mb-4">Benefici principali</h2>
              <div className="row g-3">
                {benefits.map((benefit, index) => (
                  <div className="col-12" key={index}>
                    <div className="d-flex align-items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia Section - Come funziona style */}
      <section className="home-section-alt reveal-on-scroll" data-reveal-order="5">
        <div className="card come-funziona-card border-0 p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <p className="come-funziona-badge mb-1">La filosofia di Valentina</p>
              <h2 className="h3 mb-3 text-white">
                Rilascia, rigenera,<br />ritrova leggerezza
              </h2>
              <p className="mb-3 text-white-50">
                Il massaggio emolinfatico è un invito a rilasciare ciò che il corpo non ha più bisogno di trattenere, per fare spazio a nuova energia, vitalità e armonia interiore.
              </p>
              <Link href="/bookings" className="btn btn-ghost-inverse">
                Prenota il tuo trattamento
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 1</div>
                      <h3 className="h6 mb-2 text-white">Accoglienza</h3>
                      <p className="small mb-0 text-white-50">
                        Momento di ascolto per comprendere le tue esigenze specifiche.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 2</div>
                      <h3 className="h6 mb-2 text-white">Drenaggio profondo</h3>
                      <p className="small mb-0 text-white-50">
                        Manovre lente e ritmate per attivare circolazione e sistema linfatico.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 3</div>
                      <h3 className="h6 mb-2 text-white">Leggerezza totale</h3>
                      <p className="small mb-0 text-white-50">
                        Il corpo si libera dalle tossine, ritrovi energia e vitalità.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="6">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2 home-section-kicker">Domande frequenti</p>
            <h2 className="h3 home-section-title">Hai bisogno di più informazioni?</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, index) => (
                <div key={index} className="card card-soft p-4 mb-3">
                  <h4 className="h6 mb-3 d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                    </svg>
                    {faq.q}
                  </h4>
                  <p className="text-muted mb-0 small">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="7">
        <div className="container">
          <div className="home-cta-banner card-soft d-flex flex-column flex-lg-row align-items-center p-4 p-lg-5">
            <div className="flex-grow-1 col-lg-7">
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Prenota il tuo trattamento</p>
              <h2 className="h4 mb-2 home-section-title">Pronta a ritrovare leggerezza?</h2>
              <p className="text-muted small mb-lg-0">Concediti un momento di depurazione profonda per corpo e mente.</p>
            </div>
            <div className="mt-3 mt-lg-0 ms-lg-auto d-flex flex-column flex-lg-row gap-2">
              <Link href="/bookings" className="btn btn-primary btn-lg">Prenota ora</Link>
              <Link href="/servizi" className="btn btn-outline-primary btn-lg">Altri servizi</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
