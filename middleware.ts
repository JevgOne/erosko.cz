import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const userRole = auth?.user?.role;

  // Redirect admin users trying to access regular dashboard to admin panel
  if (isLoggedIn && userRole === 'ADMIN' && nextUrl.pathname === '/inzerent_dashboard') {
    return NextResponse.redirect(new URL('/admin_panel', nextUrl));
  }

  // Redirect regular users trying to access admin panel to their dashboard
  if (isLoggedIn && userRole !== 'ADMIN' && nextUrl.pathname === '/admin_panel') {
    return NextResponse.redirect(new URL('/inzerent_dashboard', nextUrl));
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (nextUrl.pathname === '/prihlaseni' || nextUrl.pathname === '/registrace')) {
    if (userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin_panel', nextUrl));
    }
    return NextResponse.redirect(new URL('/inzerent_dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/inzerent_dashboard', '/admin_panel', '/prihlaseni', '/registrace'],
};
