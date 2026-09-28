import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlacementSelector } from './components/PlacementSelector';
import { HighlightBanner } from './components/HighlightBanner';
import { ProductGrid } from './components/ProductGrid';
import { CustomUniverseSection } from './components/CustomUniverseSection';
import { TrustBadges } from './components/TrustBadges';
import { HowToOrderSection } from './components/HowToOrderSection';
import { HowToApplySection } from './components/HowToApplySection';
import { ReviewSection } from './components/ReviewSection';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FreeDesignModal } from './components/FreeDesignModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CustomTattooStudio } from './components/CustomTattooStudio';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { HowToApplyModal } from './components/HowToApplyModal';
import { FloatingBottomCartBar } from './components/FloatingBottomCartBar';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E8E2D3] flex flex-col selection:bg-black selection:text-[#E8E2D3] text-[#111111]">
      {/* Top Ticker Bar */}
      <AnnouncementBar />

      {/* Sticky Floating Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Editorial Hero Banner */}
        <Hero />

        {/* Circular Placement / Category Carousel */}
        <PlacementSelector />

        {/* High-contrast Highlight Strip */}
        <HighlightBanner />

        {/* Main Product Catalog & Filter Pills */}
        <ProductGrid />

        {/* Two Ways To Order Keepsakes Section */}
        <CustomUniverseSection />

        {/* Quality & Trust Badges */}
        <TrustBadges />

        {/* How To Order Nationwide via COD */}
        <HowToOrderSection />

        {/* 5-Step Artisanal Resin Crafting Process */}
        <HowToApplySection />

        {/* Community Lookbook & Reviews */}
        <ReviewSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Brand Story & Metrics */}
        <AboutSection />
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
      <FloatingBottomCartBar />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
