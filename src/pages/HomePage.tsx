import React from 'react';
import { HeroV4 } from '../components/Hero-v4';
import { OffersSection } from '../components/OffersSection';
import { PlacementSelector } from '../components/PlacementSelector';
import { HighlightBanner } from '../components/HighlightBanner';
import { ProductGrid } from '../components/ProductGrid';
import { CustomUniverseSection } from '../components/CustomUniverseSection';
import { TrustBadges } from '../components/TrustBadges';
import { HowToOrderSection } from '../components/HowToOrderSection';
import { HowToApplySection } from '../components/HowToApplySection';
import { ReviewSection } from '../components/ReviewSection';
import { FAQSection } from '../components/FAQSection';
import { AboutSection } from '../components/AboutSection';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Editorial Hero Banner */}
      <HeroV4 />

      {/* Promotional Offers Section (2 Rows + See More button linking to /sepcial-offer) */}
      <OffersSection />

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
    </>
  );
};
