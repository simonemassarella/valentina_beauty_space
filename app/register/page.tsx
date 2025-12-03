'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

function RegisterPageInner() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confermaPassword) {
      setError('Le password non coincidono.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Errore durante la registrazione.');
        setLoading(false);
        return;
      }

      setSuccess('Registrazione completata! Ora puoi accedere.');
      setLoading(false);

      setTimeout(() => {
        router.push('/login?registered=1');
      }, 800);
    } catch (err) {
      setError('Si è verificato un errore imprevisto. Riprova più tardi.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <h1 className="h3 mb-3">Crea il tuo account</h1>
            <p className="text-muted mb-4">
              Inserisci i tuoi dati per creare l&apos;account cliente.
            </p>

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 small" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label">Nome e cognome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Conferma password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confermaPassword}
                  onChange={(e) => setConfermaPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Creazione account...' : 'Crea account'}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted" style={{ fontSize: '14px' }}>
                Hai già un account?{' '}
              </span>
              <button
                type="button"
                className="btn btn-link p-0 m-0"
                style={{ fontSize: '14px' }}
                onClick={() => router.push('/login')}
              >
                Accedi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="row justify-content-center mt-4">
          <p className="text-muted">Caricamento pagina di registrazione...</p>
        </div>
      }
    >
      <RegisterPageInner />
    </Suspense>
  );
}