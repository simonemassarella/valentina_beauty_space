export default function StatsSection() {
  return (
    <section className="home-section home-section-light reveal-on-scroll">
      <div className="row g-4 align-items-center">
        <div className="col-lg-4 reveal-on-scroll" data-reveal-order="1">
          <p className="text-uppercase text-muted small mb-1 home-section-kicker">Il nostro percorso in numeri</p>
          <h2 className="h4 mb-3 home-section-title">Affidati a un beauty space di esperienza</h2>
          <p className="text-muted small mb-0 home-section-subtitle">
            Trattamenti, percorsi e appuntamenti gestiti ogni giorno con cura, ascolto e continuità.
          </p>
        </div>
        <div className="col-lg-8">
          <div className="row g-3 home-stats-grid">
            <div className="col-6 col-md-3">
              <div
                className="card card-soft home-stat-card h-100 text-center text-md-start reveal-on-scroll"
                data-reveal-order="2"
              >
                <div className="home-stat-value mb-1">
                  <span className="home-stat-icon" aria-hidden="true">
                    ★
                  </span>
                  <span className="home-stat-number">5,2k+</span>
                </div>
                <div className="home-stat-label">Trattamenti effettuati</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div
                className="card card-soft home-stat-card h-100 text-center text-md-start reveal-on-scroll"
                data-reveal-order="3"
              >
                <div className="home-stat-value mb-1">
                  <span className="home-stat-icon" aria-hidden="true">
                    ★
                  </span>
                  <span className="home-stat-number">4,9/5</span>
                </div>
                <div className="home-stat-label">Valutazione media</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card card-soft home-stat-card h-100 text-center text-md-start reveal-on-scroll">
                <div className="home-stat-value mb-1">
                  <span className="home-stat-icon" aria-hidden="true">
                    ⏱
                  </span>
                  <span className="home-stat-number">10+</span>
                </div>
                <div className="home-stat-label">Anni di esperienza</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card card-soft home-stat-card h-100 text-center text-md-start reveal-on-scroll">
                <div className="home-stat-value mb-1">
                  <span className="home-stat-icon" aria-hidden="true">
                    ♡
                  </span>
                  <span className="home-stat-number">50+</span>
                </div>
                <div className="home-stat-label">Percorsi personalizzati</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
