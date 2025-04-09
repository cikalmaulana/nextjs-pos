import { type NextRequest, NextResponse } from 'next/server'

export const getFakeSession = () => ({
    isAuthenticated: true,
    role: 'PAW02', // cashier
});

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = getFakeSession();

    const roleMap = {
        PAW01: 'admin',
        PAW02: 'cashier',
    } as const;

    const userRole = roleMap[session.role as keyof typeof roleMap];
    
    // Root
    if (pathname === '/') {
        if (!session.isAuthenticated || !userRole) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // Belum login
    if (!session.isAuthenticated && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Udah login tapi buka /login
    if (session.isAuthenticated && pathname === '/login') {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }

    // Akses role yang salah
    if (pathname.startsWith('/admin') && session.role !== 'PAW01') {
        return NextResponse.redirect(new URL('/restricted', request.url));
    }

    if (pathname.startsWith('/cashier') && session.role !== 'PAW02') {
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
