import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { clsx } from 'clsx';

export const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const scrollPosition = useScrollPosition();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const isScrolled = scrollPosition > 20;

    const navLinks = [
        { label: t.nav.meet, href: '/#catalog' },
        { label: t.nav.contact, href: '/contact' },
    ];

    // Scroll spy for home page
    useEffect(() => {
        if (location.pathname !== '/' && location.pathname !== '/FICFCharity/') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const catalogSection = document.getElementById('catalog');
            if (catalogSection) {
                const rect = catalogSection.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 100) {
                    setActiveSection('meet');
                } else {
                    setActiveSection('');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Scroll Lock
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            // prevent touch move on body to stop pulling down refresh or scrolling
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isMobileMenuOpen]);

    const isActive = (linkHref: string) => {
        if (linkHref === '/contact') {
            return location.pathname === '/contact';
        }
        if (linkHref.includes('#catalog')) {
            return activeSection === 'meet';
        }
        return false;
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 100) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={clsx(
                    'fixed top-0 left-0 right-0 z-[50] transition-all duration-300',
                    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === '/' || window.location.pathname === '/FICFCharity/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="text-2xl font-serif font-bold tracking-tight text-secondary relative z-[51]"
                    >
                        FICF
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={(e) => {
                                    const isHashLink = link.href.includes('#');
                                    if (isHashLink) {
                                        const targetId = link.href.split('#')[1];
                                        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/FICFCharity/';

                                        if (isHomePage) {
                                            e.preventDefault();
                                            const element = document.getElementById(targetId);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                                window.history.pushState(null, '', `#${targetId}`);
                                            }
                                        }
                                    }
                                }}
                                className={clsx(
                                    "text-sm font-medium transition-colors border-b-2",
                                    isActive(link.href)
                                        ? "text-primary border-primary"
                                        : "text-gray-600 border-transparent hover:text-primary hover:border-primary/20"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 text-sm ml-4 border-l pl-4 border-gray-200">
                            {(['en', 'fr', 'de'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={clsx(
                                        'uppercase transition-colors',
                                        language === lang ? 'font-bold text-secondary' : 'text-gray-400 hover:text-gray-600'
                                    )}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        
                        {/* Admin Lock */}
                        <Link to="/admin" className="ml-4 text-gray-300 hover:text-gray-500 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile: Language Switcher + Menu Button */}
                    <div className="flex items-center md:hidden space-x-4 relative z-[51]">
                        <div className="flex space-x-1">
                            {(['en', 'fr', 'de'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={clsx(
                                        'text-xs uppercase font-bold p-1 rounded',
                                        language === lang ? 'bg-secondary text-white' : 'text-gray-500 hover:text-gray-100'
                                    )}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <button
                            className="p-2 text-secondary hover:bg-black/5 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Portal */}
            {createPortal(
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-[2px]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            
                            {/* Bottom Sheet */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                drag="y"
                                dragConstraints={{ top: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                className="fixed bottom-0 left-0 right-0 bg-white z-[9999] rounded-t-2xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center touch-pan-y"
                            >
                                {/* Drag Handle */}
                                <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-8 shrink-0" />

                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <span className="text-2xl font-serif font-bold text-secondary mb-8 shrink-0">Menu</span>

                                <div className="flex flex-col space-y-6 items-center w-full overflow-y-auto max-h-[60vh]">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            onClick={(e) => {
                                                setIsMobileMenuOpen(false);
                                                const isHashLink = link.href.includes('#');
                                                
                                                if (isHashLink) {
                                                    const targetId = link.href.split('#')[1];
                                                    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/FICFCharity/';
                                                    
                                                    if (isHomePage) {
                                                        e.preventDefault();
                                                        const element = document.getElementById(targetId);
                                                        if (element) {
                                                            element.scrollIntoView({ behavior: 'smooth' });
                                                            window.history.pushState(null, '', `#${targetId}`);
                                                        }
                                                    }
                                                }
                                            }}
                                            className="text-xl font-medium text-secondary hover:text-primary transition-colors w-full text-center py-2 active:bg-gray-50 rounded-lg shrink-0"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-8 text-gray-400 text-xs shrink-0">
                                    Swipe down to close
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
