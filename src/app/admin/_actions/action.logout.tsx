'use server';

import { cookies } from 'next/headers';

export async function ACT_Logout() {
    const KEY = process.env.SESSION_COOKIE_NAME || 'user_session';
    (await cookies()).set(KEY, '', {
        path: '/',
        maxAge: 0,
    });
}
