'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ResetPasswordPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Token mancante. Richiedi nuovamente il recupero password.');
      setTokenValid(false);
      return;
    }

    // Verifica token
    fetch(`/api/forgot-password?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          setEmail(data.email);
          setTokenValid(true);
        } else {
          setError(data.message || 'Token non valido');
          setTokenValid(false);
        }
      })
      .catch(err => {
        setError('Errore nella verifica del token');
        setTokenValid(false);
      });
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Le password non corrispondono.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La password deve contenere almeno 6 caratteri.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Errore durante il reset della password.');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Errore del server. Riprova più tardi.');
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-5">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="text-muted">Verifica token in corso...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-5">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <div className="text-center mb-4">
              <div className="text-danger mb-3">
                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
              </div>
              <h1 className="h3 mb-3">Token non valido</h1>
              <p className="text-muted mb-4">
                {error || 'Il link di reset è scaduto o non valido.'}
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push('/forgot-password')}
              >
                Richiedi nuovo link
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => router.push('/login')}
              >
                Torna al login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-5">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <div className="text-center mb-4">
              <div className="text-success mb-3">
                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              </div>
              <h1 className="h3 mb-3">Password resettata!</h1>
              <p className="text-muted mb-4">
                La tua password è stata aggiornata con successo.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => router.push('/login')}
            >
              Accedi con nuova password
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-5">
        <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
          <h1 className="h3 mb-3">Reimposta Password</h1>
          <p className="text-muted mb-4">
            Inserisci la nuova password per <strong>{email}</strong>
          </p>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Nuova Password (minimo 6 caratteri)
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Conferma Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Aggiornamento in corso...' : 'Reimposta Password'}
            </button>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link btn-sm"
                onClick={() => router.push('/login')}
              >
                ← Torna al login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="row justify-content-center mt-4">
          <p className="text-muted">Caricamento pagina...</p>
        </div>
      }
    >
      <ResetPasswordPageInner />
    </Suspense>
  );
}
