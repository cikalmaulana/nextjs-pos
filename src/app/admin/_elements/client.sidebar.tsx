'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { adminSidebarItems } from '../_constant/constant';
import { useState, useTransition } from 'react';
import { FUN_Logout } from '../_functions/function.logout';
import { CE_LoadingAnimation } from '@/library/client.loading.animation';

interface I_Props {
    name: string;
    email: string;
}

export default function Sidebar(props: I_Props) {
    const pathname = usePathname();
    const [pendingLogout, isTransitionLogout] = useTransition()

    const doLogout = () => {
        FUN_Logout({
            transit: isTransitionLogout
        })
    }

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-1 text-gray-800">Admin Panel</h2>
                <div className="flex flex-col mb-7">
                    <div className="font-semibold text-wrap">{props.name}</div>
                    <div className="text-paw-grey text-sm text-wrap">{props.email}</div>
                </div>
                <nav className="flex flex-col gap-2">
                    {adminSidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        const iconName = item.icon;
                        const defaultIcon = `/assets/icons/${iconName}.png`;
                        const activeIcon = `/assets/icons/${iconName}-active.png`;

                        return (
                            <Link key={item.href} href={item.href}>
                                <SidebarItem
                                    name={item.name}
                                    isActive={isActive}
                                    defaultIcon={defaultIcon}
                                    activeIcon={activeIcon}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div
                className="h-10 mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-paw-danger text-white hover:bg-red-600 transition hover:cursor-pointer"
                onClick={() => doLogout()}
            >
                {pendingLogout ? <CE_LoadingAnimation color='white' size={14} /> : 'Logout'}
            </div>
        </aside>
    );
}

function SidebarItem({
    name,
    isActive,
    defaultIcon,
    activeIcon,
}: {
    name: string;
    isActive: boolean;
    defaultIcon: string;
    activeIcon: string;
}) {
    const [hover, setHover] = useState(false);

    const showIcon = isActive || hover ? activeIcon : defaultIcon;

    return (
        <span
            className={clsx(
                'flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-paw-blue-light hover:text-white transition',
                isActive && 'bg-paw-blue text-white'
            )}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Image
                src={showIcon}
                alt="ic"
                width={20}
                height={20}
                className="object-contain"
            />
            {name}
        </span>
    );
}
