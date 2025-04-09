import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const getFakeSession = () => ({
    isAuthenticated: true,
    role: 'cashier',
});

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = getFakeSession(); 

    // Kalau akses root '/'
    if (pathname === '/') {
        if (!session.isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const redirectPath = session.role === 'admin' ? '/admin' : '/cashier';
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Redirect ke login kalau belum login
    if (!session.isAuthenticated && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Kalau udah login dan buka /login → redirect ke dashboard sesuai role
    if (session.isAuthenticated && pathname === '/login') {
        const redirectPath = session.role === 'admin' ? '/admin' : '/cashier';
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Role-based access
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
        return NextResponse.redirect(new URL('/restricted', request.url));
    }

    if (pathname.startsWith('/cashier') && session.role !== 'cashier') {
        return NextResponse.redirect(new URL('/restricted', request.url));
    }

    return NextResponse.next();
}  

export const config = {
    matcher: ['/((?!_next|favicon.ico|globals.css).*)'],
};
