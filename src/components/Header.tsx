import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Facebook,
  Instagram, 
  HelpCircle,
  BookOpen,
  Info,
  ChevronRight,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    totalCartItemCount,
    openCart,
    wishlist,
    setIsWishlistOpen,
    setIsSearchModalOpen,
    setSelectedCategory,
    setSelectedPlacement,
    setIsHowToApplyOpen,
    setIsCustomStudioOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedCategory('all');
    setSelectedPlacement(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glassmorphism border-b border-zinc-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* =========================================
              MOBILE NAVBAR (Visible on < lg screens)
              Left: Breadcrumb / Menu Trigger
              Middle: Brand Name (Centered)
              Right: Search Icon & Shopping Cart Icon
             ========================================= */}
          <div className="relative flex items-center justify-between w-full lg:hidden">
            {/* Mobile Left: Menu / Breadcrumb Trigger */}
            <div className="flex items-center z-10">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-1 text-zinc-800 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors focus:outline-none active:scale-95"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Middle: Perfectly Centered Brand Logo (Vector SVG) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
              <a
                href="/"
                onClick={handleLogoClick}
                className="group flex items-center py-1 transition-transform duration-200 active:scale-95"
                aria-label="Melt Sparkle"
              >
                <img
                  src="/melt-logo.svg"
                  alt="Melt Sparkle"
                  className="h-11 sm:h-12 w-auto max-w-[220px] sm:max-w-[250px] object-contain select-none"
                />
              </a>
            </div>

            {/* Mobile Right: Search & Shopping Cart Icons */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 z-10">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors focus:outline-none active:scale-95"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Shopping Cart Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors relative focus:outline-none active:scale-95"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalCartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* =========================================
              DESKTOP NAVBAR (Visible on lg+ screens)
              Left: Brand Logo Image + Text
              Middle: Desktop Navigation Links
              Right: Full Action Icons (Search, Social, Tracking, Wishlist, Cart)
             ========================================= */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Desktop Brand Logo (Realistic Vector SVG) */}
            <div className="flex items-center">
              <a
                href="/"
                onClick={handleLogoClick}
                className="group flex items-center py-1 transition-all duration-200 hover:scale-[1.03]"
                aria-label="Melt Sparkle"
              >
                <img
                  src="/melt-logo.svg"
                  alt="Melt Sparkle"
                  className="h-11 xl:h-12 w-auto max-w-[240px] xl:max-w-[270px] object-contain select-none drop-shadow-xs"
                />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase text-zinc-800">
              <button
                onClick={() => {
                  scrollToSection('product-catalog');
                  setSelectedCategory('all');
                  setSelectedPlacement(null);
                }}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                SHOP
              </button>

              <Link
                to="/sepcial-offer"
                className="hover:text-rose-800 text-rose-700 font-bold transition-colors py-1 relative flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-700 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                <Tag className="w-3 h-3 text-rose-600" />
                OFFERS
              </Link>

              <button
                onClick={() => scrollToSection('community-gallery')}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                GALLERY
              </button>

              <button
                onClick={() => setIsCustomStudioOpen(true)}
                className="hover:text-black transition-colors py-1 text-amber-800 font-bold relative flex items-center gap-1"
              >
                {/* <Sparkles className="w-3.5 h-3.5 text-amber-600" /> */}
                CUSTOM STUDIO
              </button>

              <button
                onClick={() => scrollToSection('how-to-order')}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                HOW TO ORDER
              </button>

              {/* <button
                onClick={() => setIsHowToApplyOpen(true)}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                KEEPSAKE GUIDE
              </button> */}

              <button
                onClick={() => scrollToSection('faq-section')}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                FAQ
              </button>

              <button
                onClick={() => scrollToSection('about-section')}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                ABOUT
              </button>
            </nav>

            {/* Desktop Right Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {/* Desktop Search Icon Trigger */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors flex items-center justify-center focus:outline-none"
                title="Search designs (Cmd+K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/Meltsparkle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors hidden sm:flex"
                title="Visit our Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* Instagram Link */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors hidden sm:flex"
                title="Follow our Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors relative focus:outline-none"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors relative focus:outline-none active:scale-95"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartItemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalCartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#E8E2D3] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden border-r border-[#D3CBBA]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between pb-1 border-b border-[#D3CBBA]">
                  <div>
                    <img
                      src="/melt-logo.svg"
                      alt="Melt Sparkle"
                      className="h-10 sm:h-11 w-auto max-w-[190px] object-contain select-none mb-1"
                    />
                    {/* <p className="text-[11px] text-zinc-600 italic">Keeping memories alive!</p> */}
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-600 hover:text-black hover:bg-[#DFD8C7] rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-1">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 bg-[#DFD8C7]/60 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-zinc-700" />
                      <span>SEARCH DESIGNS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <Link
                    to="/sepcial-offer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-bold tracking-wider text-rose-900 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-rose-600" />
                      <span>SPECIAL OFFERS & DEALS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-rose-700" />
                  </Link>

                  <button
                    onClick={() => {
                      scrollToSection('product-catalog');
                      setSelectedCategory('all');
                      setSelectedPlacement(null);
                    }}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <span>SHOP ALL KEEPSAKES</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsCustomStudioOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-bold tracking-wider text-amber-900 bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>CUSTOM KEEPSAKE STUDIO</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-700" />
                  </button>

                  <button
                    onClick={() => scrollToSection('community-gallery')}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <span>GALLERY & LOOKBOOK</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => scrollToSection('how-to-order')}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <span>HOW TO ORDER (COD BD)</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsHowToApplyOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-zinc-700" />
                      <span>PRESERVATION & CARE GUIDE</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => scrollToSection('faq-section')}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="w-4 h-4 text-zinc-700" />
                      <span>FAQS & HELP</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => scrollToSection('about-section')}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-zinc-700" />
                      <span>ABOUT MELTSPARKLE</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-[#DFD8C7] border-t border-[#D3CBBA] space-y-2">
                <a
                  href="https://www.facebook.com/Meltsparkle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-zinc-900 text-[#E8E2D3] text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-black transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook: facebook.com/Meltsparkle</span>
                </a>
                <a
                  href="https://wa.me/8801712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-zinc-900 transition-colors"
                >
                  <span>WhatsApp (+880 1712-345678)</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
