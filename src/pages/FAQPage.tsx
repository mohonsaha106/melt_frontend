import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Facebook, 
  ShieldCheck, 
  Truck, 
  Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const FAQPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCatKey, setSelectedCatKey] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = language === 'bn' 
      ? 'প্রশ্নোত্তর ও সাহায্য | মেল্ট স্পার্কল বাংলাদেশ' 
      : 'Frequently Asked Questions & Help | Melt Sparkle';
  }, [language]);

  const categoryList = useMemo(() => [
    { key: 'all', label: language === 'bn' ? 'সব' : 'All', origCat: 'All' },
    { key: 'durability', label: language === 'bn' ? 'স্থায়িত্ব ও কোয়ালিটি' : 'Durability', origCat: 'Durability' },
    { key: 'application', label: language === 'bn' ? 'অর্ডার ও ফুল পাঠানো' : 'Application', origCat: 'Application' },
    { key: 'safety', label: language === 'bn' ? 'যত্ন ও পরিষ্কার' : 'Safety', origCat: 'Safety' },
    { key: 'delivery', label: language === 'bn' ? 'ডেলিভারি ও পেমেন্ট' : 'Delivery & Payment', origCat: 'Delivery & Payment' }
  ], [language]);

  const localizedFaqs = useMemo(() => [
    {
      category: 'Application',
      question: language === 'bn' 
        ? 'বিয়ের ফুল বা স্মারক সামগ্রী সংরক্ষণের জন্য কীভাবে পাঠাব?' 
        : 'How do I send my bridal flowers or keepsake items for preservation?',
      answer: language === 'bn'
        ? 'খুবই সহজ!\n১. আমাদের ওয়েবসাইটে অর্ডার করার পর বা ফেসবুক পেজে (https://www.facebook.com/Meltsparkle) নক দেওয়ার পর আমাদের টিম আপনাকে ফুল পাঠানোর সহজ নির্দেশিকা প্রদান করবে।\n২. আপনার তাজা বা শুকানো ফুল কুরিয়ার বা রাইডারের মাধ্যমে আমাদের ঢাকা স্টুডিওতে পাঠিয়ে দিন।\n৩. ক্রিস্টাল রেজিনে ঢালার আগে আমরা বিশেষভাবে সিলিকা জেলে পাপড়িগুলো ডিহাইড্রেট ও সংরক্ষণ করি।'
        : 'It is very simple!\n1. After placing your order on our website or messaging our Facebook page (https://www.facebook.com/Meltsparkle), our team provides simple packaging guidelines.\n2. Send your fresh or dried flowers/items via courier or rider to our Dhaka studio.\n3. We professionally dry and dehydrate the petals in silica gel before casting them in crystal resin.'
    },
    {
      category: 'Durability',
      question: language === 'bn' 
        ? 'সময়ের সাথে সাথে রেজিন কি হলুদ হয়ে যাবে?' 
        : 'Will the resin turn yellow over time?',
      answer: language === 'bn'
        ? 'না। মেল্ট স্পার্কল-এ আমরা বিশেষভাবে প্রিমিয়াম আর্টিস্ট-গ্রেড, ইউভি-স্ট্যাবিলাইজড, নন-ইয়েলোয়িং ক্রিস্টাল রেজিন ব্যবহার করি। এর ফলে সরাসরি দীর্ঘস্থায়ী রোদে রাখা না হলে কয়েক দশক ধরে আপনার স্মারক থাকবে স্বচ্ছ ও ক্রিস্টাল-ক্লিয়ার।'
        : 'No. At Meltsparkle, we exclusively use premium artist-grade, UV-stabilized, non-yellowing epoxy resin. This prevents discoloration and keeps your preserved memories crystal-clear for decades when kept away from direct prolonged outdoor sun exposure.'
    },
    {
      category: 'Durability',
      question: language === 'bn' 
        ? 'একটি কাস্টম রেজিন অর্ডার হস্তনির্মিত হতে কতদিন সময় লাগে?' 
        : 'How long does it take to handcraft a custom resin order?',
      answer: language === 'bn'
        ? '• রেডিমেড / পার্সোনালাইজড কিচেন ও বুকমার্ক: ২–৪ কার্যদিবস।\n• কাস্টম ওয়াল ক্লক ও ট্রে: ৪–৬ কার্যদিবস।\n• ওয়েডিং ফ্লাওয়ার প্রিজারভেশন ফ্রেম: ১০–১৪ দিন (নাজুক পাপড়ি ডিহাইড্রেশন ও মাল্টি-লেয়ার কিউরিংয়ের জন্য)।'
        : '• Readymade / Personalized Keychains & Bookmarks: 2–4 business days.\n• Custom Clocks & Trays: 4–6 business days.\n• Wedding Flower Preservation Frames: 10–14 days (due to delicate petal dehydration & multi-layer curing processes).'
    },
    {
      category: 'Safety',
      question: language === 'bn' 
        ? 'রেজিন পণ্যের যত্ন ও পরিষ্কার কীভাবে করা উচিত?' 
        : 'How should I care for and clean my resin products?',
      answer: language === 'bn'
        ? '• নরম মাইক্রোফাইবার কাপড় এবং প্রয়োজন হলে হালকা সাবান পানি দিয়ে আলতো করে পরিষ্কার করুন।\n• রাসায়নিক দ্রাবক, অ্যাসিটোন, অ্যালকোহল বা স্ক্র্যাচ ফেলে এমন স্ক্রাবার এড়িয়ে চলুন।\n• সরাসরি আগুন বা অতিরিক্ত তাপ থেকে দূরে রাখুন।'
        : '• Clean gently with a soft microfiber cloth and mild soapy water if needed.\n• Avoid harsh chemical solvents, acetone, alcohol wipes, or abrasive pads.\n• Keep away from open flames and direct continuous extreme heat.'
    },
    {
      category: 'Delivery & Payment',
      question: language === 'bn' 
        ? 'ক্যাশ অন ডেলিভারি (সিওডি) এবং ৫০ টাকা অগ্রিম কীভাবে কাজ করে?' 
        : 'How does Cash on Delivery (COD) and the ৳50 Advance work?',
      answer: language === 'bn'
        ? 'আমরা বাংলাদেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি দিই! আপনার কাস্টম হ্যান্ডক্রাফটেড অর্ডার নিশ্চিত ও কুরিয়ার বুকিংয়ের জন্য আমরা বিকাশ/নগদ/রকেটে মাত্র ৫০ টাকা টোকেন অগ্রিম গ্রহণ করি। বাকি সমস্ত টাকা ডেলিভারির সময় আপনার হাতে পার্সেল বুঝে পেয়ে পরিশোধ করুন।'
        : 'We deliver nationwide across all 64 districts in Bangladesh! To confirm your handcrafted customization and book the courier parcel, we collect a small ৳50 token advance via bKash / Nagad / Rocket. The remaining due balance is paid to the courier upon delivery at your doorstep.'
    },
    {
      category: 'Delivery & Payment',
      question: language === 'bn' 
        ? 'ডেলিভারি চার্জ এবং পৌঁছাতে কত সময় লাগে?' 
        : 'What are the delivery charges and delivery times?',
      answer: language === 'bn'
        ? 'ঢাকার ভেতরে: ৬০ টাকা (১–২ দিনে ডেলিভারি)। ঢাকার বাইরে (৬৪ জেলা): ১১০ টাকা (স্টিডফাস্ট / রেডএক্সে ২–৪ দিন)। ১,৫০০ টাকার বেশি অর্ডারে ১০০% ফ্রি ডেলিভারি!'
        : 'Inside Dhaka: ৳60 (1–2 days delivery). Outside Dhaka (all 64 districts): ৳110 (2–4 days delivery via Steadfast / RedX). Orders over ৳1,500 receive 100% FREE delivery!'
    },
    {
      category: 'Delivery & Payment',
      question: language === 'bn' 
        ? '৪টি কিনলে ১টি ফ্রি এবং উপহার অফার কীভাবে পাব?' 
        : 'What are the Buy 4 Get 1 Free and gift rewards?',
      answer: language === 'bn'
        ? 'আমরা উপহার দিতে ভালোবাসি!\n• ৪+ পণ্য অর্ডার করলে → আপনার পছন্দের ১টি ফ্রি উপহার!\n• ৭+ পণ্য অর্ডার করলে → ২টি ফ্রি উপহার!\n• ১০+ পণ্য অর্ডার করলে → ৩টি ফ্রি উপহার!\nকার্ট ড্রয়ারেই উপহার সিলেক্টরটি স্বয়ংক্রিয়ভাবে আনলক হয়ে যাবে।'
        : 'We love giving surprises!\n• Buy 4+ items → Get 1 FREE handcrafted gift of your choice!\n• Buy 7+ items → Get 2 FREE gifts!\n• Buy 10+ items → Get 3 FREE gifts!\nThe promotional gift selector automatically unlocks inside your cart drawer.'
    }
  ], [language]);

  const activeCategory = categoryList.find(c => c.key === selectedCatKey) || categoryList[0];

  const filteredFaqs = useMemo(() => {
    return localizedFaqs.filter((item) => {
      const matchesCat = activeCategory.key === 'all' || item.category === activeCategory.origCat;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, localizedFaqs]);

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">{t.faqPage.breadcrumb}</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>{t.howToOrderPage.browseCatalog}</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'bn' ? 'গ্রাহক সহায়তা ও সমাধান' : 'CUSTOMER SUPPORT & ADVICE'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            {t.faqPage.title}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            {t.faqPage.subtitle}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIdx(0);
            }}
            placeholder={t.faqPage.searchPlaceholder}
            className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500/80 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 no-scrollbar mb-8">
          {categoryList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCatKey(cat.key);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-normal whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                selectedCatKey === cat.key
                  ? 'bg-black text-[#E8E2D3] border border-black shadow-xs font-semibold'
                  : 'bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] text-zinc-800 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#D3CBBA] rounded-2xl overflow-hidden bg-[#F2EDE2] transition-all shadow-2xs hover:border-[#C4B9A5]"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#DFD8C7]/50 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-zinc-900 font-serif">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-[#D3CBBA]/60 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center bg-[#F2EDE2] rounded-3xl border border-[#D3CBBA] p-8">
              <HelpCircle className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-900 font-serif">{t.faqPage.noMatch}</h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                {language === 'bn' 
                  ? 'অন্যান্য কী-ওয়ার্ড দিয়ে খুঁজে দেখুন অথবা সম্পূর্ণ প্রশ্নোত্তর দেখতে সার্চ মুছুন।'
                  : 'Try searching with different keywords or clear your query to view all FAQ items.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCatKey('all');
                }}
                className="mt-4 px-5 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 shadow-sm"
              >
                {language === 'bn' ? 'সার্চ মুছুন' : 'Clear Search'}
              </button>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                {language === 'bn' ? 'ইউভি ক্রিস্টাল রেজিন' : 'UV Archival Resin'}
              </h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                {language === 'bn' 
                  ? '১০০% ক্রিস্টাল স্বচ্ছ ফর্মুলা যা সময়ের সাথে কখনো হলুদ হয় না।'
                  : '100% crystal-clarity epoxy formula that never yellows over time.'}
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                {language === 'bn' ? 'সারাদেশে ক্যাশ অন ডেলিভারি' : 'Nationwide COD'}
              </h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                {language === 'bn'
                  ? 'সুরক্ষিত বাবল-র‌্যাপ ও গিফট বক্স সহ ৬৪ জেলাতেই হোম ডেলিভারি।'
                  : 'Cash on delivery across all 64 districts in Bangladesh with safe cushioning.'}
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                {language === 'bn' ? '১৫,০০০+ সংরক্ষিত স্মৃতি' : '15,000+ Memories'}
              </h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                {language === 'bn'
                  ? 'বিয়ে, বার্ষিকী ও বিশেষ মুহূর্তের স্মৃতি সংরক্ষণে বিশেষ যত্ন।'
                  : 'Handcrafted with care for weddings, anniversaries, and personal milestones.'}
              </p>
            </div>
          </div>
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#DFD8C7] border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left max-w-md">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? 'সরাসরি কারিগর সহায়তা' : 'Direct Artisan Support'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 font-serif">
              {t.faqPage.haveQuestions}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-1">
              {language === 'bn'
                ? 'ফুলের তোড়া পাঠানো, কাস্টম শেইপ বা জরুরি ডেলিভারি সংক্রান্ত যেকোনো তথ্যের জন্য আমাদের সরাসরি নক দিন।'
                : 'Our team is ready on WhatsApp & Facebook to answer questions about bouquet delivery, custom shapes, and urgency requests.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-sm flex items-center space-x-2"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফেসবুক পেজ' : 'Facebook Page'}</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-sm flex items-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Chat'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
