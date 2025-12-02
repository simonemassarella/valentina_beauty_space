'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

function ForgotPasswordPageInner() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Errore durante l\'invio dell\'email di recupero.');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Errore del server. Riprova più tardi.');
      setLoading(false);
    }
  };

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
              <h1 className="h3 mb-3">Email inviata!</h1>
              <p className="text-muted mb-4">
                Abbiamo inviato un'email a <strong>{email}</strong> con le istruzioni per recuperare la tua password.
              </p>
              <p className="text-muted small">
                Controlla anche la cartella spam se non ricevi l'email entro pochi minuti.
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push('/login')}
              >
                Torna al login
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setSuccess(false)}
              >
                Invia un'altra email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-5">
        <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
          <h1 className="h3 mb-3">Password dimenticata?</h1>
          <p className="text-muted mb-4">
            Inserisci la tua email e ti invieremo le istruzioni per recuperare la password.
          </p>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
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
                placeholder="la tua@email.com"
              />
              <div className="form-text">
                Inserisci l'email associata al tuo account.
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Invio in corso...' : 'Invia email di recupero'}
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

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="row justify-content-center mt-4">
          <p className="text-muted">Caricamento pagina...</p>
        </div>
      }
    >
      <ForgotPasswordPageInner />
    </Suspense>
  );
}
