'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-5">
          <p className="text-muted">Caricamento pagina di accesso...</p>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-5">
          <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
            <h1 className="h3 mb-3">Sei già autenticato</h1>
            <p className="text-muted mb-4">
              Hai già effettuato l&apos;accesso alla tua area clienti.
            </p>
            <button
              type="button"
              className="btn btn-primary w-100 mb-2"
              onClick={() => router.push('/dashboard')}
            >
              Vai alla dashboard
            </button>
            <button
              type="button"
              className="btn btn-link w-100"
              onClick={() => router.back()}
            >
              Torna indietro
            </button>
          </div>
        </div>
      </div>
    );
  }

  const registered = searchParams.get('registered') === '1';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Credenziali non valide.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-5">
        <div className="card card-soft border-0 p-4 p-lg-5 bg-white">
          <h1 className="h3 mb-3">Accedi alla tua area clienti</h1>
          <p className="text-muted mb-4">
            Inserisci le tue credenziali per gestire prenotazioni e profilo personale.
          </p>

          {registered && (
            <div className="alert alert-success py-2 small" role="alert">
              Registrazione completata! Ora puoi accedere con le tue credenziali.
            </div>
          )}

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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Accesso in corso...' : 'Accedi'}
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="row justify-content-center mt-4">
          <p className="text-muted">Caricamento pagina di accesso...</p>
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
