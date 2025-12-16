import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const userId = session.user.id;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [upcoming, todayCount, totalCount] = await Promise.all([
    prisma.booking.findMany({
      where: { userId, status: 'CONFIRMED', start: { gte: now } },
      orderBy: { start: 'asc' },
      take: 5,
      include: { service: true, operator: true },
    }),
    prisma.booking.count({
      where: { userId, status: 'CONFIRMED', start: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.booking.count({ where: { userId } }),
  ]);

  return (
    <div className="mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <div className="flex-grow-1">
          <h1 className="h3 mb-1">Area clienti</h1>
          <p className="text-muted mb-0">
            Qui trovi un riepilogo rapido dei tuoi appuntamenti e puoi gestire profilo e prenotazioni.
          </p>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
          <Link href="/profile" className="btn btn-outline-primary btn-sm w-100 w-sm-auto">
            Modifica profilo
          </Link>
          <Link href="/bookings" className="btn btn-primary btn-sm w-100 w-sm-auto">
            Nuova prenotazione
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Appuntamenti di oggi</div>
            <div className="fs-3 fw-semibold">{todayCount}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Appuntamenti futuri (max 5)</div>
            <div className="fs-3 fw-semibold">{upcoming.length}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Storico totale prenotazioni</div>
            <div className="fs-3 fw-semibold">{totalCount}</div>
          </div>
        </div>
      </div>

      <div className="card card-soft border-0 p-3 p-md-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">Prossimi appuntamenti</h2>
          <Link href="/bookings" className="btn btn-outline-primary btn-sm">
            Gestisci prenotazioni
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-muted mb-0">Non hai appuntamenti futuri. Prenota il tuo prossimo trattamento!</p>
        ) : (
          <div className="list-group list-group-flush">
            {upcoming.map((b) => (
              <div key={b.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{b.service.name}</div>
                  <div className="text-muted small">
                    {b.operator.name} ·{' '}
                    {b.start.toLocaleDateString('it-IT', {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                    })}{' '}
                    alle{' '}
                    {b.start.toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <span
                  className={`badge ${b.status === 'CONFIRMED' ? '' : 'bg-danger-subtle text-danger'}`}
                  style={
                    b.status === 'CONFIRMED'
                      ? { backgroundColor: 'rgb(122, 200, 157)', color: '#fff' }
                      : undefined
                  }
                >
                  {b.status === 'CONFIRMED' ? 'Confermato' : 'Annullato'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
