'use client';

import { FormEvent, useEffect, useState } from 'react';

interface Operator {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  active: boolean;
  description?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  operators?: Operator[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [bulkUpdating, setBulkUpdating] = useState(false);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(60);
  const [price, setPrice] = useState(50);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedOperatorIds, setSelectedOperatorIds] = useState<string[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sRes, oRes] = await Promise.all([fetch('/api/services?all=1'), fetch('/api/operators')]);
      const [sJson, oJson] = await Promise.all([sRes.json(), oRes.json()]);
      setServices(sJson as Service[]);
      setOperators(oJson as Operator[]);
    } catch (e) {
      setError('Errore nel caricamento dei servizi.');
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

    const payload = {
      name,
      duration,
      price,
      category: category || undefined,
      description: description || undefined,
      imageUrl: imageUrl || undefined,
      operatorIds: selectedOperatorIds,
    };

    const url = editingServiceId ? `/api/services/${editingServiceId}` : '/api/services';
    const method = editingServiceId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Errore nel salvataggio del servizio.');
      return;
    }

    setEditingServiceId(null);
    setName('');
    setDuration(60);
    setPrice(50);
    setCategory('');
    setDescription('');
    setImageUrl('');
    setSelectedOperatorIds([]);
    await load();
  };

  const setAllActive = async (value: boolean) => {
    if (services.length === 0) return;
    setBulkUpdating(true);
    try {
      const targets = services.filter((s) => s.active !== value);
      await Promise.all(
        targets.map((s) =>
          fetch(`/api/services/${s.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active: value }),
          }),
        ),
      );
      await load();
    } catch (e) {
      alert('Errore nell\'aggiornamento dei servizi.');
    } finally {
      setBulkUpdating(false);
    }
  };

  const toggleActive = async (s: Service) => {
    const res = await fetch(`/api/services/${s.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !s.active }),
    });
    if (!res.ok) {
      alert('Errore nel salvataggio.');
      return;
    }
    await load();
  };

  const removeService = async (s: Service) => {
    const ok = window.confirm(`Eliminare definitivamente il servizio "${s.name}"?`);
    if (!ok) return;

    const res = await fetch(`/api/services/${s.id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      // eslint-disable-next-line no-alert
      alert(data.message || 'Errore nella cancellazione.');
      return;
    }
    await load();
  };

  return (
    <div>
      <h1 className="h3 mb-3">Servizi</h1>
      <p className="text-muted mb-4">Gestisci l&apos;elenco dei servizi offerti dal centro estetico.</p>

      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <h2 className="h5 mb-3">{editingServiceId ? 'Modifica servizio' : 'Nuovo servizio'}</h2>
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
              <div className="mb-3">
                <label className="form-label">Categoria</label>
                <input
                  className="form-control"
                  placeholder="Es. VISO, EPILAZIONE, MASSAGGI, PACCHETTO"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <div className="form-text">Usata per organizzare il listino e filtrare i servizi.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Durata (minuti)</label>
                <input
                  type="number"
                  min={5}
                  max={480}
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prezzo (€)</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrizione</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">URL immagine</label>
                <input
                  className="form-control"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className="form-text">Inserisci il link a una foto del trattamento.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Operatrici abilitate</label>
                <div className="d-flex flex-column gap-1">
                  {operators.length === 0 ? (
                    <span className="text-muted small">Nessuna operatrice configurata.</span>
                  ) : (
                    operators.map((o) => (
                      <div key={o.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`op-${o.id}`}
                          checked={selectedOperatorIds.includes(o.id)}
                          onChange={(e) => {
                            setSelectedOperatorIds((prev) =>
                              e.target.checked ? [...prev, o.id] : prev.filter((id) => id !== o.id),
                            );
                          }}
                        />
                        <label className="form-check-label" htmlFor={`op-${o.id}`}>
                          {o.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
                <div className="form-text">
                  Solo le operatrici selezionate potranno essere prenotate per questo servizio.
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                {saving ? 'Salvataggio...' : editingServiceId ? 'Salva modifiche' : 'Aggiungi servizio'}
              </button>
              {editingServiceId && (
                <button
                  type="button"
                  className="btn btn-link btn-sm mt-2"
                  onClick={() => {
                    setEditingServiceId(null);
                    setName('');
                    setDuration(60);
                    setPrice(50);
                    setCategory('');
                    setDescription('');
                    setImageUrl('');
                    setSelectedOperatorIds([]);
                  }}
                >
                  Annulla modifica
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card card-soft border-0 p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 mb-0">Servizi esistenti</h2>
              {services.length > 0 && (
                <div className="btn-group btn-group-sm" role="group" aria-label="Attiva/disattiva tutti i servizi">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => setAllActive(true)}
                    disabled={loading || bulkUpdating}
                  >
                    Attiva tutti
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setAllActive(false)}
                    disabled={loading || bulkUpdating}
                  >
                    Disattiva tutti
                  </button>
                </div>
              )}
            </div>
            {loading ? (
              <p className="text-muted mb-0">Caricamento servizi...</p>
            ) : services.length === 0 ? (
              <p className="text-muted mb-0">Nessun servizio ancora configurato.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Durata</th>
                      <th>Prezzo</th>
                      <th>Operatrici abilitate</th>
                      <th>Attivo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td>{s.category || '-'}</td>
                        <td>{s.duration} min</td>
                        <td>{s.price.toFixed(2)} €</td>
                        <td className="small">
                          {s.operators && s.operators.length > 0
                            ? s.operators.map((o) => o.name).join(', ')
                            : 'Tutte'}
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={s.active}
                              onChange={() => toggleActive(s)}
                            />
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => {
                                setEditingServiceId(s.id);
                                setName(s.name);
                                setDuration(s.duration);
                                setPrice(s.price);
                                setCategory(s.category || '');
                                setDescription(s.description || '');
                                setImageUrl(s.imageUrl || '');
                                setSelectedOperatorIds(s.operators?.map((o) => o.id) || []);
                              }}
                            >
                              Modifica
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeService(s)}
                            >
                              Elimina
                            </button>
                          </div>
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
