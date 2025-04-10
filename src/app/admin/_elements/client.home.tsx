'use client'

import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Pie,
    PieChart, Cell, Legend,
} from 'recharts';
import { format } from 'date-fns';
import { summaryData, monthlyRevenue, topProducts, recentTransactions, topCategory } from '@/server/dummy/dummy.home.admin';

export function CE_HomeAdmin() {
    const today = format(new Date(), 'EEEE, dd MMMM yyyy'); // Contoh: Thursday, 10 April 2025
    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-500">{today}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryData.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white p-4 rounded-2xl shadow-sm border"
                    >
                        <div className="text-sm text-gray-500">{item.title}</div>
                        <div className="text-xl font-bold text-gray-800">{item.value}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
                        <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Selling Products - Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800">Top Selling Products</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProducts}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sold" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Selling Category - Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800">Top Selling Categories</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip />
                            <Legend
                                wrapperStyle={{ fontSize: '0.875rem', textAlign: 'center' }} // text-sm & rata tengah
                            />
                            <Pie
                                data={topCategory}
                                dataKey="sold"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name }) => name}
                            >
                            {topCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Latest Transactions</h3>
                <table className="w-full text-sm text-left text-gray-700">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-2">Invoice ID</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTransactions.map((trx) => (
                            <tr key={trx.id} className="border-b last:border-0">
                                <td className="py-2">{trx.id}</td>
                                <td className="py-2">{trx.date}</td>
                                <td className="py-2">{trx.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
