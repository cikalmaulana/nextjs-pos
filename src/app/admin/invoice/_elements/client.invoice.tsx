"use client"
import { format } from 'date-fns';

export function CE_Invoice() {
    const today = format(new Date(), 'EEEE, dd MMMM yyyy');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Purchase History</h2>
                <p className="text-sm text-gray-500">{today}</p>
            </div>
        </div>
    )
}