import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OffersSection: React.FC = () => {
  const { t, tNumber } = useLanguage();
  // Filter products that have promotional pricing (originalPrice > price)
  const offerProducts = PRODUCTS.filter(
    (product) => product.originalPrice && product.originalPrice > product.price
  );

  const [initialCount, setInitialCount] = useState(4); // Default 4 for mobile (2 rows of 2)

  // Calculate 2 full rows based on viewport width for responsive mobile-first display
  useEffect(() => {
    const calculateTwoRowsCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setInitialCount(8);
      } else if (width >= 768) {
        setInitialCount(6);
      } else {
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-600/20 text-rose-700 text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.offers.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 font-serif">
              {t.offers.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-xl">
              {t.offers.subtitle}
            </p>
          </div>

          <Link
            to="/sepcial-offer"
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold text-zinc-800 hover:text-black bg-[#DFD8C7] hover:bg-[#D3CBBA] px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.offers.viewAllOffers} ({tNumber(offerProducts.length)})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
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
            <span>{t.offers.seeMoreOffers}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
