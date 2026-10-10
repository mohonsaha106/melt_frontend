import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const HowToApplySection: React.FC = () => {
  const { language } = useLanguage();

  const steps = [
    {
      num: language === 'bn' ? '০১' : '01',
      title: language === 'bn' ? 'বোটানিক্যাল ডিহাইড্রেশন' : 'Botanical Drying',
      desc: language === 'bn'
        ? 'বিয়ের ফুল ও পাতা সিলিকা ক্রিস্টালে বিশেষ পদ্ধতিতে শুকানো হয় যাতে রঙ উজ্জ্বল ও প্রাকৃতিক থাকে।'
        : 'Bridal flowers & greenery are dehydrated with silica crystals to lock in vibrant natural colors without browning.'
    },
    {
      num: language === 'bn' ? '০২' : '02',
      title: language === 'bn' ? 'ডিজাইন বিন্যাস' : 'Design Composition',
      desc: language === 'bn'
        ? 'আপনার পছন্দসই নাম, তারিখ, ২৪ ক্যারেট গোল্ড ফয়েল ও ফুলের পাপড়ি কাস্টিং ছাঁচে যত্নসহকারে সাজানো হয়।'
        : 'We arrange your personalized names, dates, 24K gold foil, and petals into custom casting molds.'
    },
    {
      num: language === 'bn' ? '০৩' : '03',
      title: language === 'bn' ? 'মাল্টি-লেয়ার রেজিন ঢালাই' : 'Multi-Layer Pouring',
      desc: language === 'bn'
        ? 'ইউভি-প্রতিরোধী নন-ইয়েলোয়িং ক্রিস্টাল রেজিন ধাপে ধাপে ঢেলে গভীরতা ও স্ফটিক স্পষ্টতা আনা হয়।'
        : 'Layer-by-layer casting with UV-resistant, non-yellowing crystal epoxy resin for optical depth.'
    },
    {
      num: language === 'bn' ? '০৪' : '04',
      title: language === 'bn' ? '৭২ ঘণ্টা স্লো কিউরিং' : '72-Hour Slow Curing',
      desc: language === 'bn'
        ? 'নিয়ন্ত্রিত তাপমাত্রায় রেজিনের বাবল দূর করে কাঁচের মতো নিরেট ও টেকসই ফিনিশ তৈরি করা হয়।'
        : 'De-aerated under controlled temperature to eliminate micro-bubbles and cure to a glass-like finish.'
    },
    {
      num: language === 'bn' ? '০৫' : '05',
      title: language === 'bn' ? 'হ্যান্ড-পলিশ ও গিফট বক্স' : 'Hand-Polish & Box',
      desc: language === 'bn'
        ? 'হাতের নিখুঁত পলিশিংয়ে গ্লাস মিরর শাইন আনা হয় এবং শকপ্রুফ লাক্সারি গিফট বক্সে প্যাক করা হয়।'
        : 'Edges are hand-sanded, polished to a mirror shine, and packaged in shockproof luxury gift wrapping.'
    }
  ];

  return (
    <section id="how-to-apply" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
            {language === 'bn' ? 'হস্তশিল্পের ৫-ধাপের প্রক্রিয়া' : 'ARTISANAL 5-STAGE PROCESS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight mt-1">
            {language === 'bn' ? 'কীভাবে আমরা আপনার স্মৃতি রূপদান করি' : 'How We Handcraft Your Keepsakes'}
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            {language === 'bn'
              ? 'প্রতিটি কিপসেক তৈরি হয় ভালোবাসা ও পরম যত্নে — যাতে স্মৃতি বেঁচে থাকে আজীবন।'
              : 'Every piece is made by hand with utmost care and love — keeping your memories alive for a lifetime.'}
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
                  {language === 'bn' ? `ধাপ ${step.num}` : `STAGE ${step.num}`}
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
              <span>{language === 'bn' ? 'রেজিন কিপসেক কেয়ার গাইড' : 'Resin Keepsake Care Guide'}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-zinc-100 font-serif">
              {language === 'bn' ? 'রেজিন পণ্যকে আজীবন কাঁচের মতো স্বচ্ছ রাখবেন কীভাবে?' : 'How to keep your resin crystal clear forever?'}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {language === 'bn'
                ? 'নরম মাইক্রোফাইবার কাপড় এবং হালকা সাবান পানি দিয়ে পরিষ্কার করুন। অতিরিক্ত রোদে রাখা বা অ্যালকোহল ও নেইল পলিশ রিমুভার জাতীয় কেমিক্যাল এড়িয়ে চলুন।'
                : 'Clean with a soft microfiber cloth and mild soapy water if needed. Avoid harsh alcohol wipes, acetone, and prolonged direct outdoor sunlight to preserve optical clarity for generations.'}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-xl font-black text-amber-400 font-serif">
                {language === 'bn' ? '১০০%' : '100%'}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                {language === 'bn' ? 'ইউভি সুরক্ষিত' : 'UV Protected'}
              </div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-xl font-black text-emerald-400 font-serif">
                {language === 'bn' ? 'আজীবন' : 'Lifetime'}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                {language === 'bn' ? 'স্মৃতি সংরক্ষণ' : 'Memory Keepsake'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
