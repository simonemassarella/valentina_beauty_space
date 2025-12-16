'use client';

import NextImage from 'next/image';
import Link from 'next/link';
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
            <h1 className="auth-login-title">Email inviata</h1>

            <p className="auth-login-helper text-center mb-0">
              Abbiamo inviato un&apos;email a <strong>{email}</strong> con le istruzioni per recuperare la tua password.
            </p>

            <div className="auth-login-form">
              <button type="button" className="btn auth-login-submit w-100" onClick={() => router.push('/login')}>
                Torna al login
              </button>
              <button type="button" className="btn auth-login-google w-100" onClick={() => setSuccess(false)}>
                Invia un&apos;altra email
              </button>
            </div>

            <div className="auth-login-register">
              <Link href="/login" className="auth-login-register-link">
                Accedi
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="auth-login-title">Password dimenticata</h1>

          <p className="auth-login-helper text-center mb-0">
            Inserisci la tua email e ti invieremo le istruzioni per recuperare la password.
          </p>

          <form onSubmit={handleSubmit} className="auth-login-form">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="la tua@email.com"
                autoComplete="email"
              />
            </div>

            <button type="submit" className="btn auth-login-submit w-100" disabled={loading}>
              {loading ? 'Invio in corso...' : 'Invia email di recupero'}
            </button>
          </form>

          <div className="auth-login-register">
            <span className="auth-login-register-muted">Ti serve il login?</span>{' '}
            <Link href="/login" className="auth-login-register-link">
              Accedi
            </Link>
          </div>
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
