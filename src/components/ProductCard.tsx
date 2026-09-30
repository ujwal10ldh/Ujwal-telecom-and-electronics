import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    openProductDetails
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#F7F7F6] overflow-hidden flex items-center justify-center p-3">
        {/* Subtle Discount / Status Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.discount > 0 && (
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200 px-2 py-0.5 rounded tracking-tight">
              {product.discount}% OFF
            </span>
          )}
          {product.stockStatus === 'low_stock' && (
            <span className="text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Add to wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-colors ${
              isFavorited
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white/90 backdrop-blur-xs border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick View"
            title="Quick View"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Main Product Image */}
        <button
          onClick={() => openProductDetails(product)}
          className="w-full h-full flex items-center justify-center focus:outline-none cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful fallback to prevent broken images
              (e.target as HTMLImageElement).src = '/src/assets/images/hero_electronics_showcase_1790778317963.jpg';
            }}
          />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="uppercase tracking-wider text-[10px] text-slate-500 font-semibold">
              {product.brand || product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold tabular-nums text-xs">{product.rating}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <button
            onClick={() => openProductDetails(product)}
            className="text-left font-bold text-slate-900 group-hover:text-emerald-900 transition-colors text-sm sm:text-base line-clamp-1 block focus:outline-none"
          >
            {product.name}
          </button>

          {/* Short Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              In Stock · Official Warranty
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="p-2 sm:px-3 sm:py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
