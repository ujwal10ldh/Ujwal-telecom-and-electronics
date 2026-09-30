import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PRODUCTS, STORE_INFO } from '../data/storeData';
import { CartItem, Order, OrderStatus, OrderStatusEvent, Product, ShippingAddress, StockStatus, User, UserRole } from '../types';

export const ADMIN_EMAIL = 'ujwalhack123@gmail.com';

export type PolicyType = 'faqs' | 'shipping' | 'return' | 'warranty' | 'privacy' | 'terms';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
export type AppView = 'home' | 'catalog' | 'product' | 'contact' | 'about';

interface ShopContextType {
  // Authentication & RBAC
  currentUser: User | null;
  isAdmin: boolean;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  login: (email: string, password?: string) => { success: boolean; message: string; user?: User };
  signup: (name: string, email: string, password?: string, phone?: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  openAdminPanel: () => void;
  updateUserProfile: (updated: Partial<User>) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
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

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Search & Navigation
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

  // Modals & Drawers
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

  // Order Tracking Modal & Methods
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackedOrderId: string | null;
  setTrackedOrderId: (id: string | null) => void;
  openOrderTracking: (orderId?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;

  // Tax Invoice Modal
  invoiceOrder: Order | null;
  openInvoice: (order: Order) => void;
  closeInvoice: () => void;

  policyModal: { isOpen: boolean; type: PolicyType };
  openPolicyModal: (type: PolicyType) => void;
  closePolicyModal: () => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activeProductDetails: Product | null;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (
    shipping: ShippingAddress, 
    paymentMethod: Order['paymentMethod'],
    paymentDetails?: {
      upiApp?: string;
      upiTransactionId?: string;
      cardLast4?: string;
      bankName?: string;
    }
  ) => Promise<Order>;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Only the store owner account is pre-registered
const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Ujwal (Store Owner)',
    email: ADMIN_EMAIL,
    role: 'admin',
    phone: '+91 98036 79285',
    createdAt: '2026-01-01'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered Users (stored in localStorage)
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out old demo dummy emails
        const cleaned = parsed.filter(
          (u: User) =>
            u.email.toLowerCase() !== 'amankumar@example.com' &&
            u.email.toLowerCase() !== 'pooja.customer@example.com'
        );
        // Ensure admin user always exists and has admin role
        const hasAdmin = cleaned.some((u: User) => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
        if (!hasAdmin) {
          return [INITIAL_USERS[0], ...cleaned];
        }
        return cleaned;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ujwal_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Current logged in user (starts with admin ujwalhack123@gmail.com for immediate access if saved, or null)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ujwal_current_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default to the Store Owner admin on first session so the owner immediately sees their admin power
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('ujwal_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('ujwal_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Is current user an admin? ONLY ujwalhack123@gmail.com gets admin power
  const isAdmin = currentUser !== null && 
    currentUser.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() && 
    currentUser.role === 'admin';

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

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

  // Orders - Stored strictly from real customer transactions
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ujwal_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy dummy/mock orders
          return parsed.filter(
            (o: Order) =>
              o.id !== 'ORD-942815' &&
              !o.shippingAddress?.email?.includes('gurpreet.singh') &&
              !o.shippingAddress?.fullName?.toLowerCase().includes('gurpreet')
          );
        }
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
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState<string | null>(null);

  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const openInvoice = (order: Order) => setInvoiceOrder(order);
  const closeInvoice = () => setInvoiceOrder(null);

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
    }, 3500);
  };

  // Authentication functions
  const login = (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if logging in as Admin
    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      const adminUser: User = {
        id: 'usr-admin',
        name: 'Ujwal (Store Owner)',
        email: ADMIN_EMAIL,
        role: 'admin',
        phone: '+91 98036 79285',
        createdAt: '2026-01-01'
      };
      setCurrentUser(adminUser);
      showToast(`Welcome back, Ujwal! Admin privileges activated.`);
      return { success: true, message: 'Logged in as Admin (Store Owner)', user: adminUser };
    }

