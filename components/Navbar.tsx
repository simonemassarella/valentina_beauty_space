'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="nav-item">
      <Link className={`nav-link ${isActive ? 'active' : ''}`} href={href} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);

  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/logo-valentina.svg"
            alt="Valentina beauty space"
            width={370}
            height={280}
            priority
            style={{ height: 'auto', width: 'auto', maxHeight: '90px' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAdmin ? (
              <>
                <NavLink href="/admin/dashboard" label="Dashboard" onClick={handleNavClick} />
                <NavLink href="/admin/bookings" label="Prenotazioni" onClick={handleNavClick} />
                <NavLink href="/admin/services" label="Servizi" onClick={handleNavClick} />
              </>
            ) : (
              <>
                <NavLink href="/" label="Home" onClick={handleNavClick} />
                <NavLink href="/services" label="Servizi" onClick={handleNavClick} />
                <NavLink href="/bookings" label="Prenota" onClick={handleNavClick} />
                <NavLink href="/dashboard" label="Area Clienti" onClick={handleNavClick} />
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {session ? (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <div className="d-flex flex-column text-end">
                    <span className="text-muted small">
                      Ciao, {session.user?.name?.split(' ')[0] ?? 'Utente'}
                    </span>
                    <span className="small mt-1">
                      <span
                        className={`badge text-uppercase ${
                          isAdmin ? 'bg-dark text-white' : 'bg-secondary-subtle text-muted border'
                        }`}
                      >
                        {isAdmin ? 'ADMIN' : 'CLIENTE'}
                      </span>
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-danger px-0"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Esci
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link href="/login" className="btn btn-outline-primary btn-sm">
                    Accedi
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="btn btn-primary btn-sm">
                    Registrati
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
