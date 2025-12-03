'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-100" style={{ maxWidth: '400px', padding: '0 20px' }}>
        <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
          <div className="card-body p-4 p-lg-5">
            {/* Logo e titolo */}
            <div className="text-center mb-4">
              <div className="mb-3">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="20" fill="#808080" />
                  <path d="M18 20L30 20M18 24L30 24M18 28L26 28" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="mb-0" style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                Accedi
              </h2>
            </div>

            {/* Bottone Google */}
            <button
              type="button"
              className="btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#3c4043',
              }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.6855C13.4555 11.97 12.8236 12.9232 11.8718 13.5614V15.8195H14.8564C16.3636 14.425 17.64 12.1773 17.64 9.20455Z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18C11.43 18 13.4673 17.0205 14.8564 15.8195L11.8718 13.5614C11.0195 14.1014 9.94545 14.4205 9 14.4205C6.65591 14.4205 4.67182 13.0255 3.96409 11.0195H0.955908V13.3523C2.33727 16.2832 5.26227 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  d="M3.96409 11.0195C3.78409 10.4795 3.68182 9.90341 3.68182 9.31818C3.68182 8.73295 3.78409 8.15682 3.96409 7.61682V5.28409H0.955908C0.347727 6.49432 0 7.86818 0 9.31818C0 10.7682 0.347727 12.142 0.955908 13.3523L3.96409 11.0195Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 4.27955C10.0114 4.27955 10.9318 4.64273 11.6386 5.35727L14.3318 2.66409C13.4673 1.86091 12.0382 1.20455 9 1.20455C5.26227 1.20455 2.33727 2.92136 0.955908 5.28409L3.96409 7.61682C4.67182 5.61091 6.65591 4.27955 9 4.27955Z"
                  fill="#EA4335"
                />
              </svg>
              Accedi con Google
            </button>

            {/* Divisore */}
            <div className="d-flex align-items-center mb-3">
              <div style={{ flex: 1, height: '1px', backgroundColor: '#dadce0' }} />
              <span className="px-3" style={{ color: '#5f6368', fontSize: '14px' }}>
                oppure
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#dadce0' }} />
            </div>

            {/* Messaggi di stato */}
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

            {/* Form di login */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email o nome utente"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dadce0',
                    padding: '12px 16px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div className="mb-1">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dadce0',
                    padding: '12px 16px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ borderRadius: '4px' }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberMe"
                    style={{ fontSize: '14px', color: '#5f6368' }}
                  >
                    Ricordami per 30 giorni
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn-link p-0 m-0"
                  style={{ fontSize: '14px', color: 'var(--vel-primary)', textDecoration: 'none' }}
                  onClick={() =>
                    (window.location.href =
                      'mailto:info@centroesteticovalentina.it?subject=Recupero%20password&body=Scrivici l\'indirizzo email con cui ti sei registrato, ti aiuteremo a reimpostare la password.')
                  }
                >
                  Password dimenticata?
                </button>
              </div>

              <button
                type="submit"
                className="btn w-100"
                disabled={loading}
                style={{
                  backgroundColor: 'var(--vel-primary)',
                  border: '1px solid var(--vel-primary)',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#ffffff',
                  boxShadow: '0 14px 32px rgba(0, 0, 0, 0.16)',
                }}
              >
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </button>
            </form>
          </div>
        </div>

        {/* Create Account Link */}
        <div className="text-center mt-3">
          <span style={{ fontSize: '14px', color: '#5f6368' }}>Don't have an account? </span>
          <button 
            type="button" 
            className="btn btn-link p-0 m-0" 
            style={{ fontSize: '14px', color: '#1a73e8', textDecoration: 'none' }}
            onClick={() => router.push('/register')}
          >
            Create account
          </button>
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
