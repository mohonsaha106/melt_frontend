import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpecialOffersPage } from './pages/SpecialOffersPage';
import { ShopPage } from './pages/ShopPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CartDrawer } from './components/CartDrawer';
import { FreeDesignModal } from './components/FreeDesignModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CustomTattooStudio } from './components/CustomTattooStudio';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { HowToApplyModal } from './components/HowToApplyModal';
import { SearchModal } from './components/SearchModal';
import { FloatingBottomCartBar } from './components/FloatingBottomCartBar';

// Helper to scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E8E2D3] flex flex-col selection:bg-black selection:text-[#E8E2D3] text-[#111111]">
      <ScrollToTop />

      {/* Top Ticker Bar */}
      <AnnouncementBar />

      {/* Sticky Floating Header */}
      <Header />

      {/* Main Content Pages with Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/catalog" element={<ShopPage />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/review" element={<ReviewsPage />} />
          <Route path="/gallery" element={<ReviewsPage />} />
          <Route path="/lookbook" element={<ReviewsPage />} />
          {/* Support both the exact user route (/sepcial-offer) and common aliases */}
          <Route path="/sepcial-offer" element={<SpecialOffersPage />} />
          <Route path="/special-offer" element={<SpecialOffersPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/offers" element={<SpecialOffersPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Dynamic Slide-Overs, Modals & Floating Triggers */}
      <CartDrawer />
      <FreeDesignModal />
      <QuickViewModal />
      <WishlistDrawer />
      <CustomTattooStudio />
      <CheckoutModal />
      <TrackOrderModal />
      <HowToApplyModal />
      <SearchModal />
      <FloatingBottomCartBar />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </BrowserRouter>
  );
}
