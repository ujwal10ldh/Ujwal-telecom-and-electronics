import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Crown, 
  ShieldCheck, 
  Store, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useShop, ADMIN_EMAIL } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeData';
import { Order, OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isTrackingOpen, 
    setIsTrackingOpen, 
    trackedOrderId, 
    setTrackedOrderId, 
    orders, 
    updateOrderStatus, 
    isAdmin,
    currentUser,
    openInvoice
  } = useShop();

  const [searchInput, setSearchInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminSelectedStatus, setAdminSelectedStatus] = useState<OrderStatus>('Out for Delivery');
  const [adminNote, setAdminNote] = useState('');

  const userOrders = isAdmin
    ? orders
    : currentUser
    ? orders.filter(
        (o) =>
          o.userEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          o.shippingAddress.email?.toLowerCase() === currentUser.email.toLowerCase() ||
          (currentUser.phone && o.shippingAddress.phone?.includes(currentUser.phone))
      )
    : orders;

  // Sync selected order based on trackedOrderId or fallback to user's real recent order
  useEffect(() => {
    if (trackedOrderId) {
      const match = orders.find(
        (o) =>
          o.id.toLowerCase() === trackedOrderId.toLowerCase() ||
          o.trackingNumber?.toLowerCase() === trackedOrderId.toLowerCase()
      );
      if (match) {
        setSelectedOrder(match);
        setSearchInput(match.id);
        setAdminSelectedStatus(match.orderStatus);
        return;
      }
    }

    if (userOrders.length > 0) {
      setSelectedOrder(userOrders[0]);
      setSearchInput(userOrders[0].id);
      setAdminSelectedStatus(userOrders[0].orderStatus);
    } else {
      setSelectedOrder(null);
      setSearchInput('');
    }
  }, [trackedOrderId, orders, currentUser]);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.trackingNumber?.toLowerCase() === query ||
        o.shippingAddress.phone?.includes(query) ||
        o.shippingAddress.fullName?.toLowerCase().includes(query)
    );

    if (match) {
      setSelectedOrder(match);
      setTrackedOrderId(match.id);
    } else {
      setSelectedOrder(null);
    }
  };

  const handleAdminUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, adminSelectedStatus, adminNote || undefined);
    setAdminNote('');
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Packed':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Ready for Pickup':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Live Order & Delivery Tracker
              </h2>
              <p className="text-[11px] text-slate-500">
                Ujwal Telecom & Electronics · Ludhiana Local Delivery
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter your Order ID or Tracking Number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:outline-none focus:border-emerald-600 shadow-2xs font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Quick Order Tabs */}
          {userOrders.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-3 max-w-xl mx-auto text-xs no-scrollbar">
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">Your Recent Orders:</span>
              {userOrders.slice(0, 4).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrder(o);
                    setTrackedOrderId(o.id);
                    setSearchInput(o.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono shrink-0 transition-colors cursor-pointer ${
                    selectedOrder?.id === o.id
                      ? 'bg-emerald-900 text-white border-emerald-900 font-bold'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  #{o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {selectedOrder ? (
            <>
              {/* Top Overview Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                        Order Status
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeColor(selectedOrder.orderStatus)}`}>
                        {selectedOrder.orderStatus}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                      #{selectedOrder.id}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Booked on {selectedOrder.date}
                    </p>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[11px] text-slate-300 block">Estimated Arrival</span>
                    <span className="text-sm sm:text-base font-bold text-amber-300">
                      {selectedOrder.estimatedDelivery || 'Today by 7:30 PM'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedOrder.courierPartner || 'Ujwal Express Local Delivery'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-400">Tracking No:</span>
                    <strong className="text-white">{selectedOrder.trackingNumber || 'UJWAL-LOCAL-01'}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Payment:</span>
                    <strong className="text-white">{selectedOrder.paymentMethod}</strong>
                    <span className="text-emerald-400 font-bold">({selectedOrder.paymentStatus})</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span>Shipment Journey Milestones</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {(selectedOrder.timeline && selectedOrder.timeline.length > 0 ? selectedOrder.timeline : [
                    {
                      status: 'Confirmed',
                      label: 'Order Placed & Confirmed',
                      time: selectedOrder.date.split(',')[1] || '10:00 AM',
                      description: `Order successfully booked with ${selectedOrder.paymentMethod}. Official GST invoice generated.`,
                      completed: true,
                      current: selectedOrder.orderStatus === 'Confirmed'
                    },
                    {
                      status: 'Packed',
                      label: 'Safe Packed & Quality Checked',
                      time: selectedOrder.orderStatus !== 'Confirmed' ? '11:30 AM' : 'Pending',
                      description: 'Serial numbers registered for brand manufacturer warranty. Bubble wrapped.',
                      completed: selectedOrder.orderStatus !== 'Confirmed',
                      current: selectedOrder.orderStatus === 'Packed'
                    },
                    {
                      status: 'Out for Delivery',
                      label: selectedOrder.shippingAddress.deliveryType === 'store_pickup' ? 'Ready for Store Pickup' : 'Out for Local Delivery in Ludhiana',
                      time: (selectedOrder.orderStatus === 'Out for Delivery' || selectedOrder.orderStatus === 'Delivered') ? '02:00 PM' : 'Scheduled',
                      description: selectedOrder.shippingAddress.deliveryType === 'store_pickup' 
                        ? 'Package ready at Street No 1, Maha Luxmi Nagar, Lohara counter.'
                        : `Handed over to local delivery partner for delivery to ${selectedOrder.shippingAddress.streetAddress || 'Lohara'}.`,
                      completed: selectedOrder.orderStatus === 'Out for Delivery' || selectedOrder.orderStatus === 'Delivered',
                      current: selectedOrder.orderStatus === 'Out for Delivery'
                    },
                    {
                      status: 'Delivered',
                      label: selectedOrder.shippingAddress.deliveryType === 'store_pickup' ? 'Collected by Customer' : 'Delivered & Handed Over',
                      time: selectedOrder.orderStatus === 'Delivered' ? '04:30 PM' : 'Pending',
                      description: 'Package handed over and unboxed with customer acknowledgment.',
                      completed: selectedOrder.orderStatus === 'Delivered',
                      current: selectedOrder.orderStatus === 'Delivered'
                    }
                  ]).map((step, idx) => {
                    const isDone = step.completed;
                    const isCurrent = step.current;

                    return (
                      <div key={idx} className="relative group">
                        <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                          isDone
                            ? 'bg-emerald-700 border-emerald-800 text-white'
                            : isCurrent
                            ? 'bg-amber-500 border-amber-600 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.label}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details & Items Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Destination */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                    <span>Destination & Recipient</span>
                  </div>
                  <div className="space-y-1 text-slate-700 pl-5">
                    <div className="font-bold text-slate-900 text-sm">
                      {selectedOrder.shippingAddress.fullName}
                    </div>
                    <div className="text-slate-600">
                      Phone: <span className="font-semibold text-slate-900">{selectedOrder.shippingAddress.phone}</span>
                    </div>
                    <div className="text-slate-600">
                      {selectedOrder.shippingAddress.deliveryType === 'store_pickup' ? (
                        <div className="text-emerald-900 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                          Pickup in person at: Ujwal Telecom & Electronics, Street No 1, Maha Luxmi Nagar, Lohara, Ludhiana (141016)
                        </div>
                      ) : (
                        <span>
                          {selectedOrder.shippingAddress.streetAddress}
                          {selectedOrder.shippingAddress.areaLocality && `, ${selectedOrder.shippingAddress.areaLocality}`},<br />
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-emerald-800" />
                      <span>Items ({selectedOrder.items.length})</span>
                    </div>
                    <span className="text-emerald-950 font-bold tabular-nums">
                      Total: ₹{selectedOrder.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                        <div className="truncate pr-2">
                          <span className="font-bold text-slate-900">{item.quantity}x </span>
                          <span className="text-slate-700">{item.product.name}</span>
                        </div>
                        <span className="font-semibold text-slate-900 shrink-0 tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admin Live Status Dispatch Control */}
              {isAdmin && (
                <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-emerald-800" />
                      <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wider">
                        Admin Dispatch Power: Update Order Status
                      </h4>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-semibold">
                      Live Store Owner Override
                    </span>
                  </div>

                  <form onSubmit={handleAdminUpdate} className="flex flex-wrap items-center gap-2.5">
                    <select
                      value={adminSelectedStatus}
                      onChange={(e) => setAdminSelectedStatus(e.target.value as OrderStatus)}
                      className="text-xs p-2 rounded-lg bg-white border border-emerald-300 font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Optional milestone note (e.g. Handed to rider Rohit)"
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="flex-1 text-xs p-2 rounded-lg bg-white border border-emerald-300 focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Update Live Status
                    </button>
                  </form>
                </div>
              )}

              {/* Store Helpdesk Links */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Need help or bill?</span>
                  <button
                    onClick={() => openInvoice(selectedOrder)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Print Tax Invoice</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-semibold text-slate-800 flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                      `Hello Ujwal Telecom, I am checking status of my order #${selectedOrder.id} for delivery in Ludhiana.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Store</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">
                {orders.length === 0 ? 'No Orders in Store Database Yet' : 'No Matching Order Found'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {orders.length === 0
                  ? 'When customers place an order through checkout with their real details, their unique tracking code and live milestones will be displayed here.'
                  : 'Please check your Order ID or tracking number from your order receipt. You can also view all your orders in your Account page.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
