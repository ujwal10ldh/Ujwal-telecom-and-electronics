import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { useShop, PolicyType } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { 
    setSelectedCategory, 
    setCurrentView, 
    openPolicyModal 
  } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: 'home' | 'catalog' | 'contact' | 'about') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center font-bold border border-emerald-700/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white uppercase font-display">
                Ujwal Telecom & Electronics
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your trusted destination for electronics, telecom products and accessories. Sourced directly from verified brand distributors with comprehensive warranties.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}, {STORE_INFO.cityStatePincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-emerald-400 transition-colors">
                  {STORE_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-emerald-400 transition-colors">
                  {STORE_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('catalog')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNavClick('catalog');
                    const el = document.getElementById('new-arrivals');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNavClick('catalog');
                    const el = document.getElementById('best-sellers');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNavClick('catalog');
                    const el = document.getElementById('special-offers');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Offers & Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('Mobile Phones')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Mobile Phones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Mobile Accessories')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Accessories & Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Earphones & Headphones')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Audio & Headphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Smart Watches')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Smart Watches & Bands
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('TVs & Entertainment')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  TVs & Home Entertainment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Networking')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Networking & Wi-Fi Routers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us / Store Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('faqs')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('shipping')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('return')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Return & Replacement Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('warranty')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Brand Warranty Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('privacy')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyModal('terms')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Secure Payment Processing:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              UPI
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              Google Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              PhonePe
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              Paytm
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              RuPay
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
              Visa / Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-emerald-400">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>© 2026 Ujwal Telecom & Electronics. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
