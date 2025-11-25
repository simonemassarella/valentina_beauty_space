'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileResponse {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) {
          throw new Error('Errore nel caricamento del profilo');
        }
        const data = (await res.json()) as ProfileResponse;
        setProfile(data);
      } catch (e) {
        setError('Impossibile caricare il profilo.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name,
        surname: profile.surname,
        phone: profile.phone,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      setError('Errore durante il salvataggio.');
      return;
    }

    setSuccess(true);
  };

  if (loading) {
    return <p className="mt-4 text-muted">Caricamento profilo...</p>;
  }

  if (!profile) {
    return <p className="mt-4 text-danger">Profilo non disponibile.</p>;
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-7 col-lg-6">
        <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
          <h1 className="h3 mb-3">Il tuo profilo</h1>
          <p className="text-muted mb-4">
            Aggiorna i tuoi dati personali. L&apos;indirizzo email non è modificabile da qui.
          </p>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2 small" role="alert">
              Profilo aggiornato correttamente.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="surname" className="form-label">
                  Cognome
                </label>
                <input
                  id="surname"
                  type="text"
                  className="form-control"
                  value={profile.surname}
                  onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="phone" className="form-label">
                Telefono
              </label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={profile.email} disabled />
              <div className="form-text">Per cambiare email contatta il centro estetico.</div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={saving}>
              {saving ? 'Salvataggio in corso...' : 'Salva modifiche'}
            </button>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => router.back()}
            >
              Torna indietro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
