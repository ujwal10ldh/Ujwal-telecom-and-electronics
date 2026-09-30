import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Navigation, 
  Send, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { useShop } from '../context/ShopContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useShop();
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message was sent to our store desk. We will respond promptly!');
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello Ujwal Telecom & Electronics, I would like to inquire about products and offers.');
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            Store Location & Assistance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Visit Ujwal Telecom & Electronics
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We are conveniently located in the central commercial district. Drop by for live device demos, authentic accessories, or fast after-sales support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Store Details & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Action Buttons Row */}
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-2xs group text-center"
              >
                <Phone className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                <span>Call Now</span>
              </a>

              <button
                onClick={openWhatsApp}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-all shadow-2xs group text-center cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white mb-1 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Us</span>
              </button>

              <a
                href={STORE_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold transition-all shadow-2xs group text-center"
              >
                <Navigation className="w-5 h-5 text-emerald-800 mb-1 group-hover:scale-110 transition-transform" />
                <span>Directions</span>
              </a>
            </div>

            {/* Editable Store Information Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-[#FBFBFA] space-y-5">
              
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    Store Address
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {STORE_INFO.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {STORE_INFO.address}, {STORE_INFO.landmark}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {STORE_INFO.cityStatePincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    Store Timings
                  </h4>
                  <p className="text-xs text-slate-800 font-semibold mt-0.5">
                    {STORE_INFO.businessHours}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {STORE_INFO.sundayHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    Email Inquiry
                  </h4>
                  <a
                    href={`mailto:${STORE_INFO.email}`}
                    className="text-xs font-semibold text-emerald-800 hover:underline mt-0.5 block"
                  >
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps & Store Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Google Maps Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative h-64 sm:h-72">
              <iframe
                title="Ujwal Telecom & Electronics Location Map"
                src={STORE_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-90"
              />
              <div className="absolute bottom-3 right-3">
                <a
                  href={STORE_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold rounded-lg shadow-md border border-slate-200 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-emerald-700" />
                </a>
              </div>
            </div>

            {/* Quick Contact / Request Quote Form */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Have a Question or Looking for a Specific Product?
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Leave a quick note and our store counter team will get back to you with current pricing and availability.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-xs font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been sent. We will contact you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patil"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9803679285"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Product Name or Query
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Inquiring about 5G phone price / 65W GaN charger stock"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Send Message to Store</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
