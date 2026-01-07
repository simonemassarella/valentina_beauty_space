import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface ServiceDetailPageProps {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service || !service.active) {
    notFound();
  }

  const heroImage =
    service.imageUrl ||
    'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const categoryLabel = service.category || 'Trattamento';

  const related = await prisma.service.findMany({
    where: {
      id: { not: service.id },
      active: true,
      category: service.category ?? undefined,
    },
    orderBy: { duration: 'asc' },
    take: 3,
  });

  return (
    <div className="service-detail-page mt-4">
      <section className="home-section home-section-light reveal-on-scroll">
        <div className="small text-muted mb-3">
          <Link href="/" className="link-underline link-underline-opacity-0">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/servizi" className="link-underline link-underline-opacity-0">
            Servizi
          </Link>
          <span className="mx-1">/</span>
          <span className="text-body-secondary">{service.name}</span>
        </div>

        <div className="row g-4 align-items-start service-detail-hero">
          <div className="col-lg-8">
            <h1 className="h3 mb-1">{service.name}</h1>
            <p className="text-muted mb-3 small">
              Un trattamento {categoryLabel.toLowerCase()} pensato per regalarti un vero momento di relax e benessere
              mirato.
            </p>
            <div className="card card-soft border-0 overflow-hidden mb-3">
              <Image
                src={heroImage}
                alt={service.name}
                width={1200}
                height={800}
                className="img-fluid w-100"
                style={{ objectFit: 'cover', maxHeight: '380px' }}
                priority
              />
            </div>

            <div className="row g-4 service-detail-sections">
              <div className="col-md-6">
                <h2 className="h6 mb-2">A proposito del servizio</h2>
                <p className="text-muted small mb-0">
                  {service.description ||
                    'Questo trattamento è studiato per aiutarti a rallentare, sciogliere le tensioni e ritrovare una sensazione di leggerezza generale.'}
                </p>
              </div>
              <div className="col-md-6">
                <h2 className="h6 mb-2">Cosa aspettarti</h2>
                <ul className="small text-muted mb-0 service-detail-list">
                  <li>
                    Accoglienza in istituto e breve confronto iniziale per capire le tue esigenze del momento.
                  </li>
                  <li>Preparazione della cabina con luci soffuse, musica rilassante e prodotti dedicati.</li>
                  <li>
                    Trattamento eseguito con manualità specifiche e attenzione costante al tuo comfort.
                  </li>
                </ul>
              </div>
              <div className="col-md-12">
                <h2 className="h6 mb-2">Benefici</h2>
                <ul className="small text-muted mb-0 service-detail-list service-detail-list-inline">
                  <li>Riduzione dello stress e delle tensioni muscolari.</li>
                  <li>Sensazione di leggerezza e benessere generale.</li>
                  <li>Momento dedicato solo a te, lontano dalla routine quotidiana.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <aside className="card card-soft border-0 p-3 service-detail-aside">
              <h2 className="h6 mb-2">Dettagli servizio</h2>
              <dl className="small mb-3 service-detail-meta">
                <div className="d-flex justify-content-between mb-1">
                  <dt className="text-muted">Categoria</dt>
                  <dd className="mb-0 fw-semibold">{categoryLabel}</dd>
                </div>
                {service.duration ? (
                  <div className="d-flex justify-content-between mb-1">
                    <dt className="text-muted">Durata</dt>
                    <dd className="mb-0 fw-semibold">{service.duration} min</dd>
                  </div>
                ) : null}
                <div className="d-flex justify-content-between mb-1">
                  <dt className="text-muted">Prezzo indicativo</dt>
                  <dd className="mb-0 fw-semibold">{service.price.toFixed(2)} €</dd>
                </div>
              </dl>
              <p className="text-muted small mb-3">
                I tempi e i costi possono variare leggermente in base alla personalizzazione del percorso.
              </p>
              <Link
                href={`/bookings?serviceId=${encodeURIComponent(service.id)}`}
                className="btn btn-primary w-100 mb-2"
              >
                Prenota un trattamento
              </Link>
              <Link href="/servizi" className="btn btn-outline-primary w-100 btn-sm">
                Torna ai servizi
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="home-section home-section-light reveal-on-scroll">
          <div className="row g-3 align-items-end mb-3">
            <div className="col-12 col-md-8">
              <p className="text-uppercase text-muted small mb-1 home-section-kicker">
                Potrebbero interessarti anche
              </p>
              <h2 className="h5 mb-0 home-section-title">Altri servizi nella stessa area</h2>
            </div>
          </div>
          <div className="row g-3 service-detail-related-grid">
            {related.map((s) => (
              <div key={s.id} className="col-md-4">
                <div className="card card-soft border-0 p-3 h-100 bg-white">
                  <h3 className="h6 mb-1">{s.name}</h3>
                  <p className="text-muted small mb-2">
                    {(s.description || '').slice(0, 120) ||
                      'Trattamento della stessa categoria, ideale da abbinare.'}
                    {s.description && s.description.length > 120 ? '…' : ''}
                  </p>
                  <div className="d-flex justify-content-between align-items-center small mt-auto">
                    <span className="fw-semibold">
                      {s.price.toFixed(2)} €
                      {s.duration ? <span className="text-muted ms-1">· {s.duration} min</span> : null}
                    </span>
                    <Link href={`/servizi/${encodeURIComponent(s.id)}`} className="btn btn-outline-primary btn-sm">
                      Dettagli
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
