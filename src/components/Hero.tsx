import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, Sparkles, Shield, Droplets, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setSelectedPlacement } = useStore();

  const handleBrowseClick = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setSelectedCategory('all');
      setSelectedPlacement(null);
    }
  };

  const handleHowToOrderClick = () => {
    const el = document.getElementById('how-to-order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#E8E2D3] pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#D3CBBA]">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/30 via-[#DDD5C3]/50 to-amber-100/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Mini Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#DFD8C7] border border-[#D3CBBA] text-zinc-800 text-xs font-medium mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Meltsparkle • Keeping memories alive! ✨</span>
        </motion.div>

        {/* Hero Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#111111] leading-[1.12] max-w-4xl mx-auto text-balance"
        >
          Keeping Memories Alive in Handcrafted Resin
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-700 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          Bespoke resin art, sacred wedding flower preservation, and personalized keepsake creations handcrafted with love in Bangladesh. Preserving your most cherished moments forever.
        </motion.p>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={handleHowToOrderClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full border border-[#D3CBBA] bg-[#DFD8C7] hover:bg-[#D5CDBE] text-zinc-900 text-xs font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-zinc-800 fill-zinc-800" />
            <span>HOW TO ORDER</span>
          </button>

          <button
            onClick={handleBrowseClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
          >
            <span>EXPLORE KEEPSAKES</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#D3CBBA] grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
        >
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#DFD8C7]/70 border border-[#D3CBBA]">
            <div className="p-2 rounded-lg bg-[#E8E2D3] text-zinc-900 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">100% Handcrafted</div>
              <div className="text-[11px] text-zinc-600">Crystal archival epoxy</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#DFD8C7]/70 border border-[#D3CBBA]">
            <div className="p-2 rounded-lg bg-[#E8E2D3] text-zinc-900 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Real Flora & Foil</div>
              <div className="text-[11px] text-zinc-600">Pressed bridal flowers</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#DFD8C7]/70 border border-[#D3CBBA]">
            <div className="p-2 rounded-lg bg-[#E8E2D3] text-zinc-900 shadow-sm">
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Lifetime Keepsake</div>
              <div className="text-[11px] text-zinc-600">UV non-yellowing</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#DFD8C7]/70 border border-[#D3CBBA]">
            <div className="p-2 rounded-lg bg-[#E8E2D3] text-zinc-900 shadow-sm">
              <Droplets className="w-4 h-4 text-sky-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Custom Monograms</div>
              <div className="text-[11px] text-zinc-600">Names, initials & dates</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
