 import Link from 'next/link';
 import Image from 'next/image';
 import { getServerSession } from 'next-auth';
 import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;
  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  return (
    <>
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
              Un luogo intimo e accogliente dove ritrovare equilibrio, luce e benessere. Prenota
              online in pochi istanti e lasciati guidare dalle nostre operatrici.
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
              <div className="mb-4 overflow-hidden rounded-4">
                <Image
                  src="https://images.pexels.com/photos/3738344/pexels-photo-3738344.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Donna sorridente durante un trattamento benessere"
                  width={800}
                  height={600}
                  className="img-fluid w-100"
                  style={{ objectFit: 'cover', maxHeight: '260px' }}
                  priority
                />
              </div>
              <h2 className="h4 mb-3">Prenotazione rapida</h2>
              <p className="text-muted small mb-4">
                In pochi click scegli operatrice, servizio, giorno e orario tra quelli disponibili.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">✓ Trattamenti viso e corpo personalizzati</li>
                <li className="mb-2">✓ Massaggi rilassanti e decontratturanti</li>
                <li className="mb-2">✓ Promemoria gratuiti il giorno prima dell&apos;appuntamento</li>
              </ul>
              {isLoggedIn ? (
                <>
                  <Link
                    href={isAdmin ? '/admin/dashboard' : '/bookings'}
                    className="btn btn-primary w-100 mb-2"
                  >
                    {isAdmin ? 'Vai alla dashboard admin' : 'Vai alle tue prenotazioni'}
                  </Link>
                  <Link href="/profile" className="btn btn-outline-primary w-100">
                    Vai al tuo profilo
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="btn btn-primary w-100 mb-2">
                    Crea il tuo account clienti
                  </Link>
                  <Link href="/login" className="btn btn-outline-primary w-100">
                    Ho già un account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="row g-4">
          <div className="col-12">
            <p className="text-uppercase text-muted small mb-1">Perché scegliere Valentina</p>
            <h2 className="h3 mb-3 text-primary">Un beauty space pensato per te</h2>
            <p className="text-muted mb-4">
              Dal trattamento viso più delicato al massaggio decontratturante, ogni esperienza è
              studiata per farti sentire accolta, ascoltata e valorizzata.
            </p>
          </div>
          <div className="col-md-4">
            <div className="card card-soft border-0 p-4 h-100">
              <h3 className="h5 mb-2">Professionalità e ascolto</h3>
              <p className="text-muted small mb-0">
                Un team di operatrici esperte che ti accompagna nella scelta del trattamento più
                adatto alla tua pelle e al tuo momento di vita.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-soft border-0 p-4 h-100">
              <h3 className="h5 mb-2">Trattamenti olistici</h3>
              <p className="text-muted small mb-0">
                Massaggi e percorsi olistici per sciogliere tensioni, ritrovare leggerezza e
                ricaricare le energie in profondità.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-soft border-0 p-4 h-100">
              <h3 className="h5 mb-2">Prenotazioni senza stress</h3>
              <p className="text-muted small mb-0">
                Prenota e gestisci i tuoi appuntamenti online, con conferma immediata e reminder
                automatici.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="py-5">
         <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
           <div className="row g-4 align-items-center">
             <div className="col-lg-5">
               <p className="text-uppercase text-muted small mb-1">Come funziona</p>
               <h2 className="h3 mb-3">Dalla scelta del servizio al tuo momento di relax</h2>
               <p className="text-muted mb-3">
                 In pochi passi puoi selezionare il trattamento, scegliere l&apos;operatrice e trovare
                 l&apos;orario perfetto per te.
               </p>
               <Link href="/bookings" className="btn btn-primary">
                 Inizia una nuova prenotazione
               </Link>
             </div>
             <div className="col-lg-7">
               <div className="row g-3">
                 <div className="col-md-4">
                   <div className="card border-0 h-100">
                     <div className="card-body p-3">
                       <div className="text-muted small mb-1">Passo 1</div>
                       <h3 className="h6 mb-2">Scegli il servizio</h3>
                       <p className="text-muted small mb-0">
                         Sfoglia il listino e trova il trattamento che meglio risponde alle tue
                         esigenze.
                       </p>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-4">
                   <div className="card border-0 h-100">
                     <div className="card-body p-3">
                       <div className="text-muted small mb-1">Passo 2</div>
                       <h3 className="h6 mb-2">Seleziona operatrice e orario</h3>
                       <p className="text-muted small mb-0">
                         Vedi in tempo reale le disponibilità e scegli la fascia oraria più comoda.
                       </p>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-4">
                   <div className="card border-0 h-100">
                     <div className="card-body p-3">
                       <div className="text-muted small mb-1">Passo 3</div>
                       <h3 className="h6 mb-2">Conferma e rilassati</h3>
                       <p className="text-muted small mb-0">
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

       <section className="py-5">
         <div className="row g-4 align-items-stretch">
           <div className="col-lg-6">
             <div className="card card-soft border-0 p-4 h-100">
               <p className="text-uppercase text-muted small mb-1">Cosa dicono le nostre clienti</p>
               <h2 className="h4 mb-3">Un beauty space di fiducia</h2>
               <p className="text-muted small mb-3">
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
             <div className="card card-soft border-0 p-4 h-100">
               <p className="text-uppercase text-muted small mb-1">Orari e contatti</p>
               <h2 className="h4 mb-3">Ti aspettiamo in istituto</h2>
               <p className="text-muted small mb-3">
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
       </section>
     </>
   );
 }
