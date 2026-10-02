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

  const categories = ['All', 'Durability', 'Application', 'Safety', 'Delivery & Payment'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Frequently Asked Questions & Help | Melt Sparkle';
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchesCat = selectedCat === 'All' || item.category === selectedCat;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">FAQ & Help</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Shop Atelier</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>CUSTOMER SUPPORT & ADVICE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Meltsparkle handcrafted resin keepsakes, bridal flower preservation, nationwide delivery, and keepsake care.
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
            placeholder="Search questions (e.g., preservation, delivery, gold foil)..."
            className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500/80 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 no-scrollbar mb-8">
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
              <h3 className="text-base font-bold text-zinc-900 font-serif">No questions found</h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                Try searching with different keywords or clear your query to view all FAQ items.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCat('All');
                }}
                className="mt-4 px-5 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 shadow-sm"
              >
                Clear Search
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
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">UV Archival Resin</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                100% crystal-clarity epoxy formula that never yellows over time.
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Nationwide COD</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                Cash on delivery across all 64 districts in Bangladesh with safe cushioning.
              </p>
            </div>
          </div>

          <div className="bg-[#DFD8C7]/70 border border-[#D3CBBA] p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-[#E8E2D3] rounded-xl text-amber-800">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">15,000+ Memories</h4>
              <p className="text-[11px] text-zinc-600 mt-1 leading-normal">
                Handcrafted with care for weddings, anniversaries, and personal milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#DFD8C7] border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left max-w-md">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Direct Artisan Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 font-serif">
              Have a Custom Question?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-1">
              Our team is ready on WhatsApp & Facebook to answer questions about bouquet delivery, custom shapes, and urgency requests.
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
              <span>Facebook Page</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-sm flex items-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
