import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { getSession } from './lib/session';

export async function proxy(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    if (req.nextUrl.pathname.startsWith('/dashboard') && session.user?.role.toLowerCase() !== 'admin') {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/home', '/home/:path*', '/dashboard/:path*', '/admin/:path*'],
};
