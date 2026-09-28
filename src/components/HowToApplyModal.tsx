import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, Flower2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToApplyModal: React.FC = () => {
  const { isHowToApplyOpen, setIsHowToApplyOpen } = useStore();

  if (!isHowToApplyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsHowToApplyOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-[#D3CBBA]"
      >
        <div className="flex items-center justify-between p-6 border-b border-[#D3CBBA] bg-[#DFD8C7]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-lg font-bold text-zinc-900 font-serif">Preservation & Care Guide</h3>
              <p className="text-xs text-zinc-600">Keeping memories alive with Meltsparkle</p>
            </div>
          </div>
          <button
            onClick={() => setIsHowToApplyOpen(false)}
            className="p-2 text-zinc-600 hover:text-black hover:bg-[#D5CDBE] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Flower Sending Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-amber-600" />
              How to Send Flowers for Preservation
            </h4>
            
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">Keep Stems in Water</strong>
                <p className="text-xs text-zinc-600 mt-0.5">Keep wedding garland or bouquet stems hydrated in cool water until sending.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">Wrap Gently in Paper Towels</strong>
                <p className="text-xs text-zinc-600 mt-0.5">Wrap flower heads lightly in dry paper towels. Do NOT pack in sealed plastic bags.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">Courier or Drop-off at Dhaka Studio</strong>
                <p className="text-xs text-zinc-600 mt-0.5">Send via Pathao/Steadfast or drop off at our studio. We begin silica dehydration immediately.</p>
              </div>
            </div>
          </div>

          {/* Resin Care Section */}
          <div className="p-4 rounded-2xl bg-[#DFD8C7] border border-[#D3CBBA] space-y-2">
            <div className="flex items-center space-x-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Resin Product Long-Term Care</span>
            </div>
            <ul className="text-xs text-zinc-700 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Clean gently with a soft microfiber cloth and mild soapy water.</li>
              <li>Do not use chemical solvents, acetone, nail polish remover, or alcohol wipes.</li>
              <li>Keep away from direct continuous high heat or open flames.</li>
              <li>Enjoy your crystal-clear memories for decades!</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-[#D3CBBA] bg-[#DFD8C7] text-center">
          <button
            onClick={() => setIsHowToApplyOpen(false)}
            className="w-full py-2.5 bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
