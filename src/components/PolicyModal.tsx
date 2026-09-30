import React from 'react';
import { X, ShieldCheck, HelpCircle, Truck, RotateCcw, FileText, Lock } from 'lucide-react';
import { useShop, PolicyType } from '../context/ShopContext';
import { FAQS, STORE_INFO } from '../data/storeData';

export const PolicyModal: React.FC = () => {
  const { policyModal, closePolicyModal } = useShop();

  if (!policyModal.isOpen) return null;

  const renderContent = () => {
    switch (policyModal.type) {
      case 'faqs':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>Frequently Asked Questions</span>
            </div>
            <div className="space-y-4 divide-y divide-slate-100">
              {FAQS.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    {item.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <span>Shipping & Delivery Policy</span>
            </div>
            <p>
              At <strong>Ujwal Telecom & Electronics</strong>, we prioritize fast, safe delivery of all electronic devices and telecom accessories.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
              <h5 className="font-bold text-slate-900">1. Local City Delivery</h5>
              <p>
                Orders placed before 2:00 PM for local addresses within city limits are eligible for Same-Day or Next-Day Express Delivery.
              </p>
              <h5 className="font-bold text-slate-900">2. Free Shipping Threshold</h5>
              <p>
                All orders with subtotal above ₹1,500 qualify for 100% Free Doorstep Delivery. Standard shipping for smaller accessories is ₹99.
              </p>
              <h5 className="font-bold text-slate-900">3. In-Store Pickup</h5>
              <p>
                Orders marked for store pickup are kept ready for collection within 2 hours at our store: {STORE_INFO.address}.
              </p>
            </div>
          </div>
        );

      case 'return':
        return (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <RotateCcw className="w-5 h-5 text-emerald-600" />
              <span>7-Day Store Replacement Policy</span>
            </div>
            <p>
              We stand behind every gadget sold. If your purchased product has a manufacturing defect or arrived damaged:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Notify our store counter within 7 days of delivery or in-store purchase.</li>
              <li>Retain original box, accessories, warranty card, and store GST invoice.</li>
              <li>Physical damage, water damage, or electrical shorting due to unauthorized chargers is not covered under store replacement.</li>
              <li>Replacement unit will be issued promptly after in-store verification.</li>
            </ul>
          </div>
        );

      case 'warranty':
        return (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Brand Warranty Information</span>
            </div>
            <p>
              Every electronic item, smartphone, and sound equipment sold by <strong>Ujwal Telecom & Electronics</strong> is 100% genuine and covered by official manufacturer warranty.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
              <p>
                <strong>Smartphones:</strong> 1 Year brand manufacturer warranty + 6 months on in-box charger and battery.
              </p>
              <p>
                <strong>Audio Gear & Earbuds:</strong> 1 Year replacement or repair warranty at authorized service centers across India.
              </p>
              <p>
                <strong>Power Banks & Adapters:</strong> 1 to 1.5 Years manufacturer warranty.
              </p>
              <p>
                Our store staff will gladly assist you with warranty paperwork, service center addresses, and token bookings.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>Privacy Policy</span>
            </div>
            <p>
              Ujwal Telecom & Electronics values your trust. We collect only necessary details (name, phone number, delivery address) strictly to process your orders, provide GST invoices, and coordinate delivery.
            </p>
            <p>
              We do not sell, rent, or trade your personal information with third-party advertising brokers. Your local store browsing preferences remain on your device.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Terms & Conditions</span>
            </div>
            <p>
              By accessing the Ujwal Telecom & Electronics website or purchasing in-store, you agree to these commercial terms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>All prices are in Indian Rupees (₹) inclusive of applicable GST taxes.</li>
              <li>Stock availability is subject to physical inventory updates at our store counter.</li>
              <li>Demo specifications are accurate representations of certified brand models.</li>
              <li>Orders placed for Cash on Delivery are verified via phone/WhatsApp prior to courier dispatch.</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-7">
        <button
          onClick={closePolicyModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {renderContent()}
      </div>
    </div>
  );
};
