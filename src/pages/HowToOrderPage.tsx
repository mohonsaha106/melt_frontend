import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  CreditCard, 
  Sparkles, 
  Truck, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Facebook,
  HelpCircle,
  Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToOrderPage: React.FC = () => {
  useEffect(() => {
    document.title = 'অর্ডার করার নিয়ম | Melt Sparkle Bangladesh';
  }, []);

  const steps = [
    {
      step: '০১',
      icon: ShoppingBag,
      title: 'কিপসেক বা ডিজাইন নির্বাচন',
      desc: 'আমাদের রেজিন ক্যাটালগ ঘুরে দেখুন অথবা আপনার পছন্দের মনোগ্রাম ইনিশিয়াল, বিয়ের ফুলের ফ্রেম ও কাস্টম ডিজাইন পছন্দ করুন।',
      highlights: ['রেডিমেড ও কাস্টম ক্যাটালগ', 'বিয়ের ফুলের ফ্রেম ও কিপসেক', 'কাস্টম নাম ও ইনিশিয়াল এনগ্রেভিং']
    },
    {
      step: '০২',
      icon: CreditCard,
      title: '৫০ টাকা অগ্রিম টোকেন প্রদান',
      desc: 'হস্তনির্মিত রেজিন কাস্টিং ও কুরিয়ার পার্সেল বুকিং নিশ্চিত করতে বিকাশ বা নগদের মাধ্যমে মাত্র ৫০ টাকা অগ্রিম পরিশোধ করুন। বাকি টাকা ডেলিভারির সময়।',
      highlights: ['বিকাশ ও নগদ গ্রহণযোগ্য', 'তাৎক্ষণিক অর্ডার কনফার্মেশন', 'কোনো লুকানো চার্জ নেই']
    },
    {
      step: '০৩',
      icon: Sparkles,
      title: 'আর্টিসান কাস্টিং ও ৭২ ঘণ্টা কিউরিং',
      desc: 'আমাদের দক্ষ রেজিন আর্টিসানরা ফুল সাজিয়ে বাবল-ফ্রি ইউভি ক্রিস্টাল ইপোক্সি ঢালেন, ৭২ ঘণ্টা সময় নিয়ে নিখুঁতভাবে কিউরিং ও ডায়মন্ড হ্যান্ড-পলিশ করেন।',
      highlights: ['৭২ ঘণ্টার ধীরস্থির কিউরিং', 'নন-ইয়েলোয়িং ক্রিস্টাল রেজিন', 'হস্তনির্মিত ডায়মন্ড পলিশিং']
    },
    {
      step: '০৪',
      icon: Truck,
      title: 'হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি',
      desc: 'বাবল র‍্যাপ ও আকর্ষণীয় গিফট বক্সে নিরাপদে প্যাক করে সারা বাংলাদেশের যেকোনো প্রান্তে আপনার ঠিকানায় হোম ডেলিভারি করা হয়। বাকি টাকা কুরিয়ারকে পরিশোধ করুন।',
      highlights: ['স্টেডফাস্ট ও পাঠাও কুরিয়ার', 'ঢাকা সিটিতে ২-৩ দিন', 'ঢাকার বাইরে ৩-৫ দিন']
    }
  ];

  const faqs = [
    {
      q: 'কেন মাত্র ৫০ টাকা অগ্রিম নেওয়া হয়?',
      a: 'যেহেতু প্রতিটি রেজিন কিপসেক কাস্টম নাম, বিশেষ ফুল ও হাতের কারুকার্যে তৈরি করা হয়, তাই ৫০ টাকা অগ্রিম কুরিয়ার পার্সেল বুকিং ও সত্যতা নিশ্চিত করতে নেওয়া হয়। বাকি সম্পূর্ণ টাকা আপনি ঘরে বসে ডেলিভারির সময় ক্যাশ অন ডেলিভারিতে দিতে পারবেন।'
    },
    {
      q: 'হস্তনির্মিত কিপসেক তৈরি হতে কত সময় লাগে?',
      a: 'সাধারণত কাস্টিং, কিউরিং ও হ্যান্ড-পলিশিং সম্পন্ন করে কুরিয়ারে পাঠাতে ২-৪ কার্যদিবস সময় লাগে। জরুরি উপহার বা বিশেষ অনুষ্ঠানের জন্য আমাদের হোয়াটসঅ্যাপ বা ফেসবুকে সরাসরি ইনবক্স করতে পারেন।'
    },
    {
      q: 'বিয়ের মালা বা সংরক্ষিত ফুল কীভাবে পাঠাব?',
      a: 'আপনার শুকনা বা তাজা বিয়ের মালা, গোলাপের পাপড়ি সুন্দর করে কুরিয়ারে বা রাইডারে আমাদের ঢাকা স্টুডিওর ঠিকানায় পাঠাতে পারেন। স্টুডিওর ঠিকানা ও ফুল প্যাক করার গাইড পেতে আমাদের হোয়াটসঅ্যাপে নক দিন।'
    },
    {
      q: 'ডেলিভারির সময় কোনো ক্ষতি হলে কী করণীয়?',
      a: 'আমাদের প্রতিটি পার্সেল শক-প্রুফ বাবল প্যাকেজিংয়ে পাঠানো হয়। যদি ট্রানজিটে কোনো ক্ষতি হয়, আনবক্সিং ভিডিও শেয়ার করলে আমরা সম্পূর্ণ বিনামূল্যে নতুন কিপসেক রিপ্লেস অথবা ফুল রিফান্ড প্রদান করি।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3] font-bengali">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">অর্ডার করার নিয়ম</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>কালেকশন দেখুন</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 bg-[#DFD8C7] px-3.5 py-1 rounded-full border border-[#D3CBBA]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight mt-3 leading-tight">
            সহজ ৪ ধাপে অর্ডার করার নিয়ম
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            হস্তনির্মিত ক্রিস্টাল রেজিন ও সংরক্ষিত ফুলের কিপসেক সারা বাংলাদেশে আপনার ঠিকানায় পৌঁছে দিতে মাত্র ৫০ টাকা অগ্রিম টোকেনে সহজ ও নির্ভরযোগ্য অর্ডার প্রসেস।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-3xl p-7 flex flex-col justify-between hover:border-black/40 hover:shadow-xl transition-all duration-300 relative group"
              >
                <div>
                  {/* Step Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black text-[#E8E2D3] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {/* Feature Bullets */}
                  <div className="pt-4 border-t border-[#D3CBBA]/80 space-y-2">
                    {item.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center space-x-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery Timelines & Payment Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Delivery Coverage */}
          <div className="bg-[#DFD8C7] rounded-3xl p-7 border border-[#D3CBBA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                সারা দেশে কুরিয়ার ডেলিভারি
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                স্টেডফাস্ট ও পাঠাও কুরিয়ারের মাধ্যমে বাংলাদেশের ৬৪টি জেলাতেই দ্রুত পার্সেল ট্র্যাকিং সুবিধাসহ হোম ডেলিভারি প্রদান করা হয়।
              </p>
            </div>
            <div className="bg-[#E8E2D3] p-4 rounded-2xl border border-[#D3CBBA] space-y-2 text-xs text-zinc-800">
              <div className="flex justify-between">
                <span>ঢাকা সিটির ভেতরে:</span>
                <span className="font-bold">২ - ৩ দিন (৳৬০)</span>
              </div>
              <div className="flex justify-between">
                <span>ঢাকা সিটির বাইরে:</span>
                <span className="font-bold">৩ - ৫ দিন (৳১১০)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Advance & Payment Methods */}
          <div className="bg-[#DFD8C7] rounded-3xl p-7 border border-[#D3CBBA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                নিরাপদ ৫০ টাকা অগ্রিম ও ক্যাশ অন ডেলিভারি
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                কাস্টম কিপসেক বুকিং নিশ্চিত করতে মাত্র ৫০ টাকা টোকেন অগ্রিম দিন। বাকি পুরো টাকা পার্সেল হাতে পেয়ে কুরিয়ারকে পরিশোধ করার সুবিধা।
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-pink-100 border border-pink-200 text-pink-700 font-bold">বিকাশ</span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-100 border border-orange-200 text-orange-700 font-bold">নগদ</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 font-bold">রকেট</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold">ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          {/* Card 3: Gift Packaging & Guarantee */}
          <div className="bg-[#DFD8C7] rounded-3xl p-7 border border-[#D3CBBA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                ফ্রি প্রিমিয়াম গিফট প্যাকেজিং
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                প্রতিটি কিপসেক আমাদের সিগনেচার গিফট বক্সে সাটিন রিবন, বাবল কুশনিং ও কেয়ার কার্ডসহ সুন্দরভাবে উপহার হিসেবে পাঠানোর উপযোগী করে প্যাক করা হয়।
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-800 bg-[#E8E2D3] p-3 rounded-xl border border-[#D3CBBA]">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>১০০% সন্তুষ্টির নিশ্চয়তা ও ক্ষতিপূরণ গ্যারান্টি</span>
            </div>
          </div>

        </div>

        {/* Action Banner: Shop Keepsakes */}
        <div className="bg-black text-[#E8E2D3] rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              আপনার স্মৃতি চিরসবুজ রাখতে প্রস্তুত?
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white mt-2">
              আমাদের সম্পূর্ণ কালেকশন ঘুরে দেখুন
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              পছন্দ করুন বুকমার্ক, কিচেন, কোস্টার বা আপনার বিয়ের মালা সংরক্ষণের জন্য নিজস্ব বিশেষ ফ্রেম।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-[#E8E2D3] hover:bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md flex items-center space-x-2"
            >
              <span>সব কিপসেক দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>সাধারণ প্রশ্নোত্তর</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900">
              অর্ডার সম্পর্কিত জরুরি জিজ্ঞাসা
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 hover:border-black/30 transition-colors"
              >
                <h4 className="font-bold text-base text-zinc-900 mb-2 flex items-start space-x-2">
                  <span className="text-amber-700 font-bold text-xs mt-1">প্র.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="text-xs font-bold uppercase tracking-wider text-zinc-800 hover:text-black inline-flex items-center space-x-1.5 underline decoration-[#D3CBBA] hover:decoration-black underline-offset-4"
            >
              <span>সম্পূর্ণ প্রশ্নোত্তরের পেইজ দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Direct WhatsApp / Facebook Help Bar */}
        <div className="bg-[#DFD8C7] rounded-3xl p-6 sm:p-8 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 text-[#E8E2D3] flex items-center justify-center shrink-0 hidden sm:flex">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-zinc-900">
                কোনো প্রশ্ন বা কাস্টম অর্ডারের তথ্য দরকার?
              </h4>
              <p className="text-xs text-zinc-600">
                আমাদের ঢাকা স্টুডিওর আর্টিসান টিম প্রতিদিন সকাল ১০:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত আপনার সহায়তায় প্রস্তুত।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center space-x-1.5 active:scale-95 transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>হোয়াটসঅ্যাপ করুন</span>
            </a>
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center space-x-1.5 active:scale-95 transition-transform"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>ফেসবুক পেইজ</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
