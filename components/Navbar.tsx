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

function getInitials(name?: string | null, email?: string | null) {
  const base = (name || '').trim();
  if (base) {
    const parts = base.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts.length > 1 ? parts[1]?.[0] ?? '' : parts[0]?.[1] ?? '';
    return (first + second).toUpperCase() || 'U';
  }

  const mail = (email || '').trim();
  if (mail) {
    const local = mail.split('@')[0] ?? '';
    const a = local[0] ?? '';
    const b = local[1] ?? '';
    return (a + b).toUpperCase() || 'U';
  }

  return 'U';
}

export default function Navbar() {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);

  const isAdmin = (session?.user as any)?.role === 'ADMIN';
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isHeroNavbar = isHome || pathname === '/servizi';

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
    ? 'main-navbar-scrolled'
    : isHeroNavbar
    ? (isScrolled || expanded)
      ? 'main-navbar-scrolled'
      : 'main-navbar-home'
    : 'main-navbar-scrolled';

  const userName = session?.user?.name?.trim() || session?.user?.email?.split('@')[0] || 'Utente';
  const userInitials = getInitials(session?.user?.name, session?.user?.email);

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
            <NavLink href="/servizi" label="Servizi" onClick={handleNavClick} />
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAdmin ? (
              <>
                <NavLink href="/admin/dashboard" label="Dashboard" onClick={handleNavClick} />
                <NavLink href="/admin/bookings" label="Prenotazioni" onClick={handleNavClick} />
                <NavLink href="/admin/services" label="Servizi" onClick={handleNavClick} />
                <li className="nav-item d-flex align-items-center me-3">
                  <div className="navbar-user">
                    <span className="navbar-user-avatar" aria-hidden="true">
                      {userInitials}
                    </span>
                    <span className="navbar-user-name">{userName}</span>
                    <span className="badge text-uppercase bg-dark text-white">ADMIN</span>
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
            ) : session ? (
              <>
                <NavLink href="/dashboard" label="Area Clienti" onClick={handleNavClick} />
                <li className="nav-item d-flex align-items-center me-3">
                  <div className="navbar-user">
                    <span className="navbar-user-avatar" aria-hidden="true">
                      {userInitials}
                    </span>
                    <span className="navbar-user-name">{userName}</span>
                    <span className="badge text-uppercase bg-secondary-subtle text-muted border">CLIENTE</span>
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
