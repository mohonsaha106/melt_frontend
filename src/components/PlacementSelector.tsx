import React from 'react';
import { useStore } from '../context/StoreContext';
import { PLACEMENTS } from '../data/categories';
import { CategoryItem } from '../types/admin';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const PlacementSelector: React.FC = () => {
  const { categories, websiteSettings } = useStore();

  const activeCategories: CategoryItem[] = (categories && categories.length > 0)
    ? categories
    : (PLACEMENTS as unknown as CategoryItem[]);

  // 5 categories for small devices (plus 1 "View All" button = 6 items total)
  const firstCategories = activeCategories.slice(0, 5);
  // Next 4 categories for md and large devices (total 5 + 4 + 1 "View All" = 10 items total)
  const additionalCategories = activeCategories.slice(5, 9);

  const renderCategoryCard = (item: CategoryItem, idx: number, extraClass = '') => (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: idx * 0.035 }}
      className={extraClass}
    >
      <Link
        to={`/shop?category=${item.categorySlug}`}
        className="group flex flex-col items-center text-center focus:outline-none"
        aria-label={`Shop ${item.name}`}
      >
        {/* Visual Halo Lens Container */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1.5 transition-all duration-500 bg-[#DFD8C7] ring-2 ring-[#D3CBBA] ring-offset-4 ring-offset-[#E8E2D3] group-hover:ring-zinc-900 group-hover:scale-105 group-hover:shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-zinc-900">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80';
              }}
            />

            {/* Subtle Radial Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 group-hover:from-black/55 transition-colors duration-300" />

            {/* Hover Explore Indicator Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[1px]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Top Floating Badge */}
          {item.badge && (
            <span className="absolute -top-1 right-1 sm:right-2 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-zinc-900 text-amber-200 shadow-sm border border-[#DFD8C7] pointer-events-none">
              {item.badge}
            </span>
          )}
        </div>

        {/* Category Details Underneath */}
        <div className="mt-3.5 flex flex-col items-center max-w-[150px] sm:max-w-[170px]">
          <h3 className="font-serif text-sm sm:text-base font-bold text-zinc-900 group-hover:text-amber-900 transition-colors tracking-tight leading-snug">
            {item.name}
          </h3>
          
          <p className="text-[11px] sm:text-xs text-zinc-600 line-clamp-1 mt-0.5">
            {item.subtitle}
          </p>

          <div className="mt-1.5 inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-mono font-medium text-amber-800/90 group-hover:text-amber-950">
            <span>{item.priceText || `${item.count}+ Designs`}</span>
            <ArrowRight className="w-3 h-3 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const renderViewAllCard = (extraClass = '', delay = 0.2) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay }}
      className={extraClass}
    >
      <Link
        to="/shop"
        className="group flex flex-col items-center text-center focus:outline-none"
        aria-label="View all keepsake categories"
      >
        {/* Visual Halo Lens Container */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1.5 transition-all duration-500 bg-[#DFD8C7] ring-2 ring-[#D3CBBA] ring-offset-4 ring-offset-[#E8E2D3] group-hover:ring-zinc-900 group-hover:scale-105 group-hover:shadow-2xl">
          {/* Artisan Clear Glass Circle with Subtle Gold Leaf Shimmer */}
          <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner flex flex-col items-center justify-center p-3 bg-gradient-to-br from-white/85 via-[#F5EFE4]/65 to-[#DFD8C7]/65 backdrop-blur-xl border border-white/90 shadow-[inset_0_2px_8px_rgba(255,255,255,0.95),inset_0_-3px_8px_rgba(212,175,55,0.18),0_10px_25px_rgba(0,0,0,0.06)] group-hover:from-white/95 group-hover:to-amber-50/75 transition-all duration-500">
            {/* Delicate Gold Leaf Flecks & Sparkle Glow Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(212,175,55,0.22),transparent_60%)] pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-14 h-14 bg-white/70 rounded-full blur-md pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-amber-200/20 pointer-events-none" />

            {/* Centered Artisan Typography & Interactive Indicator */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-1">
              <Sparkles className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-700/85 mb-0.5 sm:mb-1 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12" />
              
              <span className="font-serif text-sm sm:text-base md:text-lg font-bold text-zinc-900 group-hover:text-amber-950 transition-colors tracking-tight leading-tight">
                View All
              </span>

              <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-amber-800/90 uppercase mt-0.5">
                50+ Designs
              </span>

              {/* Minimalist Circular Explore Arrow */}
              <div className="mt-1.5 sm:mt-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-zinc-900/10 border border-zinc-900/15 text-zinc-900 flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-[#E8E2D3] group-hover:scale-110 shadow-2xs">
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Details Underneath */}
        <div className="mt-3.5 flex flex-col items-center max-w-[150px] sm:max-w-[170px]">
          <h3 className="font-serif text-sm sm:text-base font-bold text-zinc-900 group-hover:text-amber-900 transition-colors tracking-tight leading-snug">
            Complete Atelier
          </h3>
          
          <p className="text-[11px] sm:text-xs text-zinc-600 line-clamp-1 mt-0.5">
            Garlands, lockets & decor
          </p>

          <div className="mt-1.5 inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-mono font-medium text-amber-800/90 group-hover:text-amber-950">
            <span>Explore All</span>
            <ArrowRight className="w-3 h-3 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section id="explore-categories" className="py-12 sm:py-16 lg:py-20 bg-[#E8E2D3] border-b border-[#D3CBBA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          {websiteSettings?.categories?.badge && (
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{websiteSettings.categories.badge}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-zinc-900 tracking-tight">
            {websiteSettings?.categories?.title || 'Explore Keepsake Categories'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed mx-auto">
            {websiteSettings?.categories?.subtitle || 'Click any category below to browse our complete collection of handcrafted resin keepsakes, bridal preservation, and custom gifts.'}
          </p>
        </div>

        {/* Visual Category Portals: 5 cols on md and lg (2 balanced rows of 5 = 10 items), 3 on sm, 2 on mobile (6 items total) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-y-9 sm:gap-y-12 gap-x-4 sm:gap-x-6 lg:gap-x-8">
          {/* First 5 Categories (Shown on all screen sizes) */}
          {firstCategories.map((item, idx) => renderCategoryCard(item, idx))}

          {/* Mobile "View All" Button (6th item on small devices, hidden on md/lg) */}
          {renderViewAllCard('block md:hidden', 0.2)}

          {/* Next 4 Categories (Items 6 to 9 on md and lg, hidden on mobile) */}
          {additionalCategories.map((item, idx) =>
            renderCategoryCard(item, idx + 5, 'hidden md:block')
          )}

          {/* Desktop "View All" Button (10th item on md and lg, hidden on mobile) */}
          {renderViewAllCard('hidden md:block', 0.35)}
        </div>

        {/* Bottom Bespoke Keepsake Callout Banner */}
        <div className="mt-12 sm:mt-16 bg-[#DFD8C7] rounded-3xl p-5 sm:p-7 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/15 border border-amber-700/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                Need a custom bridal garland preservation or personalized keepsake?
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-600 mt-0.5">
                We preserve wedding reception garlands, baby birth tags, and personalized 24K gold letter frames.
              </p>
            </div>
          </div>

          <Link
            to="/how-to-order"
            className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 shrink-0 transition-transform active:scale-95 shadow-xs"
          >
            <span>How To Order Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};


