import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Tag, ArrowRight } from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { products, websiteSettings } = useStore();
  const catalog = products && products.length > 0 ? products : PRODUCTS;

  // Filter products that have promotional pricing (originalPrice > price)
  const offerProducts = catalog.filter(
    (product) => product.originalPrice && product.originalPrice > product.price
  );

  const [initialCount, setInitialCount] = useState(4); // Default 4 for mobile (2 rows of 2)

  // Calculate 2 full rows based on viewport width for responsive mobile-first display
  useEffect(() => {
    const calculateTwoRowsCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // Desktop: 4 cols x 2 rows = 8 products
        setInitialCount(8);
      } else if (width >= 768) {
        // Tablet: 3 cols x 2 rows = 6 products
        setInitialCount(6);
      } else {
        // Mobile: 2 cols x 2 rows = 4 products
        setInitialCount(4);
      }
    };

    calculateTwoRowsCount();
    window.addEventListener('resize', calculateTwoRowsCount);
    return () => window.removeEventListener('resize', calculateTwoRowsCount);
  }, []);

  const displayedProducts = offerProducts.slice(0, initialCount);

  if (offerProducts.length === 0) return null;

  return (
    <section
      id="special-offers"
      className="py-10 sm:py-16 bg-[#E8E2D3] border-b border-[#D3CBBA]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 flex flex-col items-center">
          {websiteSettings?.offers?.badge && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-600/20 text-rose-700 text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>{websiteSettings.offers.badge}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 font-serif">
            {websiteSettings?.offers?.title || 'Products on Offer'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto">
            {websiteSettings?.offers?.subtitle || 'Enjoy exclusive savings on our bestselling handcrafted resin keepsakes and memory art pieces.'}
          </p>
        </div>

        {/* Product Cards Grid: Mobile-first 2 columns, tablet 3, desktop 4 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscountBadge={true}
            />
          ))}
        </div>

        {/* See More Offers Button linked to /sepcial-offer page */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <Link
            to="/sepcial-offer"
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-2.5 transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 group focus:outline-none"
            aria-label="See all special offer products"
          >
            <span>See More Offers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
