
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-serif text-2xl font-bold tracking-wide">FICF</span>
          <p className="mt-4 text-gray-400 text-sm">
            Foundation for Indian Children’s Future
          </p>
        </div>
        
        <div>
          <h4 className="font-serif font-bold mb-4">{t.nav.contact}</h4>
          <p className="text-gray-400 text-sm">info@ficf.org</p>
          <p className="text-gray-400 text-sm">+41 79 000 00 00</p>
        </div>

        <div>
          <h4 className="font-serif font-bold mb-4">Legal</h4>
          <p className="text-gray-400 text-sm">&copy; {year} FICF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
