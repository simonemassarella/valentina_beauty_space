import Link from 'next/link';
import Image from 'next/image';

const EXPERIENCES = [
  {
    key: 'endospheres',
    category: 'Rimodellamento',
    name: 'Endospheres corpo',
    imageSrc: '/trattamenti-estetici.jpg',
    imageAlt: 'Trattamento Endospheres corpo',
  },
  {
    key: 'laser',
    category: 'Epilazione',
    name: 'Laser diodo',
    imageSrc: '/pacchetti-speciali.jpg',
    imageAlt: 'Epilazione laser diodo',
  },
  {
    key: 'viso',
    category: 'Viso',
    name: 'Percorso viso luminosità',
    imageSrc: '/trattamenti-olistici.jpg',
    imageAlt: 'Trattamento viso luminosità',
  },
  {
    key: 'massaggio',
    category: 'Massaggi',
    name: 'Massaggio rilassante',
    imageSrc: '/trattamenti-estetici.jpg',
    imageAlt: 'Massaggio rilassante',
  },
  {
    key: 'corpo',
    category: 'Body care',
    name: 'Detox body wrap',
    imageSrc: '/pacchetti-speciali.jpg',
    imageAlt: 'Trattamento detox body wrap',
  },
  {
    key: 'sguardo',
    category: 'Sguardo',
    name: 'Ciglia & sopracciglia',
    imageSrc: '/trattamenti-olistici.jpg',
    imageAlt: 'Trattamenti ciglia e sopracciglia',
  },
];

export default function EsperienzePage() {
  return (
    <div className="page-animated">
      <section className="hero-section hero-section-full hero-section-compact position-relative text-white reveal-on-scroll" data-reveal-order="1">
        <div className="hero-section-background" aria-hidden="true">
          <Image
            src="/Background.svg"
            alt="Sfondo con foglie verdi"
            fill
            priority
            sizes="100vw"
            className="hero-section-background-image"
          />
          <div className="hero-section-background-overlay" />
        </div>

        <div className="hero-section-inner hero-section-content">
          <div className="hero-section-content-wrapper">
            <h1 className="hero-section-title mt-5">
              Le nostre <span className="hero-title-highlight">Esperienze</span>
            </h1>


            <div className="hero-section-text">
              <p className="hero-section-subtitle">
                Relax. Rigenera. Ripeti. Una selezione di trattamenti pensati per farti sentire più leggera,
                luminosa e in equilibrio.
              </p>
            </div>

            <div className="small text-white-50">
              <Link href="/" className="text-white-50 text-decoration-none">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span>Esperienze</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="row align-items-start g-4 mb-4">
            <div className="col-lg-6">
              <h2 className="home-section-title mb-0">Relax. Rigenera. Ripeti.</h2>
            </div>
            <div className="col-lg-6">
              <p className="home-section-subtitle text-muted mb-0">
                Dalla skincare ai percorsi corpo e relax, le nostre esperienze sono pensate per incontrare i tuoi
                obiettivi di bellezza e benessere.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {EXPERIENCES.map((exp, index) => (
              <div className="col-md-6 col-lg-4" key={exp.key}>
                <Link
                  href="/services"
                  className="services-card card-soft text-decoration-none h-100 d-block reveal-on-scroll"
                  data-reveal-order={3 + index}
                >
                  <div className="services-card-media">
                    <img src={exp.imageSrc} alt={exp.imageAlt} loading="lazy" />
                    <div className="services-card-media-overlay" aria-hidden="true" />
                    <div className="services-card-media-text">
                      <div className="services-card-media-kicker">{exp.category}</div>
                      <div className="services-card-media-title">{exp.name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card-soft services-cta-banner mt-5 mb-4 reveal-on-scroll" data-reveal-order="3">
        <div className="row align-items-center g-3">
          <div className="col-lg-8">
            <h2 className="h4 mb-2">Pronta a riconnetterti con te stessa?</h2>
            <p className="mb-0 text-white-50">
              Prenota la tua prossima esperienza o chiedi al centro di creare un percorso personalizzato per il tuo
              benessere.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="services-cta-buttons d-flex flex-wrap justify-content-lg-end gap-2">
              <Link href="/bookings" className="btn btn-light">
                Prenota ora
              </Link>
              <Link href="/services" className="btn btn-outline-light">
                Esplora il listino
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}