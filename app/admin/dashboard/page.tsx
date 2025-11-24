import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/');
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const [
    todayBookings,
    weekBookings,
    totalBookings,
    totalServices,
    totalOperators,
    totalClients,
  ] = await Promise.all([
    prisma.booking.findMany({
      where: { start: { gte: todayStart, lte: todayEnd } },
      include: { user: true, service: true, operator: true },
      orderBy: { start: 'asc' },
    }),
    prisma.booking.count({ where: { start: { gte: weekStart, lte: weekEnd } } }),
    prisma.booking.count(),
    prisma.service.count({ where: { active: true } }),
    prisma.operator.count(),
    prisma.user.count({ where: { role: 'CLIENT' } }),
  ]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Dashboard admin</h1>
          <p className="text-muted mb-0">
            Panoramica di servizi, operatori, clienti e appuntamenti del centro estetico.
          </p>
        </div>
        <div>
          <Link href="/admin/bookings" className="btn btn-primary btn-sm">
            Gestisci prenotazioni
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Appuntamenti oggi</div>
            <div className="fs-3 fw-semibold">{todayBookings.length}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Appuntamenti settimana</div>
            <div className="fs-3 fw-semibold">{weekBookings}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Totale prenotazioni</div>
            <div className="fs-3 fw-semibold">{totalBookings}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Clienti registrati</div>
            <div className="fs-3 fw-semibold">{totalClients}</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Servizi attivi</div>
            <div className="fs-3 fw-semibold">{totalServices}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="text-muted small mb-1">Operatori</div>
            <div className="fs-3 fw-semibold">{totalOperators}</div>
          </div>
        </div>
      </div>

      <div className="card card-soft border-0 p-3 p-md-4 bg-white mt-3">
        <h2 className="h5 mb-3">Appuntamenti di oggi</h2>
        {todayBookings.length === 0 ? (
          <p className="text-muted mb-0">Nessun appuntamento per oggi.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>Ora</th>
                  <th>Cliente</th>
                  <th>Servizio</th>
                  <th>Operatrice</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {b.start.toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>{b.user.name + ' ' + b.user.surname}</td>
                    <td>{b.service.name}</td>
                    <td>{b.operator.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === 'CONFIRMED' ? '' : 'bg-danger-subtle text-danger'
                        }`}
                        style={
                          b.status === 'CONFIRMED'
                            ? { backgroundColor: 'rgb(122, 200, 157)', color: '#fff' }
                            : undefined
                        }
                      >
                        {b.status === 'CONFIRMED' ? 'Confermato' : 'Annullato'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
