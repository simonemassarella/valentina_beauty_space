import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="page-animated">
      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="1">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <p
                className="home-section-kicker text-uppercase text-muted mb-2 reveal-on-scroll"
                data-reveal-order="1"
              >
                Chi siamo
              </p>
              <h1 className="home-section-title mb-3 reveal-on-scroll" data-reveal-order="2">
                Radicate nel benessere,
                <br />
                elevate dalla bellezza.
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3">
                Valentina beauty space è un luogo calmo, elegante e su misura: un punto d’incontro tra
                manualità, tecnologie selezionate e una relazione di fiducia costruita nel tempo.
              </p>
              <div className="d-flex flex-wrap gap-2 reveal-on-scroll" data-reveal-order="4">
                <Link href="/bookings" className="btn btn-primary btn-lg">
                  Prenota ora
                </Link>
                <Link href="/services" className="btn btn-outline-primary btn-lg">
                  Scopri i servizi
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-hero-collage">
                <div
                  className="about-hero-collage-card about-hero-collage-card--main reveal-on-scroll"
                  data-reveal-order="2"
                >
                  <Image
                    src="/trattamenti-estetici.jpg"
                    alt="Dettagli del centro e dei trattamenti"
                    width={980}
                    height={720}
                    className="img-fluid w-100"
                    priority
                  />
                </div>
                <div
                  className="about-hero-collage-card about-hero-collage-card--side reveal-on-scroll"
                  data-reveal-order="3"
                >
                  <Image
                    src="/trattamenti-olistici.jpg"
                    alt="Ambiente rilassante e rituali di benessere"
                    width={720}
                    height={720}
                    className="img-fluid w-100"
                    priority
                  />
                </div>
                <div
                  className="about-hero-collage-card about-hero-collage-card--side reveal-on-scroll"
                  data-reveal-order="4"
                >
                  <Image
                    src="/pacchetti-speciali.jpg"
                    alt="Pacchetti speciali e percorsi personalizzati"
                    width={720}
                    height={720}
                    className="img-fluid w-100"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section reveal-on-scroll" data-reveal-order="3">
        <div className="stats-container">
          <div className="stats-text-content reveal-on-scroll" data-reveal-order="1">
            <p className="stats-kicker">I nostri valori</p>
            <h2 className="stats-title">La tua esperienza, al centro</h2>
            <p className="stats-subtitle">
              Ogni gesto è pensato per farti sentire accolta: dal primo contatto fino al percorso più
              strutturato.
            </p>
          </div>
          <div className="stats-cards-wrapper">
            <div className="stats-card reveal-on-scroll" data-reveal-order="2">
              <div className="stats-card-value">
                <span className="stats-card-number">01</span>
              </div>
              <div className="stats-card-label">Ascolto e personalizzazione</div>
              <div className="stats-card-sub">
                Partiamo da un colloquio dedicato per capire esigenze, stile di vita e obiettivi.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="3">
              <div className="stats-card-value">
                <span className="stats-card-number">02</span>
              </div>
              <div className="stats-card-label">Formazione continua</div>
              <div className="stats-card-sub">
                Tecniche aggiornate e protocolli selezionati per risultati visibili e sicuri.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="4">
              <div className="stats-card-value">
                <span className="stats-card-number">03</span>
              </div>
              <div className="stats-card-label">Cura dei dettagli</div>
              <div className="stats-card-sub">
                Dall’accoglienza alla cabina, ogni dettaglio è pensato per il tuo relax.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="5">
              <div className="stats-card-value">
                <span className="stats-card-number">04</span>
              </div>
              <div className="stats-card-label">Trasparenza e continuità</div>
              <div className="stats-card-sub">
                Ti accompagniamo nel tempo con una relazione serena e una pianificazione semplice.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
   <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="2">
        <div className="container">
          <div className="text-center">
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">La nostra promessa</p>
            <h2 className="h3 mb-3 home-section-title">Self-care è più semplice in un luogo che ti capisce</h2>
            <p className="text-muted mb-0 home-section-subtitle mx-auto">
              Nel nostro spazio calmo e delicato, la cura diventa un rituale: pelle, mente e respiro
              trovano un nuovo equilibrio.
            </p>
          </div>
        </div>
      </section> */}
      <section className="home-section home-section-light reveal-on-scroll " data-reveal-order="4">
        <div className="container ">
          <div className="text-center my-5">
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">La nostra promessa</p>
            <h2 className="h3 mb-3 home-section-title">Self-care è più semplice in un luogo che ti capisce</h2>
            <p className="text-muted mb-0 home-section-subtitle mx-auto">
              Nel nostro spazio calmo e delicato, la cura diventa un rituale: pelle, mente e respiro
              trovano un nuovo equilibrio.
            </p>
          </div>
          {/* <div className="text-center mb-4">
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">Entra nel nostro spazio</p>
            <h2 className="h3 mb-0 home-section-title">Un santuario di calma</h2>
          </div> */}
          <div className="about-media-card card-soft">
            <Image
              src="/Background.svg"
              alt="Interni del centro Valentina beauty space"
              width={1200}
              height={700}
              className="img-fluid w-100 about-media-image"
              priority
            />
            <button type="button" className="about-media-play" aria-label="Riproduci video">
              <span aria-hidden="true">▶</span>
            </button>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="5">
        <div className="container">
          <div className="text-center mb-4">
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">Il nostro percorso</p>
            <h2 className="h3 mb-0 home-section-title">Traguardi in bellezza &amp; cura</h2>
          </div>
          <div className="row g-3 about-milestones">
            <div className="col-6 col-lg-3">
              <div className="card card-soft about-milestone-card h-100">
                <div className="about-milestone-year">2018</div>
                <div className="about-milestone-text text-muted small">
                  Nasce il nostro spazio: accoglienza e trattamenti essenziali.
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card card-soft about-milestone-card h-100">
                <div className="about-milestone-year">2020</div>
                <div className="about-milestone-text text-muted small">
                  Percorsi più strutturati e protocolli personalizzati.
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card card-soft about-milestone-card h-100">
                <div className="about-milestone-year">2022</div>
                <div className="about-milestone-text text-muted small">
                  Selezione di tecnologie e partnership dedicate.
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card card-soft about-milestone-card h-100">
                <div className="about-milestone-year">Oggi</div>
                <div className="about-milestone-text text-muted small">
                  Prenotazione online e percorsi su misura, sempre più semplici.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="7">
        <div className="container">
          <div className="row g-4 align-items-end mb-3">
            <div className="col-lg-7">
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Il team</p>
              <h2 className="h3 mb-2 home-section-title">Conosci chi si prende cura di te</h2>
              <p className="text-muted mb-0 home-section-subtitle">
                Un piccolo team, grande attenzione: professionalità, ascolto e continuità in ogni
                appuntamento.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="services-card card-soft team-card text-decoration-none h-100 d-block" tabIndex={0}>
                <div className="services-card-media" aria-hidden="true">
                  <Image
                    src="/valentina.svg"
                    alt=""
                    width={638}
                    height={475}
                    className="img-fluid w-100"
                    loading="lazy"
                  />
                  <div className="services-card-media-overlay" aria-hidden="true" />
                  <div className="services-card-media-text">
                    <div className="services-card-media-kicker">Founder</div>
                    <div className="services-card-media-title">Valentina Gaudiano</div>
                    <div className="team-card-desc">
                      è una professionista del settore estetico con una solida esperienza nella cura e nel benessere
                      della persona. Dopo un percorso di formazione continua e specializzata, ha sviluppato
                      competenze approfondite nei trattamenti estetici, nella cura delle mani e dei piedi e nei
                      percorsi di benessere personalizzati.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="services-card card-soft team-card text-decoration-none h-100 d-block" tabIndex={0}>
                <div className="services-card-media" aria-hidden="true">
                  <Image
                    src="/sabrina.svg"
                    alt=""
                    width={638}
                    height={475}
                    className="img-fluid w-100"
                    loading="lazy"
                  />
                  <div className="services-card-media-overlay" aria-hidden="true" />
                  <div className="services-card-media-text">
                    <div className="services-card-media-kicker">Collaboratrice</div>
                    <div className="services-card-media-title">Sabrina Muccitelli</div>
                    <div className="team-card-desc">
                      è una professionista del settore estetico con una solida esperienza nella cura e nel benessere
                      della persona. Dopo un percorso di formazione continua e specializzata, ha sviluppato
                      competenze approfondite nei trattamenti estetici, nella cura delle mani e dei piedi e nei
                      percorsi di benessere personalizzati.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll" data-reveal-order="6">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="about-highlight-card card-soft h-100">
                <div className="about-highlight-media" aria-hidden="true">
                  <Image
                    src="/pacchetti-speciali.jpg"
                    alt=""
                    width={900}
                    height={680}
                    className="img-fluid w-100"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-form-card card-soft h-100">
                <p className="text-uppercase text-muted small mb-1 home-section-kicker">Consiglio su misura</p>
                <h2 className="h4 mb-2 home-section-title">Raccontaci cosa desideri ottenere</h2>
                <p className="text-muted small mb-3">
                  Se vuoi un aiuto per scegliere il trattamento giusto, puoi contattarci o prenotare una
                  consulenza. Ti rispondiamo con indicazioni chiare e personalizzate.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link href="/bookings" className="btn btn-primary">
                    Prenota una consulenza
                  </Link>
                  <Link href="/services" className="btn btn-outline-primary">
                    Guarda il listino
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="8">
        <div className="container">
          <div className="home-cta-banner card-soft d-flex flex-column flex-lg-row align-items-center p-4 p-lg-5">
            <div className="flex-grow-1 col-lg-6 col-md-12">
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Resta luminosa</p>
              <h2 className="h4 mb-2 home-section-title">Prenota il tuo prossimo momento di benessere</h2>
              <p className="text-muted small mb-3 home-section-subtitle mb-lg-0">
                Scegli giorno e orario online: noi ti aspettiamo con un percorso pensato davvero per te.
              </p>
            </div>
            <div className="col-md-6 col-lg-6 mt-3 mt-lg-0 ms-lg-auto d-flex flex-column flex-lg-row gap-2 w-100 w-lg-auto">
              <Link href="/bookings" className="btn btn-primary btn-lg">
                Prenota ora
              </Link>
              <Link href="/services" className="btn btn-outline-primary btn-lg">
                Vedi i trattamenti
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
