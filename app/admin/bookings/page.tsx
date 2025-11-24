'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

interface Operator {
  id: string;
  name: string;
}

interface Booking {
  id: string;
  start: string;
  status: 'CONFIRMED' | 'CANCELLED';
  user: { name: string; surname: string; email: string };
  service: { name: string; price: number; duration: number };
  operator: { name: string };
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

export default function AdminBookingsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [operatorId, setOperatorId] = useState('');
  const [date, setDate] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [month, setMonth] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const loadOperators = async () => {
    const res = await fetch('/api/operators');
    const data = (await res.json()) as Operator[];
    setOperators(data);
  };

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    setSelectedBooking(null);

    const params = new URLSearchParams({ all: '1' });
    if (operatorId) params.set('operatorId', operatorId);
    if (viewMode === 'table') {
      if (date) params.set('date', date);
      if (userEmail) params.set('userEmail', userEmail);
    }
    if (viewMode === 'calendar' && month) {
      params.set('month', month);
    }

    try {
      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = (await res.json()) as any[];
      setBookings(
        data.map((b) => ({
          ...b,
          start: b.start,
        })),
      );
    } catch (e) {
      setError('Errore nel caricamento delle prenotazioni.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOperators();
    void loadBookings();
  }, []);

  useEffect(() => {
    if (!selectedBooking) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (tooltipRef.current && tooltipRef.current.contains(target)) return;
      if (target.closest('[data-booking-pill="true"]')) return;
      setSelectedBooking(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedBooking]);

  const handleFilter = async (e: FormEvent) => {
    e.preventDefault();
    await loadBookings();
  };

  const cancelBooking = async (id: string) => {
    const ok = window.confirm('Annullare questa prenotazione?');
    if (!ok) return;

    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'CANCELLED' }),
    });

    if (!res.ok) {
      alert('Errore durante l\'operazione.');
      return;
    }

    await loadBookings();
  };

  return (
    <div>
      <h1 className="h3 mb-3">Prenotazioni</h1>
      <p className="text-muted mb-4">
        Visualizza, filtra e gestisci tutte le prenotazioni del centro estetico.
      </p>

      <form className="card card-soft border-0 p-3 bg-white mb-4" onSubmit={handleFilter}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-muted small">Vista</div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Vista prenotazioni">
            <button
              type="button"
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('table')}
            >
              Tabella
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('calendar')}
            >
              Calendario
            </button>
          </div>
        </div>

        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Operatrice</label>
            <select
              className="form-select"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
            >
              <option value="">Tutte</option>
              {operators.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          {viewMode === 'table' && (
            <div className="col-md-3">
              <label className="form-label">Data</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}
          {viewMode === 'calendar' && (
            <div className="col-md-3">
              <label className="form-label">Mese</label>
              <input
                type="month"
                className="form-control"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          )}
          <div className="col-md-3">
            <label className="form-label">Email cliente</label>
            <input
              type="email"
              className="form-control"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Filtra
            </button>
          </div>
        </div>
      </form>

      <div className="card card-soft border-0 p-3 bg-white">
        <h2 className="h5 mb-3">Risultati</h2>
        {loading ? (
          <p className="text-muted mb-0">Caricamento prenotazioni...</p>
        ) : bookings.length === 0 ? (
          <p className="text-muted mb-0">Nessuna prenotazione trovata.</p>
        ) : (
          <>
            {viewMode === 'table' && (
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Ora</th>
                      <th>Cliente</th>
                      <th>Email</th>
                      <th>Servizio</th>
                      <th>Operatrice</th>
                      <th>Stato</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td>{formatDate(b.start)}</td>
                        <td>{formatTime(b.start)}</td>
                        <td>{b.user.name + ' ' + b.user.surname}</td>
                        <td>{b.user.email}</td>
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
                        <td className="text-end">
                          {b.status === 'CONFIRMED' && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => cancelBooking(b.id)}
                            >
                              Annulla
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {viewMode === 'calendar' && (
              (() => {
                const [yearStr, monthStr] = month.split('-');
                const year = Number(yearStr);
                const monthNum = Number(monthStr);
                const monthIndex = Number.isNaN(monthNum) ? 0 : monthNum - 1;
                const firstDay = new Date(year, monthIndex, 1);
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                const startWeekday = (firstDay.getDay() + 6) % 7; // 0 = lunedì

                const weeks: { day: number | null }[][] = [];
                let currentDay = 1;
                let currentWeek: { day: number | null }[] = [];

                for (let i = 0; i < startWeekday; i += 1) {
                  currentWeek.push({ day: null });
                }

                while (currentDay <= daysInMonth) {
                  currentWeek.push({ day: currentDay });
                  if (currentWeek.length === 7) {
                    weeks.push(currentWeek);
                    currentWeek = [];
                  }
                  currentDay += 1;
                }

                if (currentWeek.length > 0) {
                  while (currentWeek.length < 7) {
                    currentWeek.push({ day: null });
                  }
                  weeks.push(currentWeek);
                }

                const serviceColorMap: Record<string, string> = {};
                const colorClasses = [
                  'bg-primary-subtle',
                  'bg-success-subtle',
                  'bg-info-subtle',
                  'bg-warning-subtle',
                  'bg-danger-subtle',
                  'bg-secondary-subtle',
                ];

                bookings.forEach((b) => {
                  if (!serviceColorMap[b.service.name]) {
                    const index = Object.keys(serviceColorMap).length % colorClasses.length;
                    serviceColorMap[b.service.name] = colorClasses[index];
                  }
                });

                const bookingsByDay: Record<number, Booking[]> = {};
                bookings.forEach((b) => {
                  const d = new Date(b.start);
                  const by = d.getFullYear();
                  const bm = d.getMonth();
                  if (by !== year || bm !== monthIndex) return;
                  const dayNumber = d.getDate();
                  if (!bookingsByDay[dayNumber]) {
                    bookingsByDay[dayNumber] = [];
                  }
                  bookingsByDay[dayNumber].push(b);
                });

                const weekDayLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

                return (
                  <div className="position-relative">
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm mb-0 text-center align-middle">
                        <thead>
                          <tr>
                            {weekDayLabels.map((label) => (
                              <th key={label} className="small fw-semibold">
                                {label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {weeks.map((week, wi) => (
                            <tr key={wi}>
                              {week.map((cell, di) => {
                                if (!cell.day) {
                                  return <td key={di} className="bg-light-subtle" />;
                                }

                                const dayBookings = bookingsByDay[cell.day] ?? [];

                                let dayCellClasses = 'align-top position-relative';
                                if (dayBookings.length >= 5) {
                                  dayCellClasses += ' border border-danger';
                                } else if (dayBookings.length >= 3) {
                                  dayCellClasses += ' border border-warning';
                                }

                                return (
                                  <td
                                    key={di}
                                    className={dayCellClasses}
                                    style={{ minWidth: '140px', height: '120px' }}
                                  >
                                    <div className="small fw-semibold mb-1 text-start">
                                      {cell.day}
                                      {dayBookings.length >= 3 && (
                                        <span className="badge bg-primary-subtle ms-1">
                                          {dayBookings.length} prenotazioni
                                        </span>
                                      )}
                                    </div>
                                    <div className="d-flex flex-column gap-1 text-start">
                                      {dayBookings.map((b) => (
                                        <div key={b.id} className="position-relative">
                                          <div
                                            className={`border rounded px-1 py-1 small ${
                                              selectedBooking && selectedBooking.id === b.id
                                                ? 'bg-dark text-white'
                                                : b.status === 'CONFIRMED'
                                                    ? serviceColorMap[b.service.name] ?? 'bg-light-subtle'
                                                    : 'bg-danger-subtle text-danger'
                                            }`}
                                            style={{ cursor: 'pointer' }}
                                            data-booking-pill="true"
                                            onClick={() => setSelectedBooking(b)}
                                          >
                                            <div className="small fw-semibold">
                                              {formatTime(b.start)} · {b.service.name} ({b.service.duration} min)
                                            </div>
                                            <div
                                              className={`small ${
                                                selectedBooking && selectedBooking.id === b.id
                                                  ? 'text-light'
                                                  : 'text-muted'
                                              }`}
                                            >
                                              {b.user.name} {b.user.surname}
                                            </div>
                                          </div>
                                          {selectedBooking && selectedBooking.id === b.id && (
                                            <div
                                              className="position-absolute"
                                              style={{
                                                left: '100%',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                zIndex: 10,
                                                maxWidth: '420px',
                                              }}
                                            >
                                              <div className="position-relative">
                                                <div
                                                  style={{
                                                    position: 'absolute',
                                                    left: '-6px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: 0,
                                                    height: 0,
                                                    borderTop: '6px solid transparent',
                                                    borderBottom: '6px solid transparent',
                                                    borderRight: '6px solid white',
                                                    boxShadow: '0 0 2px rgba(0,0,0,0.1)',
                                                  }}
                                                />
                                                <div
                                                  ref={tooltipRef}
                                                  className="card card-soft border-0 shadow-sm p-3 bg-white small text-start"
                                                >
                                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="fw-semibold small">Dettagli prenotazione</span>
                                                    <button
                                                      type="button"
                                                      className="btn btn-sm btn-outline-secondary py-0 px-1"
                                                      onClick={() => setSelectedBooking(null)}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                  <div className="small mb-1">
                                                    <strong>Data:</strong> {formatDate(selectedBooking.start)} alle{' '}
                                                    {formatTime(selectedBooking.start)}
                                                  </div>
                                                  <div className="small mb-1">
                                                    <strong>Cliente:</strong> {selectedBooking.user.name}{' '}
                                                    {selectedBooking.user.surname} ({selectedBooking.user.email})
                                                  </div>
                                                  <div className="small mb-1">
                                                    <strong>Servizio:</strong> {selectedBooking.service.name}
                                                  </div>
                                                  <div className="small mb-1">
                                                    <strong>Durata:</strong> {selectedBooking.service.duration} min
                                                  </div>
                                                  <div className="small mb-1">
                                                    <strong>Prezzo:</strong> {selectedBooking.service.price.toFixed(2)} €
                                                  </div>
                                                  <div className="small mb-2">
                                                    <strong>Operatrice:</strong> {selectedBooking.operator.name}
                                                  </div>
                                                  {selectedBooking.status === 'CONFIRMED' && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-sm btn-outline-danger w-100"
                                                      onClick={async () => {
                                                        await cancelBooking(selectedBooking.id);
                                                        setSelectedBooking(null);
                                                      }}
                                                    >
                                                      Annulla prenotazione
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()
            )}
          </>
        )}
      </div>
    </div>
  );
}
