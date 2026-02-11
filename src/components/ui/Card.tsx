import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Child } from '../../data/children';
import { Button } from './Button';

interface CardProps {
  child: Child;
  onSponsor: (child: Child) => void;
}

export const Card = ({ child, onSponsor }: CardProps) => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={child.image}
            alt={child.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-serif text-4xl">
            {child.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        
        {/* Overlay gradient for text readability if needed, or stick to clean Swiss style */}
      </div>

      {/* Content */}
      <div className="p-2 md:p-5 flex flex-col flex-grow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2">
          <h3 className="font-serif text-sm md:text-lg font-bold text-secondary line-clamp-1">{child.name}</h3>
          <span className="text-[10px] md:text-xs font-semibold bg-orange-50 md:bg-orange-100 text-primary px-1.5 py-0.5 md:px-2 md:py-1 rounded-full whitespace-nowrap self-start mt-0.5 md:mt-0">
            {child.age} {t.card.age}
          </span>
        </div>

        <div className="space-y-1 mb-2 md:mb-4 flex-grow hidden md:block">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted" />
            <span className="truncate">{child.location}</span>
          </div>
          <div className="flex items-center text-primary text-sm font-medium">
            <Star className="w-4 h-4 mr-2" />
            <span>{child.dream}</span>
          </div>
        </div>

        {/* Mobile only simplified view - maybe just name/age is enough, button below */}
        
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onSponsor(child)}
          className="textxs md:text-sm py-1 md:py-2 h-auto min-h-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors mt-auto"
        >
          {t.card.sponsor_btn}
        </Button>
      </div>
    </motion.div>
  );
};
