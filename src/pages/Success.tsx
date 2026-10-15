import { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Copy, AlertCircle, ArrowLeft, ExternalLink, Download, CreditCard, Building2, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Success = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { child, formData } = location.state || {}; 
  const [copiedIBAN, setCopiedIBAN] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!child) {
    return <Navigate to="/" />;
  }

  const copyToClipboard = (text: string, type: 'iban' | 'ref') => {
    navigator.clipboard.writeText(text);
    if (type === 'iban') {
      setCopiedIBAN(true);
      setTimeout(() => setCopiedIBAN(false), 2500);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const paypalUrl = "https://www.paypal.com/ncp/payment/C9QNCUPKWBKMU";

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Confirmation */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full mb-4 md:mb-6 shadow-sm">
            <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-3">
            {t.success.title}
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.success.subtitle}
          </p>

          {/* Reference Code Card */}
          <div className="mt-6 inline-block p-4 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/80 shadow-sm max-w-xl w-full text-center">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {t.success.payment_reference}
            </span>
            <div className="flex items-center justify-center space-x-3">
              <strong className="text-2xl md:text-3xl font-mono text-primary tracking-wide">
                {formData?.refCode || 'FICF-SPONSOR'}
              </strong>
              <button 
                onClick={() => copyToClipboard(formData?.refCode || '', 'ref')}
                className="p-1.5 md:p-2 bg-white rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors shadow-xs"
                title="Copy Reference"
              >
                <Copy className="w-4 h-4 text-primary" />
              </button>
            </div>
            {copiedRef && (
              <span className="text-xs text-emerald-600 font-semibold block mt-1">
                Reference code copied!
              </span>
            )}
            <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto">
              {t.success.payment_remarks}
            </p>
          </div>
        </div>

        {/* 3 Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: PayPal / Credit Card */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between hover:border-primary/30 transition-all">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-3">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-serif text-lg md:text-xl font-bold text-secondary">
                  {t.success.paypal_title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                {t.success.paypal_desc}
              </p>

              {/* PayPal QR */}
              <div className="aspect-square w-36 mx-auto mb-4 bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center justify-center">
                <img 
                  src="/FICFCharity/assets/payment/paypal.png" 
                  alt="PayPal QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="pt-2">
              <a 
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-semibold rounded-xl shadow-sm transition-colors text-center"
              >
                <span>{t.success.paypal_btn}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Card 2: TWINT */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between hover:border-primary/30 transition-all">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-3">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-serif text-lg md:text-xl font-bold text-secondary">
                  {t.success.twint_title}
                </h3>
              </div>

              {/* Twint QR */}
              <div className="aspect-square w-36 mx-auto mb-4 bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center justify-center">
                <img 
                  src="/FICFCharity/assets/payment/twint.jpg" 
                  alt="TWINT QR" 
                  className="w-full h-full object-contain" 
                />
              </div>

              <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl mb-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-orange-900 leading-snug">
                    {t.success.twint_alert}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic text-center">
              {t.success.twint_event_note}
            </p>
          </div>

          {/* Card 3: Bank Transfer / Swiss QR-Bill */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between hover:border-primary/30 transition-all">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-3">
                <Building2 className="w-5 h-5" />
                <h3 className="font-serif text-lg md:text-xl font-bold text-secondary">
                  {t.success.bank_title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {t.success.bank_desc}
              </p>

              {/* Swiss QR Bill Preview */}
              <div className="aspect-[4/3] w-full max-w-[200px] mx-auto mb-3 bg-gray-50 rounded-xl p-1.5 border border-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="/FICFCharity/assets/payment/qr-bill.jpg" 
                  alt="Swiss QR Bill" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* IBAN Box */}
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 mb-2 flex items-center justify-between">
                <div className="font-mono text-xs text-gray-700 font-semibold truncate mr-2">
                  CH13 8080 8008 3100 4933 1
                </div>
                <button 
                  onClick={() => copyToClipboard('CH13 8080 8008 3100 4933 1', 'iban')}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors shrink-0"
                  title="Copy IBAN"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
              {copiedIBAN && (
                <span className="text-[11px] text-emerald-600 font-semibold block text-center mb-1">
                  {t.success.iban_copied}
                </span>
              )}

              <p className="text-[10px] text-gray-500 leading-tight">
                Raiffeisenbank Freiburg Ost / Fribourg-Est<br/>
                BIC: RAIFCH22XXX<br/>
                FICF – Stockera 3, 3186 Düdingen
              </p>
            </div>

            <div className="pt-3">
              <a 
                href="/FICFCharity/assets/payment/qr-bill.jpg" 
                download="FICF_QR_Bill_Swiss.jpg"
                className="w-full inline-flex items-center justify-center py-2 px-3 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-primary" />
                <span>{t.success.download_qr_bill}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center text-primary font-medium hover:underline text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.success.return_home}
          </Link>
        </div>

      </div>
    </div>
  );
};
