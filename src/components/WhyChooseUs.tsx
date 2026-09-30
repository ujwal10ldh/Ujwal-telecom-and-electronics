import React from 'react';
import { 
  ShieldCheck, 
  BadgePercent, 
  Headphones, 
  Wrench, 
  Lock, 
  Truck 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Genuine & Quality Products',
      description: 'Direct procurement from certified brand authorized distributors with 100% authentic seal and GST tax invoice.',
      icon: ShieldCheck
    },
    {
      title: 'Competitive Pricing',
      description: 'Fair, transparent marketplace pricing with regular festive discounts, bundle offers, and verified price value.',
      icon: BadgePercent
    },
    {
      title: 'Helpful Customer Service',
      description: 'Knowledgeable in-store specialists who explain specs honestly and help you choose what truly fits your needs.',
      icon: Headphones
    },
    {
      title: 'Reliable After-Sales Support',
      description: 'Full assistance with manufacturer warranty claims, quick local troubleshooting, and device setup assistance.',
      icon: Wrench
    },
    {
      title: 'Secure Payments',
      description: 'Multiple trusted payment channels including instant UPI QR, RuPay/Visa cards, Net Banking, and Cash on Delivery.',
      icon: Lock
    },
    {
      title: 'Fast Local Service',
      description: 'Immediate in-store collection or same-day local doorstep delivery with careful packaging for all electronics.',
      icon: Truck
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            The Ujwal Commitment
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Choose Ujwal Telecom & Electronics?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            We are dedicated to providing a reliable, trustworthy and transparent shopping experience for every customer.
          </p>
        </div>

        {/* 6 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200/80 bg-[#FAFAFA] hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                  <span>✓ Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
