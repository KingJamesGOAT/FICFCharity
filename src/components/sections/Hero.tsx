
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  // Progress logic
  const GOAL = 10000;
  const CURRENT = 0; // Dynamic later?
  const percentage = Math.min((CURRENT / GOAL) * 100, 100);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-secondary leading-tight">
            {t.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-light">
            {t.hero.subtitle}
          </p>

          <div className="max-w-md mx-auto lg:mx-0 space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>CHF {CURRENT.toLocaleString()}</span>
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

        {/* Hero Image (Optional/Placeholder) */}
        {/* If no image is available, use a CSS gradient as per PRD. 
            However, we can add a subtle visual element or illustration here if desired. 
            For now, relying on the gradient background as specified.
            "Background: If no image is available, use a CSS gradient: bg-gradient-to-br from-orange-50 to-orange-100."
            We applied this to the section. 
            We can add a decorative element on the right side if user wants "Split screen" layout effectively.
        */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="hidden lg:block relative"
        >
           {/* Abstract decorative circles/shapes to maintain 'Swiss-clean' look without stock photos if none provided */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl" />
        </motion.div>

      </div>
    </section>
  );
};
