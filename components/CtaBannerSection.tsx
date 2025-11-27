import Link from 'next/link';

export default function CtaBannerSection() {
  return (
    <section className="home-section home-section-light reveal-on-scroll">
      <div
        className="home-cta-banner card-soft d-flex flex-column flex-lg-row align-items-center p-4 p-lg-5 reveal-on-scroll"
        data-reveal-order="1"
      >
        <div className="flex-grow-1">
          <p className="text-uppercase text-muted small mb-1 home-section-kicker">Prenditi una pausa</p>
          <h2 className="h4 mb-2 home-section-title">Ritrova spazio per te, anche nelle giornate piene</h2>
          <p className="text-muted small mb-3 home-section-subtitle mb-lg-0">
            Scegli giorno, orario e trattamento direttamente online: al resto pensiamo noi, dall&apos;accoglienza al tuo rientro nella quotidianità.
          </p>
        </div>
        <div className="mt-3 mt-lg-0 ms-lg-4 d-flex flex-column flex-sm-row gap-2">
          <Link href="/bookings" className="btn btn-primary btn-lg">
            Prenota un trattamento
          </Link>
          <Link href="/services" className="btn btn-outline-primary btn-lg">
            Scopri tutti i servizi
          </Link>
        </div>
      </div>
    </section>
  );
}
