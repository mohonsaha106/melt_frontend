import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  return (
    <section id="product-catalog" className="py-10 sm:py-16 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Badge, Title and Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>HANDCRAFTED ATELIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 font-serif">
              Shop All Designs
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-xl">
              Discover our complete collection of handcrafted resin keepsakes, bridal preservation, and personalized memory art pieces.
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold text-zinc-800 hover:text-black bg-[#DFD8C7] hover:bg-[#D3CBBA] px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-[#D3CBBA] transition-colors"
          >
            <span>Explore Atelier</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Product Cards Grid: Mobile-first 2 columns, tablet 3, desktop 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See More Button leading to /shop */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            to="/shop"
            className="px-8 sm:px-10 py-3 sm:py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-2.5 transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 group focus:outline-none"
            aria-label="See all designs in shop"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
