import React from 'react';
import { OffersSection } from '../components/OffersSection';
import { PlacementSelector } from '../components/PlacementSelector';
import { HighlightBanner } from '../components/HighlightBanner';
import { ProductGrid } from '../components/ProductGrid';
import { CustomUniverseSection } from '../components/CustomUniverseSection';
import { ReviewSection } from '../components/ReviewSection';
import { Hero } from '@/components/Hero';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Editorial Hero Banner */}
      <Hero/>

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
      {/* <TrustBadges /> */}

      {/* 5-Step Artisanal Resin Crafting Process */}
      {/* <HowToApplySection /> */}

      {/* Community Lookbook & Reviews */}
      <ReviewSection />
    </>
  );
};
