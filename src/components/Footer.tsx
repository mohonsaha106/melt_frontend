import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowUp,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setSelectedCategory,
    setSelectedPlacement,
    setIsHowToApplyOpen,
    setIsTrackOrderOpen,
    setIsCustomStudioOpen
  } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] text-[#E8E2D3] border-t border-zinc-900 overflow-hidden">
      {/* Pre-Footer Hero CTA Banner */}
      <div className="py-20 sm:py-28 text-center border-b border-zinc-900 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
            Preserve Your Memories Today
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            Keeping memories alive! Join 15,000+ happy customers preserving wedding garlands, monograms & keepsakes.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                scrollToSection('product-catalog');
                setSelectedCategory('all');
                setSelectedPlacement(null);
              }}
              className="px-8 py-3.5 bg-[#E8E2D3] text-black hover:bg-[#F2EDE2] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 shadow-md hover:shadow-xl active:scale-95"
            >
              Shop Keepsakes
            </button>
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-zinc-900 text-[#E8E2D3] hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 border border-zinc-800"
            >
              Facebook Page
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-white">
                MELT SPARKLE
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Bangladesh’s premier handcrafted resin art & memory preservation atelier. Keeping memories alive through bridal flower preservation, custom monogram keychains, geode clocks & luxury keepsakes.
            </p>

            <div className="space-y-2 pt-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                <span>+880 1712-345678</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>Dhaka, Bangladesh (Nationwide Courier)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>contact@meltsparkle.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href="https://www.facebook.com/Meltsparkle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
                aria-label="Facebook"
                title="facebook.com/Meltsparkle"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-zinc-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 font-mono">
              SHOP KEEPSAKES
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => {
                    scrollToSection('product-catalog');
                    setSelectedCategory('all');
                    setSelectedPlacement(null);
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Keepsakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCustomStudioOpen(true)}
                  className="hover:text-amber-400 transition-colors font-semibold text-zinc-300"
                >
                  Custom Keepsake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    scrollToSection('product-catalog');
                    setSelectedCategory('preservation');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Wedding Flower Preservation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    scrollToSection('product-catalog');
                    setSelectedCategory('keychains');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Monogram Keychains
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('community-gallery')}
                  className="hover:text-white transition-colors"
                >
                  Gallery & Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-to-order')}
                  className="hover:text-white transition-colors"
                >
                  How To Order (COD BD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies & Help */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 font-mono">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => setIsHowToApplyOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Preservation & Care Guide
                </button>
              </li>
              <li>
                <a href="#facebook" onClick={(e) => { e.preventDefault(); window.open('https://www.facebook.com/Meltsparkle', '_blank'); }} className="hover:text-white transition-colors">
                  Facebook Page (fb.com/Meltsparkle)
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); scrollToSection('how-to-order'); }} className="hover:text-white transition-colors">
                  Cash on Delivery Terms
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ & Custom Requests
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Meltsparkle
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 Meltsparkle Bangladesh. All rights reserved. • Keeping memories alive!
          </div>

          {/* Supported Payments */}
          <div className="flex items-center space-x-4 font-mono text-[11px] text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-pink-500">bKash</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-orange-500">Nagad</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-purple-400">Rocket</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-emerald-400">COD</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
