/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { SpecialOfferSection } from './components/SpecialOfferSection';
import { NewArrivals } from './components/NewArrivals';
import { BestSellers } from './components/BestSellers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AdminProductManager } from './components/AdminProductManager';
import { PolicyModal } from './components/PolicyModal';
import { AuthModal } from './components/AuthModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { InvoiceModal } from './components/InvoiceModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, activeProductDetails, toast, invoiceOrder, closeInvoice } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 selection:bg-emerald-800 selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'product' && activeProductDetails ? (
          <ProductDetailView product={activeProductDetails} />
        ) : currentView === 'catalog' ? (
          <CatalogView />
        ) : currentView === 'contact' ? (
          <div className="pt-4">
            <ContactSection />
            <WhyChooseUs />
          </div>
        ) : (
          /* Default Homepage with all required sections */
          <>
            <Hero />
            <CategorySection />
            <FeaturedProducts />
            <SpecialOfferSection />
            <NewArrivals />
            <BestSellers />
            <WhyChooseUs />
            <CustomerReviews />
            <ContactSection />
            <Newsletter />
          </>
        )}
      </main>

      {/* Multi-column Footer */}
      <Footer />

      {/* Drawers and Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <AccountModal />
      <AuthModal />
      <QuickViewModal />
      <AdminProductManager />
      <PolicyModal />
      <OrderTrackingModal />
      <InvoiceModal order={invoiceOrder} isOpen={!!invoiceOrder} onClose={closeInvoice} />

      {/* Toast Notification Popup */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-4 duration-200">
          <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold ${
            toast.type === 'error'
              ? 'bg-rose-950 text-rose-100 border-rose-800'
              : toast.type === 'info'
              ? 'bg-slate-900 text-slate-100 border-slate-800'
              : 'bg-emerald-950 text-emerald-100 border-emerald-800'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-slate-300 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
