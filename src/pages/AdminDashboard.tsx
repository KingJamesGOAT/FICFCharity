import { useState } from 'react';
import { StorageService, type PledgeData } from '../services/StorageService';
import { Lock, Unlock, Download, QrCode, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

export const AdminDashboard = () => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pledges, setPledges] = useState<PledgeData[]>([]);
    const [stats, setStats] = useState({ totalRaised: 0, donorCount: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEventQR, setShowEventQR] = useState(false);

    const siteUrl = "https://kingjamesgoat.github.io/FICFCharity/";
    const qrGeneratorUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(siteUrl)}`;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await StorageService.getPledges(pin);
            setPledges(data);
            setIsAuthenticated(true);
            
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
        const headers = ["Date", "Name", "Email", "Phone", "Address", "Postal Code & City", "Country", "Child", "Amount (CHF)", "Type", "Receipt", "RefCode"];
        const csvContent = [
            headers.join(','),
            ...pledges.map(p => [
                new Date(p.timestamp).toLocaleDateString(),
                `"${p.donorName}"`,
                p.email,
                `"${p.phone || ''}"`,
                `"${p.address || ''}"`,
                `"${p.zipCity || ''}"`,
                `"${p.country || ''}"`,
                `"${p.childName}"`,
                p.amount,
                p.type,
                p.taxReceipt ? "Yes" : "No",
                p.refCode || ''
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
                        
                        {error && (
                            <p className="text-red-500 text-sm text-center font-medium animate-shake">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !pin}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Unlock className="w-4 h-4" />
                                    <span>Unlock Dashboard</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-secondary">FICF Admin Dashboard</h1>
                        <p className="text-sm text-gray-500">Live pledge tracking and event management</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button 
                            onClick={() => setShowEventQR(!showEventQR)}
                            className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                            <QrCode className="w-4 h-4 text-primary" />
                            <span>{showEventQR ? "Hide Event QR" : "Show Event QR"}</span>
                        </button>
                        <button 
                            onClick={exportToCSV}
                            disabled={!pledges.length}
                            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Event QR Code Card */}
                {showEventQR && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-32 h-32 bg-white p-2 rounded-xl border border-gray-200 shadow-xs shrink-0">
                                <img src={qrGeneratorUrl} alt="Event QR Code" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-secondary">Official Event QR Code</h3>
                                <p className="text-xs text-gray-500 mb-2">Scan with any mobile camera to open the FICF sponsorship catalog.</p>
                                <a 
                                    href={siteUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center text-xs text-primary font-mono hover:underline"
                                >
                                    <span>{siteUrl}</span>
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        </div>
                        <a 
                            href={qrGeneratorUrl} 
                            target="_blank" 
                            download="FICF_Event_QR.png" 
                            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                        >
                            Download High-Res QR
                        </a>
                    </div>
                )}

                {/* Stats */}
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
                                    {["Date", "Ref", "Donor", "Child", "Amount", "Type", "Receipt", "Email", "Phone", "Address"].map(head => (
                                        <th key={head} className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pledges.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center text-gray-400">
                                            No pledges found yet.
                                        </td>
                                    </tr>
                                ) : (
                                    pledges.map((pledge, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors text-xs md:text-sm">
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                {new Date(pledge.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-primary font-semibold whitespace-nowrap">
                                                {pledge.refCode || '-'}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {pledge.donorName}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {pledge.childName}
                                            </td>
                                            <td className="px-4 py-3 font-bold text-secondary whitespace-nowrap">
                                                CHF {pledge.amount}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={clsx(
                                                    "px-2 py-0.5 rounded-full text-xs font-medium",
                                                    pledge.type === 'yearly' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                                )}>
                                                    {pledge.type === 'yearly' ? 'Yearly' : 'One-time'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {pledge.taxReceipt ? "✅" : "-"}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {pledge.email}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                {pledge.phone || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 max-w-xs truncate" title={`${pledge.address || ''} ${pledge.zipCity || ''}`}>
                                                {pledge.address ? `${pledge.address}, ${pledge.zipCity}` : '-'}
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
