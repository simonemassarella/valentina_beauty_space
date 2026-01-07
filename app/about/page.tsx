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
                Chi sono
              </p>
              <h1 className="home-section-title mb-3 reveal-on-scroll" data-reveal-order="2">
                Mi chiamo <span className="text-primary">Valentina Gaudiano</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3">
                Credo profondamente che ognuno di noi sia l&apos;artefice del proprio destino e che ogni anima 
                abbia un cammino unico, personale e autentico da seguire. Tutto ciò che nutre e cura l&apos;anima 
                porta beneficio, perché ci riporta in armonia con la nostra vera essenza.
              </p>
              <div className="d-flex flex-wrap gap-2 reveal-on-scroll" data-reveal-order="4">
                <Link href="/bookings" className="btn btn-primary btn-lg">
                  Prenota ora
                </Link>
                <Link href="/servizi" className="btn btn-outline-primary btn-lg">
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
            <p className="stats-kicker">Il mio approccio</p>
            <h2 className="stats-title">Operatrice Olistica specializzata in Shiatsu</h2>
            <p className="stats-subtitle">
              Sono anche Giver di Kundalini Activation e Astral Work, pratiche profonde che accompagnano 
              il risveglio interiore e la connessione con la parte più autentica di sé.
            </p>
          </div>
          <div className="stats-cards-wrapper">
            <div className="stats-card reveal-on-scroll" data-reveal-order="2">
              <div className="stats-card-value">
                <span className="stats-card-number">01</span>
              </div>
              <div className="stats-card-label">Corpo, mente e spirito</div>
              <div className="stats-card-sub">
                Un approccio olistico che unisce tutte le dimensioni del tuo essere.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="3">
              <div className="stats-card-value">
                <span className="stats-card-number">02</span>
              </div>
              <div className="stats-card-label">Spazio sicuro e accogliente</div>
              <div className="stats-card-sub">
                Un luogo dove esplorare il tuo potenziale e vivere esperienze di trasformazione.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="4">
              <div className="stats-card-value">
                <span className="stats-card-number">03</span>
              </div>
              <div className="stats-card-label">Crescita continua</div>
              <div className="stats-card-sub">
                Siamo in costante formazione e lavoro su noi stesse, evolvendo insieme a te.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="5">
              <div className="stats-card-value">
                <span className="stats-card-number">04</span>
              </div>
              <div className="stats-card-label">Rispetto e presenza</div>
              <div className="stats-card-sub">
                Ti accompagniamo con amore in un percorso di guarigione e crescita interiore.
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
            <p className="text-uppercase text-muted small mb-1 home-section-kicker">Il mio spazio</p>
            <h2 className="h3 mb-3 home-section-title">Molto più di un centro estetico</h2>
            <p className="text-muted mb-0 home-section-subtitle mx-auto">
              Quello che oggi viene chiamato &quot;centro estetico&quot; per me è molto di più. 
              È un luogo che si sta trasformando, passo dopo passo, in uno spazio sempre più personale, 
              consapevole e olistico, dove bellezza e benessere si incontrano. 
              Vivendo il presente, sto costruendo con amore e intenzione la mia strada.
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
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">Insieme siamo una forza</p>
              <h2 className="h3 mb-2 home-section-title">Accanto a me c&apos;è Sabrina</h2>
              <p className="text-muted mb-0 home-section-subtitle">
                Una donna dolce, sensibile, elegante ed emotiva. Una forza silenziosa che forse ancora non riconosce 
                pienamente, ma che io vedo ogni giorno. Mi ha accompagnata fin dai primi passi di questa espansione 
                professionale. Le sono profondamente grata per la sua presenza costante.
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
                    <div className="services-card-media-kicker">Founder &amp; Operatrice Olistica</div>
                    <div className="services-card-media-title">Valentina Gaudiano</div>
                    <div className="team-card-desc">
                      Operatrice Olistica specializzata in Shiatsu, Giver di Kundalini Activation e Astral Work. 
                      Il mio approccio unisce corpo, mente e spirito, creando uno spazio sicuro e accogliente 
                      in cui ogni persona può esplorare il proprio potenziale energetico. La cura dell&apos;anima 
                      è fondamentale per il benessere totale.
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
                    <div className="services-card-media-kicker">Estetica &amp; Trattamenti</div>
                    <div className="services-card-media-title">Sabrina Muccitelli</div>
                    <div className="team-card-desc">
                      Sono profondamente fiera del suo percorso: ha fatto grandi passi verso sé stessa e verso 
                      questo lavoro. Si occupa di depilazione, trattamenti laser, Endospheres Therapy, pedicure 
                      e molto altro, portando professionalità e cura in ogni gesto.
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
                  <Link href="/servizi" className="btn btn-outline-primary">
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
              <Link href="/servizi" className="btn btn-outline-primary btn-lg">
                Vedi i trattamenti
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
