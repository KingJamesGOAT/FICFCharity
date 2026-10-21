import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Smartphone, Wallet, Building2, Check } from 'lucide-react';
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
    amountType: 'custom', // Default to 'custom' (one-time contribution)
    customAmount: '50',
    name: '',
    email: '',
    phone: '',
    taxReceipt: false,
    address: '',
    zipCity: '',
    country: 'Switzerland',
    paymentMethod: 'twint', // 'twint' | 'paypal' | 'bank'
  });

  // Reset amount when child changes
  useEffect(() => {
    if (child) {
      setFormData(prev => ({
        ...prev,
        amountType: 'custom',
        customAmount: prev.customAmount || '50',
      }));
    }
  }, [child]);

  // Scroll locking
  useEffect(() => {
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

  const recommendedAmount = child.recommendedAmount || 360;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalAmount = Number(formData.customAmount);

    if (finalAmount <= 0 || isNaN(finalAmount)) {
      alert("Please enter a valid contribution amount greater than 0.");
      setIsSubmitting(false);
      return;
    }

    const refCode = `FICF-${Math.floor(100000 + Math.random() * 900000)}`;

    const pledgeData = {
      timestamp: new Date().toISOString(),
      childId: child.id,
      childName: child.name,
      donorName: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      address: formData.address || '',
      zipCity: formData.zipCity || '',
      country: formData.country || 'Switzerland',
      amount: finalAmount,
      type: 'one-time', // Yearly sponsorship in Google Sheets is no longer available
      taxReceipt: formData.taxReceipt,
      paymentMethod: formData.paymentMethod,
      refCode,
      language
    } as const;

    try {
      // 1. Save to Google Sheet
      const { StorageService } = await import('../../services/StorageService');
      await StorageService.savePledge(pledgeData);

      // 2. Send confirmation Email
      const { EmailService } = await import('../../services/EmailService');
      await EmailService.sendConfirmation(pledgeData);
      
      navigate('/success', { state: { child, formData: pledgeData } });
    } catch (error) {
      console.error('Pledge submission processed with fallback navigation:', error);
      navigate('/success', { state: { child, formData: pledgeData } });
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
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-[94%] max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 bg-white/90 hover:bg-gray-100 rounded-full transition-colors z-30 shadow-md text-gray-600 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Col: Child Info & Story */}
            <div className="w-full md:w-5/12 bg-gray-50 p-4 md:p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 max-h-[28vh] md:max-h-full shrink-0">
              <div className="flex items-center space-x-3.5 md:block md:space-x-0">
                <div className="aspect-[4/5] w-16 sm:w-20 md:w-full rounded-xl overflow-hidden shadow-xs shrink-0 md:mb-4 bg-gray-200">
                  <img 
                    src={child.image} 
                    alt={child.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-primary inline-block mb-1">
                    {child.category === 'university' ? t.card.higher_ed : t.card.school_ed}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg md:text-2xl font-bold text-secondary truncate md:whitespace-normal">
                    {child.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium truncate md:whitespace-normal">{child.education}</p>
                </div>
              </div>

              <div className="mt-2.5 md:mt-4 pt-2.5 md:pt-3 border-t border-gray-200/60">
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm whitespace-pre-line">
                  {child.story[language] || child.story.en}
                </p>
              </div>
            </div>

            {/* Right Col: Pledge Form */}
            <div className="w-full md:w-7/12 p-4 md:p-8 overflow-y-auto">
              <div className="mb-4 md:mb-6">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-secondary">
                  {t.modal.title}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Supporting: <span className="font-semibold text-secondary">{child.name}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Step 1: Contribution Amount */}
                <div className="space-y-2.5">
                  <h4 className="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wide">
                    {t.modal.step1}
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Active Option: Contribution / One-Time Donation */}
                    <div className="p-3.5 sm:p-4 border-2 border-primary bg-orange-50/70 rounded-xl shadow-xs transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2.5">
                          <input 
                            type="radio" 
                            name="amountType" 
                            value="custom"
                            checked={true}
                            readOnly
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <span className="font-bold text-xs sm:text-sm text-secondary">
                            {t.modal.option_any}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-primary bg-white px-2 py-0.5 rounded-full border border-orange-200 shadow-2xs">
                          CHF {formData.customAmount || '0'}
                        </span>
                      </div>

                      {/* Quick Amount Selection Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5 ml-6 sm:ml-7">
                        {[30, 50, 100, 200].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, customAmount: String(preset) }))}
                            className={clsx(
                              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                              formData.customAmount === String(preset)
                                ? "bg-primary text-white shadow-xs"
                                : "bg-white text-gray-700 hover:bg-orange-100 border border-orange-200/80"
                            )}
                          >
                            CHF {preset}
                          </button>
                        ))}
                      </div>

                      {/* Input Field */}
                      <div className="ml-6 sm:ml-7">
                        <div className="relative max-w-xs">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">CHF</span>
                          <input 
                            type="number"
                            min="1"
                            inputMode="numeric"
                            placeholder="Enter amount (e.g. 50)"
                            required
                            className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-bold text-gray-900"
                            value={formData.customAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, customAmount: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Disabled Option: Yearly Sponsorship (Unavailable in Google Sheets) */}
                    <div className="p-3 sm:p-3.5 border border-dashed border-gray-300 bg-gray-50/80 rounded-xl opacity-60 cursor-not-allowed select-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <input 
                            type="radio" 
                            name="amountType" 
                            disabled
                            checked={false}
                            className="w-4 h-4 text-gray-400 border-gray-300 cursor-not-allowed"
                          />
                          <div>
                            <span className="font-medium text-xs sm:text-sm text-gray-500">
                              {t.modal.option_yearly}
                            </span>
                            <span className="text-[11px] text-gray-400 ml-2 line-through">
                              CHF {recommendedAmount}/yr
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-full shrink-0">
                          {t.modal.option_yearly_unavailable}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 ml-6.5 sm:ml-7 leading-tight">
                        {t.modal.option_yearly_unavailable_desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Contact Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wide">
                    {t.modal.step2}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t.modal.label_name} *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs md:text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t.modal.label_email} *
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs md:text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Phone / Mobile */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700">
                        {t.modal.label_phone}
                      </label>
                      <span className="text-[10px] text-gray-400">
                        {t.modal.label_phone_hint}
                      </span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="+41 79 123 45 67"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs md:text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  {/* Tax Receipt Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 mt-0.5 text-primary rounded border-gray-300 focus:ring-primary"
                        checked={formData.taxReceipt}
                        onChange={(e) => setFormData({...formData, taxReceipt: e.target.checked})}
                      />
                      <span className="text-xs text-gray-700 font-medium flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-1 text-primary shrink-0" />
                        {t.modal.label_tax}
                      </span>
                    </label>

                    {/* Postal Address fields (revealed if tax receipt is requested) */}
                    {formData.taxReceipt && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2.5"
                      >
                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            {t.modal.label_address} *
                          </label>
                          <input 
                            type="text"
                            required={formData.taxReceipt}
                            placeholder="Musterstrasse 12"
                            className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-xs outline-none focus:border-primary"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                              {t.modal.label_zip_city} *
                            </label>
                            <input 
                              type="text"
                              required={formData.taxReceipt}
                              placeholder="3186 Düdingen"
                              className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-xs outline-none focus:border-primary"
                              value={formData.zipCity}
                              onChange={(e) => setFormData({...formData, zipCity: e.target.value})}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                              {t.modal.label_country}
                            </label>
                            <input 
                              type="text"
                              placeholder="Switzerland"
                              className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-xs outline-none focus:border-primary"
                              value={formData.country}
                              onChange={(e) => setFormData({...formData, country: e.target.value})}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 3: Preferred Payment Method */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wide">
                    {t.modal.step3}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* TWINT */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'twint' })}
                      className={clsx(
                        "p-3 rounded-xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1.5 cursor-pointer",
                        formData.paymentMethod === 'twint'
                          ? "border-primary bg-orange-50/80 ring-2 ring-primary shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Smartphone className={clsx("w-4 h-4 shrink-0", formData.paymentMethod === 'twint' ? "text-primary" : "text-gray-400")} />
                        <span className="font-bold text-xs md:text-sm text-secondary">
                          {t.modal.payment_twint}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 leading-tight hidden sm:block">
                        {t.modal.payment_twint_sub}
                      </span>
                      <div className={clsx(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                        formData.paymentMethod === 'twint' ? "border-primary bg-primary text-white" : "border-gray-300"
                      )}>
                        {formData.paymentMethod === 'twint' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>

                    {/* PayPal / Card */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={clsx(
                        "p-3 rounded-xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1.5 cursor-pointer",
                        formData.paymentMethod === 'paypal'
                          ? "border-primary bg-orange-50/80 ring-2 ring-primary shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Wallet className={clsx("w-4 h-4 shrink-0", formData.paymentMethod === 'paypal' ? "text-primary" : "text-gray-400")} />
                        <span className="font-bold text-xs md:text-sm text-secondary">
                          {t.modal.payment_paypal}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 leading-tight hidden sm:block">
                        {t.modal.payment_paypal_sub}
                      </span>
                      <div className={clsx(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                        formData.paymentMethod === 'paypal' ? "border-primary bg-primary text-white" : "border-gray-300"
                      )}>
                        {formData.paymentMethod === 'paypal' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>

                    {/* Swiss Bank QR-Bill */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                      className={clsx(
                        "p-3 rounded-xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1.5 cursor-pointer",
                        formData.paymentMethod === 'bank'
                          ? "border-primary bg-orange-50/80 ring-2 ring-primary shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Building2 className={clsx("w-4 h-4 shrink-0", formData.paymentMethod === 'bank' ? "text-primary" : "text-gray-400")} />
                        <span className="font-bold text-xs md:text-sm text-secondary">
                          {t.modal.payment_bank}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 leading-tight hidden sm:block">
                        {t.modal.payment_bank_sub}
                      </span>
                      <div className={clsx(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                        formData.paymentMethod === 'bank' ? "border-primary bg-primary text-white" : "border-gray-300"
                      )}>
                        {formData.paymentMethod === 'bank' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg"
                  disabled={isSubmitting}
                  className="mt-4"
                >
                  {isSubmitting ? 'Processing Pledge...' : t.modal.btn_submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
