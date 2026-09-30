import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/storeData';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#FBFBFA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Store Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            What Our Customers Say
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Authentic experiences shared by our valued customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {review.customerName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {review.city} · {review.date}
                  </p>
                  {review.productMentioned && (
                    <p className="text-[10px] text-emerald-700 font-medium mt-0.5 truncate max-w-[170px]">
                      Purchased: {review.productMentioned}
                    </p>
                  )}
                </div>

                {review.verified && (
                  <div
                    title="Verified Buyer"
                    className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback note for store management */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Have you recently shopped with us? We welcome your review on our WhatsApp or in-store visitor desk.
        </div>

      </div>
    </section>
  );
};
