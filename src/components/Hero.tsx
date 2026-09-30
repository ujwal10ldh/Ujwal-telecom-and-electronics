import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Headphones, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopNow = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    const el = document.getElementById('featured-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('catalog');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200">
      {/* Background Subtle Accent Gradients */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Promotional badge (clean unboxed/subtle border, anti-slop compliant) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Special Offers Available · Festive Season Deals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display text-balance">
              Power Your Everyday Life with <span className="text-emerald-900">Smart Electronics</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Discover reliable electronics, telecom products, accessories and everyday technology — carefully selected for quality, value and performance.
            </p>

            {/* Quick Product Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>5G Smartphones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ANC Audio & Earbuds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Smartwatches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Fast GaN Chargers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Bluetooth Speakers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>20K Power Banks</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleShopNow}
                className="px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleExploreCategories}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-lg border border-slate-300 hover:border-slate-400 transition-all whitespace-nowrap cursor-pointer"
              >
                Explore Categories
              </button>
            </div>

            {/* Trust Footnote */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
              <span>GST Verified Billing</span>
              <span aria-hidden="true">·</span>
              <span>100% Brand Warranty</span>
              <span aria-hidden="true">·</span>
              <span>Doorstep Delivery & Store Pickup</span>
            </div>
          </div>

          {/* Right Column: Premium Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
              <img
                src="/src/assets/images/hero_electronics_showcase_1790778317963.jpg"
                alt="Ujwal Telecom & Electronics Premium Product Showcase"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* In-Frame Focal Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400">
                      Curated Electronics Collection
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Flagships, High-End Audio & Fast Charging
                    </h3>
                  </div>
                  <button
                    onClick={handleShopNow}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="View collection"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Trust Features Bar Below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Genuine Products</h4>
              <p className="text-xs text-slate-500 mt-0.5">100% authentic with brand warranty</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Fast Service</h4>
              <p className="text-xs text-slate-500 mt-0.5">Prompt assistance & quick delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Secure Payments</h4>
              <p className="text-xs text-slate-500 mt-0.5">UPI, Cards & Cash on Delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Customer Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Direct phone & WhatsApp help</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
