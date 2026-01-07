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

      <div className="hero-section-inner hero-section-content">
        <div className="hero-section-content-wrapper">
          <h1 className="hero-section-title">
            Prenota il tuo <span className="hero-title-highlight">momento di Relax</span>
          </h1>

          <div className="hero-section-text">
            <p className="hero-section-subtitle">
              Prenota online in pochi istanti e lasciati guidare dalle nostre operatrici.
            </p>
            <p className="hero-section-subtitle">
              Un luogo intimo e accogliente dove ritrovare equilibrio, luce e benessere.
            </p>
          </div>

          <div className="hero-section-actions">
            <Link href="/bookings" className="btn btn-light btn-lg">
              <span>Prenota ora</span>
              <span className="hero-btn-icon" aria-hidden="true">→</span>
            </Link>
            <Link href="/servizi" className="btn btn-outline-light btn-lg">
              <span>Scopri i nostri servizi</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-brands-bar">
        <Image
          src="/endospheres-logo.svg"
          alt="Logo Endospheres"
          width={126}
          height={59}
          className="hero-brand-logo"
        />
        <Image
          src="/pagodil-logo.svg"
          alt="Logo PagoDIL"
          width={112}
          height={58}
          className="hero-brand-logo"
        />
      </div>
    </section>
  );
}
