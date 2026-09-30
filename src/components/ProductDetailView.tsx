import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  MapPin, 
  ArrowLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    closeProductDetails,
    products,
    showToast
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  // Check delivery pincode
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      showToast('Please enter a valid 6-digit Indian PIN code', 'error');
      return;
    }
    setPincodeResult(`Delivery available to PIN ${pincode}: Estimated within 24–48 hours.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Ujwal Telecom & Electronics!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  // Find related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={closeProductDetails}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store Catalog</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Product</span>
          </button>
        </div>

        {/* Contiguous Purchase Module & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F7F6] border border-slate-200 p-6 flex items-center justify-center relative">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 overflow-hidden shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-emerald-700 ring-2 ring-emerald-700/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Status */}
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider font-bold text-emerald-800">
                {product.brand ? `${product.brand} · ${product.category}` : product.category}
              </span>
              <span className="text-slate-500 font-medium">SKU: {product.id}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900 tabular-nums">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-500">
                Based on {product.reviewsCount} verified Indian customer reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                </span>
              )}
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-800">
                {product.stockStatus === 'in_stock'
                  ? `In Stock (${product.stockCount} units available for instant billing)`
                  : 'Low Stock'}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">Max {product.stockCount} per order</span>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to Wishlist"
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Delivery & In-Store Availability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 411001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeResult && (
                <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* Warranty & Returns Callout */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{product.warranty || '1 Year Official Warranty'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>7-Day Replacement Policy</span>
              </div>
            </div>

          </div>

        </div>

        {/* Technical Specifications Table */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">
            Technical Specifications
          </h3>

          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white max-w-4xl">
            <div className="divide-y divide-slate-200 text-xs">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div
                  key={key}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                  }`}
                >
                  <span className="font-bold text-slate-700 sm:col-span-1">{key}</span>
                  <span className="text-slate-600 sm:col-span-2 font-medium mt-1 sm:mt-0">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">
              Related Products in {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
