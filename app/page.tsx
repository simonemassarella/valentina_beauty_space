import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="hero-section d-flex align-items-center">
      <div className="row w-100 g-4 align-items-center">
        <div className="col-lg-6">
          <span className="badge badge-soft mb-3">Beauty &amp; Wellness</span>
          <h1 className="display-5 fw-semibold mb-3">
            Prenota il tuo momento di relax
            <br />
            al <span className="text-primary">Centro Estetico Valentina</span>
          </h1>
          <p className="lead text-muted mb-4">
            Gestisci in autonomia le tue prenotazioni, scopri i nostri servizi di bellezza e
            accedi all&apos;area clienti per tenere sotto controllo appuntamenti e profilo.
          </p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Link href="/bookings" className="btn btn-primary btn-lg">
              Prenota ora
            </Link>
            <Link href="/services" className="btn btn-outline-primary btn-lg">
              Scopri i servizi
            </Link>
          </div>
          <p className="text-muted small mb-0">
            Accesso riservato agli operatori tramite <span className="fw-semibold">Area Admin</span>.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <h2 className="h4 mb-3">Prenotazione rapida</h2>
            <p className="text-muted small mb-4">
              In pochi click scegli operatrice, servizio, giorno e orario tra quelli disponibili.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">✓ Massaggi rilassanti e decontratturanti</li>
              <li className="mb-2">✓ Manicure &amp; Pedicure professionali</li>
              <li className="mb-2">✓ Promemoria gratuiti il giorno prima</li>
            </ul>
            <Link href="/register" className="btn btn-primary w-100 mb-2">
              Crea il tuo account clienti
            </Link>
            <Link href="/login" className="btn btn-outline-primary w-100">
              Ho già un account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
