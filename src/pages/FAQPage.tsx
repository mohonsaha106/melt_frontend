import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_LIST } from '../data/reviews';
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

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Flower Preservation', 'Durability & Quality', 'Usage & Care', 'Delivery & Payment'];

  useEffect(() => {
    document.title = 'FAQ | Melt Sparkle';
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchesCat =
        selectedCat === 'All' ||
        item.categoryEn === selectedCat ||
        item.category === selectedCat;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.categoryEn && item.categoryEn.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3] font-bengali">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">প্রশ্নোত্তর (FAQ)</span>
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
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>কাস্টমার সাপোর্ট ও গাইডলাইন</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ)
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Meltsparkle হস্তনির্মিত রেজিন প্রোডাক্ট, বিয়ের ফুল সংরক্ষণ, কুরিয়ার ডেলিভারি ও রেজিনের যত্ন সম্পর্কিত প্রয়োজনীয় সব তথ্যের উত্তর এখানে পেয়ে যাবেন।
          </p>
        </div>

        {/* Search Input Box (English) */}
        <div className="relative max-w-lg mx-auto mb-8 font-sans">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIdx(0);
            }}
            placeholder="Search questions or keywords (e.g. flower preservation, delivery, gold leaf)..."
            className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500/80 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-xs"
          />
        </div>

        {/* Category Filter Pills (English) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 no-scrollbar mb-8 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-normal whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                selectedCat === cat
                  ? 'bg-black text-[#E8E2D3] border border-black shadow-xs font-semibold'
                  : 'bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] text-zinc-800 hover:text-black'
              }`}
            >
              {cat}
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
                    <span className="text-sm sm:text-base font-bold text-zinc-900">
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
              <h3 className="text-base font-bold text-zinc-900">কোনো প্রশ্ন খুঁজে পাওয়া যায়নি</h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা সকল প্রশ্ন দেখতে ফিল্টার ক্লিয়ার করুন।
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCat('All');
                }}
                className="mt-4 px-5 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 shadow-sm"
              >
                Clear Filter
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
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">ইউভি প্রিমিয়াম রেজিন</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                ১০০% ক্রিস্টাল স্বচ্ছ ইপোক্সি রেজিন যা সময়ের সাথে কখনো হলুদ বা বিবর্ণ হয় না।
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">সারা দেশে হোম ডেলিভারি</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                বাংলাদেশের ৬৪টি জেলাতেই নিরাপদ কুশনিং প্যাকেজিংসহ ক্যাশ অন ডেলিভারি।
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">১৫,০০০+ সংরক্ষিত স্মৃতি</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                বিয়ে, জন্মদিন ও প্রিয়জনের স্মৃতি দিয়ে পরম যত্নে তৈরি হ্যান্ডক্রাফটেড কিপসেক।
              </p>
            </div>
          </div>
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#DFD8C7] border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left max-w-md">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>সরাসরি আর্টিসান সাপোর্ট</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
              বিশেষ কোনো প্রশ্ন আছে কি?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-1">
              বিয়ের মালা পাঠানোর নিয়ম, কাস্টম ফ্রেম সাইজ বা জরুরি ডেলিভারি সংক্রান্ত যেকোনো তথ্যে আমাদের টিম হোয়াটসঅ্যাপ ও ফেসবুকে সহায়তার জন্য প্রস্তুত।
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
              <span>ফেসবুক পেইজ</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-sm flex items-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>হোয়াটসঅ্যাপ চ্যাট</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
