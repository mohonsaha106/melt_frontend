import React from 'react';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#0A0A0A] text-[#E8E2D3] border-b border-zinc-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR STORY & MISSION</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#E8E2D3] leading-tight">
          Handcrafted resin creations made for keeping memories alive.
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Meltsparkle was founded on a simple, heartfelt mission: <strong className="text-[#E8E2D3]">Keeping memories alive!</strong> From sacred wedding garlands and anniversary blossoms to bespoke monogram keychains, geode clocks, baby milestone cubes, and botanical jewelry — every piece is poured by hand with crystal-grade epoxy, real botanicals, and artisanal precision to preserve your cherished moments forever.
        </p>

        {/* 3 Metrics */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-zinc-800/80 pt-10">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white">100%</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Handmade Craft</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">15,000+</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Memories Preserved</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white">64</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Districts Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
};
