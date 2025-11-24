'use client';

import { FormEvent, useEffect, useState } from 'react';

interface Operator {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
}

export default function AdminOperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(18);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/operators');
      const data = (await res.json()) as Operator[];
      setOperators(data);
    } catch (e) {
      setError('Errore nel caricamento degli operatori.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch('/api/operators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, startHour, endHour }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Errore nella creazione dell\'operatore.');
      return;
    }

    setName('');
    setStartHour(9);
    setEndHour(18);
    await load();
  };

  const removeOperator = async (op: Operator) => {
    const ok = window.confirm(`Eliminare definitivamente l\'operatrice "${op.name}"?`);
    if (!ok) return;

    const res = await fetch(`/api/operators/${op.id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Errore nella cancellazione.');
      return;
    }
    await load();
  };

  return (
    <div>
      <h1 className="h3 mb-3">Operatori</h1>
      <p className="text-muted mb-4">Gestisci le operatrici e i relativi orari di lavoro.</p>

      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <h2 className="h5 mb-3">Nuova operatrice</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label">Inizio</label>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    className="form-control"
                    value={startHour}
                    onChange={(e) => setStartHour(parseInt(e.target.value, 10) || 0)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Fine</label>
                  <input
                    type="number"
                    min={1}
                    max={23}
                    className="form-control"
                    value={endHour}
                    onChange={(e) => setEndHour(parseInt(e.target.value, 10) || 0)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                {saving ? 'Salvataggio...' : 'Aggiungi operatrice'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <h2 className="h5 mb-3">Operatori esistenti</h2>
            {loading ? (
              <p className="text-muted mb-0">Caricamento operatori...</p>
            ) : operators.length === 0 ? (
              <p className="text-muted mb-0">Nessuna operatrice ancora configurata.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Orario</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {operators.map((o) => (
                      <tr key={o.id}>
                        <td>{o.name}</td>
                        <td>
                          {o.startHour}:00 - {o.endHour}:00
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeOperator(o)}
                          >
                            Elimina
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
