import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const HeroV1: React.FC = () => {
  const { setSelectedCategory, setSelectedPlacement, setQuickViewProduct } = useStore();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleShopCollection = () => {
    setSelectedCategory('jewelry');
    setSelectedPlacement(null);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProduct = (sku: string) => {
    const prod = PRODUCTS.find((p) => p.sku === sku);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#E8E2D3] border-b border-[#D3CBBA] py-12 sm:py-20 lg:py-28 select-none"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-serif font-bold tracking-[0.25em] text-black/[0.03] whitespace-nowrap pointer-events-none select-none -z-10">
        JEWELRY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimal Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 sm:mb-12 border-b border-[#D3CBBA]/80 text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
          <div className="flex items-center space-x-2 text-zinc-900">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>MELTSPARKLE ATELIER</span>
          </div>
          <div className="text-zinc-600">
            <span>COLLECTION VOL. IV • 2026</span>
          </div>
        </div>

        {/* Stacked Editorial Collage Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Oversized Editorial Typography & Brand Story (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase text-amber-900 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>HAND-POURED HEIRLOOMS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111] leading-[0.98]"
            >
              The <br />
              <span className="font-semibold italic font-serif">Details</span> <br />
              Matter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 text-sm sm:text-base text-zinc-700 font-normal leading-relaxed max-w-md"
            >
              A curated series of botanical gems cast in museum-clarity crystal resin, infused with genuine 24K gold foil flakes, and set on anti-tarnish 18K gold-plated chains.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={handleShopCollection}
                className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-black text-[#E8E2D3] hover:bg-zinc-800 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 active:scale-95 shadow-xl group"
              >
                <span>SHOP COLLECTION</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleShopCollection}
                className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold tracking-[0.18em] uppercase text-zinc-900 hover:underline py-2"
              >
                <span>VIEW LOOKBOOK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Mini Collection Index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="mt-12 pt-6 border-t border-[#D3CBBA] grid grid-cols-3 gap-3 text-left"
            >
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block">01</span>
                <span className="text-xs font-serif font-bold text-zinc-900">Rosebud Pendants</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block">02</span>
                <span className="text-xs font-serif font-bold text-zinc-900">24K Gold Initials</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block">03</span>
                <span className="text-xs font-serif font-bold text-zinc-900">Floral Ring Dishes</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Layered & Stacked Editorial Collage (Spans 7 cols) */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[460px] sm:min-h-[540px] flex items-center justify-center">
            {/* Layer 1 (Top-Left Accent Image - Hair Clips / Monogram) */}
            <motion.div
              style={{
                x: mouseOffset.x * -20,
                y: mouseOffset.y * -20
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={() => handleOpenProduct('MS-112')}
              className="absolute top-0 left-0 sm:left-4 z-10 w-44 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#D3CBBA] shadow-xl group cursor-pointer hover:z-30 transition-all duration-300 -rotate-3 hover:rotate-0"
            >
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
                alt="Pressed Daisy & Gold Foil Hair Clips"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block">
                  EDITION NO. 01
                </span>
                <span className="text-xs font-serif font-bold truncate block">Botanical Hair Clips</span>
                <span className="text-[11px] text-zinc-300">৳420</span>
              </div>
            </motion.div>

            {/* Layer 2 (Central Dominant Hero Jewelry Piece - Teardrop Pendant) */}
            <motion.div
              style={{
                x: mouseOffset.x * 10,
                y: mouseOffset.y * 10
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={() => handleOpenProduct('MS-107')}
              className="relative z-20 w-64 sm:w-80 lg:w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-white border-2 border-[#D3CBBA] shadow-2xl group cursor-pointer hover:shadow-3xl transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
                alt="Eternal Dried Rosebud Teardrop Pendant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                  FLAGSHIP PIECE
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 block mb-0.5">
                  HAND-POURED IN 24K GOLD
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                  Eternal Rosebud Teardrop Pendant
                </h3>
                <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="text-sm font-bold font-serif text-white">৳550 BDT</span>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-amber-200 group-hover:underline">
                    EXPLORE SPECS →
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Layer 3 (Bottom-Right Detail Image - 24K Monogram / Trinket Dish) */}
            <motion.div
              style={{
                x: mouseOffset.x * 25,
                y: mouseOffset.y * 25
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={() => handleOpenProduct('MS-102')}
              className="absolute bottom-0 right-0 sm:right-4 z-25 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden bg-white border border-[#D3CBBA] shadow-2xl group cursor-pointer hover:z-30 transition-all duration-300 rotate-3 hover:rotate-0"
            >
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                alt="24K Gold Monogram Keychain Locket"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block">
                  EDITION NO. 02
                </span>
                <span className="text-xs font-serif font-bold truncate block">24K Gold Monogram</span>
                <span className="text-[11px] text-zinc-300">From ৳350</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
