import React from 'react';
import { ShieldCheck, Droplets, Clock } from 'lucide-react';

export const HighlightBanner: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#E8E2D3] py-8 sm:py-10 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4 sm:gap-8">
          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <Droplets className="w-5 h-5 text-amber-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">100% Handcrafted Resin</span>
          </div>

          <span className="hidden md:inline text-zinc-600 text-xl">•</span>

          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">Real Bridal Flower Preservation</span>
          </div>

          <span className="hidden md:inline text-zinc-600 text-xl">•</span>

          <div className="flex items-center space-x-2 text-[#E8E2D3]">
            <Clock className="w-5 h-5 text-amber-300" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight font-serif">UV Non-Yellowing Lifetime Keepsake</span>
          </div>
        </div>
      </div>
    </div>
  );
};