    // Check existing customer
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      // Ensure only ujwalhack123@gmail.com has admin
      const customerUser: User = {
        ...existing,
        role: 'customer'
      };
      setCurrentUser(customerUser);
      showToast(`Welcome back, ${customerUser.name}!`);
      return { success: true, message: 'Logged in as Customer', user: customerUser };
    }

    // Auto-create customer user if not found
    const newCust: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    setUsers((prev) => [...prev, newCust]);
    setCurrentUser(newCust);
    showToast(`Account created! Welcome, ${newCust.name}!`);
    return { success: true, message: 'New customer account created and logged in', user: newCust };
  };

  const signup = (name: string, email: string, _password?: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Only ujwalhack123@gmail.com gets admin power
    const isTargetAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const role: UserRole = isTargetAdmin ? 'admin' : 'customer';

    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      role,
      phone: phone?.trim(),
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => {
      const filtered = prev.filter((u) => u.email.toLowerCase() !== cleanEmail);
      return [...filtered, newUser];
    });

    setCurrentUser(newUser);

    if (isTargetAdmin) {
      showToast('Admin account activated! Full store controls unlocked.');
    } else {
      showToast(`Welcome to Ujwal Telecom, ${newUser.name}!`);
    }

    return { success: true, message: `Account created successfully with ${role} privileges`, user: newUser };
  };

  const logout = () => {
    const prevName = currentUser?.name || 'User';
    setCurrentUser(null);
    setIsAdminOpen(false);
    showToast(`Logged out. See you soon, ${prevName}!`, 'info');
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    
    // Prevent elevating role unless email matches ADMIN_EMAIL
    const safeRole: UserRole = currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() 
      ? 'admin' 
      : 'customer';

    const updatedUser: User = {
      ...currentUser,
      name: updated.name !== undefined ? updated.name.trim() : currentUser.name,
      phone: updated.phone !== undefined ? updated.phone.trim() : currentUser.phone,
      streetAddress: updated.streetAddress !== undefined ? updated.streetAddress.trim() : currentUser.streetAddress,
      areaLocality: updated.areaLocality !== undefined ? updated.areaLocality.trim() : currentUser.areaLocality,
      city: updated.city !== undefined ? updated.city.trim() : currentUser.city,
      state: updated.state !== undefined ? updated.state.trim() : currentUser.state,
      pincode: updated.pincode !== undefined ? updated.pincode.trim() : currentUser.pincode,
      role: safeRole
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    showToast('Your account details have been updated successfully!');
  };

  // Restrict opening Admin Panel strictly to admin
  const openAdminPanel = () => {
    if (isAdmin) {
      setIsAdminOpen(true);
    } else if (currentUser) {
      showToast('Access denied: Admin power is restricted to ujwalhack123@gmail.com', 'error');
    } else {
      showToast('Please log in with the admin account to access store controls', 'error');
      setAuthMode('login');
      setIsAuthOpen(true);
    }
  };

  // Product mutations (Admin only)
  const addProduct = (productData: Omit<Product, 'id'>) => {
    if (!isAdmin) {
      showToast('Unauthorized: Only the admin account can add products', 'error');
      return;
    }
    const newId = `ujw-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog!`);
  };

  const updateProduct = (updated: Product) => {
    if (!isAdmin) {
      showToast('Unauthorized: Only the admin account can edit products', 'error');
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}"`);
  };

  const deleteProduct = (id: string) => {
    if (!isAdmin) {
      showToast('Unauthorized: Only the admin account can delete products', 'error');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    if (!isAdmin) {
      showToast('Unauthorized: Only the admin account can reset products', 'error');
      return;
    }
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('ujwal_products');
    showToast('Catalog restored to standard inventory', 'info');
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

  // Order Tracking Helpers
  const openOrderTracking = (orderId?: string) => {
    if (orderId) {
      setTrackedOrderId(orderId);
    } else if (orders.length > 0) {
      setTrackedOrderId(orders[0].id);
    } else {
      setTrackedOrderId(null);
    }
    setIsTrackingOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, customNote?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        const updatedTimeline = order.timeline?.map((event) => {
          if (event.status === newStatus) {
            return {
              ...event,
              completed: true,
              current: true,
              time: timeNow,
              description: customNote || event.description
            };
          }
          const isPrior =
            newStatus === 'Delivered' ||
            ((newStatus === 'Out for Delivery' || newStatus === 'Ready for Pickup') &&
              (event.status === 'Confirmed' || event.status === 'Packed')) ||
            (newStatus === 'Packed' && event.status === 'Confirmed');

          return {
            ...event,
            current: false,
            completed: event.completed || isPrior
          };
        }) || [];

        return {
          ...order,
          orderStatus: newStatus,
          timeline: updatedTimeline
        };
      })
    );
    showToast(`Order #${orderId} marked as ${newStatus}!`);
  };

  // Order Placement
  const placeOrder = async (
    shipping: ShippingAddress,
    paymentMethod: Order['paymentMethod'],
    paymentDetails?: {
      upiApp?: string;
      upiTransactionId?: string;
      cardLast4?: string;
      bankName?: string;
    }
  ): Promise<Order> => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const trackingNumber = `UJWAL-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const isPickup = shipping.deliveryType === 'store_pickup';

    const timeline: OrderStatusEvent[] = [
      {
        status: 'Confirmed',
        label: 'Order Placed & Verified',
        time: nowTime,
        description: `Order successfully booked via ${paymentMethod}. GST invoice initiated.`,
        completed: true,
        current: true
      },
      {
        status: 'Packed',
        label: 'Quality Check & Safe Packing',
        time: 'In Progress',
        description: 'Device serial numbers scanned and sealed with tamper-proof warranty sticker.',
        completed: false
      },
      {
        status: isPickup ? 'Ready for Pickup' : 'Out for Delivery',
        label: isPickup ? 'Ready at Lohara Store' : 'Out for Local Delivery in Ludhiana',
        time: 'Scheduled',
        description: isPickup
          ? 'Collect at Street No 1, Maha Luxmi Nagar, Lohara with order ID.'
          : `Dispatched with local rider to ${shipping.streetAddress || 'your address'}, ${shipping.city}.`,
        completed: false
      },
      {
        status: 'Delivered',
        label: isPickup ? 'Collected by Customer' : 'Delivered & Handed Over',
        time: 'Pending',
        description: 'Package received and unboxing verified with customer.',
        completed: false
      }
    ];

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      userEmail: currentUser?.email || shipping.email || undefined,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      shippingAddress: shipping,
      trackingNumber,
      estimatedDelivery: isPickup ? 'Ready in 2 Hours' : 'Today by 7:30 PM (Ludhiana Local)',
      courierPartner: isPickup ? 'In-Store Pickup (Lohara Store)' : 'Ujwal Express Local Delivery',
      timeline,
      upiTransactionId: paymentDetails?.upiTransactionId,
      paymentDetails
    };

    // Decrement actual inventory stock for real retail usage
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((item) => item.product.id === p.id);
        if (cartItem) {
          const newStock = Math.max(0, p.stockCount - cartItem.quantity);
          const newStatus: StockStatus = newStock === 0 ? 'out_of_stock' : newStock <= 3 ? 'low_stock' : 'in_stock';
          return {
            ...p,
            stockCount: newStock,
            stockStatus: newStatus
          };
        }
        return p;
      })
    );

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
        currentUser,
        isAdmin,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        login,
        signup,
        logout,
        openAdminPanel,
        updateUserProfile,

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

        isTrackingOpen,
        setIsTrackingOpen,
        trackedOrderId,
        setTrackedOrderId,
        openOrderTracking,
        updateOrderStatus,

        invoiceOrder,
        openInvoice,
        closeInvoice,

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
