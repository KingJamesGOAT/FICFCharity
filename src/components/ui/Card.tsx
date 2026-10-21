import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Child } from '../../data/children';
import { Button } from './Button';

import { clsx } from 'clsx';

interface CardProps {
  child: Child;
  onSponsor: (child: Child) => void;
  isYearlySponsored?: boolean;
}

export const Card = ({ child, onSponsor, isYearlySponsored = false }: CardProps) => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const isUniversity = child.category === 'university';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft group hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Clean Unobstructed Image Container */}
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
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category & Status & Age */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              isUniversity 
                ? 'bg-amber-50 text-amber-800 border border-amber-200/60' 
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
            }`}>
              {isUniversity ? t.card.higher_ed : t.card.school_ed}
            </span>
            {isYearlySponsored && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/80">
                {t.card.sponsored_status}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 font-medium shrink-0 ml-1">
            {child.age} {t.card.age}
          </span>
        </div>

        {/* Full Name - Never truncated */}
        <h3 className="font-serif text-base sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors leading-snug mb-1.5">
          {child.name}
        </h3>

        {/* Education & Location */}
        <div className="space-y-1 mb-4 flex-grow">
          <div className="flex items-center text-gray-600 text-xs font-medium">
            {isUniversity ? (
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" />
            ) : (
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" />
            )}
            <span className="leading-tight">{child.education}</span>
          </div>

          <div className="flex items-center text-gray-400 text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 shrink-0" />
            <span>{child.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onSponsor(child)}
          className={clsx(
            "text-xs sm:text-sm py-2 sm:py-2.5 h-auto transition-colors mt-auto font-semibold cursor-pointer",
            isYearlySponsored
              ? "border-emerald-600 text-emerald-800 hover:bg-emerald-600 hover:text-white"
              : "group-hover:bg-primary group-hover:text-white group-hover:border-primary"
          )}
        >
          {isYearlySponsored ? t.card.contribute_btn : t.card.sponsor_btn}
        </Button>
      </div>
    </motion.div>
  );
};
