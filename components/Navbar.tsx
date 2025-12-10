'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function NavLink({ href, label, onClick, isPrimary = false }: { 
  href: string; 
  label: string; 
  onClick?: () => void;
  isPrimary?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="nav-item">
      <Link 
        className={`nav-link ${isActive ? 'active' : ''} ${isPrimary ? 'btn btn-primary text-white px-3' : ''}`} 
        href={href} 
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);

  const isAdmin = (session?.user as any)?.role === 'ADMIN';
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setExpanded(false);
  };

  const navbarVariantClass = isAdmin
    ? ''
    : isHome
    ? (isScrolled || expanded)
      ? 'main-navbar-scrolled'
      : 'main-navbar-home'
    : 'main-navbar-scrolled';

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light main-navbar sticky-top ${navbarVariantClass}`}
    >
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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavLink href="/" label="Home" onClick={handleNavClick} />
            <NavLink href="/about" label="Chi siamo" onClick={handleNavClick} />
            <NavLink href="/esperienze" label="Servizi" onClick={handleNavClick} />
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAdmin ? (
              <>
                <NavLink href="/admin/dashboard" label="Dashboard" onClick={handleNavClick} />
                <NavLink href="/admin/bookings" label="Prenotazioni" onClick={handleNavClick} />
                <NavLink href="/admin/services" label="Servizi" onClick={handleNavClick} />
              </>
            ) : session ? (
              <>
                <NavLink href="/dashboard" label="Area Clienti" onClick={handleNavClick} />
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
                <li className="nav-item">
                  <Link href="/bookings" className="btn btn-light btn-sm">
                    Prenota ora
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
