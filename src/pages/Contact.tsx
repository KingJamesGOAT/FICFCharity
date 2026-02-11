import { useLanguage } from '../contexts/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  const { contact } = t;

  return (
    <div className="min-h-[80vh] py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary text-center mb-12">
          {contact.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Swiss Address */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Switzerland</h2>
            <div className="space-y-4 text-gray-600">
              <p className="font-bold text-lg text-secondary">{contact.swiss_address.title}</p>
              <p>{contact.swiss_address.line1}</p>
              <p className="pt-2">{contact.swiss_address.email}</p>
              <p>{contact.swiss_address.phone1}</p>
              <p>{contact.swiss_address.phone2}</p>
            </div>
          </div>

          {/* India Address */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6">India</h2>
            <div className="space-y-4 text-gray-600">
              <p className="font-bold text-lg text-secondary">{contact.india_address.title}</p>
              <p>{contact.india_address.line1}</p>
              <p>{contact.india_address.line2}</p>
              <p className="pt-2">{contact.india_address.email}</p>
              <p>{contact.india_address.phone}</p>
              <p>{contact.india_address.mob}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
