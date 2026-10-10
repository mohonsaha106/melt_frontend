import React from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles, Flower2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToApplyModal: React.FC = () => {
  const { isHowToApplyOpen, setIsHowToApplyOpen } = useStore();
  const { t, language, tNumber } = useLanguage();

  if (!isHowToApplyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
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
              <h3 className="text-lg font-bold text-zinc-900 font-serif">
                {t.footer.careGuide}
              </h3>
              <p className="text-xs text-zinc-600">
                {language === 'bn' ? 'মেল্ট স্পার্কলের সাথে স্মৃতি থাকুক চিরসবুজ' : 'Keeping memories alive with Meltsparkle'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsHowToApplyOpen(false)}
            className="p-2 text-zinc-600 hover:text-black hover:bg-[#D5CDBE] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Flower Sending Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-amber-600" />
              {language === 'bn' ? 'ফুল সংরক্ষণের জন্য পাঠানোর সহজ নিয়ম' : 'How to Send Flowers for Preservation'}
            </h4>
            
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">{tNumber(1)}</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">
                  {language === 'bn' ? 'ফুলের ডাঁটা পানিতে রাখুন' : 'Keep Stems in Water'}
                </strong>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {language === 'bn' 
                    ? 'আমাদের কাছে পাঠানোর আগ পর্যন্ত বিয়ের মালা বা তোড়ার ডাঁটা ঠাণ্ডা পানিতে ডুবিয়ে রাখুন যাতে ফুল সতেজ থাকে।'
                    : 'Keep wedding garland or bouquet stems hydrated in cool water until sending.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">{tNumber(2)}</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">
                  {language === 'bn' ? 'কাগজ বা টিস্যুতে মুড়ে নিন' : 'Wrap Gently in Paper Towels'}
                </strong>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {language === 'bn'
                    ? 'ফুলের পাপড়ি শুকনো টিস্যু বা পেপারে হালকাভাবে জড়িয়ে নিন। ভুলেও পলিথিন বা এয়ারটাইট ব্যাগে রাখবেন না।'
                    : 'Wrap flower heads lightly in dry paper towels. Do NOT pack in sealed plastic bags.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F2EDE2] border border-[#D3CBBA]">
              <span className="w-6 h-6 rounded-full bg-black text-[#E8E2D3] text-xs font-bold flex items-center justify-center flex-shrink-0">{tNumber(3)}</span>
              <div>
                <strong className="text-sm text-zinc-900 block font-serif">
                  {language === 'bn' ? 'কুরিয়ার বা ঢাকা স্টুডিওতে ড্রপ-অফ' : 'Courier or Drop-off at Dhaka Studio'}
                </strong>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {language === 'bn'
                    ? 'পাঠাও/রেডএক্স কুরিয়ার দিয়ে বা সরাসরি আমাদের ঢাকা স্টুডিওতে পৌঁছে দিন। ফুল পাওয়ামাত্র আমরা সিলিকা ডিহাইড্রেশন শুরু করব।'
                    : 'Send via Pathao/Steadfast or drop off at our studio. We begin silica dehydration immediately.'}
                </p>
              </div>
            </div>
          </div>

          {/* Resin Care Section */}
          <div className="p-4 rounded-2xl bg-[#DFD8C7] border border-[#D3CBBA] space-y-2">
            <div className="flex items-center space-x-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? 'রেজিন কিপসেকের দীর্ঘমেয়াদী যত্ন' : 'Resin Product Long-Term Care'}</span>
            </div>
            <ul className="text-xs text-zinc-700 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>{language === 'bn' ? 'নরম মাইক্রোফাইবার কাপড় এবং হালকা সাবান পানি দিয়ে আলতো করে পরিষ্কার করুন।' : 'Clean gently with a soft microfiber cloth and mild soapy water.'}</li>
              <li>{language === 'bn' ? 'অ্যাসিটোন, থিনার, নেইল পলিশ রিমুভার বা কোনো রাসায়নিক দ্রাবক ব্যবহার করবেন না।' : 'Do not use chemical solvents, acetone, nail polish remover, or alcohol wipes.'}</li>
              <li>{language === 'bn' ? 'অতিরিক্ত গরম তাপমাত্রা বা সরাসরি আগুনের শিখা থেকে দূরে রাখুন।' : 'Keep away from direct continuous high heat or open flames.'}</li>
              <li>{language === 'bn' ? 'আপনার স্ফটিক-স্বচ্ছ স্মৃতি উপভোগ করুন বছরের পর বছর!' : 'Enjoy your crystal-clear memories for decades!'}</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-[#D3CBBA] bg-[#DFD8C7] text-center">
          <button
            onClick={() => setIsHowToApplyOpen(false)}
            className="w-full py-2.5 bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
          >
            {language === 'bn' ? 'বুঝেছি, গাইড বন্ধ করুন' : 'Got It, Close Guide'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

