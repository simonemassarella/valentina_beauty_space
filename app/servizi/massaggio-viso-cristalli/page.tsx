import Image from 'next/image';
import Link from 'next/link';

export default function MassaggioVisoCristalliPage() {
  const crystals = [
    { 
      name: 'Diaspro Rosso', 
      desc: 'Radicante e stimolante, dona forza vitale e sicurezza, aiutando a ritrovare centratura e stabilità.',
      color: '#8B4513'
    },
    { 
      name: 'Tormalina Nera', 
      desc: 'Pietra di protezione, ideale per scaricare tensioni fisiche ed emotive, liberando la mente da pensieri negativi.',
      color: '#1a1a1a'
    },
    { 
      name: 'Quarzo Rosa', 
      desc: 'Il cristallo dell\'amore e della dolcezza. Porta armonia, apre il cuore e favorisce il contatto profondo con le emozioni più autentiche.',
      color: '#FFB6C1'
    },
  ];

  const benefits = [
    { level: 'Piano fisico', items: ['Distende i muscoli facciali', 'Stimola la microcircolazione', 'Dona luminosità alla pelle', 'Effetto anti-age naturale', 'Leviga i tratti del viso'] },
    { level: 'Piano energetico', items: ['Rilascio di blocchi interiori', 'Alleggerisce la mente', 'Profonda sensazione di pace', 'Riequilibrio emozionale'] },
  ];

  return (
    <div className="page-animated">
      {/* Hero Section */}
      <section className="home-section home-section-light reveal-on-scroll py-5" data-reveal-order="1" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
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
                Trattamento Energetico ed Emotivo
              </p>
              <h1 className="home-section-title mb-4 reveal-on-scroll" data-reveal-order="2">
                Massaggio Viso con <span className="text-primary">Cristalli</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
                Un rituale di bellezza profonda che va oltre l&apos;estetica: riequilibra corpo, mente 
                ed emozioni attraverso il tocco delicato e la forza vibrazionale dei cristalli.
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
                  src="/viso-luminosita.jpg"
                  alt="Massaggio Viso con Cristalli"
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

      {/* Crystals Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="3">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2 home-section-kicker">Le pietre</p>
            <h2 className="h3 home-section-title">Tre cristalli dalla potente energia</h2>
          </div>
          <div className="row g-4">
            {crystals.map((crystal, index) => (
              <div className="col-md-4" key={index}>
                <div className="card card-soft h-100 p-4 text-center reveal-on-scroll" data-reveal-order={4 + index}>
                  <div 
                    className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      background: crystal.color,
                      boxShadow: `0 8px 30px ${crystal.color}40`
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 13L2 9z"/>
                      <path d="M11 3 8 9l4 13 4-13-3-6"/>
                      <path d="M2 9h20"/>
                    </svg>
                  </div>
                  <h3 className="h5 mb-3">{crystal.name}</h3>
                  <p className="text-muted small mb-0">{crystal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="7">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-uppercase text-muted small mb-2 home-section-kicker">I benefici</p>
            <h2 className="h3 home-section-title">Un trattamento che agisce su più livelli</h2>
          </div>
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div className="col-md-6" key={index}>
                <div className="card card-soft h-100 p-4 reveal-on-scroll" data-reveal-order={8 + index}>
                  <h3 className="h5 mb-4 d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    {benefit.level}
                  </h3>
                  <ul className="list-unstyled mb-0">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="d-flex align-items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                  Un momento tutto per te, dove ogni gesto è cura, ogni pietra è guida, 
                  ogni emozione è accolta.
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
              <h2 className="h4 mb-2 home-section-title">Pronta a riscoprire la tua luce interiore?</h2>
              <p className="text-muted small mb-lg-0">
                Lasciati guidare dall&apos;energia dei cristalli verso un profondo benessere fisico ed emotivo.
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
