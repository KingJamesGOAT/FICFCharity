import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, BookOpen } from 'lucide-react';
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

  const isUniversity = child.category === 'university';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-soft group hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={child.image}
            alt={child.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-serif text-3xl">
            {child.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        
        {/* Category & Amount Floating Badge */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center pointer-events-none">
          <span className={`text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-md border ${
            isUniversity 
              ? 'bg-amber-900/80 text-amber-100 border-amber-700/50' 
              : 'bg-emerald-900/80 text-emerald-100 border-emerald-700/50'
          }`}>
            {isUniversity ? t.card.higher_ed : t.card.school_ed}
          </span>
          <span className="text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 text-secondary shadow-sm backdrop-blur-md">
            CHF {child.recommendedAmount}/yr
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 md:mb-2">
          <h3 className="font-serif text-sm md:text-lg font-bold text-secondary line-clamp-1 group-hover:text-primary transition-colors">
            {child.name}
          </h3>
          <span className="text-[10px] md:text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full ml-1 shrink-0">
            {child.age} {t.card.age}
          </span>
        </div>

        {/* Education & Dream */}
        <div className="space-y-1 mb-2 md:mb-4 flex-grow">
          <div className="flex items-center text-gray-600 text-[11px] md:text-xs font-medium">
            {isUniversity ? (
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" />
            ) : (
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" />
            )}
            <span className="truncate">{child.education}</span>
          </div>

          <div className="flex items-center text-gray-400 text-[11px] md:text-xs hidden md:flex">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted shrink-0" />
            <span className="truncate">{child.location}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onSponsor(child)}
          className="text-xs md:text-sm py-1.5 md:py-2 h-auto min-h-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors mt-auto"
        >
          {t.card.sponsor_btn}
        </Button>
      </div>
    </motion.div>
  );
};
