import React, { useState, useEffect } from 'react';
import { 
  X, 
  User as UserIcon, 
  Package, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Crown, 
  LogOut, 
  Edit3, 
  Save, 
  CheckCircle2,
  Building,
  Home,
  Truck,
  RotateCcw,
  Search,
  ExternalLink,
  Clock,
  FileText
} from 'lucide-react';
import { useShop, ADMIN_EMAIL } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeData';
import { Order, OrderStatus } from '../types';

export const AccountModal: React.FC = () => {
  const { 
    isAccountOpen, 
    setIsAccountOpen, 
    orders, 
    currentUser, 
    isAdmin, 
    logout, 
    setIsAuthOpen, 
    setAuthMode,
    setIsAdminOpen,
    updateUserProfile,
    showToast,
    openOrderTracking,
    updateOrderStatus,
    openInvoice,
    addToCart,
    setIsCartOpen
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'support'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    streetAddress: '',
    areaLocality: '',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141016'
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        streetAddress: currentUser.streetAddress || '',
        areaLocality: currentUser.areaLocality || '',
        city: currentUser.city || 'Ludhiana',
        state: currentUser.state || 'Punjab',
        pincode: currentUser.pincode || '141016'
      });
    }
  }, [currentUser, isEditing]);

  if (!isAccountOpen) return null;

  // Filter orders: Admins can see all orders, customers see only their own orders
  const userOrders = isAdmin
    ? orders
    : currentUser
    ? orders.filter(
        (o) =>
          o.userEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          o.shippingAddress.email?.toLowerCase() === currentUser.email.toLowerCase()
      )
    : [];

  const visibleOrders = userOrders.filter((o) => {
    if (orderFilter === 'active' && o.orderStatus === 'Delivered') return false;
    if (orderFilter === 'delivered' && o.orderStatus !== 'Delivered') return false;

    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchTrack = o.trackingNumber?.toLowerCase().includes(q);
      const matchItem = o.items.some((it) => it.product.name.toLowerCase().includes(q));
      const matchCust = o.shippingAddress.fullName.toLowerCase().includes(q);
      if (!matchId && !matchTrack && !matchItem && !matchCust) return false;
    }
    return true;
  });

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    showToast(`Added items from Order #${order.id} to cart!`);
    setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      streetAddress: formData.streetAddress,
      areaLocality: formData.areaLocality,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
              isAdmin ? 'bg-emerald-950 text-amber-400' : 'bg-slate-900 text-emerald-400'
            }`}>
              {isAdmin ? <Crown className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                {currentUser ? currentUser.name : 'Store Account'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {currentUser ? (
                  isAdmin ? 'Store Owner · Full Admin Privileges' : 'Verified Customer Account'
                ) : (
                  'Guest Session'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => {
                  logout();
                }}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="Log out from account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In Prompt */}
        {!currentUser ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <UserIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sign in to Ujwal Telecom</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Log in to view past orders, track deliveries, edit personal details, or manage saved addresses.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                  setIsAccountOpen(false);
                }}
                className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthOpen(true);
                  setIsAccountOpen(false);
                }}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 px-6 pt-2 bg-slate-50 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-emerald-700 text-emerald-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{isAdmin ? `Store Orders (${visibleOrders.length})` : `My Orders (${visibleOrders.length})`}</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-emerald-700 text-emerald-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>My Profile & Address</span>
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'support'
                    ? 'border-emerald-700 text-emerald-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Store Helpdesk</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {isAdmin && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Crown className="w-4 h-4 text-emerald-700" />
                        Admin View: Displaying all store orders across all customers.
                      </span>
                      <button
                        onClick={() => {
                          setIsAccountOpen(false);
                          setIsAdminOpen(true);
                        }}
                        className="px-2.5 py-1 bg-emerald-900 text-white rounded text-[11px] font-bold cursor-pointer"
                      >
                        Inventory Manager
                      </button>
                    </div>
                  )}

                  {/* Orders Filter & Search Toolbar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                      {(['all', 'active', 'delivered'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setOrderFilter(tab)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                            orderFilter === tab
                              ? 'bg-emerald-950 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab === 'active' ? 'Active Shipments' : tab}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Search by order ID, item or customer..."
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-emerald-600 bg-white"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  {visibleOrders.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <Package className="w-12 h-12 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-800">
                        {userOrders.length === 0
                          ? 'No Orders Placed Yet'
                          : 'No matching orders found'}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        {userOrders.length === 0
                          ? 'When you purchase smartphones, accessories or audio devices, your receipts and tracking status will appear here.'
                          : 'Try changing your filter or search keywords.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {visibleOrders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                            <div>
                              <span className="font-mono font-bold text-slate-900 text-xs">
                                #{order.id}
                              </span>
                              <span className="text-[11px] text-slate-500 ml-2">{order.date}</span>
                              {order.trackingNumber && (
                                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-2 inline-flex items-center gap-1">
                                  <Truck className="w-3 h-3 text-emerald-700" />
                                  <span>{order.trackingNumber}</span>
                                </span>
                              )}
                              {isAdmin && order.shippingAddress.fullName && (
                                <span className="text-[11px] text-slate-700 ml-2 font-semibold">
                                  Customer: {order.shippingAddress.fullName} ({order.shippingAddress.phone})
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : order.orderStatus === 'Out for Delivery'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}>
                                {order.orderStatus}
                              </span>

                              {isAdmin && (
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                  className="text-[11px] p-1 rounded bg-slate-100 border border-slate-300 font-semibold focus:outline-none cursor-pointer"
                                  title="Admin override status"
                                >
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Packed">Packed</option>
                                  <option value="Out for Delivery">Out for Delivery</option>
                                  <option value="Ready for Pickup">Ready for Pickup</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs text-slate-700">
                                <span className="truncate pr-2">
                                  {item.quantity}x {item.product.name}
                                </span>
                                <span className="font-semibold shrink-0 tabular-nums">
                                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <span className="text-slate-600 font-normal">
                              Payment: <strong>{order.paymentMethod}</strong> ({order.shippingAddress.city} - {order.shippingAddress.pincode})
                              {order.paymentStatus && <span className="ml-1.5 text-emerald-800 font-bold">[{order.paymentStatus}]</span>}
                            </span>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-emerald-950 font-bold tabular-nums text-sm">
                                ₹{order.total.toLocaleString('en-IN')}
                              </span>

                              <button
                                onClick={() => openInvoice(order)}
                                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                title="View and print official GST invoice"
                              >
                                <FileText className="w-3 h-3 text-emerald-700" />
                                <span>Tax Bill</span>
                              </button>

                              <button
                                onClick={() => {
                                  setIsAccountOpen(false);
                                  openOrderTracking(order.id);
                                }}
                                className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                              >
                                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Track Live</span>
                              </button>

                              <button
                                onClick={() => handleReorder(order)}
                                className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                title="Add all items to cart again"
                              >
                                <RotateCcw className="w-3 h-3 text-slate-500" />
                                <span>Buy Again</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-5 text-xs">
                  {/* Role Status Card */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isAdmin
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isAdmin ? <Crown className="w-5 h-5 text-amber-500" /> : <UserIcon className="w-5 h-5 text-slate-600" />}
                        <h4 className="font-bold text-sm">
                          {isAdmin ? 'Store Owner Account (Admin Power)' : 'Customer Account'}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isAdmin ? 'bg-emerald-900 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {currentUser.role.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed opacity-90">
                      {isAdmin
                        ? `You are logged in as ${ADMIN_EMAIL}. You have exclusive administrative power to add products, modify prices, and manage inventory.`
                        : `You are logged in as ${currentUser.email}. You can edit your personal name, contact number, and saved shipping address below.`}
                    </p>
                  </div>

                  {/* Profile Edit or Display Section */}
                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-sm animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-emerald-700" />
                          <span>Edit Your Account Details</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Phone / WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Email Address (Registered Login)
                          </label>
                          <input
                            type="email"
                            disabled
                            value={currentUser.email}
                            className="w-full p-2.5 bg-slate-100 text-slate-500 rounded-lg border border-slate-200 text-xs cursor-not-allowed"
                          />
                          <span className="text-[10px] text-slate-400">Account login ID cannot be changed</span>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            Area / Colony / Street
                          </label>
                          <input
                            type="text"
                            placeholder="House No, Colony, Street, or Area"
                            value={formData.streetAddress}
                            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">
                              PIN Code
                            </label>
                            <input
                              type="text"
                              maxLength={6}
                              value={formData.pincode}
                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                              className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-slate-900 text-sm">Account & Delivery Information</h4>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Change Details</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-400 block text-[11px]">Full Name</span>
                          <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-400 block text-[11px]">Email Address</span>
                          <span className="font-semibold text-slate-900">{currentUser.email}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                          <span className="font-semibold text-slate-900">{currentUser.phone || 'Not added yet'}</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-400 block text-[11px]">Account Privileges</span>
                          <span className="font-bold text-emerald-800">
                            {isAdmin ? 'Full Store Management' : 'Standard Customer'}
                          </span>
                        </div>
                      </div>

                      {/* Saved Delivery Address Preview */}
                      <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Saved Delivery Address</span>
                        </div>
                        <p className="text-slate-600 text-xs pl-5">
                          {currentUser.streetAddress ? (
                            <span>
                              {currentUser.streetAddress}
                              {currentUser.areaLocality && `, ${currentUser.areaLocality}`}, {currentUser.city || 'Ludhiana'}, {currentUser.state || 'Punjab'} - {currentUser.pincode || '141016'}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">No delivery address saved yet. Click "Change Details" to save your address for faster 1-click checkout.</span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Account Actions */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-slate-900">Account Session</h5>
                    <p className="text-slate-500 text-[11px]">
                      Manage your current session on this device:
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountOpen(false);
                        }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold cursor-pointer"
                      >
                        Log Out
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setIsAuthOpen(true);
                          setIsAccountOpen(false);
                        }}
                        className="px-3.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        Sign in with different account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                    <h4 className="font-bold text-emerald-900 text-sm">
                      Ujwal Telecom & Electronics Helpdesk
                    </h4>
                    <p className="text-emerald-800">
                      Contact our store directly for billing questions, warranty claims, or device repair inquiries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-2.5 font-semibold text-slate-800"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-700" />
                      <span>Call {STORE_INFO.phoneDisplay}</span>
                    </a>

                    <a
                      href={`https://wa.me/${STORE_INFO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-2.5 font-semibold text-slate-800"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
