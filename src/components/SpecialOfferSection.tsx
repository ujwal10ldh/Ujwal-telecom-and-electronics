import React from 'react';
import { Sparkles, ArrowRight, Tag, ShieldCheck, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SpecialOfferSection: React.FC = () => {
  const { setSelectedCategory, setCurrentView, showToast } = useShop();

  const handleShopOffers = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('UJWAL10');
    showToast('Coupon code "UJWAL10" copied to clipboard!');
  };

  return (
    <section id="special-offers" className="py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image with Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src="/src/assets/images/promo_upgrade_offer_1790778337856.jpg"
                alt="Upgrade Your Technology at Ujwal Telecom & Electronics"
                className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Deals</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Authorized Brand Warranty
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Instant In-Store Setup
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Promotional Pitch & Coupon */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Offer Section</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Upgrade Your <span className="text-emerald-400">Technology</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Explore selected products and special offers available at Ujwal Telecom & Electronics. From high-speed 5G smartphones to premium audio sound systems, upgrade today with verified local service.
            </p>

            {/* Exclusive Promo Code Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  Storewide Promotional Code
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  Get 10% Extra Off on Online & Local Orders
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Use coupon code at checkout: <code className="text-emerald-400 font-mono font-bold bg-slate-800 px-1.5 py-0.5 rounded">UJWAL10</code>
                </div>
              </div>

              <button
                onClick={copyCoupon}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-sm"
              >
                Copy Coupon
              </button>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleShopOffers}
                className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg"
              >
                <span>Shop Offers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400">
                Offers valid while stock lasts · Terms apply
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
