import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();
  const { contact } = t;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-20 px-6">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
            {contact.title}
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Swiss Address Card */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <span className="font-bold text-xl">CH</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-secondary">Switzerland</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary mb-2">{contact.swiss_address.title}</h3>
                <div className="flex items-start text-gray-600">
                   <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-primary" />
                   <p className="leading-relaxed">{contact.swiss_address.line1}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center text-gray-600 group">
                  <Mail className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <a href={`mailto:ficfindiaswiss@gmail.com`} className="hover:text-primary transition-colors">
                    ficfindiaswiss@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <p>{contact.swiss_address.phone1.replace('Tel: ', '')}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <p>{contact.swiss_address.phone2.replace('Tel: ', '')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* India Address Card */}
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                <span className="font-bold text-xl">IN</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-secondary">India</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-secondary mb-2">{contact.india_address.title}</h3>
                <div className="flex items-start text-gray-600">
                   <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-primary" />
                   <div>
                     <p>{contact.india_address.line1}</p>
                     <p>{contact.india_address.line2}</p>
                   </div>
                </div>
              </div>

               <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center text-gray-600 group">
                  <Mail className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <a href={`mailto:ficfindia@gmail.com`} className="hover:text-primary transition-colors">
                    ficfindia@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <p>{contact.india_address.phone.replace('Tel: ', '')}</p>
                </div>
                <div className="flex items-center text-gray-600">
                   <Phone className="w-5 h-5 mr-3 text-primary" />
                   <p>{contact.india_address.mob.replace('Mob: ', '')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
