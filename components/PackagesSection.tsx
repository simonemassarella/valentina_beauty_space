import Link from 'next/link';

export default function PackagesSection() {
  return (
    <section className="home-section home-section-light reveal-on-scroll">
      <div className="row g-4">
        <div className="col-12 text-center reveal-on-scroll" data-reveal-order="1">
          <p className="text-uppercase text-muted small mb-1 home-section-kicker">Percorsi benessere</p>
          <h2 className="h3 mb-3 home-section-title">Scegli il rituale più adatto a te</h2>
          <p className="text-muted mb-4 home-section-subtitle mx-auto">
            Trattamenti pensati per momenti diversi della tua giornata: rilassarti, rigenerarti, ripartire con nuova energia.
          </p>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft home-package-card h-100 reveal-on-scroll"
            data-reveal-order="2"
          >
            <div className="mb-2">
              <span className="home-package-tag">Trattamenti estetici</span>
            </div>
            <h3 className="h5 mb-2">Trattamenti estetici</h3>
            <p className="text-muted small mb-3">
              Viso e corpo sempre curati: trattamenti pensati per mantenere la pelle luminosa, liscia e uniforme nella quotidianità.
            </p>
            <ul className="small text-muted mb-3 ps-3">
              <li>Pulizia viso e trattamenti specifici</li>
              <li>Epilazione delicata e definita</li>
              <li>Cura di mani, piedi e dettagli di bellezza</li>
            </ul>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              {/* <span className="fw-semibold text-primary home-package-duration">Da 60&apos;</span> */}
              <Link href="/services" className="btn btn-outline-primary btn-sm">
                Scopri i dettagli
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft home-package-card home-package-card-dark h-100 reveal-on-scroll"
            data-reveal-order="3"
          >
            <div className="mb-2">
              <span className="home-package-tag">Trattamenti olistici</span>
            </div>
            <h3 className="h5 mb-2">Trattamenti olistici</h3>
            <p className="text-muted small mb-3">
              Massaggi rilassanti e decontratturanti per sciogliere le tensioni, alleggerire la mente e riequilibrare il corpo.
            </p>
            <ul className="small text-muted mb-3 ps-3">
              <li>Massaggi decontratturanti mirati</li>
              <li>Manualità olistiche corpo e testa</li>
              <li>Ideale per ritrovare leggerezza ed energia</li>
            </ul>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              {/* <span className="fw-semibold text-primary home-package-duration">Da 45&apos;</span> */}
              <Link href="/bookings" className="btn btn-primary btn-sm">
                Prenota un trattamento
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft home-package-card h-100 reveal-on-scroll"
            data-reveal-order="4"
          >
            <div className="mb-2">
              <span className="home-package-tag">Pacchetti speciali</span>
            </div>
            <h3 className="h5 mb-2">Pacchetti speciali</h3>
            <p className="text-muted small mb-3">
              Percorsi combinati pensati per occasioni speciali o per regalarti un ciclo di trattamenti su misura.
            </p>
            <ul className="small text-muted mb-3 ps-3">
              <li>Pacchetti regalo personalizzabili</li>
              <li>Rituali viso+corpo a prezzo dedicato</li>
              <li>Consulenza per costruire il tuo percorso ideale</li>
            </ul>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              {/* <span className="fw-semibold text-primary home-package-duration">Da 90&apos;</span> */}
              <Link href="/services" className="btn btn-outline-primary btn-sm">
                Vedi tutti i percorsi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
