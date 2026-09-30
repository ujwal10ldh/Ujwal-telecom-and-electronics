import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PRODUCTS, STORE_INFO } from '../data/storeData';
import { CartItem, Order, Product, ShippingAddress } from '../types';

export type PolicyType = 'faqs' | 'shipping' | 'return' | 'warranty' | 'privacy' | 'terms';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export type AppView = 'home' | 'catalog' | 'product' | 'contact' | 'about';

interface ShopContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;

  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  policyModal: { isOpen: boolean; type: PolicyType };
  openPolicyModal: (type: PolicyType) => void;
  closePolicyModal: () => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activeProductDetails: Product | null;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;

  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (shipping: ShippingAddress, paymentMethod: Order['paymentMethod']) => Promise<Order>;

  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_products');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ujwal_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ujwal_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_wishlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ujwal_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ujwal_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; type: PolicyType }>({
    isOpen: false,
    type: 'faqs'
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeProductDetails, setActiveProductDetails] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Product mutations
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = `ujw-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog!`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}"`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('ujwal_products');
    showToast('Reset catalog to default demo products', 'info');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 1500 || subtotal === 0 ? 0 : 99;

  let discountAmount = 0;
  if (appliedCoupon === 'UJWAL10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'WELCOME500' && subtotal >= 3000) {
    discountAmount = 500;
  }

  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'UJWAL10') {
      setAppliedCoupon('UJWAL10');
      showToast('10% Special Discount Applied!');
      return { success: true, message: '10% discount applied to your order!' };
    }
    if (clean === 'WELCOME500') {
      if (subtotal < 3000) {
        return { success: false, message: 'WELCOME500 requires a minimum order of ₹3,000' };
      }
      setAppliedCoupon('WELCOME500');
      showToast('₹500 Welcome Discount Applied!');
      return { success: true, message: '₹500 flat discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "UJWAL10"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Modals & Navigation
  const openPolicyModal = (type: PolicyType) => {
    setPolicyModal({ isOpen: true, type });
  };

  const closePolicyModal = () => {
    setPolicyModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openProductDetails = (product: Product) => {
    setActiveProductDetails(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetails = () => {
    setActiveProductDetails(null);
    setCurrentView('catalog');
  };

  // Order Placement
  const placeOrder = async (
    shipping: ShippingAddress,
    paymentMethod: Order['paymentMethod']
  ): Promise<Order> => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      shippingAddress: shipping
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryCharge,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,

        currentView,
        setCurrentView,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAdminOpen,
        setIsAdminOpen,

        policyModal,
        openPolicyModal,
        closePolicyModal,

        quickViewProduct,
        setQuickViewProduct,
        activeProductDetails,
        openProductDetails,
        closeProductDetails,

        orders,
        lastPlacedOrder,
        placeOrder,

        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
