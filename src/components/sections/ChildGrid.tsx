import { useState } from 'react';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { children } from '../../data/children';
import type { Child } from '../../data/children';
import { useLanguage } from '../../contexts/LanguageContext';

export const ChildGrid = () => {
  const { t } = useLanguage();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSponsor = (child: Child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedChild(null), 300); // Wait for animation
  };

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">
              {t.nav.meet}
            </span>
            <h2 className="text-4xl font-serif font-bold text-secondary">
              Future Leaders
            </h2>
          </div>
          
          {/* Filter tabs could go here if implemented */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {children.map((child) => (
            <Card 
              key={child.id} 
              child={child} 
              onSponsor={handleSponsor} 
            />
          ))}
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={handleClose} 
          child={selectedChild} 
        />
      </div>
    </section>
  );
};
