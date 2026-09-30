import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const newArrivals = products.filter((p) => p.isNewArrival);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="new-arrivals" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Just In Stock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Freshly released gadgets, telecom gear, and upgraded electronics available now.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Scroll Navigation Controls for horizontal view */}
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleViewAll}
              className="ml-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
            >
              View All Products →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel / Flex Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[300px] shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
