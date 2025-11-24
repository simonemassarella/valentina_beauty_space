'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, phone, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Errore durante la registrazione.');
      return;
    }

    router.push('/login?registered=1');
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-7 col-lg-6">
        <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
          <h1 className="h3 mb-3">Crea il tuo account clienti</h1>
          <p className="text-muted mb-4">
            Compila i dati per gestire in autonomia appuntamenti, profilo e notifiche.
          </p>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                placeholder="Es. +393401234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="form-text">
                Inserisci il tuo numero di telefono.
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-text">Minimo 6 caratteri.</div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
              {loading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
