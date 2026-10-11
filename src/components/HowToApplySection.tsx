import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToApplySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Botanical Drying',
      desc: 'Bridal flowers & greenery are dehydrated with silica crystals to lock in vibrant natural colors without browning.'
    },
    {
      num: '02',
      title: 'Design Composition',
      desc: 'We arrange your personalized names, dates, 24K gold foil, and petals into custom casting molds.'
    },
    {
      num: '03',
      title: 'Multi-Layer Pouring',
      desc: 'Layer-by-layer casting with UV-resistant, non-yellowing crystal epoxy resin for optical depth.'
    },
    {
      num: '04',
      title: '72-Hour Slow Curing',
      desc: 'De-aerated under controlled temperature to eliminate micro-bubbles and cure to a glass-like finish.'
    },
    {
      num: '05',
      title: 'Hand-Polish & Box',
      desc: 'Edges are hand-sanded, polished to a mirror shine, and packaged in shockproof luxury gift wrapping.'
    }
  ];

  return (
    <section id="how-to-apply" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
            ARTISANAL 5-STAGE PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight mt-1">
            How We Handcraft Your Keepsakes
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Every piece is made by hand with utmost care and love — keeping your memories alive for a lifetime.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 relative flex flex-col justify-between hover:border-black/40 hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="font-mono text-xs font-bold text-zinc-500 tracking-wider">
                  STAGE {step.num}
                </span>
                <h3 className="text-base font-bold text-zinc-900 mt-2 mb-2 font-serif">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D3CBBA]/60 flex items-center justify-between text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resin Care Tips */}
        <div className="mt-12 bg-zinc-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <RotateCcw className="w-4 h-4" />
              <span>Resin Keepsake Care Guide</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-zinc-100 font-serif">
              How to keep your resin crystal clear forever?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Clean with a soft microfiber cloth and mild soapy water if needed. Avoid harsh alcohol wipes, acetone, and prolonged direct outdoor sunlight to preserve optical clarity for generations.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-xl font-black text-amber-400 font-serif">100%</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">UV Protected</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-xl font-black text-emerald-400 font-serif">Lifetime</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Memory Keepsake</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
