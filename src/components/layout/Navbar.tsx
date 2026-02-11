import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { clsx } from 'clsx';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const scrollPosition = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollPosition > 20;

  const navLinks = [
    { label: t.nav.meet, href: '/#catalog' },
    { label: t.nav.contact, href: '/contact' },
  ];



  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        {/* Logo */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (window.location.pathname === '/' || window.location.pathname === '/FICFCharity/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-2xl font-serif font-bold tracking-tight text-secondary"
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
                // Setup for hash checking
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
                  // If not home, let Link handle the navigation to /#id
                }
              }}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
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
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-secondary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[60] flex flex-col p-6 items-center justify-center"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 transition-transform hover:scale-110 active:scale-95"
              >
                <X className="w-8 h-8 text-secondary" />
              </button>
            </div>

            <div className="flex flex-col space-y-8 items-center w-full max-w-sm">
              <span className="text-3xl font-serif font-bold text-secondary mb-4">Menu</span>
              
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
                  className="text-xl font-medium text-secondary hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary/20"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-12 flex space-x-8 text-lg">
              {(['en', 'fr', 'de'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={clsx(
                    'uppercase text-sm font-bold tracking-widest py-2 px-4 rounded-full transition-all',
                    language === lang 
                      ? 'bg-secondary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
            
            <div className="absolute bottom-8 text-gray-400 text-xs">
              FICF Charity &copy; {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
