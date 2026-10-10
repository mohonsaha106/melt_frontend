import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  MessageCircle,
  Tag
} from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setSelectedCategory,
    setSelectedPlacement,
    setIsHowToApplyOpen,
    setIsTrackOrderOpen
  } = useStore();

  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#050505] text-[#E8E2D3] border-t border-zinc-900 overflow-hidden">
      {/* Pre-Footer Hero CTA Banner */}
      <div className="py-20 sm:py-28 text-center border-b border-zinc-900 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
            {t.footer.preCtaTitle}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            {t.footer.preCtaDesc}
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
              {t.footer.shopKeepsakes}
            </button>
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-zinc-900 text-[#E8E2D3] hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 border border-zinc-800"
            >
              {t.footer.facebookPage}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <img
                src="/melt-logo-white.svg"
                alt="Melt Sparkle"
                className="h-10 sm:h-11 w-auto max-w-[210px] object-contain select-none mb-1.5"
              />
              <p className="text-[11px] tracking-wider uppercase text-amber-400 font-mono">
                {t.footer.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {t.footer.brandDesc}
            </p>

            <div className="space-y-2 pt-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                <span>{t.footer.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{t.footer.address}</span>
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
              {t.footer.categories}
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
                  {t.footer.allKeepsakes}
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
                  {t.footer.weddingPreservation}
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
                  {t.footer.monogramKeychains}
                </button>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-white transition-colors"
                >
                  {t.footer.reviewsPhotos}
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-order"
                  className="hover:text-white transition-colors"
                >
                  {t.footer.howToOrder}
                </Link>
              </li>
              <li>
                <Link
                  to="/sepcial-offer"
                  className="hover:text-white text-rose-400 font-medium transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3" />
                  <span>{t.footer.specialOffers}</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  {t.footer.trackOrder}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies & Help */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 font-mono">
              {t.footer.information}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => setIsHowToApplyOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.careGuide}
                </button>
              </li>
              <li>
                <a href="#facebook" onClick={(e) => { e.preventDefault(); window.open('https://www.facebook.com/Meltsparkle', '_blank'); }} className="hover:text-white transition-colors">
                  {t.footer.facebookPage}
                </a>
              </li>
              <li>
                <Link
                  to="/how-to-order"
                  className="hover:text-white transition-colors"
                >
                  {t.footer.codTerms}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-white transition-colors text-left block"
                >
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors text-left block"
                >
                  {t.footer.aboutUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright, language toggle & payment methods */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>{t.footer.copyright}</span>
            <div className="hidden sm:block text-zinc-700">•</div>
            <LanguageToggle variant="footer" />
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
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
