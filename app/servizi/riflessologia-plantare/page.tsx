import Image from 'next/image';
import Link from 'next/link';

export default function RiflessologiaPlantarePage() {
  const steps = [
    { title: 'Accoglienza e ascolto', desc: 'Un momento iniziale per comprendere le tue esigenze e il tuo stato emotivo e fisico.' },
    { title: 'Preparazione', desc: 'Rilassamento guidato e preparazione dei piedi con oli naturali.' },
    { title: 'Trattamento', desc: 'Stimolazione dei punti riflessi con pressioni mirate e tocco consapevole.' },
    { title: 'Riequilibrio finale', desc: 'Manovre dolci per integrare il lavoro svolto e riportare armonia.' },
  ];

  const benefits = [
    'Rilascia tensioni fisiche ed emotive',
    'Aiuta a ritrovare centratura, calma e leggerezza',
    'Migliora la qualità del sonno e la gestione dello stress',
    'Stimola le difese naturali e la vitalità dell\'organismo',
    'Supporta l\'equilibrio di mente, corpo e cuore',
    'Favorisce il rilascio di blocchi energetici',
  ];

  const faqs = [
    { q: 'Quanto dura una seduta di riflessologia plantare?', a: 'Una seduta completa dura circa 50-60 minuti, tempo necessario per un lavoro profondo e rilassante.' },
    { q: 'È doloroso il trattamento?', a: 'No, il trattamento è piacevole e rilassante. Alcune zone potrebbero risultare più sensibili, ma il tocco viene sempre calibrato sulle tue esigenze.' },
    { q: 'Quante sedute sono consigliate?', a: 'Dipende dalle tue esigenze. Per un riequilibrio profondo si consigliano cicli di 4-6 sedute, ma anche una singola seduta può portare benefici immediati.' },
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
              <span>Riflessologia Plantare</span>
            </nav>
            <p className="home-section-kicker reveal-on-scroll" data-reveal-order="1">
              Trattamento Olistico
            </p>
            <h1 className="home-section-title display-4 mb-4 reveal-on-scroll" data-reveal-order="2">
              Riflessologia <span className="text-primary">Plantare</span>
            </h1>
            <p className="home-section-subtitle mx-auto mb-0 reveal-on-scroll" data-reveal-order="3">
              Un trattamento che parte dai piedi, ma arriva dritto al cuore del benessere.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="service-detail-hero-image">
            <Image
              src="/trattamenti-olistici.jpg"
              alt="Riflessologia Plantare - Trattamento olistico"
              width={1200}
              height={500}
              className="img-fluid w-100"
              priority
            />
          </div>
        </div>
      </section>

      {/* About + Sidebar Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="3">
        <div className="container">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8">
              <h2 className="h3 mb-4 home-section-title">Il Trattamento</h2>
              <p className="home-section-subtitle mb-4">
                La riflessologia plantare è molto più di una tecnica: è un vero viaggio interiore. 
                Attraverso la stimolazione di precisi punti riflessi situati sulla pianta del piede, 
                si lavora in profondità su organi, apparati e, soprattutto, sul sistema energetico 
                ed emozionale della persona.
              </p>
              <p className="home-section-subtitle mb-5">
                Ogni piede racconta una storia. Le tensioni accumulate, i blocchi, le emozioni trattenute: 
                tutto può essere letto, accolto e riequilibrato attraverso il tocco consapevole. È un momento 
                di ascolto profondo del corpo e delle emozioni, un invito a lasciar andare ciò che appesantisce 
                per fare spazio a ciò che nutre davvero.
              </p>

              {/* What to Expect */}
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
                  <p className="service-detail-sidebar-value">50-60 minuti</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Categoria</p>
                  <p className="service-detail-sidebar-value">Trattamento Olistico</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Prezzo</p>
                  <p className="service-detail-sidebar-value">A partire da €50</p>
                </div>
                <Link href="/bookings" className="btn btn-primary w-100 mt-3">
                  Prenota ora
                </Link>
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
                <Image
                  src="/trattamenti-olistici.jpg"
                  alt="Benefici riflessologia"
                  width={400}
                  height={280}
                  className="img-fluid"
                />
                <Image
                  src="/massaggio-rilassante.jpg"
                  alt="Relax"
                  width={200}
                  height={280}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="home-section-kicker">I benefici</p>
              <h2 className="h3 home-section-title mb-4">Perché scegliere la Riflessologia Plantare</h2>
              <div className="service-detail-benefits-grid">
                {benefits.map((benefit, index) => (
                  <div className="service-detail-benefit" key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
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
                Un viaggio verso<br />l&apos;equilibrio interiore
              </h2>
              <p className="mb-3 text-white-50">
                Un trattamento delicato, ma potentissimo. Una coccola profonda per chi sente il bisogno di fermarsi, respirare, ascoltarsi e ritrovare armonia.
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
                      <h3 className="h6 mb-2 text-white">Ascolto profondo</h3>
                      <p className="small mb-0 text-white-50">
                        Ogni seduta inizia con un momento di ascolto per comprendere le tue esigenze.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 2</div>
                      <h3 className="h6 mb-2 text-white">Trattamento mirato</h3>
                      <p className="small mb-0 text-white-50">
                        Lavoro sui punti riflessi per riequilibrare corpo e mente.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 3</div>
                      <h3 className="h6 mb-2 text-white">Benessere duraturo</h3>
                      <p className="small mb-0 text-white-50">
                        Consigli personalizzati per mantenere l&apos;equilibrio raggiunto.
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
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
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
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Prenota il tuo trattamento</p>
              <h2 className="h4 mb-2 home-section-title">Pronta a ritrovare il tuo equilibrio?</h2>
              <p className="text-muted small mb-lg-0">
                Concediti un momento di ascolto profondo e lascia che i tuoi piedi ti guidino verso il benessere.
              </p>
            </div>
            <div className="mt-3 mt-lg-0 ms-lg-auto d-flex flex-column flex-lg-row gap-2">
              <Link href="/bookings" className="btn btn-primary btn-lg">
                Prenota ora
              </Link>
              <Link href="/servizi" className="btn btn-outline-primary btn-lg">
                Altri servizi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
