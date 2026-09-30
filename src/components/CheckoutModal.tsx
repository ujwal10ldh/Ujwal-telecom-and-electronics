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
  ShoppingBag,
  Copy,
  Check,
  Building2,
  Lock,
  ExternalLink,
  Clock,
  Sparkles,
  FileText
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
    currentUser,
    showToast,
    openOrderTracking,
    openInvoice
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'home_delivery' | 'store_pickup'>('home_delivery');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI / QR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Payment method specific state
  const [upiApp, setUpiApp] = useState<'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM'>('Google Pay');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');

  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  const storeUpiId = '9803679285@okaxis';

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    streetAddress: currentUser?.streetAddress || '',
    areaLocality: currentUser?.areaLocality || '',
    city: currentUser?.city || 'Ludhiana',
    state: currentUser?.state || 'Punjab',
    pincode: currentUser?.pincode || '141016',
    deliveryType: 'home_delivery'
  });

  // Sync if user logs in while checkout is opened
  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        phone: prev.phone || currentUser.phone || '',
        email: prev.email || currentUser.email,
        streetAddress: prev.streetAddress || currentUser.streetAddress || '',
        areaLocality: prev.areaLocality || currentUser.areaLocality || '',
        city: currentUser.city || prev.city,
        state: currentUser.state || prev.state,
        pincode: currentUser.pincode || prev.pincode
      }));
      if (!cardHolder) setCardHolder(currentUser.name);
    }
  }, [currentUser]);

  if (!isCheckoutOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeUpiId);
    setCopiedUpi(true);
    showToast('Store UPI ID copied: ' + storeUpiId);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      showToast('Please provide your full name and phone number', 'error');
      return;
    }
    if (deliveryType === 'home_delivery' && (!formData.streetAddress || !formData.pincode)) {
      showToast('Please provide delivery street address and PIN code', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const paymentDetails = {
        upiApp: paymentMethod === 'UPI / QR' ? upiApp : undefined,
        upiTransactionId: paymentMethod === 'UPI / QR' ? upiTxnId.trim() : undefined,
        cardLast4: paymentMethod === 'Credit / Debit Card' ? cardNumber.slice(-4) || '4242' : undefined,
        bankName: paymentMethod === 'Net Banking' ? selectedBank : undefined
      };

      const order = await placeOrder(
        { ...formData, deliveryType },
        paymentMethod,
        paymentDetails
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
      `Hello Ujwal Telecom & Electronics,\nI have placed Order #${order.id} on your store website.\nTracking No: ${order.trackingNumber || 'Pending'}\nTotal Amount: ₹${order.total.toLocaleString('en-IN')}\nPayment: ${order.paymentMethod}\nCustomer: ${order.shippingAddress.fullName} (${order.shippingAddress.phone})\nPlease confirm dispatch!`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleOpenTrackingFromReceipt = () => {
    if (completedOrder) {
      const idToTrack = completedOrder.id;
      handleClose();
      openOrderTracking(idToTrack);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                {completedOrder ? 'Order Confirmed & Placed' : 'Checkout & Payment'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Ujwal Telecom & Electronics · Ludhiana, Punjab
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Order Confirmed! Thank You, {completedOrder.shippingAddress.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your order <span className="font-mono font-bold text-slate-900">#{completedOrder.id}</span> has been confirmed. Tracking code generated below.
              </p>
            </div>

            {/* Tracking Banner */}
            <div className="p-4 rounded-xl bg-linear-to-r from-emerald-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                    Official Tracking Number
                  </div>
                  <div className="font-mono font-bold text-base sm:text-lg">
                    {completedOrder.trackingNumber || 'UJWAL-LOCAL-01'}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Est. Delivery: {completedOrder.estimatedDelivery || 'Today by 7:30 PM in Ludhiana'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenTrackingFromReceipt}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
              >
                <span>Track Live Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">#{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-medium text-slate-800">{completedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Method:</span>
                <span className="font-medium text-slate-800">
                  {completedOrder.shippingAddress.deliveryType === 'store_pickup'
                    ? 'In-Store Pickup (Street No 1, Maha Luxmi Nagar, Lohara)'
                    : `Home Delivery (${completedOrder.shippingAddress.city}, Punjab - ${completedOrder.shippingAddress.pincode})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-900">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-emerald-950 tabular-nums">
                  ₹{completedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Purchased Items */}
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
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => openInvoice(completedOrder)}
                className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Download / Print Official Tax Invoice (GST Bill)</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => shareOrderWhatsApp(completedOrder)}
                  className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Receipt to Store WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              Need assistance? Call store directly at{' '}
              <a href={`tel:${STORE_INFO.phone}`} className="font-bold text-emerald-800 hover:underline">
                {STORE_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6">
            
            {/* 1. Fulfillment Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Select Fulfillment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('home_delivery')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    deliveryType === 'home_delivery'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Doorstep Delivery</div>
                    <div className="text-[11px] text-slate-500">Fast local delivery in Ludhiana</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('store_pickup')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    deliveryType === 'store_pickup'
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Store className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Store Pickup</div>
                    <div className="text-[11px] text-slate-500">Collect in 2 hours at Lohara</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Customer Contact & Address */}
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
                    placeholder="Enter your real full name"
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
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address (For Tax Invoice & Delivery Updates)
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {deliveryType === 'home_delivery' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Street Address / House No. *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat No., Street, Building"
                        value={formData.streetAddress}
                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Area / Locality
                      </label>
                      <input
                        type="text"
                        placeholder="Colony, Landmark, or Area"
                        value={formData.areaLocality}
                        onChange={(e) => setFormData({ ...formData, areaLocality: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
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
                        placeholder="141016"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-emerald-800" />
                    <span>In-Store Collection Counter:</span>
                  </div>
                  <p>{STORE_INFO.name}, {STORE_INFO.address}, {STORE_INFO.cityStatePincode}</p>
                  <p className="text-emerald-800 font-medium">Store Hours: {STORE_INFO.businessHours}</p>
                </div>
              )}
            </div>

            {/* 3. Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Choose Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'UPI / QR', label: 'UPI / QR Code', icon: QrCode, badge: 'Instant' },
                  { id: 'Credit / Debit Card', label: 'Cards', icon: CreditCard, badge: 'Visa/RuPay' },
                  { id: 'Net Banking', label: 'Net Banking', icon: Building2, badge: 'All Banks' },
                  { id: 'Cash on Delivery', label: 'Pay on Delivery', icon: Banknote, badge: 'Inspection' }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as Order['paymentMethod'])}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-700 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-emerald-800" />
                      <span className="text-[11px] leading-tight font-bold">{m.label}</span>
                      <span className="text-[9px] text-slate-400 font-medium">{m.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Method Sub-Panel */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
                {paymentMethod === 'UPI / QR' && (
                  <div className="space-y-3.5">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Interactive Visual QR code graphic */}
                      <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col items-center shrink-0">
                        <div className="w-28 h-28 bg-slate-900 p-2 rounded-lg flex items-center justify-center relative">
                          {/* Stylized QR Matrix Pattern */}
                          <div className="w-full h-full bg-white p-1 rounded grid grid-cols-6 grid-rows-6 gap-0.5">
                            <div className="bg-slate-950 rounded-xs col-span-2 row-span-2" />
                            <div className="bg-slate-950 rounded-xs col-span-2 col-start-5 row-span-2" />
                            <div className="bg-slate-950 rounded-xs col-span-2 row-span-2 row-start-5" />
                            <div className="bg-emerald-600 rounded-full col-start-3 row-start-3 col-span-2 row-span-2 flex items-center justify-center text-[7px] font-bold text-white">
                              UPI
                            </div>
                            <div className="bg-slate-900 rounded-xs col-start-5 row-start-4" />
                            <div className="bg-slate-900 rounded-xs col-start-2 row-start-4" />
                            <div className="bg-slate-900 rounded-xs col-start-4 row-start-6" />
                            <div className="bg-slate-900 rounded-xs col-start-6 row-start-5" />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 mt-1.5">
                          Scan to Pay ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="space-y-2 flex-1 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[11px]">Official Store UPI ID:</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <code className="font-mono font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-xs">
                              {storeUpiId}
                            </code>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              {copiedUpi ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500 block text-[11px] mb-1">Select UPI App:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {(['Google Pay', 'PhonePe', 'Paytm', 'BHIM'] as const).map((app) => (
                              <button
                                key={app}
                                type="button"
                                onClick={() => setUpiApp(app)}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                  upiApp === app
                                    ? 'bg-emerald-900 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                            UPI Ref / UTR Number (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 429183921800 (12 digits)"
                            value={upiTxnId}
                            onChange={(e) => setUpiTxnId(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Credit / Debit Card' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                      <span className="font-semibold text-slate-700">Card Payment (All Indian & International Cards)</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                        <span>VISA</span> · <span>Mastercard</span> · <span>RuPay</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        16-Digit Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="4532 8219 9081 2345"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:outline-none focus:border-emerald-600"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className="w-full p-2 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                          className="w-full p-2 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name as printed on card"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
                      <Lock className="w-3 h-3 text-emerald-700" />
                      <span>End-to-end 256-bit SSL encrypted merchant payment processing.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Net Banking' && (
                  <div className="space-y-3 text-xs">
                    <span className="font-semibold text-slate-700 block">
                      Choose Your Bank for Direct Account Transfer:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'State Bank of India',
                        'HDFC Bank',
                        'ICICI Bank',
                        'Punjab National Bank',
                        'Axis Bank',
                        'Bank of Baroda'
                      ].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer ${
                            selectedBank === bank
                              ? 'bg-emerald-900 text-white border-emerald-900'
                              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Instant confirmation for {selectedBank}.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Inspect Before Payment Guarantee</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Pay cash or scan QR code when your electronics package arrives at your doorstep in Ludhiana or when collecting from our Lohara store. Zero advance deposit required.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500">Order Payable Total:</span>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400">Includes all GST & local delivery charges</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Order & Tracking...</span>
                ) : (
                  <>
                    <span>Confirm & Generate Order</span>
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
