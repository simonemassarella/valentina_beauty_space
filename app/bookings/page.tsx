'use client';

import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string | null;
  operators?: { id: string; name: string }[];
}

interface Operator {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
}

interface Booking {
  id: string;
  start: string;
  end: string;
  status: 'CONFIRMED' | 'CANCELLED';
  service: { name: string };
  operator: { name: string };
}

interface BookingSlotApi {
  id: string;
  start: string;
  end: string;
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

function BookingsPageInner() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [upcoming, setUpcoming] = useState<Booking[]>([]);

  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedOperatorId, setSelectedOperatorId] = useState('');
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [time, setTime] = useState('');

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, oRes, bRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/operators'),
          fetch('/api/bookings?upcoming=1'),
        ]);

        const [sJson, oJson, bJson] = await Promise.all([
          sRes.json(),
          oRes.json(),
          bRes.json(),
        ]);

        setServices(sJson as Service[]);
        setOperators(oJson as Operator[]);
        setUpcoming(
          (bJson as any[]).map((b) => ({
            ...b,
            start: b.start,
            end: b.end,
          })),
        );
      } catch (e) {
        setError('Errore nel caricamento dei dati iniziali.');
      } finally {
        setLoadingInitial(false);
      }
    };

    load();
  }, []);

  // Pre-seleziona un servizio se arriva da /services?serviceId=...
  useEffect(() => {
    const serviceIdFromUrl = searchParams.get('serviceId');
    if (!serviceIdFromUrl || services.length === 0) return;

    const exists = services.some((s) => s.id === serviceIdFromUrl);
    if (!exists) return;

    setSelectedServiceId(serviceIdFromUrl);
  }, [services, searchParams]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) ?? null,
    [services, selectedServiceId],
  );

  const selectedOperator = useMemo(
    () => operators.find((o) => o.id === selectedOperatorId) ?? null,
    [operators, selectedOperatorId],
  );

  const isOperatorAllowedForSelectedService = (operatorId: string) => {
    if (!selectedService || !selectedService.operators || selectedService.operators.length === 0) {
      return true;
    }
    return selectedService.operators.some((o) => o.id === operatorId);
  };

  const reloadUpcoming = async () => {
    const res = await fetch('/api/bookings?upcoming=1');
    const json = await res.json();
    setUpcoming(
      (json as any[]).map((b) => ({
        ...b,
        start: b.start,
        end: b.end,
      })),
    );
  };

  const loadSlots = async () => {
    if (!selectedOperatorId || !selectedService || !date) return;
    setLoadingSlots(true);
    setAvailableSlots([]);
    setTime('');

    try {
      const res = await fetch(
        `/api/bookings?slots=1&operatorId=${encodeURIComponent(selectedOperatorId)}&date=${encodeURIComponent(
          date,
        )}`,
      );
      const existing = (await res.json()) as BookingSlotApi[];

      const bookings = existing.map((b) => ({
        start: new Date(b.start),
        end: new Date(b.end),
      }));

      const op = selectedOperator!;
      const serviceDuration = selectedService.duration;

      const slots: string[] = [];
      const now = new Date();
      const [year, month, day] = date.split('-').map((v) => parseInt(v, 10));

      for (let minutes = op.startHour * 60; minutes + serviceDuration <= op.endHour * 60; minutes += 15) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const candidateStart = new Date(year, month - 1, day, h, m, 0, 0);
        const candidateEnd = new Date(candidateStart.getTime() + serviceDuration * 60 * 1000);

        if (candidateStart <= now) continue;

        const overlap = bookings.some((b) => b.start < candidateEnd && b.end > candidateStart);
        if (!overlap) {
          const hh = String(h).padStart(2, '0');
          const mm = String(m).padStart(2, '0');
          slots.push(`${hh}:${mm}`);
        }
      }

      setAvailableSlots(slots);
    } catch (e) {
      setError('Errore nel calcolo degli orari disponibili.');
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedOperatorId && selectedServiceId && date) {
      void loadSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperatorId, selectedServiceId, date]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedServiceId || !selectedOperatorId || !date || !time) {
      setError('Compila tutti i campi per creare una prenotazione.');
      return;
    }

    setCreating(true);

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operatorId: selectedOperatorId,
        serviceId: selectedServiceId,
        date,
        time,
      }),
    });

    setCreating(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Errore nella creazione della prenotazione.');
      return;
    }

    await reloadUpcoming();
    await loadSlots();
  };

  const cancelBooking = async (id: string) => {
    const ok = window.confirm('Vuoi davvero annullare questa prenotazione?');
    if (!ok) return;

    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message || 'Errore durante l\'annullamento.');
      return;
    }

    await reloadUpcoming();
    await loadSlots();
  };

  if (loadingInitial) {
    return <p className="mt-4 text-muted">Caricamento dati...</p>;
  }

  return (
    <div className="mt-4">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card card-soft border-0 p-4 bg-white h-100">
            <h1 className="h4 mb-3">Nuova prenotazione</h1>
            <p className="text-muted small mb-3">
              Seleziona operatrice, servizio, giorno e orario disponibile. Il sistema evita sovrapposizioni.
            </p>

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label className="form-label">Operatrice</label>
                <select
                  className="form-select"
                  value={selectedOperatorId}
                  onChange={(e) => setSelectedOperatorId(e.target.value)}
                  required
                >
                  <option value="">Seleziona operatrice</option>
                  {operators.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ( {o.startHour}:00 - {o.endHour}:00 )
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Servizio</label>
                <select
                  className="form-select"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  required
                >
                  <option value="">Seleziona servizio</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.duration} min)
                    </option>
                  ))}
                </select>
                {selectedService && selectedService.operators && selectedService.operators.length > 0 && (
                  <div className="form-text">
                    Operatrici abilitate per questo servizio:{' '}
                    {selectedService.operators.map((o) => o.name).join(', ')}.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Data</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Orario</label>
                {loadingSlots ? (
                  <p className="text-muted small mb-0">Calcolo orari disponibili...</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-muted small mb-0">
                    {selectedOperatorId && selectedServiceId && date
                      ? 'Nessun orario disponibile per questo giorno. Prova un\'altra data.'
                      : 'Seleziona operatrice, servizio e data per vedere gli orari disponibili.'}
                  </p>
                ) : (
                  <select
                    className="form-select mt-1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  >
                    <option value="">Seleziona orario</option>
                    {availableSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={creating}>
                {creating ? 'Creazione in corso...' : 'Conferma prenotazione'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card card-soft border-0 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 mb-0">Le tue prossime prenotazioni</h2>
            </div>

            {upcoming.length === 0 ? (
              <p className="text-muted mb-0">Non hai prenotazioni future.</p>
            ) : (
              <div className="list-group list-group-flush">
                {upcoming.map((b) => (
                  <div
                    key={b.id}
                    className="list-group-item px-0 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-semibold">{b.service.name}</div>
                      <div className="text-muted small">
                        {b.operator.name} · {formatDate(b.start)} alle {formatTime(b.start)}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
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
                      {b.status === 'CONFIRMED' && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => cancelBooking(b.id)}
                        >
                          Annulla
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<p className="mt-4 text-muted">Caricamento pagina prenotazioni...</p>}>
      <BookingsPageInner />
    </Suspense>
  );
}
