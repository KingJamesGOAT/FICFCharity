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
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-secondary line-clamp-1">{child.name}</h3>
          <span className="text-xs font-semibold bg-orange-100 text-primary px-2 py-1 rounded-full whitespace-nowrap">
            {child.age} {t.card.age}
          </span>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted" />
            <span className="truncate">{child.location}</span>
          </div>
          <div className="flex items-center text-primary text-sm font-medium">
            <Star className="w-4 h-4 mr-2" />
            <span>{child.dream}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onSponsor(child)}
          className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors"
        >
          {t.card.sponsor_btn}
        </Button>
      </div>
    </motion.div>
  );
};
