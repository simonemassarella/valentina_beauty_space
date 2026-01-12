import Image from 'next/image';
import Link from 'next/link';

export default function RiflessologiaPlantarePage() {
  const benefits = [
    { title: 'Rilascia tensioni', desc: 'Libera tensioni fisiche ed emotive accumulate' },
    { title: 'Centratura e calma', desc: 'Aiuta a ritrovare centratura, calma e leggerezza' },
    { title: 'Qualità del sonno', desc: 'Migliora la qualità del sonno e la gestione dello stress' },
    { title: 'Difese naturali', desc: 'Stimola le difese naturali e la vitalità dell\'organismo' },
    { title: 'Equilibrio totale', desc: 'Supporta l\'equilibrio di mente, corpo e cuore' },
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
                Trattamento Olistico
              </p>
              <h1 className="home-section-title mb-4 reveal-on-scroll" data-reveal-order="2">
                Riflessologia <span className="text-primary">Plantare</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Un trattamento che parte dai piedi, ma arriva dritto al cuore del benessere.
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
                  src="/trattamenti-olistici.jpg"
                  alt="Riflessologia Plantare - Trattamento olistico"
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
                <h2 className="h3 mb-4 home-section-title">Un viaggio interiore attraverso i piedi</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  La riflessologia plantare è molto più di una tecnica: è un vero viaggio interiore. 
                  Attraverso la stimolazione di precisi punti riflessi situati sulla pianta del piede, 
                  si lavora in profondità su organi, apparati e, soprattutto, sul sistema energetico 
                  ed emozionale della persona.
                </p>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
                  Ogni piede racconta una storia. Le tensioni accumulate, i blocchi, le emozioni trattenute: 
                  tutto può essere letto, accolto e riequilibrato attraverso il tocco consapevole. È un momento 
                  di ascolto profondo del corpo e delle emozioni, un invito a lasciar andare ciò che appesantisce 
                  per fare spazio a ciò che nutre davvero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="4">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2 home-section-kicker">I benefici</p>
            <h2 className="h3 home-section-title">Perché scegliere la Riflessologia Plantare?</h2>
          </div>
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card card-soft h-100 p-4 reveal-on-scroll" data-reveal-order={5 + index}>
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

      {/* Quote Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="10">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card card-soft p-4 p-lg-5 text-center" style={{ background: 'var(--vel-surface-soft)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto mb-4">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
                <p className="h5 mb-4" style={{ lineHeight: '1.8', fontWeight: '400' }}>
                  Un trattamento delicato, ma potentissimo. Una coccola profonda per chi sente il bisogno 
                  di fermarsi, respirare, ascoltarsi e ritrovare armonia.
                </p>
                <p className="text-muted mb-0">— Valentina Gaudiano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="11">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
