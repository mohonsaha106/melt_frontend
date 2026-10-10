import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCatKey, setSelectedCatKey] = useState<string>('all');

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
        ? 'খুবই সহজ!\n১. আমাদের ওয়েবসাইটে অর্ডার করার পর বা ফেসবুক পেজে নক দেওয়ার পর আমাদের টিম আপনাকে ফুল পাঠানোর নির্দেশিকা প্রদান করবে।\n২. আপনার তাজা বা শুকানো ফুল কুরিয়ার বা রাইডারের মাধ্যমে আমাদের ঢাকা স্টুডিওতে পাঠিয়ে দিন।\n৩. ক্রিস্টাল রেজিনে ঢালার আগে আমরা বিশেষভাবে সিলিকা জেলে পাপড়িগুলো ডিহাইড্রেট ও সংরক্ষণ করি।'
        : 'It is very simple!\n1. After placing your order on our website or messaging our Facebook page, our team provides packaging guidelines.\n2. Send your fresh or dried flowers/items via courier or rider to our Dhaka studio.\n3. We professionally dry and dehydrate the petals before casting in crystal resin.'
    },
    {
      category: 'Durability',
      question: language === 'bn' 
        ? 'সময়ের সাথে সাথে রেজিন কি হলুদ হয়ে যাবে?' 
        : 'Will the resin turn yellow over time?',
      answer: language === 'bn'
        ? 'না। মেল্ট স্পার্কল-এ আমরা বিশেষভাবে প্রিমিয়াম আর্টিস্ট-গ্রেড, ইউভি-স্ট্যাবিলাইজড, নন-ইয়েলোয়িং ক্রিস্টাল রেজিন ব্যবহার করি যা আপনার স্মারক রাখবে চিরন্তন স্বচ্ছ।'
        : 'No. At Meltsparkle, we exclusively use premium artist-grade, UV-stabilized, non-yellowing epoxy resin keeping your keepsakes crystal-clear.'
    },
    {
      category: 'Delivery & Payment',
      question: language === 'bn' 
        ? 'ক্যাশ অন ডেলিভারি (সিওডি) এবং ৫০ টাকা অগ্রিম কীভাবে কাজ করে?' 
        : 'How does Cash on Delivery (COD) and the ৳50 Advance work?',
      answer: language === 'bn'
        ? 'আমরা বাংলাদেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি দিই! আপনার কাস্টম হ্যান্ডক্রাফটেড অর্ডার নিশ্চিত ও কুরিয়ার বুকিংয়ের জন্য আমরা বিকাশ/নগদ/রকেটে মাত্র ৫০ টাকা টোকেন অগ্রিম গ্রহণ করি। বাকি সমস্ত টাকা ডেলিভারির সময় পরিশোধ করুন।'
        : 'We deliver nationwide across all 64 districts in Bangladesh! We collect a small ৳50 token advance via bKash / Nagad / Rocket to confirm your order, with the rest paid upon delivery.'
    },
    {
      category: 'Delivery & Payment',
      question: language === 'bn' 
        ? 'ডেলিভারি চার্জ এবং পৌঁছাতে কত সময় লাগে?' 
        : 'What are the delivery charges and delivery times?',
      answer: language === 'bn'
        ? 'ঢাকার ভেতরে: ৬০ টাকা (১–২ দিনে ডেলিভারি)। ঢাকার বাইরে (৬৪ জেলা): ১১০ টাকা (স্টিডফাস্ট / রেডএক্সে ২–৪ দিন)। ১,৫০০ টাকার বেশি অর্ডারে ১০০% ফ্রি ডেলিভারি!'
        : 'Inside Dhaka: ৳60 (1–2 days). Outside Dhaka: ৳110 (2–4 days). Orders over ৳1,500 receive 100% FREE delivery!'
    }
  ], [language]);

  const activeCategory = categoryList.find(c => c.key === selectedCatKey) || categoryList[0];

  const filteredFaqs = localizedFaqs.filter(
    (item) => activeCategory.key === 'all' || item.category === activeCategory.origCat
  );

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'GOT QUESTIONS?'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
            {t.faqPage.title}
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            {t.faqPage.subtitle}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-8">
          {categoryList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCatKey(cat.key);
                setOpenIdx(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCatKey === cat.key
                  ? 'bg-black text-[#E8E2D3] shadow-sm'
                  : 'bg-[#DFD8C7] text-zinc-800 hover:bg-[#D5CDBE] border border-[#D3CBBA]'
              }`}
            >
              {cat.label}
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
            <h4 className="text-sm font-bold text-zinc-900 font-serif">
              {t.faqPage.haveQuestions}
            </h4>
            <p className="text-xs text-zinc-600">
              {language === 'bn' ? 'কাস্টম ডিজাইনের জন্য ফেসবুক বা হোয়াটসঅ্যাপে আমাদের জানান।' : 'Reach out on Facebook or WhatsApp for custom orders.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-black text-[#E8E2D3] text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors flex items-center space-x-1.5 flex-shrink-0"
            >
              <span>{language === 'bn' ? 'ফেসবুক পেজ' : 'Facebook Page'}</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-800 text-white text-xs font-bold rounded-xl hover:bg-zinc-900 transition-colors flex items-center space-x-1.5 flex-shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
