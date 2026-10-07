import React from 'react';
import { PLACEMENTS } from '../data/categories';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const PlacementSelector: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#E8E2D3] border-b border-[#D3CBBA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>SHOP BY CATEGORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-zinc-900 tracking-tight">
              Explore Keepsake Categories
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
              Click any category below to browse our complete collection of handcrafted resin keepsakes, bridal preservation, and custom gifts.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-900 hover:text-black bg-[#DFD8C7] hover:bg-[#D3CBBA] px-4 py-2 rounded-full border border-[#D3CBBA] transition-all shadow-2xs hover:shadow-xs self-start sm:self-auto active:scale-95"
          >
            <span>View All in Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Visual Category Portals: 5 cols on desktop (2 balanced rows of 5), 4 on md, 3 on sm, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-9 sm:gap-y-12 gap-x-4 sm:gap-x-6 lg:gap-x-8">
          {PLACEMENTS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: idx * 0.035 }}
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
          ))}
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


