import React from 'react';
import { ShoppingBag, Truck, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const HowToOrderSection: React.FC = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      step: language === 'bn' ? '০১' : '01',
      icon: ShoppingBag,
      title: t.howToOrderPage.step1Title,
      desc: t.howToOrderPage.step1Desc
    },
    {
      step: language === 'bn' ? '০২' : '02',
      icon: CreditCard,
      title: t.howToOrderPage.step2Title,
      desc: t.howToOrderPage.step2Desc
    },
    {
      step: language === 'bn' ? '০৩' : '03',
      icon: Sparkles,
      title: t.howToOrderPage.step3Title,
      desc: t.howToOrderPage.step3Desc
    },
    {
      step: language === 'bn' ? '০৪' : '04',
      icon: Truck,
      title: t.howToOrderPage.step4Title,
      desc: t.howToOrderPage.step4Desc
    }
  ];

  return (
    <section id="how-to-order" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
            {t.howToOrderPage.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight mt-1">
            {t.howToOrderPage.title}
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            {t.howToOrderPage.subtitle}
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-3xl p-7 flex flex-col justify-between hover:border-black/40 hover:shadow-card transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black text-[#E8E2D3] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-bold text-zinc-400">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D3CBBA] flex items-center space-x-2 text-[11px] text-zinc-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'bn' ? '১০০% নিখুঁত হ্যান্ডক্রাফটেড কিপসেক' : '100% Guaranteed Keepsake'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
