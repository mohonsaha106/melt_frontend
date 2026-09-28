import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Package, 
  Menu, 
  X, 
  Sparkles, 
  Facebook,
  Instagram, 
  HelpCircle,
  BookOpen,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    totalCartItemCount,
    openCart,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedPlacement,
    setIsHowToApplyOpen,
    setIsTrackOrderOpen,
    setIsCustomStudioOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glassmorphism border-b border-zinc-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile Menu Trigger & Search */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-800 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setSelectedCategory('all');
                setSelectedPlacement(null);
              }}
              className="group flex items-center space-x-2 text-left"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-black group-hover:opacity-80 transition-opacity">
                MELT SPARKLE
              </span>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse hidden sm:inline-block" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase text-zinc-800">
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
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              CUSTOM STUDIO
            </button>

            <button
              onClick={() => scrollToSection('how-to-order')}
              className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              HOW TO ORDER
            </button>

            <button
              onClick={() => setIsHowToApplyOpen(true)}
              className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              KEEPSAKE GUIDE
            </button>

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

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search keepsakes, frames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-48 pl-8 pr-3 py-1.5 text-xs bg-[#DFD8C7]/70 border border-[#D3CBBA] rounded-full focus:outline-none focus:ring-1 focus:ring-black focus:w-56 transition-all duration-300 placeholder:text-zinc-500 text-zinc-900"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-zinc-500 hover:text-black text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

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

            {/* Order Tracking */}
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="p-2 text-zinc-700 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors"
              title="Track My Order"
              aria-label="Track Order"
            >
              <Package className="w-4 h-4" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors relative"
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
              className="flex items-center space-x-1.5 p-2 bg-black text-white hover:bg-zinc-800 rounded-full sm:px-3 sm:py-1.5 transition-all duration-200 active:scale-95 shadow-sm"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold px-0.5">{totalCartItemCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Dropdown */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-2.5 bg-[#E8E2D3] border-t border-[#D3CBBA] lg:hidden overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search keepsakes, preservation frames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-sm bg-[#DFD8C7] border border-[#D3CBBA] text-zinc-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                <div className="flex items-center justify-between pb-6 border-b border-[#D3CBBA]">
                  <div>
                    <div className="font-serif text-lg font-bold tracking-[0.2em] uppercase text-zinc-900">
                      MELT SPARKLE
                    </div>
                    <p className="text-[11px] text-zinc-600 italic">Keeping memories alive!</p>
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
                    onClick={() => {
                      setIsTrackOrderOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wider text-zinc-900 hover:bg-[#DFD8C7] rounded-lg text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-zinc-700" />
                      <span>TRACK MY PARCEL</span>
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
