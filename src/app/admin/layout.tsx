import Sidebar from "./_elements/client.sidebar";
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(process.env.SESSION_COOKIE_NAME || 'user_session')?.value;

    let name = '';
    let email = '';

    if (raw) {
        try {
            const user = JSON.parse(raw);
            name = user.name || '';
            email = user.email || '';
        } catch (error) {
            console.error('Failed to parse cookie:', error);
        }
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar name={name} email={email}/>
            <main className="flex-1 pl-72 p-6 bg-gray-50 min-h-screen ms-5">
                {children}
            </main>
        </div>
    );
}