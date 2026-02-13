
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Copy, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


export const Success = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { child, formData } = location.state || {}; 

  if (!child) {
    return <Navigate to="/" />;
  }

  // Use variables to satisfy linter and personalize
  // const donorName = formData?.name || 'Supporter';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('IBAN Copied!');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-5xl font-serif font-bold text-secondary mb-4">{t.success.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.success.subtitle} <br/>
            <span className="mt-4 block p-4 bg-orange-50 rounded-xl border border-orange-100">
               <span className="block text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">{t.success.payment_reference}</span>
               <strong className="text-2xl font-mono text-primary">{formData?.refCode || 'N/A'}</strong>
               <span className="block text-xs text-gray-400 mt-1">{t.success.payment_remarks}</span>
            </span>
          </p>
        </div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Bank Transfer */}
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-secondary mb-6 flex items-center">
              {t.success.bank_title}
            </h3>
            
            <div className="space-y-6">
              <div className="aspect-[3/2] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
                <img 
                  src="/FICFCharity/assets/payment/qr-bill.png" 
                  alt="QR Bill" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                <div className="font-mono text-sm text-gray-600 truncate">
                  CH13 8080 8008 3100 4933 1
                </div>
                <button 
                  onClick={() => copyToClipboard('CH13 8080 8008 3100 4933 1')}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Beneficiary: FICF - Foundation for Indian Children's Future<br/>
                Stockera 3<br/>
                3186 Düdingen
              </p>
            </div>
          </div>

          {/* TWINT */}
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-secondary mb-6 flex items-center">
               {t.success.twint_title}
            </h3>

            <div className="space-y-6">
              <div className="aspect-square max-w-[300px] mx-auto bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
                 <img 
                   src="/FICFCharity/assets/payment/twint.png" 
                   alt="Twint QR" 
                   className="w-full h-full object-contain" 
                 />
              </div>

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800 font-medium">
                  {t.success.twint_alert}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
           <Link to="/" className="inline-flex items-center text-primary font-medium hover:underline">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Return to Home
           </Link>
        </div>

      </div>
    </div>
  );
};
