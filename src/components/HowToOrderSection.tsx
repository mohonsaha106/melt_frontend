import { ShoppingBag, Truck, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowToOrderSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: ShoppingBag,
      title: 'Pick or Customise Keepsake',
      desc: 'Browse our resin keepsakes catalog or personalize your monogram initial, flower theme & name in the studio.'
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Pay ৳50 Advance',
      desc: 'To confirm your handcrafted casting order and courier dispatch, pay a small ৳50 token advance via bKash / Nagad.'
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Artisan Casting & Polishing',
      desc: 'Our resin artists carefully arrange botanicals, pour UV crystal epoxy, cure for 72 hours, and hand-polish.'
    },
    {
      step: '04',
      icon: Truck,
      title: 'Doorstep Courier & COD',
      desc: 'We package your piece in bubble-cushioned gift packaging and deliver BD-wide. Pay due on delivery!'
    }
  ];

  return (
    <section id="how-to-order" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
            CASH ON DELIVERY NATIONWIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight mt-1">
            How Ordering Works in Bangladesh
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Hassle-free custom handcrafted keepsake delivery with simple token advance confirmation.
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
                  <span>100% Guaranteed Keepsake</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
