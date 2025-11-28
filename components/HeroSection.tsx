import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section hero-section-full position-relative text-white">
      <div className="hero-section-background" aria-hidden="true">
        <Image
          src="/Background.svg"
          alt="Sfondo con foglie verdi"
          fill
          priority
          sizes="100vw"
          className="hero-section-background-image"
        />
        <div className="hero-section-background-overlay" />
      </div>

      <div className="container hero-section-inner">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="hero-section-title mb-4">Prenota il tuo momento di Relax</h1>

            <div className="hero-section-text mb-4">
              <p className="hero-section-text-muted text-xl mb-1">
                Prenota online in pochi istanti e lasciati guidare dalle nostre operatrici.
              </p>
              <p className="hero-section-text-muted mb-0">
                Un luogo intimo e accogliente dove ritrovare equilibrio, luce e benessere.
              </p>
            </div>

            <div className="hero-section-actions d-flex flex-wrap align-items-center gap-3 mb-5">
              <Link href="/bookings" className="btn hero-btn-primary">
                <span>Prenota ora</span>
                <span className="hero-btn-icon" aria-hidden="true">																																															
                  →
                </span>
              </Link>
              <Link href="/services" className="btn hero-btn-secondary">
                <span>Scopri i nostri servizi</span>
                <span className="hero-btn-icon" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="hero-section-brands d-flex flex-wrap align-items-center gap-4">
              <Image
                src="/endospheres-logo.svg"
                alt="Logo Endospheres"
                width={160}
                height={46}
                className="hero-brand-logo"
              />
              <Image
                src="/pagodil-logo.svg"
                alt="Logo PagoDIL"
                width={150}
                height={46}
                className="hero-brand-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
