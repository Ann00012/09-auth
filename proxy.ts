// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // 1. Якщо accessToken відсутній
  if (!accessToken) {
    if (refreshToken) {
      try {
        // Отримуємо дані сесії
        const response = await checkServerSession();

        // ПЕРЕВІРКА: чи повернулися заголовки (усуваємо TypeError: reading 'set-cookie')
        if (response?.headers && response.headers['set-cookie']) {
          const setCookie = response.headers['set-cookie'];
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path || '/',
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
            };

            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }

          // Якщо сесія успішно оновлена і це публічний маршрут (Login/Register) -> на профіль
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/profile', request.url));
          }
          // Якщо приватний -> дозволяємо прохід з новими куками
          return NextResponse.next();
        }
      } catch (error) {
        console.error("Proxy session refresh failed:", error);
      }
    }

    // Якщо токенів немає або оновлення не вдалося:
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  // 2. Якщо accessToken існує (користувач вже в системі)
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};