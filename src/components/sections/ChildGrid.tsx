import { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { children } from '../../data/children';
import type { Child, ChildCategory } from '../../data/children';
import { useLanguage } from '../../contexts/LanguageContext';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

export const ChildGrid = () => {
  const { t } = useLanguage();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | ChildCategory>('all');

  const handleSponsor = (child: Child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedChild(null), 300);
  };

  const filteredChildren = useMemo(() => {
    if (activeFilter === 'all') return children;
    return children.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="catalog" className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-xs md:text-sm mb-1.5 block">
              {t.nav.meet}
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-secondary">
              Children & Youth Awaiting Sponsorship
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-xl">
              Meet the 26 children and university students in need of urgent sponsorship. Choose a profile to support their education.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 bg-gray-100 p-1 md:p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-secondary shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-secondary'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.filters.all}</span>
            </button>

            <button
              onClick={() => setActiveFilter('university')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeFilter === 'university'
                  ? 'bg-white text-primary shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-secondary'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.filters.university}</span>
            </button>

            <button
              onClick={() => setActiveFilter('school')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeFilter === 'school'
                  ? 'bg-white text-primary shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-secondary'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.filters.school}</span>
            </button>
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {filteredChildren.map((child) => (
            <Card 
              key={child.id} 
              child={child} 
              onSponsor={handleSponsor} 
            />
          ))}
        </div>

        {/* Sponsorship Pledge Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleClose} 
          child={selectedChild} 
        />
      </div>
    </section>
  );
};
