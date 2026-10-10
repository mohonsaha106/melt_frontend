import React from 'react';
import { Droplets, Clock, Sparkles, Truck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const TrustBadges: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: language === 'bn' ? '১০০% হস্তনির্মিত ও ক্রিস্টাল ক্লিয়ার' : '100% Handcrafted & Crystal Clear',
      description: language === 'bn'
        ? 'ইউভি-প্রতিরোধী নন-ইয়েলোয়িং ক্রিস্টাল রেজিন এবং নিখুঁত মিরর গ্লাস ফিনিশ।'
        : 'Artisan grade, UV-resistant non-yellowing epoxy resin poured with mirror glass finish.'
    },
    {
      icon: Droplets,
      title: language === 'bn' ? 'চিরস্থায়ী ফুল সংরক্ষণ' : 'Eternal Flower Preservation',
      description: language === 'bn'
        ? 'বিয়ের মালা, বিশেষ গোলাপ বা প্রিয় স্মৃতিকে আজীবনের জন্য সুরক্ষিত রাখুন।'
        : 'Preserve sacred bridal garlands, anniversary roses, and milestone botanicals for a lifetime.'
    },
    {
      icon: Clock,
      title: language === 'bn' ? 'কাস্টম মনোগ্রাম ও স্মারক' : 'Custom Monograms & Keepsakes',
      description: language === 'bn'
        ? 'আপনার পছন্দসই নাম, আদ্যক্ষর, তারিখ ও রঙের থিমে তৈরি ব্যক্তিগত উপহার।'
        : 'Personalized names, initials, dates, and color themes tailored to your memories.'
    },
    {
      icon: Truck,
      title: language === 'bn' ? 'সারাদেশে ক্যাশ অন ডেলিভারি' : 'Nationwide COD in Bangladesh',
      description: language === 'bn'
        ? 'সুরক্ষিত লাক্সারি গিফট বক্সিং সহ ৬৪ জেলাতেই দ্রুত ক্যাশ অন ডেলিভারি।'
        : 'Shockproof luxury gift boxing with fast Cash on Delivery across all 64 districts.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-3xl p-8 flex flex-col items-center text-center shadow-soft hover:shadow-card hover:border-black/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#DFD8C7] flex items-center justify-center text-zinc-900 mb-6 border border-[#D3CBBA]">
                  <Icon className="w-6 h-6 stroke-[1.75] text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3 font-serif">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Order CTA Banner */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif">
            {language === 'bn' ? 'নিজের পছন্দের কোনো বিশেষ ডিজাইন চান?' : 'Have a Bespoke Keepsake in Mind?'}
          </h3>
          <p className="mt-2 text-sm text-zinc-600">
            {language === 'bn'
              ? 'আপনার ছবি, বিয়ের ফুল বা কাস্টম আইডিয়া আমাদের ফেসবুক বা হোয়াটসঅ্যাপে পাঠান — আমরা যত্নসহকারে তৈরি করে দেব।'
              : "Send us your photos, bridal flowers, or custom design idea on Facebook or WhatsApp — we'll craft it for you."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>{language === 'bn' ? 'ফেসবুকে বার্তা দিন' : 'Message on Facebook'}</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D5CDBE] text-zinc-900 border border-[#D3CBBA] text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ করুন' : 'WhatsApp Us'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
