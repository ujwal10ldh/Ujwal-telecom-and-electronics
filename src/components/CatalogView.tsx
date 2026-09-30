import React from 'react';
import { useShop, SortOption } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/storeData';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly
  } = useShop();

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchBrand = product.brand?.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc && !matchBrand) {
        return false;
      }
    }

    // Category match
    if (selectedCategory !== 'all') {
      if (product.category !== selectedCategory) {
        return false;
      }
    }

    // Price range match
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // In stock only match
    if (inStockOnly && product.stockStatus === 'out_of_stock') {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 100000]);
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Store Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {selectedCategory === 'all' ? 'All Electronics & Telecom Products' : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {sortedProducts.length} authentic products with official warranties and GST invoices.
          </p>
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6 bg-[#FBFBFA] p-5 rounded-2xl border border-slate-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Department / Category
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] opacity-75">{products.length}</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] opacity-75 shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 pt-3 border-t border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">Max Price</label>
                <span className="font-semibold text-emerald-800 tabular-nums">
                  ₹{priceRange[1].toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60000}
                step={1000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹0</span>
                <span>₹60,000+</span>
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-3 border-t border-slate-200">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>

          </div>

          {/* Right Column: Sort bar & Products Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Sort & Search info bar */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 font-medium">
                {searchQuery && (
                  <span>
                    Searching for "<span className="font-bold text-slate-900">{searchQuery}</span>" ·{' '}
                  </span>
                )}
                <span>Found <strong className="text-slate-900">{sortedProducts.length}</strong> items</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-600"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#FBFBFA] rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
                <Search className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No matching electronics found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or broadening the category filters to discover products.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 px-4 py-2 bg-emerald-950 text-white rounded-lg text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
