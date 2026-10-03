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
import { useStore } from '../context/StoreContext';

export const HowToOrderPage: React.FC = () => {
  const { setIsCustomStudioOpen } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'How To Order | Melt Sparkle Bangladesh';
  }, []);

  const steps = [
    {
      step: '01',
      icon: ShoppingBag,
      title: 'Pick or Customise Keepsake',
      desc: 'Browse our resin keepsake catalog or customize your monogram initial, flower preservation theme & name in our Custom Studio.',
      highlights: ['Ready-made catalog', 'Personalized bridal flowers', 'Custom name & initial engravings']
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Pay ৳50 Advance Token',
      desc: 'To confirm your handcrafted order and courier packaging, pay a small ৳50 token advance via bKash or Nagad. The remaining amount is paid on delivery.',
      highlights: ['bKash & Nagad supported', 'Instant order confirmation', 'Zero hidden fees']
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Artisan Casting & 72h Cure',
      desc: 'Our resin artists arrange preserved florals, pour crystal-clear UV epoxy, allow 72-hour slow bubble-free curing, and hand-polish each edge.',
      highlights: ['72-hour curing cycle', 'Non-yellowing UV crystal epoxy', 'Diamond hand-polishing']
    },
    {
      step: '04',
      icon: Truck,
      title: 'Doorstep Courier & COD',
      desc: 'Packaged in bubble-cushioned gift packaging with care guides. Delivered to your doorstep anywhere in Bangladesh. Pay the balance to the delivery courier.',
      highlights: ['Steadfast / RedX courier', '2-3 days Inside Dhaka', '3-5 days Outside Dhaka']
    }
  ];

  const faqs = [
    {
      q: 'Why do you take a ৳50 advance payment?',
      a: 'Since every keepsake is customized with real botanicals, monograms, or custom bridal flowers, the ৳50 advance ensures genuine parcel booking and courier label generation. The entire remaining bill is paid at your doorstep via Cash on Delivery.'
    },
    {
      q: 'How long does custom handcrafted casting take?',
      a: 'Custom keepsakes typically take 2-4 business days for casting, curing, and polishing before courier dispatch. For rush orders or anniversary gifts, message us directly on WhatsApp or Facebook.'
    },
    {
      q: 'How do I send my bridal/wedding flowers for preservation?',
      a: 'You can courier your dried wedding garland, petals, or boutonnière directly to our Dhaka studio or drop them off. Contact us on WhatsApp for our studio shipping address and prep guide.'
    },
    {
      q: 'What if the keepsake arrives damaged?',
      a: 'All our shipments are insured with bubble-padded gift boxing. In the rare event of transit damage, take an unboxing video and we will replace or refund your piece immediately with 100% money-back guarantee.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">How To Order</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Explore Catalog</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-amber-900 mb-2 font-mono bg-[#DFD8C7] px-3.5 py-1 rounded-full border border-[#D3CBBA]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>CASH ON DELIVERY NATIONWIDE IN BANGLADESH</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-zinc-900 tracking-tight mt-3">
            How Ordering Works
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            From handcrafted casting with crystal epoxy and real botanicals to your doorstep anywhere in Bangladesh. Simple 4-step ordering with easy ৳50 advance confirmation.
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
                    <span className="font-mono text-2xl font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-2.5 font-serif">
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
              <h3 className="text-lg font-bold text-zinc-900 font-serif mb-2">
                Nationwide Courier Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                We partner with Steadfast, Pathao & RedX for fast tracked courier delivery across all 64 districts in Bangladesh.
              </p>
            </div>
            <div className="bg-[#E8E2D3] p-4 rounded-2xl border border-[#D3CBBA] space-y-2 text-xs font-mono text-zinc-800">
              <div className="flex justify-between">
                <span>Inside Dhaka:</span>
                <span className="font-bold">2 - 3 Days (৳60)</span>
              </div>
              <div className="flex justify-between">
                <span>Outside Dhaka:</span>
                <span className="font-bold">3 - 5 Days (৳120)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Advance & Payment Methods */}
          <div className="bg-[#DFD8C7] rounded-3xl p-7 border border-[#D3CBBA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 font-serif mb-2">
                Secure ৳50 Advance & COD
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                Confirm your handmade parcel booking with a small ৳50 token advance. Pay the remaining bill when the courier delivers to your hands.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-pink-100 border border-pink-200 text-pink-700 font-bold">bKash</span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-100 border border-orange-200 text-orange-700 font-bold">Nagad</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 font-bold">Rocket</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold">Cash on Delivery</span>
            </div>
          </div>

          {/* Card 3: Gift Packaging & Guarantee */}
          <div className="bg-[#DFD8C7] rounded-3xl p-7 border border-[#D3CBBA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 font-serif mb-2">
                Complimentary Gift Packaging
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                Every keepsake is packed in our signature gift box, wrapped with satin ribbon, protective bubble-lining, and a personalized note card.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-800 bg-[#E8E2D3] p-3 rounded-xl border border-[#D3CBBA]">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% Satisfaction or Free Replacement</span>
            </div>
          </div>

        </div>

        {/* Action Banner: Shop or Custom Studio */}
        <div className="bg-black text-[#E8E2D3] rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Ready To Create Your Piece?
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-2">
              Start Designing or Browse Our Keepsake Catalog
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Choose from ready-to-ship handcrafted bookmarks, keychains, and coasters, or customize your own bridal flower keepsake in our online studio.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-[#E8E2D3] hover:bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md flex items-center space-x-2"
            >
              <span>Shop All Keepsakes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsCustomStudioOpen(true)}
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 border border-zinc-700 flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Custom Studio</span>
            </button>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-amber-900 mb-1.5 font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900">
              Common Questions About Ordering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 hover:border-black/30 transition-colors"
              >
                <h4 className="font-serif font-bold text-base text-zinc-900 mb-2 flex items-start space-x-2">
                  <span className="text-amber-700 font-mono font-normal text-xs mt-1">Q.</span>
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
              <span>View Full FAQ Page</span>
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
              <h4 className="font-serif font-bold text-lg text-zinc-900">
                Need Help or Have a Custom Order Question?
              </h4>
              <p className="text-xs text-zinc-600">
                Our Dhaka studio artisan team is available daily from 10:00 AM to 10:00 PM.
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
              <span>WhatsApp Us</span>
            </a>
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center space-x-1.5 active:scale-95 transition-transform"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
