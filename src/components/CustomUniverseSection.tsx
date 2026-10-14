import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PenTool, Flower2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomUniverseSection: React.FC = () => {
  const { websiteSettings } = useStore();

  return (
    <section id="custom-universe" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA] relative overflow-hidden font-bengali">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[1px] w-8 bg-[#D3CBBA]" />
            <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
              {websiteSettings?.customUniverse?.badge || 'স্মৃতি সংরক্ষণের দুটি উপায়'}
            </span>
            <span className="h-[1px] w-8 bg-[#D3CBBA]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-snug">
            {websiteSettings?.customUniverse?.title || 'স্মৃতি থাকুক চিরসবুজ ও অম্লান'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl mx-auto">
            {websiteSettings?.customUniverse?.subtitle || 'আপনার পছন্দের রেজিন কিপসেক তৈরির দুটি দারুণ সুযোগ — নিজের মনোগ্রাম কাস্টমাইজ করুন অথবা জীবনের সেরা মুহূর্তের স্মৃতি চিরতরে সংরক্ষণ করুন।'}
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
            <span className="absolute top-4 right-6 text-7xl sm:text-8xl font-black text-[#DDD5C3]/40 pointer-events-none select-none group-hover:text-[#DDD5C3]/70 transition-colors">
              ০১
            </span>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#E8E2D3] border border-[#D3CBBA] flex items-center justify-center text-zinc-900 shadow-sm mb-6">
                <PenTool className="w-5 h-5 text-amber-600" />
              </div>

              <span className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                {websiteSettings?.customUniverse?.card1Subtitle || 'সার্ভিস ০১'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 mb-3">
                {websiteSettings?.customUniverse?.card1Title || 'কাস্টম নাম ও মনোগ্রাম'}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                {websiteSettings?.customUniverse?.card1Description || 'আপনার নাম, নিজস্ব বা কাপল ইনিশিয়াল কাস্ট করা হবে ২৪ ক্যারেট গোল্ড লিফ, ন্যাচারাল ফুল ও গ্লোয়িং এলইডি উডেন বেসের সাথে।'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D3CBBA] relative z-10 flex items-center justify-between">
              <Link
                to="/shop"
                className="w-full flex items-center justify-between text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-900 hover:text-black group/btn"
              >
                <span>মনোগ্রাম কালেকশন দেখুন</span>
                <div className="w-8 h-8 rounded-lg bg-[#DFD8C7] group-hover/btn:bg-black group-hover/btn:text-[#E8E2D3] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Card 02: Bridal Flower Preservation */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group relative bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden hover:border-black/50 hover:shadow-xl transition-all duration-300"
          >
            {/* Background 02 Watermark */}
            <span className="absolute top-4 right-6 text-7xl sm:text-8xl font-black text-[#DDD5C3]/40 pointer-events-none select-none group-hover:text-[#DDD5C3]/70 transition-colors">
              ০২
            </span>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#E8E2D3] border border-[#D3CBBA] flex items-center justify-center text-zinc-900 shadow-sm mb-6">
                <Flower2 className="w-5 h-5 text-emerald-600" />
              </div>

              <span className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                {websiteSettings?.customUniverse?.card2Subtitle || 'সার্ভিস ০২'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 mb-3">
                {websiteSettings?.customUniverse?.card2Title || 'বিয়ের মালা ও ফুল সংরক্ষণ'}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                {websiteSettings?.customUniverse?.card2Description || 'আমাদের কাছে পাঠিয়ে দিন আপনার বিয়ের মালা বা বিশেষ স্মৃতির ফুল। আমরা নিখুঁতভাবে ডিহাইড্রেট করে ক্রিস্টাল রেজিনে আজীবনের জন্য সংরক্ষণ করব।'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D3CBBA] relative z-10 flex items-center justify-between">
              <Link
                to="/how-to-order"
                className="w-full flex items-center justify-between text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-900 hover:text-black group/btn"
              >
                <span>সংরক্ষণ পদ্ধতি জানুন</span>
                <div className="w-8 h-8 rounded-lg bg-[#DFD8C7] group-hover/btn:bg-black group-hover/btn:text-[#E8E2D3] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
