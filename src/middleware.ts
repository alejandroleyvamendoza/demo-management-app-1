import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import rateLimit from "express-rate-limit";


const secret = process.env.NEXTAUTH_SECRET ;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones
  keyGenerator: (req) => {
      // Obtiene la IP desde los encabezados
      return (
          req.headers["x-real-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.socket?.remoteAddress ||
          "unknown-ip"
      );
  },
});


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('====================== middleware.ts middleware ======================');

  console.log('Middleware ejecutándose...');

  // Obtener el token JWT desde las cookies
  return getToken({ req: request, secret }).then((token) => {
    if (!token) {
      console.log('No autorizado: Redirigiendo a login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return new Promise((resolve) => {
      limiter(request as any, {} as any, () => resolve(NextResponse.next()));
    });
  });

}







// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/arco_asesores/:path*', '/api/:path*',
  ],
}