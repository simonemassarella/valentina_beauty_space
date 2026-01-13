import Image from 'next/image';
import Link from 'next/link';

export default function MassaggioDecontratturantePage() {
  const steps = [
    { title: 'Valutazione iniziale', desc: 'Ascolto delle tue esigenze e individuazione delle zone di tensione.' },
    { title: 'Riscaldamento tessuti', desc: 'Manovre preparatorie per attivare la circolazione e preparare i muscoli.' },
    { title: 'Lavoro profondo', desc: 'Pressioni mirate e manovre intense sulle contratture e blocchi.' },
    { title: 'Rilascio e integrazione', desc: 'Manovre dolci per favorire il rilascio completo e il riequilibrio.' },
  ];

  const benefits = [
    'Scioglimento delle contratture muscolari',
    'Maggiore libertà di movimento',
    'Miglioramento della postura',
    'Stimolazione della circolazione',
    'Sblocco energetico lungo i meridiani',
    'Alleggerimento emotivo e leggerezza interiore',
  ];

  const areas = ['Schiena', 'Spalle', 'Cervicale', 'Gambe', 'Lombare', 'Braccia'];

  const faqs = [
    { q: 'È un massaggio doloroso?', a: 'Il massaggio è intenso ma calibrato sulle tue esigenze. Comunicherai sempre con l\'operatrice per regolare la pressione.' },
    { q: 'Quanto dura il trattamento?', a: 'Una seduta completa dura circa 60-75 minuti per permettere un lavoro profondo e completo.' },
    { q: 'Ogni quanto è consigliato?', a: 'Per tensioni croniche si consigliano cicli di 4-6 sedute. Per mantenimento, una seduta mensile.' },
  ];

  return (
    <div className="page-animated">
      {/* Hero Section */}
      <section className="home-section home-section-light service-detail-hero reveal-on-scroll" data-reveal-order="1">
        <div className="container">
          <div className="text-center">
            <nav className="service-detail-breadcrumb">
              <Link href="/">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/servizi">Servizi</Link>
              <span className="mx-2">/</span>
              <span>Massaggio Decontratturante</span>
            </nav>
            <p className="home-section-kicker reveal-on-scroll" data-reveal-order="1">
              Trattamento Olistico
            </p>
            <h1 className="home-section-title display-4 mb-4 reveal-on-scroll" data-reveal-order="2">
              Massaggio Decontratturante <span className="text-primary">Bioenergetico</span>
            </h1>
            <p className="home-section-subtitle mx-auto mb-0 reveal-on-scroll" data-reveal-order="3">
              Un trattamento profondo che libera il corpo dalle tensioni muscolari e l&apos;anima dai blocchi emotivi.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="service-detail-hero-image">
            <Image src="/massaggio-rilassante.jpg" alt="Massaggio Decontratturante Bioenergetico" width={1200} height={500} className="img-fluid w-100" priority />
          </div>
        </div>
      </section>

      {/* About + Sidebar Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="3">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <h2 className="h3 mb-4 home-section-title">Il Trattamento</h2>
              <p className="home-section-subtitle mb-4">
                Il massaggio decontratturante bioenergetico nasce dall&apos;unione tra la tecnica manuale e l&apos;ascolto profondo del corpo come sistema energetico. Non si lavora solo sulle contratture, ma su tutto ciò che nel corpo trattiene: stress, emozioni non espresse, pesi quotidiani.
              </p>
              <p className="home-section-subtitle mb-5">
                Attraverso pressioni mirate, manovre intense ma calibrate e movimenti consapevoli, il trattamento aiuta a sciogliere rigidità, restituendo flessibilità, vitalità e benessere.
              </p>

              {/* Areas */}
              <h3 className="h4 mb-4 home-section-title">Zone trattate</h3>
              <div className="row g-2 mb-5">
                {areas.map((area, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="card card-soft p-3 text-center">
                      <span className="small">{area}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <h3 className="h4 mb-4 home-section-title">Cosa aspettarti durante la seduta</h3>
              <div className="mb-5">
                {steps.map((step, index) => (
                  <div key={index} className="service-detail-step">
                    <div className="service-detail-step-number">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="service-detail-step-title">{step.title}</h4>
                      <p className="service-detail-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="service-detail-sidebar sticky-top" style={{ top: '100px' }}>
                <h3 className="service-detail-sidebar-title">Dettagli Servizio</h3>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Durata</p>
                  <p className="service-detail-sidebar-value">60-75 minuti</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Categoria</p>
                  <p className="service-detail-sidebar-value">Massaggio Olistico</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Prezzo</p>
                  <p className="service-detail-sidebar-value">A partire da €60</p>
                </div>
                <Link href="/bookings" className="btn btn-primary w-100 mt-3">Prenota ora</Link>
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
              <div className="service-detail-images">
                <Image src="/massaggio-rilassante.jpg" alt="Benefici" width={400} height={280} className="img-fluid" />
                <Image src="/trattamenti-olistici.jpg" alt="Relax" width={200} height={280} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="home-section-kicker">I benefici</p>
              <h2 className="h3 home-section-title mb-4">Cosa puoi ottenere</h2>
              <div className="service-detail-benefits-grid">
                {benefits.map((benefit, index) => (
                  <div className="service-detail-benefit" key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>{benefit}</span>
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
                Libera il corpo,<br />ritrova te stessa
              </h2>
              <p className="mb-3 text-white-50">
                Un momento dedicato a te, per ritrovare la tua energia, il tuo respiro, la tua centratura. Un invito ad abitare il corpo con più presenza e libertà.
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
                      <h3 className="h6 mb-2 text-white">Ascolto del corpo</h3>
                      <p className="small mb-0 text-white-50">
                        Individuiamo insieme le zone di tensione e i blocchi da sciogliere.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 2</div>
                      <h3 className="h6 mb-2 text-white">Lavoro profondo</h3>
                      <p className="small mb-0 text-white-50">
                        Manovre mirate per sciogliere contratture e liberare l&apos;energia bloccata.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 3</div>
                      <h3 className="h6 mb-2 text-white">Leggerezza ritrovata</h3>
                      <p className="small mb-0 text-white-50">
                        Il corpo si rilassa, la mente si libera, ritrovi la tua vitalità.
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
            <p className="home-section-kicker">Domande frequenti</p>
            <h2 className="h3 home-section-title">Hai bisogno di più informazioni?</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, index) => (
                <div key={index} className="service-detail-faq">
                  <div className="service-detail-faq-question">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                    </svg>
                    <span>{faq.q}</span>
                  </div>
                  <p className="service-detail-faq-answer">{faq.a}</p>
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
              <p className="home-section-kicker">Prenota il tuo trattamento</p>
              <h2 className="h4 mb-2 home-section-title">Pronta a liberarti dalle tensioni?</h2>
              <p className="home-section-subtitle small mb-lg-0">Concediti un trattamento profondo per sciogliere contratture e ritrovare la tua vitalità.</p>
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
