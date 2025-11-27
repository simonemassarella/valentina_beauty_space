import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div
        className="home-hero-card row w-100 g-4 align-items-center reveal-on-scroll"
        data-reveal-order="1"
      >
        <div className="col-lg-7 order-lg-1 order-1">
          <span className="badge badge-soft home-hero-kicker mb-3">Beauty Space</span>
          <h1 className="display-4 fw-semibold mb-3 home-hero-title">
            Prenota il tuo
            <br />
            <span className="home-hero-highlight">momento di relax</span>
          </h1>
          <p className="text-muted mb-2 home-hero-subtitle">
            Un luogo intimo e accogliente dove ritrovare equilibrio, luce e benessere.
          </p>
          <p className="text-muted mb-4">
            <span className="fw-semibold">
              Prenota online in pochi istanti e lasciati guidare dalle nostre operatrici.
            </span>
          </p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Link href="/bookings" className="btn btn-primary btn-lg">
              Prenota un trattamento
            </Link>
            <Link href="/services" className="btn btn-outline-primary btn-lg">
              Scopri i servizi
            </Link>
          </div>
          <div className="home-hero-brands">
            <Image
              src="/endospheres-logo.svg"
              alt="Logo Endospheres"
              width={320}
              height={92}
              className="home-hero-brand-logo"
            />
            <span className="home-hero-brand-separator" aria-hidden="true" />
            <Image
              src="/pagodil-logo.svg"
              alt="Logo PagoDIL"
              width={320}
              height={92}
              className="home-hero-brand-logo"
            />
          </div>
        </div>
        <div className="col-lg-5 order-lg-2 order-2">
          <div className="hero-illustration mx-auto">
            <div
              className="hero-illustration-inner reveal-on-scroll"
              data-reveal-order="2"
            >
              <Image
                src="/hero-illustration.svg"
                alt="Illustrazione lineare di volto femminile e fiori"
                width={480}
                height={480}
                className="img-fluid"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
