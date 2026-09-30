import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'Mobile Phones', label: 'Smartphones' },
    { id: 'Earphones & Headphones', label: 'Audio & Earbuds' },
    { id: 'Smart Watches', label: 'Smart Watches' },
    { id: 'Chargers & Cables', label: 'Fast Chargers' },
    { id: 'Power Banks', label: 'Power Banks' }
  ];

  const featured = products.filter((p) => p.isFeatured);

  const displayedProducts = activeTab === 'all'
    ? featured
    : featured.filter((p) => p.category === activeTab);

  return (
    <section id="featured-products" className="py-14 sm:py-18 bg-[#FBFBFA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Handpicked By Experts
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top quality electronics selected for superior performance, reliability, and value.
            </p>
          </div>

          {/* Interactive Filter Tabs (Anti-slop compliant segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 font-medium">No featured items currently in this tab.</p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-3 text-xs text-emerald-800 font-semibold hover:underline"
            >
              Reset to all featured products
            </button>
          </div>
        )}

        {/* Bottom CTA to view full catalog */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 hover:border-slate-400 shadow-2xs transition-all cursor-pointer"
          >
            <span>Explore Entire Store Catalog</span>
            <ArrowRight className="w-4 h-4 text-emerald-800" />
          </button>
        </div>

      </div>
    </section>
  );
};
