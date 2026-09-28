import React, { useState } from 'react';
import { FAQ_LIST } from '../data/reviews';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Durability', 'Application', 'Safety', 'Delivery & Payment'];

  const filteredFaqs = FAQ_LIST.filter(
    (item) => selectedCat === 'All' || item.category === selectedCat
  );

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Everything you need to know about Meltsparkle handcrafted resin products, flower preservation, delivery, and care.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-black text-[#E8E2D3] shadow-sm'
                  : 'bg-[#DFD8C7] text-zinc-800 hover:bg-[#D5CDBE] border border-[#D3CBBA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[#D3CBBA] rounded-2xl overflow-hidden bg-[#F2EDE2] transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#DFD8C7]/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 font-serif">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${
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
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-[#D3CBBA]/60 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#DFD8C7] border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-zinc-900 font-serif">Still have a question?</h4>
            <p className="text-xs text-zinc-600">Reach out on Facebook or WhatsApp for custom orders.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-black text-[#E8E2D3] text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors flex items-center space-x-1.5 flex-shrink-0"
            >
              <span>Facebook Page</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-800 text-white text-xs font-bold rounded-xl hover:bg-zinc-900 transition-colors flex items-center space-x-1.5 flex-shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
