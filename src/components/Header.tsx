import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Crown,
  LogIn,
  LogOut,
  Truck
} from 'lucide-react';
import { useShop, ADMIN_EMAIL } from '../context/ShopContext';
import { STORE_INFO, CATEGORIES } from '../data/storeData';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
    setIsAdminOpen,
    setIsAuthOpen,
    setAuthMode,
    currentUser,
    isAdmin,
    logout,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setCurrentView,
    currentView,
    products,
    openProductDetails,
    openOrderTracking
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleNavClick = (view: 'home' | 'catalog' | 'contact' | 'about', categoryFilter?: string) => {
    setCurrentView(view);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Fast & Reliable Service
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Genuine Products
            </span>
            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Trusted Electronics Store
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={`tel:${STORE_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
            <span className="text-slate-700 hidden lg:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">{STORE_INFO.businessHours}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Wordmark (Single prominent text element with minimal tech insignia) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2.5 focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold tracking-tighter shadow-sm border border-emerald-800/60 group-hover:bg-emerald-900 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors uppercase leading-tight font-display">
                  Ujwal Telecom & Electronics
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-500 font-medium">
                  Retail · Service · Genuine Tech
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-emerald-800 transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className={`hover:text-emerald-800 transition-colors cursor-pointer ${
                currentView === 'catalog' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Mobile Phones')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Mobiles
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Earphones & Headphones')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Audio
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('new-arrivals');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavClick('catalog');
              }}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('best-sellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavClick('catalog');
              }}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Best Sellers
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('special-offers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavClick('catalog');
              }}
              className="text-amber-700 hover:text-amber-800 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Offers
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-emerald-800 transition-colors cursor-pointer ${
                currentView === 'contact' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              Visit Store
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input on Desktop */}
            <div ref={searchRef} className="relative hidden md:block w-44 xl:w-56">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search mobiles, audio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 text-xs text-slate-800 pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Live Search Autocomplete Popup */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 overflow-hidden">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Quick Results
                  </div>
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        openProductDetails(product);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-8 h-8 rounded object-cover bg-slate-100 shrink-0" 
                        />
                        <div className="truncate">
                          <p className="text-xs font-medium text-slate-900 truncate group-hover:text-emerald-700">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-slate-500">{product.category}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-900 shrink-0 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      handleNavClick('catalog');
                      setSearchFocused(false);
                    }}
                    className="w-full text-center py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-50 rounded-lg mt-1 transition-colors cursor-pointer"
                  >
                    View all matching products →
                  </button>
                </div>
              )}
            </div>

            {/* ONLY ADMIN GETS ADMIN POWER / MANAGE STORE BUTTON */}
            {isAdmin && (
              <button
                onClick={() => setIsAdminOpen(true)}
                title="Store Admin / Product Manager (Only for Store Owner)"
                className="px-2.5 py-1.5 bg-emerald-900 text-emerald-100 hover:bg-emerald-800 border border-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Admin Power</span>
              </button>
            )}

            {/* Track Order Button */}
            <button
              onClick={() => openOrderTracking()}
              title="Track your order status live"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden md:inline">Track Order</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-2 text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative flex items-center gap-2 px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg transition-all shadow-sm group cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
                Cart
              </span>
            </button>

            {/* User Account / Auth Dropdown */}
            <div ref={userMenuRef} className="relative">
              {currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="User Account Menu"
                  className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    isAdmin
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isAdmin ? (
                    <Crown className="w-4 h-4 text-emerald-800 shrink-0" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className="hidden md:inline font-bold truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">
                    ({isAdmin ? 'Admin' : 'Customer'})
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Log In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {userDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isAdmin ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isAdmin ? 'Store Owner (Admin)' : 'Customer Account'}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsAdminOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      <span>Admin Store Manager</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setIsAccountOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Profile & Orders</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg lg:hidden transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search mobiles, earphones, adapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-xs text-slate-900 pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600 placeholder:text-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          
          {/* User status badge on mobile */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                  {isAdmin ? <Crown className="w-4 h-4 text-amber-400" /> : <UserIcon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500">{isAdmin ? 'Store Owner (Admin)' : 'Customer'}</div>
                </div>
              </div>
            ) : (
              <div className="text-slate-600">
                <div className="font-bold text-slate-900">Guest Visitor</div>
                <div className="text-[10px] text-slate-500">Sign in for fast checkout</div>
              </div>
            )}

            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-950 rounded-lg hover:bg-emerald-900"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded-lg bg-slate-50 font-medium text-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="text-left py-2 px-3 rounded-lg bg-slate-50 font-medium text-slate-800"
            >
              All Products
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded-lg bg-slate-50 font-medium text-slate-800"
            >
              Visit Store
            </button>
            <button
              onClick={() => {
                openOrderTracking();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-emerald-50 text-emerald-950 font-semibold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Track Order Status</span>
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                Live
              </span>
            </button>
            
            {/* ONLY ADMIN SEES MANAGE STORE BUTTON */}
            {isAdmin && (
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg bg-emerald-900 text-emerald-100 font-bold flex items-center justify-between"
              >
                <span>Admin Power</span>
                <Crown className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Top Categories
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick('catalog', cat.name)}
                className="text-left py-1.5 px-2 rounded text-xs text-slate-700 hover:text-emerald-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span className="truncate">{cat.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <a 
              href={`tel:${STORE_INFO.phone}`} 
              className="text-emerald-800 font-semibold flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Store Directly
            </a>
            <span className="text-slate-400">10 AM – 9 PM</span>
          </div>
        </div>
      )}
    </header>
  );
};
