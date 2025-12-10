import Image from 'next/image';

export default function WhyChooseSection() {
  return (
    <section className="home-section home-section-light reveal-on-scroll">
      <div className="row g-4">
        <div className="col-12 reveal-on-scroll" data-reveal-order="1">
          <p className="text-uppercase text-muted small mb-1 home-section-kicker">Perché scegliere Valentina</p>
          <h2 className="h3 mb-3 text-primary home-section-title">Un beauty space pensato per te</h2>
          <p className="text-muted mb-4 home-section-subtitle">
            Dal trattamento viso più delicato al massaggio decontratturante, ogni esperienza è
            studiata per farti sentire accolta, ascoltata e valorizzata.
          </p>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft home-feature-card border-0 p-4 h-100 text-center d-flex flex-column align-items-center reveal-on-scroll"
            data-reveal-order="2"
          >
            <Image
              src="/feature-1.svg"
              alt="Illustrazione professionale e ascolto"
              width={140}
              height={150}
              className="mb-3"
            />
            <h3 className="h5 mb-2 text-primary">Professionalità e ascolto</h3>
            <p className="text-muted small mb-0">
              Un team di operatrici esperte che ti accompagna nella scelta del trattamento più
              adatto alla tua pelle e al tuo momento di vita.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft border-0 p-4 h-100 text-center d-flex flex-column align-items-center reveal-on-scroll"
            data-reveal-order="3"
          >
            <Image
              src="/feature-2.svg"
              alt="Illustrazione trattamenti olistici"
              width={140}
              height={150}
              className="mb-3"
            />
            <h3 className="h5 mb-2 text-primary">Trattamenti olistici</h3>
            <p className="text-muted small mb-0">
              Massaggi e percorsi olistici per sciogliere tensioni, ritrovare leggerezza e
              ricaricare le energie in profondità.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card card-soft border-0 p-4 h-100 text-center d-flex flex-column align-items-center reveal-on-scroll"
            data-reveal-order="4"
          >
            <Image
              src="/feature-3.svg"
              alt="Illustrazione prenotazioni senza stress"
              width={150}
              height={160}
              className="mb-3"
            />
            <h3 className="h5 mb-2 text-primary">Prenotazioni senza stress</h3>
            <p className="text-muted small mb-0">
              Prenota e gestisci i tuoi appuntamenti online, con conferma immediata e reminder
              automatici.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
