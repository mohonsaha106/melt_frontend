import React from 'react';
import { useStore } from '../context/StoreContext';
import { PenTool, Type, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomUniverseSection: React.FC = () => {
  const { setIsCustomStudioOpen } = useStore();

  return (
    <section id="custom-universe" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[1px] w-8 bg-[#D3CBBA]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
              TWO WAYS TO PRESERVE
            </span>
            <span className="h-[1px] w-8 bg-[#D3CBBA]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
            Keeping your <span className="font-serif italic font-bold">memories alive.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Two distinct paths to your dream resin keepsake. Personalize a monogram treasure or preserve your sacred moments forever.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 01: Custom Name / Monogram */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden hover:border-black/50 hover:shadow-xl transition-all duration-300"
          >
            {/* Background 01 Watermark */}
            <span className="absolute top-4 right-6 font-mono text-7xl sm:text-8xl font-black text-[#DDD5C3]/40 pointer-events-none select-none group-hover:text-[#DDD5C3]/70 transition-colors">
              01
            </span>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#E8E2D3] border border-[#D3CBBA] flex items-center justify-center text-zinc-900 shadow-sm mb-6">
                <PenTool className="w-5 h-5 text-amber-600" />
              </div>

              <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase font-mono">
                EXPERIENCE 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 mb-3 font-serif">
                Custom Name & Monograms
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                Your name, initial, or couple initials cast with 24K gold foil, baby’s breath florals, and glowing LED wooden base.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D3CBBA] relative z-10 flex items-center justify-between">
              <button
                onClick={() => setIsCustomStudioOpen(true)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-wider uppercase text-zinc-900 hover:text-black group/btn"
              >
                <span>OPEN KEEPSAKE STUDIO</span>
                <div className="w-8 h-8 rounded-lg bg-[#DFD8C7] group-hover/btn:bg-black group-hover/btn:text-[#E8E2D3] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Card 02: Bridal Flower Preservation */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden hover:border-black/50 hover:shadow-xl transition-all duration-300"
          >
            {/* Background 02 Watermark */}
            <span className="absolute top-4 right-6 font-mono text-7xl sm:text-8xl font-black text-[#DDD5C3]/40 pointer-events-none select-none group-hover:text-[#DDD5C3]/70 transition-colors">
              02
            </span>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#E8E2D3] border border-[#D3CBBA] flex items-center justify-center text-zinc-900 shadow-sm mb-6">
                <Type className="w-5 h-5 text-emerald-600" />
              </div>

              <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase font-mono">
                EXPERIENCE 02
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 mb-3 font-serif">
                Flower & Garland Preservation
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                Send us your wedding garland or milestone flowers. We carefully dehydrate and encapsulate them forever in archival crystal resin.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D3CBBA] relative z-10 flex items-center justify-between">
              <button
                onClick={() => setIsCustomStudioOpen(true)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-wider uppercase text-zinc-900 hover:text-black group/btn"
              >
                <span>REQUEST PRESERVATION</span>
                <div className="w-8 h-8 rounded-lg bg-[#DFD8C7] group-hover/btn:bg-black group-hover/btn:text-[#E8E2D3] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
