import { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Copy, 
  Check, 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  CreditCard, 
  Building2, 
  Smartphone,
  Info
} from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';

export const Success = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { child, formData } = location.state || {}; 

  const initialMethod = (formData?.paymentMethod === 'paypal' || formData?.paymentMethod === 'bank') 
    ? formData.paymentMethod 
    : 'twint';

  const [activeMethod, setActiveMethod] = useState<'twint' | 'paypal' | 'bank'>(initialMethod);
  const [copiedIBAN, setCopiedIBAN] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!child) {
    return <Navigate to="/" />;
  }

  const amount = formData?.amount || child.recommendedAmount || 360;
  const refCode = formData?.refCode || 'FICF-SPONSOR';

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
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Top Confirmation Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-emerald-100 rounded-full mb-3 shadow-xs">
            <CheckCircle className="w-8 h-8 md:w-9 md:h-9 text-emerald-600" />
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-secondary mb-2">
            {t.success.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto">
            {t.success.subtitle}
          </p>
        </div>

        {/* Minimalist Summary Pill Strip (No Duplication) */}
        <div className="bg-white rounded-2xl p-3.5 md:p-4 border border-gray-100 shadow-soft mb-6">
          <div className="grid grid-cols-3 divide-x divide-gray-100 text-center">
            
            {/* Child */}
            <div className="px-2">
              <span className="block text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                {t.success.child_supported}
              </span>
              <span className="text-xs md:text-sm font-bold text-secondary truncate block">
                {child.name}
              </span>
            </div>

            {/* Amount */}
            <div className="px-2">
              <span className="block text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                {t.success.amount_label}
              </span>
              <span className="text-xs md:text-sm font-bold text-primary block">
                CHF {amount}
              </span>
            </div>

            {/* Reference with 1-tap Copy */}
            <div className="px-2">
              <span className="block text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                {t.success.payment_reference}
              </span>
              <button 
                onClick={() => copyToClipboard(refCode, 'ref')}
                className="inline-flex items-center space-x-1 font-mono font-bold text-xs md:text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
                title="Copy reference code"
              >
                <span>{refCode}</span>
                {copiedRef ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </button>
              {copiedRef && (
                <span className="text-[10px] text-emerald-600 font-semibold block leading-none mt-0.5">
                  {t.success.copied}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t.success.change_method}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-gray-100/80 p-1.5 rounded-2xl">
            {/* TWINT */}
            <button
              onClick={() => setActiveMethod('twint')}
              className={clsx(
                "py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer",
                activeMethod === 'twint'
                  ? "bg-white text-secondary shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-secondary"
              )}
            >
              <Smartphone className={clsx("w-4 h-4 shrink-0", activeMethod === 'twint' ? "text-primary" : "text-gray-400")} />
              <span className="truncate">{t.success.method_twint}</span>
            </button>

            {/* PayPal / Card */}
            <button
              onClick={() => setActiveMethod('paypal')}
              className={clsx(
                "py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer",
                activeMethod === 'paypal'
                  ? "bg-white text-secondary shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-secondary"
              )}
            >
              <CreditCard className={clsx("w-4 h-4 shrink-0", activeMethod === 'paypal' ? "text-primary" : "text-gray-400")} />
              <span className="truncate">{t.success.method_paypal}</span>
            </button>

            {/* Bank Transfer */}
            <button
              onClick={() => setActiveMethod('bank')}
              className={clsx(
                "py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer",
                activeMethod === 'bank'
                  ? "bg-white text-secondary shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-secondary"
              )}
            >
              <Building2 className={clsx("w-4 h-4 shrink-0", activeMethod === 'bank' ? "text-primary" : "text-gray-400")} />
              <span className="truncate">{t.success.method_bank}</span>
            </button>
          </div>
        </div>

        {/* Focused Payment Method Container */}
        <div className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-soft">
          
          {/* METHOD 1: TWINT */}
          {activeMethod === 'twint' && (
            <div className="text-center space-y-5">
              <div>
                <h2 className="text-lg md:text-xl font-bold font-serif text-secondary mb-1">
                  {t.success.twint_title}
                </h2>
                <p className="text-xs text-gray-500">
                  {t.success.twint_step1}
                </p>
              </div>

              {/* Big, Crisp TWINT QR Code */}
              <div className="p-3 bg-white rounded-2xl border-2 border-orange-100 inline-block shadow-sm">
                <img 
                  src="/FICFCharity/assets/payment/twint.jpg" 
                  alt="TWINT QR Code" 
                  className="w-56 h-auto sm:w-64 md:w-72 object-contain mx-auto rounded-lg"
                />
              </div>

              {/* Step 2 instruction with highlighted reference code */}
              <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-3.5 max-w-md mx-auto text-left">
                <div className="flex items-start space-x-2.5">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs text-secondary leading-relaxed">
                    <p className="font-semibold text-gray-900 mb-1">
                      {t.success.twint_step2.replace('{amount}', String(amount)).replace('{refCode}', refCode)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5 pt-1.5 border-t border-orange-200/60">
                      <span className="text-[11px] text-gray-600 font-medium">Remarks Reference:</span>
                      <strong className="font-mono text-primary text-xs font-bold">{refCode}</strong>
                      <button 
                        onClick={() => copyToClipboard(refCode, 'ref')}
                        className="p-1 hover:bg-orange-200/60 rounded transition-colors"
                        title="Copy Reference"
                      >
                        <Copy className="w-3.5 h-3.5 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 italic max-w-sm mx-auto">
                {t.success.twint_event_note}
              </p>
            </div>
          )}

          {/* METHOD 2: PayPal / Credit Card */}
          {activeMethod === 'paypal' && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold font-serif text-secondary mb-1">
                  {t.success.paypal_title}
                </h2>
                <p className="text-xs text-gray-500">
                  {t.success.paypal_desc}
                </p>
              </div>

              {/* Direct Instant Action Button */}
              <div className="max-w-md mx-auto">
                <a 
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{t.success.paypal_btn.replace('{amount}', String(amount))}</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              {/* Big PayPal QR Code for Desktop or Smartphone Camera */}
              <div className="pt-2">
                <span className="block text-xs text-gray-500 mb-3">
                  {t.success.paypal_qr_hint}
                </span>
                <div className="p-3 bg-white rounded-2xl border-2 border-gray-100 inline-block shadow-sm">
                  <img 
                    src="/FICFCharity/assets/payment/paypal.png" 
                    alt="PayPal QR Code" 
                    className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Reference Reminder */}
              <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 max-w-md mx-auto text-xs text-gray-600 flex items-center justify-center space-x-2">
                <span>{t.success.payment_reference}:</span>
                <strong className="font-mono text-secondary font-bold">{refCode}</strong>
                <button 
                  onClick={() => copyToClipboard(refCode, 'ref')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy Reference"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* METHOD 3: Swiss Bank Transfer (QR-Bill) */}
          {activeMethod === 'bank' && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold font-serif text-secondary mb-1">
                  {t.success.bank_title}
                </h2>
                <p className="text-xs text-gray-500">
                  {t.success.bank_desc}
                </p>
              </div>

              {/* BIG, CLEAR Cropped Swiss QR Code */}
              <div className="p-3 bg-white rounded-2xl border-2 border-gray-200 inline-block shadow-sm">
                <img 
                  src="/FICFCharity/assets/payment/qr-swiss-code.jpg" 
                  alt="Swiss QR Code with Cross" 
                  className="w-56 h-auto sm:w-64 md:w-72 object-contain mx-auto rounded"
                />
              </div>

              {/* Clean IBAN Box with 1-tap Copy */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 flex items-center justify-between">
                  <div className="text-left">
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">IBAN (Raiffeisen)</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-gray-900 tracking-wide">
                      CH13 8080 8008 3100 4933 1
                    </span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('CH13 8080 8008 3100 4933 1', 'iban')}
                    className="py-1.5 px-3 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl text-xs font-semibold text-secondary transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    {copiedIBAN ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">{t.success.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-primary" />
                        <span>{t.success.copy_iban}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bank Account Details */}
                <div className="text-[11px] text-gray-500 leading-relaxed text-center pt-1">
                  <p className="font-semibold text-gray-700">{t.success.bank_details}</p>
                  <p>FICF · Stockera 3, 3186 Düdingen (Fribourg)</p>
                  <p className="mt-1">
                    {t.success.payment_reference}: <strong className="font-mono text-primary font-bold">{refCode}</strong>
                  </p>
                </div>
              </div>

              {/* Download Full QR Bill */}
              <div className="pt-2">
                <a 
                  href="/FICFCharity/assets/payment/qr-bill.jpg" 
                  download="FICF_Swiss_QR_Bill.jpg"
                  className="inline-flex items-center justify-center py-2.5 px-5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 mr-2 text-primary" />
                  <span>{t.success.download_qr_bill}</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary font-medium hover:underline text-xs md:text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            {t.success.return_home}
          </Link>
        </div>

      </div>
    </div>
  );
};
