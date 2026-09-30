import React from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Watch, 
  Speaker, 
  BatteryCharging, 
  Tv, 
  Home, 
  Laptop, 
  Wifi, 
  Camera, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/storeData';

// Map icon string to Lucide icon component
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Smartphone,
  ShieldCheck,
  Zap,
  Headphones,
  Watch,
  Speaker,
  BatteryCharging,
  Tv,
  Home,
  Laptop,
  Wifi,
  Camera,
  Cpu
};

export const CategorySection: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useShop();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('catalog');
    const el = document.getElementById('featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Browse Departments
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Explore authentic electronics and telecom gear categorized for easy shopping with guaranteed brand warranty.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Cpu;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name)}
                className="group p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-[#FBFBFA] hover:bg-white hover:border-emerald-700/60 hover:shadow-md transition-all duration-200 flex flex-col items-start justify-between text-left relative overflow-hidden cursor-pointer"
              >
                {/* Subtle top corner accent */}
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-600 transition-colors absolute top-3 right-3" />

                <div className="w-11 h-11 rounded-lg bg-white border border-slate-200/80 group-hover:bg-emerald-950 group-hover:border-emerald-950 text-slate-700 group-hover:text-emerald-400 flex items-center justify-center transition-all duration-200 shadow-2xs mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-medium">
                    <span>{cat.itemCount} Items</span>
                    <span className="text-emerald-700 font-semibold opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                      Explore <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
