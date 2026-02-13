import { useState } from 'react';
import { StorageService, type PledgeData } from '../services/StorageService';
import { Lock, Unlock, Download } from 'lucide-react';
import { clsx } from 'clsx';

export const AdminDashboard = () => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pledges, setPledges] = useState<PledgeData[]>([]);
    const [stats, setStats] = useState({ totalRaised: 0, donorCount: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await StorageService.getPledges(pin);
            setPledges(data);
            setIsAuthenticated(true);
            
            // Calculate stats locally or use the fetched ones if we fetched them separate
            const total = data.reduce((acc, curr) => acc + curr.amount, 0);
            setStats({ totalRaised: total, donorCount: data.length });

        } catch (err) {
            setError('Invalid PIN or Connection Error');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (!pledges.length) return;
        const headers = ["Date", "Name", "Email", "Child", "Amount", "Type", "Receipt", "Payment"];
        const csvContent = [
            headers.join(','),
            ...pledges.map(p => [
                new Date(p.timestamp).toLocaleDateString(),
                `"${p.donorName}"`,
                p.email,
                `"${p.childName}"`,
                p.amount,
                p.type,
                p.taxReceipt ? "Yes" : "No",
                p.paymentMethod
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ficf-pledges-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-orange-100 rounded-full">
                           <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-secondary mb-2">Admin Access</h2>
                    <p className="text-center text-gray-500 mb-8">Enter security PIN to view data</p>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="••••"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            maxLength={8}
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Unlock Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary flex items-center gap-3">
                            <Unlock className="w-8 h-8 text-primary" />
                            Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">Live overview of sponsorship campaign</p>
                    </div>
                    <button 
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Raised</p>
                        <p className="text-4xl font-bold text-secondary mt-2">CHF {stats.totalRaised.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Donors</p>
                        <p className="text-4xl font-bold text-secondary mt-2">{stats.donorCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Progress</p>
                        <div className="flex items-end gap-2 mt-2">
                             <p className="text-4xl font-bold text-secondary">{Math.min(Math.round((stats.totalRaised / 10000) * 100), 100)}%</p>
                             <span className="text-gray-400 mb-1">of 10k Goal</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    {["Date", "Donor", "Child", "Amount", "Type", "Receipt", "Contact"].map(head => (
                                        <th key={head} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pledges.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                            No pledges found yet.
                                        </td>
                                    </tr>
                                ) : (
                                    pledges.map((pledge, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(pledge.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {pledge.donorName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {pledge.childName}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-secondary">
                                                CHF {pledge.amount}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={clsx(
                                                    "px-2 py-1 rounded-full text-xs font-medium",
                                                    pledge.type === 'yearly' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                                )}>
                                                    {pledge.type === 'yearly' ? 'Yearly' : 'One-time'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {pledge.taxReceipt ? "✅" : "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {pledge.email}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
