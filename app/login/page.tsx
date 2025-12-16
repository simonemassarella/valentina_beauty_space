'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { FormEvent, Suspense, useState } from 'react';
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
      <div className="auth-login-figma">
        <div className="auth-login-figma-inner">
          <div className="auth-login-card">
            <p className="text-muted mb-0">Caricamento pagina di accesso...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="auth-login-figma">
        <div className="auth-login-figma-inner">
          <button type="button" className="auth-login-back" onClick={() => router.back()}>
            <span className="auth-login-back-icon" aria-hidden="true">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 6H2.5"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M6 1.5L1.5 6L6 10.5"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Torna Indietro</span>
          </button>

          <NextImage
            src="/logo-valentina.svg"
            alt="Valentina beauty space"
            width={320}
            height={240}
            priority
            className="auth-login-logo"
          />

          <div className="auth-login-card">
            <h1 className="h4 mb-2">Sei già autenticato</h1>
            <p className="text-muted mb-4">Hai già effettuato l&apos;accesso alla tua area clienti.</p>
            <button type="button" className="btn auth-login-submit w-100 mb-2" onClick={() => router.push('/dashboard')}>
              Vai alla dashboard
            </button>
            <button type="button" className="btn btn-outline-primary w-100" onClick={() => router.back()}>
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

    router.push(callbackUrl);
  };

  return (
    <div className="auth-login-figma">
      <div className="auth-login-figma-inner">
        <button
          type="button"
          className="auth-login-back reveal-on-scroll"
          data-reveal-order="1"
          onClick={() => router.back()}
        >
          <span className="auth-login-back-icon" aria-hidden="true">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 6H2.5"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M6 1.5L1.5 6L6 10.5"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Torna Indietro</span>
        </button>

        <NextImage
          src="/logo-valentina.svg"
          alt="Valentina beauty space"
          width={320}
          height={240}
          priority
          className="auth-login-logo reveal-on-scroll"
          data-reveal-order="2"
        />

        <div className="auth-login-card reveal-on-scroll" data-reveal-order="3">
          <h1 className="auth-login-title">Accedi</h1>

          <button
            type="button"
            className="btn auth-login-google w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => signIn('google', { callbackUrl })}
          >
            <span className="auth-login-google-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </span>
            Continua con Google
          </button>

          <div className="auth-login-divider" role="separator" aria-label="Oppure">
            <span className="auth-login-divider-line" aria-hidden="true" />
            <span className="auth-login-or">Oppure</span>
            <span className="auth-login-divider-line" aria-hidden="true" />
          </div>

          <form onSubmit={handleSubmit} className="auth-login-form">
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

            <div className="auth-login-field">
              <label className="auth-login-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="auth-login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-login-field">
              <label className="auth-login-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="auth-login-input"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={rememberMe ? 'current-password' : 'off'}
              />
            </div>

            <div className="auth-login-row">
              <label className="auth-login-remember">
                <input
                  className="auth-login-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ricorda</span>
              </label>

              <Link href="/forgot-password" className="auth-login-forgot">
                Password dimenticata?
              </Link>
            </div>

            <button type="submit" className="btn auth-login-submit w-100" disabled={loading}>
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>

          <div className="auth-login-register">
            <span className="auth-login-register-muted">Non hai un account?</span>{' '}
            <Link href="/register" className="auth-login-register-link">
              Registrati
            </Link>
          </div>
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
