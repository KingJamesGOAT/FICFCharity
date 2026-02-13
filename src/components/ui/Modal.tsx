import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// import emailjs from '@emailjs/browser';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Child } from '../../data/children';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
}

export const Modal = ({ isOpen, onClose, child }: ModalProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: 'full', // 'full' | 'any'
    name: '',
    email: '',
    taxReceipt: false,
    paymentMethod: 'bank', // 'bank' | 'twint' - This might be selected later on Success page but form needs to know intent? PRD says select on Success page?
    // PRD say: "Payment Method: Bank Transfer OR Twint" in Form Logic.
  });

  // Scroll locking
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !child) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Placeholder Service ID, Template ID, Public Key
      // In production, these should be env variables
      /* 
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_name: 'FICF Admin',
          from_name: formData.name,
          child_name: child.name,
          amount_type: formData.amount,
          email: formData.email,
          tax_receipt: formData.taxReceipt ? 'Yes' : 'No',
        },
        'YOUR_PUBLIC_KEY'
      );
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate('/success', { state: { child, formData } });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-[95%] max-w-5xl h-[fit-content] max-h-[85vh] bg-white rounded-xl md:rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Close Button */}
             <button 
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-20 shadow-sm"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            </button>

            {/* Left Col: Child Info */}
            <div className="w-full md:w-1/3 bg-gray-50 p-4 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 max-h-[35vh] md:max-h-full">
              <div className="flex md:block items-center md:items-start space-x-4 md:space-x-0">
                <div className="aspect-[4/5] w-20 md:w-full rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-md shrink-0 md:mb-6">
                  <img 
                    src={child.image} 
                    alt={child.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-2xl font-bold text-secondary mb-1 md:mb-2">{child.name}</h3>
                  <p className="text-xs md:text-sm font-medium text-primary mb-1 md:mb-4">{child.dream}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm mt-3 md:mt-0">
                {child.story[language]}
              </p>
            </div>

            {/* Right Col: Form */}
            <div className="w-full md:w-2/3 p-4 md:p-12 overflow-y-auto relative">
              <h2 className="font-serif text-xl md:text-3xl font-bold text-secondary px-4 py-4 md:px-0 md:py-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100 mb-4 md:mb-8">
                {t.modal.title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8 pb-4">
                {/* Step 1: Amount */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{t.modal.step1}</h4>
                  <div className="grid grid-cols-1 gap-2 md:gap-4">
                    <label className={clsx(
                      "flex items-center p-3 md:p-4 border rounded-lg md:rounded-xl cursor-pointer transition-all",
                      formData.amount === 'full' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'
                    )}>
                      <input 
                        type="radio" 
                        name="amount" 
                        value="full"
                        checked={formData.amount === 'full'}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-3 font-medium text-secondary">{t.modal.option_full}</span>
                    </label>

                    <label className={clsx(
                      "flex items-center p-4 border rounded-xl cursor-pointer transition-all",
                      formData.amount === 'any' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'
                    )}>
                      <input 
                        type="radio" 
                        name="amount" 
                        value="any"
                        checked={formData.amount === 'any'}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-3 font-medium text-secondary">{t.modal.option_any}</span>
                    </label>
                  </div>
                </div>

                {/* Step 2: Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{t.modal.step2}</h4>
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                        {t.modal.label_name}
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-md md:rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                        {t.modal.label_email}
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-md md:rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <label className="flex items-center space-x-3 mt-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                      checked={formData.taxReceipt}
                      onChange={(e) => setFormData({...formData, taxReceipt: e.target.checked})}
                    />
                    <span className="text-sm text-gray-600">{t.modal.label_tax}</span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : t.modal.btn_submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
