import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Award, BookOpen, HeartPulse, Users, Download, ShieldCheck } from 'lucide-react';

export const About20Years = () => {
  const { t } = useLanguage();
  const info = t.about_section;

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-100 text-primary rounded-full text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{info.badge}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-secondary mb-4">
            {info.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
            {info.intro}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Pillar 1: CCP */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 md:p-8 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-orange-100 text-primary rounded-xl flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-secondary mb-2">
                {info.ccp_title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {info.ccp_desc}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 text-[11px] font-semibold text-primary">
              {info.ccp_sub}
            </div>
          </motion.div>

          {/* Pillar 2: TNP */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 md:p-8 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-5">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-secondary mb-2">
                {info.tnp_title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {info.tnp_desc}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 text-[11px] font-semibold text-amber-700">
              {info.tnp_sub}
            </div>
          </motion.div>

          {/* Pillar 3: CDP */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 md:p-8 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-secondary mb-2">
                {info.cdp_title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {info.cdp_desc}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 text-[11px] font-semibold text-emerald-700">
              {info.cdp_sub}
            </div>
          </motion.div>

        </div>

        {/* Official PDF Downloads */}
        <div className="bg-gradient-to-r from-orange-50/70 to-amber-50/70 rounded-2xl p-6 md:p-8 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base md:text-lg font-bold text-secondary">
                {info.brochures_title}
              </h4>
              <p className="text-xs text-gray-600">
                {info.brochures_desc}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <a 
              href={`${import.meta.env.BASE_URL}FICF_Doc/What is FICF_EN.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 hover:border-primary text-secondary text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-2 text-primary" />
              <span>{info.download_what_is}</span>
            </a>

            <a 
              href={`${import.meta.env.BASE_URL}FICF_Doc/FICF_20th_Anniversary_Donor_Support_EN.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              <span>{info.download_support}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
