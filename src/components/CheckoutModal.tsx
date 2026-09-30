import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Store, 
  QrCode, 
  CreditCard, 
  Banknote, 
  PhoneCall, 
  MessageCircle,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, ShippingAddress } from '../types';
import { STORE_INFO } from '../data/storeData';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryCharge,
    discountAmount,
    total,
    placeOrder,
    lastPlacedOrder,
    showToast
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'home_delivery' | 'store_pickup'>('home_delivery');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI / QR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    areaLocality: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    deliveryType: 'home_delivery'
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      showToast('Please provide your full name and phone number', 'error');
      return;
    }
    if (deliveryType === 'home_delivery' && (!formData.streetAddress || !formData.pincode)) {
      showToast('Please provide delivery address and PIN code', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await placeOrder(
        { ...formData, deliveryType },
        paymentMethod
      );
      setCompletedOrder(order);
    } catch (err) {
      showToast('Error placing order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  const shareOrderWhatsApp = (order: Order) => {
    const text = encodeURIComponent(
      `Hello Ujwal Telecom & Electronics,\nI have placed Order #${order.id} on your store website.\nTotal Amount: ₹${order.total.toLocaleString('en-IN')}\nPayment: ${order.paymentMethod}\nCustomer: ${order.shippingAddress.fullName} (${order.shippingAddress.phone})\nPlease confirm dispatch!`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                {completedOrder ? 'Order Confirmed' : 'Checkout & Delivery'}
              </h2>
              <p className="text-[11px] text-slate-500">Ujwal Telecom & Electronics</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Placed Success Receipt */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Thank You, {completedOrder.shippingAddress.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your order <span className="font-mono font-bold text-slate-900">#{completedOrder.id}</span> has been received and registered at our store counter.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-medium text-slate-800">{completedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Method:</span>
                <span className="font-medium text-slate-800">
                  {completedOrder.shippingAddress.deliveryType === 'store_pickup'
                    ? 'In-Store Pickup (Ujwal Telecom)'
                    : `Home Delivery (${completedOrder.shippingAddress.city} - ${completedOrder.shippingAddress.pincode})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Option:</span>
                <span className="font-medium text-slate-800">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-emerald-950 tabular-nums">
                  ₹{completedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Items summary */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Purchased Items ({completedOrder.items.length})
              </h4>
              <div className="space-y-2">
                {completedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-slate-200"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-slate-900">{item.quantity}x</span>
                      <span className="text-slate-700 truncate">{item.product.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0 tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => shareOrderWhatsApp(completedOrder)}
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order to Store on WhatsApp</span>
              </button>

              <button
                onClick={handleClose}
                className="py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              Need assistance? Call us directly at <a href={`tel:${STORE_INFO.phone}`} className="font-bold text-emerald-800 hover:underline">{STORE_INFO.phoneDisplay}</a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Delivery Type Option */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Select Fulfillment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('home_delivery')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    deliveryType === 'home_delivery'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Doorstep Delivery</div>
                    <div className="text-[11px] text-slate-500">Shipped safely to your address</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('store_pickup')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    deliveryType === 'store_pickup'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Store className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Store Pickup</div>
                    <div className="text-[11px] text-slate-500">Collect in 2 hours at shop</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Details & Address */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Contact & Address Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Email Address (Optional for bill copy)
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {deliveryType === 'home_delivery' && (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Street Address / Flat / Building *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Green Avenue, MG Road"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 411001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </>
              )}

              {deliveryType === 'store_pickup' && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-900">Pickup Location:</div>
                  <p>{STORE_INFO.name}, {STORE_INFO.address}, {STORE_INFO.cityStatePincode}</p>
                  <p className="text-emerald-800 font-medium">Timings: {STORE_INFO.businessHours}</p>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Choose Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'UPI / QR', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'Credit / Debit Card', label: 'Cards', icon: CreditCard },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                  { id: 'Net Banking', label: 'Net Banking', icon: ShieldCheck }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as Order['paymentMethod'])}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-emerald-800" />
                      <span className="text-[11px] leading-tight">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500">Grand Total:</span>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400">Includes all GST & delivery charges</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
