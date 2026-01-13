import Image from 'next/image';
import Link from 'next/link';

export default function MassaggioVisoCristalliPage() {
  const steps = [
    { title: 'Accoglienza e centratura', desc: 'Un momento di connessione per prepararti al rituale.' },
    { title: 'Selezione dei cristalli', desc: 'Scelta intuitiva delle pietre più adatte al tuo stato energetico.' },
    { title: 'Massaggio viso', desc: 'Manovre delicate con i cristalli per distendere e riequilibrare.' },
    { title: 'Integrazione finale', desc: 'Momento di silenzio per assorbire i benefici del trattamento.' },
  ];

  const crystals = [
    { name: 'Diaspro Rosso', desc: 'Radicante e stimolante, dona forza vitale e sicurezza.', color: '#8B4513' },
    { name: 'Tormalina Nera', desc: 'Protezione e scarico di tensioni fisiche ed emotive.', color: '#1a1a1a' },
    { name: 'Quarzo Rosa', desc: 'Amore e dolcezza, apre il cuore alle emozioni autentiche.', color: '#FFB6C1' },
  ];

  const benefits = [
    'Distende i muscoli facciali',
    'Stimola la microcircolazione',
    'Dona luminosità alla pelle',
    'Effetto anti-age naturale',
    'Rilascio di blocchi interiori',
    'Profonda sensazione di pace',
  ];

  const faqs = [
    { q: 'Quanto dura il trattamento?', a: 'Il massaggio viso con cristalli dura circa 45-60 minuti, un tempo ideale per un lavoro profondo sia estetico che energetico.' },
    { q: 'È adatto a tutti i tipi di pelle?', a: 'Sì, il trattamento è delicato e adatto a tutti i tipi di pelle. I cristalli vengono utilizzati con oli naturali selezionati.' },
    { q: 'Quali benefici posso aspettarmi?', a: 'Oltre ai benefici estetici immediati (pelle luminosa, tratti distesi), noterai un profondo senso di calma e riequilibrio emotivo.' },
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
              <span>Massaggio Viso con Cristalli</span>
            </nav>
            <p className="home-section-kicker reveal-on-scroll" data-reveal-order="1">
              Trattamento Energetico ed Emotivo
            </p>
            <h1 className="home-section-title display-4 mb-4 reveal-on-scroll" data-reveal-order="2">
              Massaggio Viso con <span className="text-primary">Cristalli</span>
            </h1>
            <p className="home-section-subtitle mx-auto mb-0 reveal-on-scroll" data-reveal-order="3">
              Un rituale di bellezza profonda che va oltre l&apos;estetica: riequilibra corpo, mente 
              ed emozioni attraverso il tocco delicato e la forza vibrazionale dei cristalli.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="service-detail-hero-image">
            <Image
              src="/viso-luminosita.jpg"
              alt="Massaggio Viso con Cristalli"
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
                Questo massaggio viso con l&apos;uso di pietre preziose è pensato per riequilibrare corpo, 
                mente ed emozioni attraverso il tocco delicato e la forza vibrazionale dei cristalli.
              </p>
              <p className="home-section-subtitle mb-5">
                Il trattamento agisce su più livelli: sul piano fisico distende i muscoli facciali, 
                stimola la microcircolazione e dona luminosità alla pelle. La sua azione rilassante 
                ha anche un effetto anti-age naturale. Sul piano energetico ed emozionale, favorisce 
                il rilascio di blocchi interiori e dona una profonda sensazione di pace.
              </p>

              {/* Crystals */}
              <h3 className="h4 mb-4 home-section-title">I Cristalli Utilizzati</h3>
              <div className="row g-3 mb-5">
                {crystals.map((crystal, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card card-soft p-3 h-100 text-center">
                      <div 
                        className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '60px', height: '60px', background: crystal.color }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12l4 6-10 13L2 9z"/>
                        </svg>
                      </div>
                      <h4 className="h6 mb-2">{crystal.name}</h4>
                      <p className="home-section-subtitle small mb-0">{crystal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

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
                  <p className="service-detail-sidebar-value">45-60 minuti</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Categoria</p>
                  <p className="service-detail-sidebar-value">Trattamento Viso Olistico</p>
                </div>
                <div className="service-detail-sidebar-item">
                  <p className="service-detail-sidebar-label">Prezzo</p>
                  <p className="service-detail-sidebar-value">A partire da €60</p>
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
                <Image src="/viso-luminosita.jpg" alt="Benefici" width={400} height={280} className="img-fluid" />
                <Image src="/trattamenti-estetici.jpg" alt="Cristalli" width={200} height={280} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <p className="home-section-kicker">I benefici</p>
              <h2 className="h3 home-section-title mb-4">Perché scegliere questo trattamento</h2>
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
                Un rituale di bellezza<br />e consapevolezza
              </h2>
              <p className="mb-3 text-white-50">
                Un momento tutto per te, dove ogni gesto è cura, ogni pietra è guida, ogni emozione è accolta.
              </p>
              <Link href="/bookings" className="btn btn-ghost-inverse">
                Prenota il tuo rituale
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 1</div>
                      <h3 className="h6 mb-2 text-white">Connessione</h3>
                      <p className="small mb-0 text-white-50">
                        Creiamo insieme uno spazio sicuro per accogliere le tue emozioni.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 2</div>
                      <h3 className="h6 mb-2 text-white">Energia dei cristalli</h3>
                      <p className="small mb-0 text-white-50">
                        I cristalli lavorano sui tuoi punti energetici per riequilibrarti.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card come-funziona-step h-100">
                    <div className="card-body p-3">
                      <div className="text-white-50 small mb-1">Passo 3</div>
                      <h3 className="h6 mb-2 text-white">Luminosità ritrovata</h3>
                      <p className="small mb-0 text-white-50">
                        Il viso risplende, riflettendo l&apos;armonia interiore raggiunta.
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
              <h2 className="h4 mb-2 home-section-title">Pronta a riscoprire la tua luce interiore?</h2>
              <p className="home-section-subtitle small mb-lg-0">
                Lasciati guidare dall&apos;energia dei cristalli verso un profondo benessere fisico ed emotivo.
              </p>
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
