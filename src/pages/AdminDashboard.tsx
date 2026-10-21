import { useState, useEffect, useMemo } from 'react';
import { StorageService, type PledgeData } from '../services/StorageService';
import { 
  Lock, 
  Unlock, 
  Download, 
  QrCode, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Users, 
  TrendingUp, 
  Heart, 
  Sparkles,
  LogOut,
  Copy,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';

export const AdminDashboard = () => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pledges, setPledges] = useState<PledgeData[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [showEventQR, setShowEventQR] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'yearly' | 'one-time'>('all');
    const [copiedRef, setCopiedRef] = useState<string | null>(null);

    const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}${import.meta.env.BASE_URL}` : "https://www.ficf.ch/";
    const qrGeneratorUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(siteUrl)}`;

    // Check session on mount
    useEffect(() => {
        const savedAuth = sessionStorage.getItem('ficf_admin_auth');
        if (savedAuth === '090402') {
            setPin(savedAuth);
            fetchPledges(savedAuth);
        }
    }, []);

    const fetchPledges = async (authPin: string) => {
        setLoading(true);
        setError('');
        try {
            const data = await StorageService.getPledges(authPin);
            setPledges(data || []);
            setIsAuthenticated(true);
            sessionStorage.setItem('ficf_admin_auth', authPin);
        } catch (err) {
            setError('Invalid PIN or Connection Error');
            setIsAuthenticated(false);
            sessionStorage.removeItem('ficf_admin_auth');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        if (!pin && sessionStorage.getItem('ficf_admin_auth')) {
            setPin(sessionStorage.getItem('ficf_admin_auth') || '');
        }
        setRefreshing(true);
        try {
            const authPin = pin || sessionStorage.getItem('ficf_admin_auth') || '';
            const data = await StorageService.getPledges(authPin);
            setPledges(data || []);
        } catch (e) {
            console.error('Refresh error:', e);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchPledges(pin);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPin('');
        sessionStorage.removeItem('ficf_admin_auth');
    };

    const handleCopyRef = (ref: string) => {
        navigator.clipboard.writeText(ref);
        setCopiedRef(ref);
        setTimeout(() => setCopiedRef(null), 2000);
    };

    const exportToCSV = () => {
        if (!pledges.length) return;
        const headers = ["Date", "RefCode", "Donor Name", "Email", "Phone", "Child", "Amount (CHF)", "Type", "Receipt", "Address", "Postal Code & City", "Country"];
        const csvContent = [
            headers.join(','),
            ...pledges.map(p => [
                new Date(p.timestamp).toLocaleDateString(),
                `"${p.refCode || ''}"`,
                `"${p.donorName || ''}"`,
                `"${p.email || ''}"`,
                `"${p.phone || ''}"`,
                `"${p.childName || ''}"`,
                p.amount,
                p.type,
                p.taxReceipt ? "Yes" : "No",
                `"${p.address || ''}"`,
                `"${p.zipCity || ''}"`,
                `"${p.country || ''}"`
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

    // Filtered pledges
    const filteredPledges = useMemo(() => {
        return pledges.filter(p => {
            const matchesType = filterType === 'all' || p.type === filterType;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesType;
            const matchesSearch = 
                (p.donorName && p.donorName.toLowerCase().includes(query)) ||
                (p.childName && p.childName.toLowerCase().includes(query)) ||
                (p.refCode && p.refCode.toLowerCase().includes(query)) ||
                (p.email && p.email.toLowerCase().includes(query)) ||
                (p.phone && p.phone.toLowerCase().includes(query));
            return matchesType && matchesSearch;
        });
    }, [pledges, filterType, searchQuery]);

    // Computed Stats
    const stats = useMemo(() => {
        const total = pledges.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
        const yearlyCount = pledges.filter(p => p.type === 'yearly').length;
        const oneTimeCount = pledges.filter(p => p.type !== 'yearly').length;
        const avg = pledges.length ? Math.round(total / pledges.length) : 0;
        return {
            totalRaised: total,
            totalPledges: pledges.length,
            yearlyCount,
            oneTimeCount,
            avgPledge: avg,
            progress: Math.min(Math.round((total / 10000) * 100), 100)
        };
    }, [pledges]);

    // LOGIN SCREEN
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/70 pt-28 md:pt-32 pb-16 px-4">
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100/80">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-primary shadow-xs">
                           <Lock className="w-7 h-7" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-serif font-bold text-center text-secondary mb-1">Admin Portal</h2>
                    <p className="text-center text-xs sm:text-sm text-gray-500 mb-8">
                        Enter your 6-digit security PIN to access the FICF pledge dashboard
                    </p>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                autoFocus
                                className="w-full px-4 py-3.5 text-center text-2xl tracking-[0.3em] font-mono rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="••••••"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                maxLength={8}
                            />
                        </div>
                        
                        {error && (
                            <p className="text-red-600 text-xs text-center font-medium py-1 bg-red-50 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !pin}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Unlock className="w-4 h-4" />
                                    <span>Enter Dashboard</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // AUTHENTICATED DASHBOARD
    return (
        <div className="min-h-screen bg-gray-50/60 pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-gray-100">
                    <div>
                        <div className="flex items-center space-x-2.5">
                            <h1 className="text-xl sm:text-2xl font-serif font-bold text-secondary">
                                FICF Admin Dashboard
                            </h1>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                                Live Sync
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Real-time pledges from Google Sheets & QR event management
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <button 
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="inline-flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                            title="Fetch latest pledges"
                        >
                            <RefreshCw className={clsx("w-3.5 h-3.5", refreshing && "animate-spin text-primary")} />
                            <span>{refreshing ? 'Syncing...' : 'Sync Data'}</span>
                        </button>

                        <button 
                            onClick={() => setShowEventQR(!showEventQR)}
                            className="inline-flex items-center space-x-1.5 bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200/60 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>{showEventQR ? "Hide QR" : "Event QR"}</span>
                        </button>

                        <button 
                            onClick={exportToCSV}
                            disabled={!pledges.length}
                            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Export CSV</span>
                        </button>

                        <button 
                            onClick={handleLogout}
                            className="inline-flex items-center p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1 cursor-pointer"
                            title="Lock dashboard"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Event QR Code Card (Collapsible) */}
                {showEventQR && (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-5">
                            <div className="w-28 h-28 bg-white p-2 rounded-xl border border-gray-200 shadow-xs shrink-0">
                                <img src={qrGeneratorUrl} alt="Event QR Code" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif text-base font-bold text-secondary">Event Guest QR Code</h3>
                                <p className="text-xs text-gray-500 mb-2 max-w-md">
                                    Display this QR code at the 20th Anniversary event. Guests can scan with any phone camera to access the live catalog on <strong>ficf.ch</strong>.
                                </p>
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
                            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-xs shrink-0"
                        >
                            Download High-Res QR
                        </a>
                    </div>
                )}

                {/* Minimalist Metrics Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
                    {/* Total Raised */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Raised</span>
                            <div className="w-7 h-7 rounded-lg bg-orange-50 text-primary flex items-center justify-center">
                                <Heart className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-serif font-extrabold text-secondary">
                                CHF {stats.totalRaised.toLocaleString()}
                            </div>
                            <span className="text-[11px] text-gray-400 mt-0.5 block">
                                Avg. CHF {stats.avgPledge} / pledge
                            </span>
                        </div>
                    </div>

                    {/* Total Pledges */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Pledges</span>
                            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Users className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-serif font-extrabold text-secondary">
                                {stats.totalPledges}
                            </div>
                            <span className="text-[11px] text-gray-400 mt-0.5 block">
                                {stats.yearlyCount} yearly · {stats.oneTimeCount} one-time
                            </span>
                        </div>
                    </div>

                    {/* Yearly Sponsors */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Yearly Sponsors</span>
                            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-serif font-extrabold text-purple-700">
                                {stats.yearlyCount}
                            </div>
                            <span className="text-[11px] text-gray-400 mt-0.5 block">
                                Children fully sponsored
                            </span>
                        </div>
                    </div>

                    {/* Goal Progress */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Goal Progress</span>
                            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-baseline space-x-1.5">
                                <span className="text-xl sm:text-2xl font-serif font-extrabold text-secondary">{stats.progress}%</span>
                                <span className="text-[11px] text-gray-400">of 10k goal</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
                                <div 
                                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                                    style={{ width: `${stats.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text"
                            placeholder="Search by donor, child, or ref code..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* Type Filter Buttons */}
                    <div className="flex items-center space-x-1.5 w-full sm:w-auto bg-gray-100/80 p-1 rounded-xl">
                        {(['all', 'yearly', 'one-time'] as const).map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={clsx(
                                    "px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer",
                                    filterType === type 
                                        ? "bg-white text-secondary shadow-xs" 
                                        : "text-gray-500 hover:text-secondary"
                                )}
                            >
                                {type === 'all' ? `All (${pledges.length})` : type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pledges Table */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-gray-50/80 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] whitespace-nowrap">Date</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] whitespace-nowrap">Ref Code</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Donor</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Child</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] whitespace-nowrap">Amount</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] whitespace-nowrap">Type</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] text-center whitespace-nowrap">Receipt</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Contact</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPledges.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                                            {searchQuery ? "No pledges matched your search." : "No pledges registered yet."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPledges.map((p, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                                            {/* Date */}
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                {p.timestamp ? new Date(p.timestamp).toLocaleDateString() : '-'}
                                            </td>

                                            {/* Ref Code */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <button 
                                                    onClick={() => p.refCode && handleCopyRef(p.refCode)}
                                                    className="inline-flex items-center space-x-1 font-mono font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                                                    title="Click to copy ref code"
                                                >
                                                    <span>{p.refCode || '-'}</span>
                                                    {p.refCode && (
                                                        copiedRef === p.refCode ? (
                                                            <Check className="w-3 h-3 text-emerald-600" />
                                                        ) : (
                                                            <Copy className="w-3 h-3 text-gray-300 group-hover:text-primary" />
                                                        )
                                                    )}
                                                </button>
                                            </td>

                                            {/* Donor */}
                                            <td className="px-4 py-3 font-semibold text-secondary whitespace-nowrap">
                                                {p.donorName || 'Anonymous'}
                                            </td>

                                            {/* Child */}
                                            <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                                                {p.childName}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-4 py-3 font-bold text-secondary whitespace-nowrap">
                                                CHF {p.amount}
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={clsx(
                                                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-block",
                                                    p.type === 'yearly' 
                                                        ? "bg-purple-100 text-purple-800 border border-purple-200" 
                                                        : "bg-blue-100 text-blue-800 border border-blue-200"
                                                )}>
                                                    {p.type === 'yearly' ? 'Yearly' : 'One-time'}
                                                </span>
                                            </td>

                                            {/* Receipt */}
                                            <td className="px-4 py-3 text-center whitespace-nowrap">
                                                {p.taxReceipt ? (
                                                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                        Tax Doc
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300">—</span>
                                                )}
                                            </td>

                                            {/* Contact */}
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                <div className="font-medium text-gray-800">{p.email}</div>
                                                {p.phone && <div className="text-gray-400 text-[11px]">{p.phone}</div>}
                                            </td>

                                            {/* Address */}
                                            <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate" title={`${p.address || ''} ${p.zipCity || ''} ${p.country || ''}`.trim()}>
                                                {p.address ? `${p.address}, ${p.zipCity || ''} ${p.country || ''}` : '—'}
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
