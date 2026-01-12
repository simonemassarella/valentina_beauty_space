import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="page-animated">
      <section className="home-section home-section-light reveal-on-scroll py-5" data-reveal-order="1" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p
                className="home-section-kicker text-uppercase text-muted mb-2 reveal-on-scroll"
                data-reveal-order="1"
              >
                Chi sono
              </p>
              <h1 className="home-section-title mb-4 reveal-on-scroll" data-reveal-order="2">
                Mi chiamo <span className="text-primary">Valentina Gaudiano</span>
              </h1>
              <p className="home-section-subtitle text-muted mb-4 reveal-on-scroll" data-reveal-order="3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Credo profondamente che ognuno di noi sia l&apos;artefice del proprio destino e che ogni anima 
                abbia un cammino unico, personale e autentico da seguire. Non esistono scelte giuste o sbagliate 
                in senso assoluto: esiste il proprio percorso, quello che è perfetto per sé. Tutto ciò che nutre 
                e cura l&apos;anima porta beneficio, perché ci riporta in armonia con la nostra vera essenza.
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
              <div className="about-hero-image reveal-on-scroll" data-reveal-order="2">
                <Image
                  src="/valentina-gaudiano.svg"
                  alt="Valentina Gaudiano - Fondatrice e Operatrice Olistica"
                  width={600}
                  height={700}
                  className="img-fluid w-100 rounded-4"
                  priority
                />
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
              il risveglio interiore e la connessione con la parte più autentica di sé. Il mio approccio 
              unisce corpo, mente e spirito, creando uno spazio sicuro e accogliente in cui ogni persona 
              può esplorare il proprio potenziale energetico e vivere un&apos;esperienza di trasformazione profonda.
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
                Sono in continua formazione e in costante lavoro su me stessa. Questo spazio cresce ed evolve insieme a me.
              </div>
            </div>
            <div className="stats-card reveal-on-scroll" data-reveal-order="5">
              <div className="stats-card-value">
                <span className="stats-card-number">04</span>
              </div>
              <div className="stats-card-label">Rispetto e presenza</div>
              <div className="stats-card-sub">
                Ti accompagno con rispetto, presenza e amore in un percorso di guarigione e crescita interiore.
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

      {/* <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="5">
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
      </section> */}

      <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="7">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5 order-lg-2">
              <div className="about-team-image reveal-on-scroll" data-reveal-order="2">
                <Image
                  src="/sabrina-muccitelli.svg"
                  alt="Sabrina Muccitelli - Estetica e Trattamenti"
                  width={500}
                  height={600}
                  className="img-fluid w-100 rounded-4"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-7 order-lg-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p className="text-uppercase text-muted small mb-0 home-section-kicker">Insieme siamo una forza</p>
              </div>
              <h2 className="h3 mb-3 home-section-title">Accanto a me c&apos;è Sabrina</h2>
              <p className="text-muted mb-3 home-section-subtitle">
                La mia collaboratrice. Una donna dolce, sensibile, elegante ed emotiva. Una forza silenziosa che forse 
                ancora non riconosce pienamente, ma che io vedo ogni giorno. È una persona capace, affidabile, che mi ha 
                accompagnata fin dai primi passi di questa espansione professionale.
              </p>
              <p className="text-muted mb-3 home-section-subtitle">
                Sono profondamente fiera del suo percorso: ha fatto grandi passi verso sé stessa e verso questo lavoro. 
                Le sono grata per la sua presenza costante, per la capacità di restare anche nei miei momenti di profondo 
                cambiamento, senza giudizio, ma con uno sguardo colmo di stima e fiducia. Crede in ciò che le trasmetto 
                e questo, per me, è un dono immenso. Senza saperlo, mi ha aiutata a credere ancora di più in me stessa.
              </p>
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="small text-muted">Depilazione</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="small text-muted">Laser</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="small text-muted">Endospheres</span>
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

      {/* <section className="home-section home-section-light reveal-on-scroll" data-reveal-order="8">
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
      </section> */}
    </div>
  );
}
