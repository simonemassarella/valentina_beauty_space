'use client';

import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
};

const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export default function LayoutChrome({ children, navbar, footer }: Props) {
  const pathname = usePathname();
  const hideChrome = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!hideChrome ? navbar : null}
      {hideChrome ? (
        <main className="page-animated page-animated-auth">{children}</main>
      ) : (
        <main className="container page-animated">{children}</main>
      )}
      {!hideChrome ? footer : null}
    </>
  );
}
