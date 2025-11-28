import Link from 'next/link';

export default function HowItWorksSection() {
  return (
    <section className="home-section-alt reveal-on-scroll">
      <div className="card come-funziona-card border-0 p-4 p-lg-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5 reveal-on-scroll" data-reveal-order="1">
            <p className="come-funziona-badge mb-1">Come funziona</p>
            <h2 className="h3 mb-3 text-white">
              Dalla scelta del servizio al tuo
              <br />
              momento di relax
            </h2>
            <p className="mb-3 text-white-50">
              In pochi passi puoi selezionare il trattamento, scegliere l&apos;operatrice e trovare
              l&apos;orario perfetto per te.
            </p>
            <Link href="/bookings" className="btn btn-ghost-inverse">
              Prenota un trattamento
            </Link>
          </div>
          <div className="col-lg-7">
            <div className="row g-3">
              <div className="col-md-4">
                <div
                  className="card come-funziona-step h-100 reveal-on-scroll"
                  data-reveal-order="2"
                >
                  <div className="card-body p-3">
                    <div className="text-white-50 small mb-1">Passo 1</div>
                    <h3 className="h6 mb-2 text-white">Scegli il servizio</h3>
                    <p className="small mb-0 text-white-50">
                      Sfoglia il listino e trova il trattamento che meglio risponde alle tue
                      esigenze.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card come-funziona-step h-100 reveal-on-scroll"
                  data-reveal-order="3"
                >
                  <div className="card-body p-3">
                    <div className="text-white-50 small mb-1">Passo 2</div>
                    <h3 className="h6 mb-2 text-white">Seleziona operatrice e orario</h3>
                    <p className="small mb-0 text-white-50">
                      Vedi in tempo reale le disponibilità e scegli la fascia oraria più comoda.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card come-funziona-step h-100 reveal-on-scroll"
                  data-reveal-order="4"
                >
                  <div className="card-body p-3">
                    <div className="text-white-50 small mb-1">Passo 3</div>
                    <h3 className="h6 mb-2 text-white">Conferma e rilassati</h3>
                    <p className="small mb-0 text-white-50">
                      Ricevi subito la conferma via email e un promemoria il giorno prima
                      dell&apos;appuntamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
