import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeData';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'support'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                My Store Account
              </h2>
              <p className="text-[11px] text-slate-500">Ujwal Telecom & Electronics</p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 pt-2 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Details</span>
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
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
              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No Orders Placed Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When you purchase smartphones, accessories or audio devices, your receipts and tracking status will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            #{order.id}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-2">{order.date}</span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {order.orderStatus}
                        </span>
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

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Total Paid ({order.paymentMethod})</span>
                        <span className="text-emerald-950 tabular-nums">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Customer Profile</h4>
                <p className="text-slate-600">
                  Your orders and preferences are stored securely in your local browser session.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>GST compliant retail customer registration</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep delivery enabled for verified local addresses</span>
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

      </div>
    </div>
  );
};
