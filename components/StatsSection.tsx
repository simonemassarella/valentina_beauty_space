export default function StatsSection() {
  return (
    <section className="stats-section reveal-on-scroll">
      <div className="stats-container">
        <div className="stats-text-content reveal-on-scroll" data-reveal-order="1">
          <p className="stats-kicker">Il nostro percorso in numeri</p>
          <h2 className="stats-title">
            Affidati a un beauty space di<br />esperienza
          </h2>
          <p className="stats-subtitle">
            Trattamenti, percorsi e appuntamenti gestiti ogni giorno<br />
            con cura, ascolto e continuità.
          </p>
        </div>
        <div className="stats-cards-wrapper">
          <div className="stats-card reveal-on-scroll" data-reveal-order="2">
            <div className="stats-card-value">
              <span className="stats-card-number">5,2k+</span>
            </div>
            <div className="stats-card-label">
              Trattamenti<br />effettuati
            </div>
          </div>
          <div className="stats-card reveal-on-scroll" data-reveal-order="3">
            <div className="stats-card-value">
              <span className="stats-card-number">4,9/5</span>
            </div>
            <div className="stats-card-label">
              Valutazione<br />media
            </div>
          </div>
          <div className="stats-card reveal-on-scroll" data-reveal-order="4">
            <div className="stats-card-value">
              <span className="stats-card-number">10+</span>
            </div>
            <div className="stats-card-label">
              Anni<br />di esperienza
            </div>
          </div>
          <div className="stats-card reveal-on-scroll" data-reveal-order="5">
            <div className="stats-card-value">
              <span className="stats-card-number">50+</span>
            </div>
            <div className="stats-card-label">
              Percorsi<br />personalizzati
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
