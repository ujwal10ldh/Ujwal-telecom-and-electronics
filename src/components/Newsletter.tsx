import React, { useState } from 'react';
import { Mail, CheckCircle2, BellRing } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Ujwal Telecom & Electronics updates!');
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-900/40 relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <BellRing className="w-4 h-4" />
              <span>Newsletter & VIP Announcements</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Stay Updated
            </h2>

            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Get updates about new products, special offers and electronics deals directly from Ujwal Telecom & Electronics.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-900/60 border border-emerald-700/80 flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing! You will receive our next deals bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs text-white placeholder:text-slate-400 pl-9 pr-3 py-3 rounded-lg bg-slate-800/90 border border-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400 mt-3">
              We respect your privacy. No spam, only genuine stock alerts and festive discounts.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
