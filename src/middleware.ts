import { type NextRequest, NextResponse } from 'next/server'

export const getSessionFromCookie = (request: NextRequest) => {
    const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "user_session";
    const cookie = request.cookies.get(COOKIE_NAME)?.value;

    if (!cookie) return null;

    try {
        const session = JSON.parse(cookie);
        return {
            isAuthenticated: true,
            role: session.role,
        };
    } catch {
        return null;
    }
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = getSessionFromCookie(request);

    const roleMap = {
        PAW01: 'admin',
        PAW02: 'cashier',
    } as const;

    const userRole = session?.role ? roleMap[session.role as keyof typeof roleMap] : undefined;

    // Root
    if (pathname === '/') {
        if (!session || !session.isAuthenticated || !userRole) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // Belum login
    if ((!session || !session.isAuthenticated) && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Udah login tapi buka /login
    if (session?.isAuthenticated && pathname === '/login') {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // Akses role yang salah
    if (pathname.startsWith('/admin') && session?.role !== 'PAW01') {
        return NextResponse.redirect(new URL('/restricted', request.url));
    }

    if (pathname.startsWith('/cashier') && session?.role !== 'PAW02') {
        return NextResponse.redirect(new URL('/restricted', request.url));
    }

    // Biar /restricted bisa diakses semua
    if (pathname.startsWith('/restricted')) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf|mjs|ts|jsx)$).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
