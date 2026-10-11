import React from 'react';
import { ShieldCheck, Droplets, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HighlightBanner: React.FC = () => {
  const { websiteSettings } = useStore();
  const strip = websiteSettings?.highlightStrip || {
    item1: '100% Handcrafted Resin',
    item2: 'Real Bridal Flower Preservation',
    item3: 'UV Non-Yellowing Lifetime Keepsake'
  };

  return (
    <div id="highlight-banner" className="bg-[#0A0A0A] text-[#E8E2D3] py-8 sm:py-10 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4 sm:gap-8">
          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <Droplets className="w-5 h-5 text-amber-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">{strip.item1}</span>
          </div>

          <span className="hidden md:inline text-zinc-600 text-xl">•</span>

          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">{strip.item2}</span>
          </div>

          <span className="hidden md:inline text-zinc-600 text-xl">•</span>

          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <Clock className="w-5 h-5 text-amber-300" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">{strip.item3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

