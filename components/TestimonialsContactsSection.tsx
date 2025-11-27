export default function TestimonialsContactsSection() {
  return (
    <section className="home-section home-section-muted home-section-full reveal-on-scroll">
      <div className="container">
        <div className="row g-4 align-items-stretch">
        <div className="col-lg-6">
          <div
            className="card card-soft home-testimonial-card border-0 p-4 h-100 reveal-on-scroll"
            data-reveal-order="1"
          >
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">Cosa dicono le nostre clienti</p>
            <h2 className="h4 mb-3 home-section-title">Un beauty space di fiducia</h2>
            <p className="text-muted small mb-3 home-section-subtitle">
              Le recensioni raccontano di un ambiente familiare, trattamenti efficaci e piccoli
              dettagli che fanno la differenza.
            </p>
            <div className="d-flex flex-column gap-2 small">
              <div>
                <div className="fw-semibold">Marta</div>
                <div className="text-muted">
                  "Ogni volta esco con la pelle luminosa e la testa leggera. Prenotare online è
                  semplicissimo."
                </div>
              </div>
              <div>
                <div className="fw-semibold">Giulia</div>
                <div className="text-muted">
                  "Ambiente curato e operatrici dolcissime. Mi sento davvero ascoltata e seguita."
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="card card-soft home-contacts-card border-0 p-4 h-100 reveal-on-scroll"
            data-reveal-order="2"
          >
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">Orari e contatti</p>
            <h2 className="h4 mb-3 home-section-title">Ti aspettiamo in istituto</h2>
            <p className="text-muted small mb-3 home-section-subtitle">
              Per informazioni sui trattamenti, disponibilità particolari o percorsi personalizzati
              puoi scriverci o chiamarci direttamente.
            </p>
            <ul className="list-unstyled small mb-3">
              <li className="mb-1">
                <span className="fw-semibold">Lunedì - Sabato:</span> 10:30 - 19:00
              </li>
              <li className="mb-1">
                <span className="fw-semibold">Telefono:</span> +39 000 000 000
              </li>
              <li className="mb-1">
                <span className="fw-semibold">Email:</span> info@centroesteticovalentina.it
              </li>
            </ul>
            <p className="text-muted small mb-0">
              Prenotando online puoi scegliere in autonomia giorno, orario e trattamento, in
              qualsiasi momento.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
