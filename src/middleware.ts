import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET ;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('Middleware ejecutándose...');

  // Obtener el token JWT desde las cookies
  return getToken({ req: request, secret }).then((token) => {
    if (!token) {
      console.log('No autorizado: Redirigiendo a login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('Usuario autenticado:', {token});
    return NextResponse.next();
  });

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [

    '/arco_asesores/:path*',
  ],
}