import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { StorageService } from '../../services/StorageService';

const TestimonialRotator = () => {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);

    // Get testimonials from current language
    // @ts-ignore - Temporary ignore if type definition isn't perfectly inferred yet, but it should work 
    const testimonials = t.testimonials || [];

    useEffect(() => {
        if (testimonials.length === 0) return;
        
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 15000); // 15 seconds
        return () => clearInterval(timer);
    }, [testimonials.length]);

    if (testimonials.length === 0) return null;

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-orange-100/50 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.925 14.929 15.088C15.536 14.252 16.326 13.568 17.298 13.036L16.275 11.237C15.362 11.693 14.653 12.301 14.148 13.061C13.633 13.832 13.385 14.734 13.404 15.766H10.552C10.552 13.385 11.198 10.941 12.49 8.434L15.655 8L18.452 19.333L16.142 21H14.017ZM8.017 21L8.017 18C8.017 16.896 8.321 15.925 8.929 15.088C9.536 14.252 10.326 13.568 11.298 13.036L10.275 11.237C9.362 11.693 8.653 12.301 8.148 13.061C7.633 13.832 7.385 14.734 7.404 15.766H4.552C4.552 13.385 5.198 10.941 6.49 8.434L9.655 8L12.452 19.333L10.142 21H8.017Z" />
                </svg>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={index} // Key change triggers animation
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="space-y-4 relative z-10"
                >
                    <p className="text-xl md:text-2xl font-serif italic text-secondary/80 leading-relaxed">
                        "{testimonials[index]?.quote}"
                    </p>
                    <div className="pt-2 border-t border-orange-200/30 w-12" />
                    <div>
                        <p className="font-bold text-secondary">{testimonials[index]?.author}</p>
                        <p className="text-xs font-medium text-primary uppercase tracking-wider">{testimonials[index]?.role}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const Hero = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ totalRaised: 0, donorCount: 0 });

  useEffect(() => {
    StorageService.getStats().then(setStats);
  }, []);

  // Progress logic
  const GOAL = 10000;
  const percentage = Math.min((stats.totalRaised / GOAL) * 100, 100);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-secondary leading-tight">
            {t.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-primary font-medium italic -mt-4">
            {/* @ts-ignore */}
            {t.hero.tagline}
          </p>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-light">
            {t.hero.subtitle}
          </p>

          <div className="max-w-md mx-auto lg:mx-0 space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>CHF {stats.totalRaised.toLocaleString()}</span>
              <span>CHF {GOAL.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg" onClick={scrollToCatalog}>
              {t.hero.cta}
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Testimonial Rotator */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="hidden lg:block h-[400px]"
        >
           <TestimonialRotator />
        </motion.div>

      </div>
    </section>
  );
};
