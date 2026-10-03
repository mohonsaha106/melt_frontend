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
  Tag,
  Truck,
  MessageCircle
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
    isCustomStudioOpen,
    setIsCustomStudioOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedCategory('all');
    setSelectedPlacement(null);
  };

  const isPathActive = (paths: string[]) => {
    return paths.some((p) => location.pathname === p || (p !== '/' && location.pathname.startsWith(p)));
  };

  const isShopActive = isPathActive(['/shop', '/catalog', '/products']);
  const isOffersActive = isPathActive(['/sepcial-offer', '/special-offer', '/special-offers', '/offers']);
  const isReviewsActive = isPathActive(['/reviews', '/review', '/gallery', '/lookbook']);
  const isHowToOrderActive = isPathActive(['/how-to-order', '/howtoorder', '/order-process']);
  const isFaqActive = isPathActive(['/faq', '/faqs']);
  const isAboutActive = isPathActive(['/about', '/about-us', '/contact']);

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
              <Link
                to="/shop"
                className={`py-1 relative transition-colors ${
                  isShopActive
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:scale-x-100'
                    : 'text-zinc-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                SHOP
              </Link>

              <Link
                to="/sepcial-offer"
                className={`py-1 relative flex items-center gap-1 transition-colors ${
                  isOffersActive
                    ? 'text-rose-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-700 after:scale-x-100'
                    : 'text-rose-700 hover:text-rose-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-700 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                <Tag className="w-3 h-3 text-rose-600" />
                OFFERS
              </Link>

              <Link
                to="/reviews"
                className={`py-1 relative transition-colors ${
                  isReviewsActive
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:scale-x-100'
                    : 'text-zinc-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                REVIEWS
              </Link>

              <button
                onClick={() => setIsCustomStudioOpen(true)}
                className={`py-1 relative flex items-center gap-1 transition-colors ${
                  isCustomStudioOpen
                    ? 'text-amber-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-800 after:scale-x-100'
                    : 'text-amber-800 hover:text-amber-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-800 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                {/* <Sparkles className="w-3.5 h-3.5 text-amber-600" /> */}
                CUSTOM STUDIO
              </button>

              <Link
                to="/how-to-order"
                className={`py-1 relative transition-colors ${
                  isHowToOrderActive
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:scale-x-100'
                    : 'text-zinc-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                HOW TO ORDER
              </Link>

              {/* <button
                onClick={() => setIsHowToApplyOpen(true)}
                className="hover:text-black transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                KEEPSAKE GUIDE
              </button> */}

              <Link
                to="/faq"
                className={`py-1 relative transition-colors ${
                  isFaqActive
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:scale-x-100'
                    : 'text-zinc-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                FAQ
              </Link>

              <Link
                to="/about"
                className={`py-1 relative transition-colors ${
                  isAboutActive
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:scale-x-100'
                    : 'text-zinc-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                }`}
              >
                ABOUT
              </Link>
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

                <div className="mt-4 space-y-1">
                  {/* Search */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-medium text-zinc-800 bg-[#DFD8C7]/70 hover:bg-[#DFD8C7] rounded-xl text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="w-4 h-4 text-zinc-600" />
                      <span>Search</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  {/* Special Offers */}
                  <Link
                    to="/sepcial-offer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm font-semibold rounded-xl text-left transition-colors ${
                      isOffersActive
                        ? 'text-rose-900 bg-rose-500/20 border-l-4 border-rose-700 pl-3.5'
                        : 'text-rose-800 bg-rose-500/10 hover:bg-rose-500/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Tag className="w-4 h-4 text-rose-600" />
                      <span className={isOffersActive ? 'underline decoration-rose-700 decoration-2 underline-offset-4' : ''}>Special Offers</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </Link>

                  {/* Shop */}
                  <Link
                    to="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm rounded-xl text-left transition-colors ${
                      isShopActive
                        ? 'font-bold text-black bg-[#D4CCB8] border-l-4 border-black pl-3.5'
                        : 'font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="w-4 h-4 text-zinc-600" />
                      <span className={isShopActive ? 'underline decoration-black decoration-2 underline-offset-4' : ''}>Shop</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {/* Custom Studio */}
                  <button
                    onClick={() => {
                      setIsCustomStudioOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm font-semibold rounded-xl text-left transition-colors ${
                      isCustomStudioOpen
                        ? 'text-amber-950 bg-[#D4CCB8] border-l-4 border-amber-700 pl-3.5'
                        : 'text-amber-900 bg-[#DFD8C7]/90 hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className={isCustomStudioOpen ? 'underline decoration-amber-700 decoration-2 underline-offset-4' : ''}>Custom Studio</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-600" />
                  </button>

                  {/* Reviews */}
                  <Link
                    to="/reviews"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm rounded-xl text-left transition-colors ${
                      isReviewsActive
                        ? 'font-bold text-black bg-[#D4CCB8] border-l-4 border-black pl-3.5'
                        : 'font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="w-4 h-4 text-zinc-600" />
                      <span className={isReviewsActive ? 'underline decoration-black decoration-2 underline-offset-4' : ''}>Reviews</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {/* How To Order */}
                  <Link
                    to="/how-to-order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm rounded-xl text-left transition-colors ${
                      isHowToOrderActive
                        ? 'font-bold text-black bg-[#D4CCB8] border-l-4 border-black pl-3.5'
                        : 'font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Truck className="w-4 h-4 text-zinc-600" />
                      <span className={isHowToOrderActive ? 'underline decoration-black decoration-2 underline-offset-4' : ''}>How To Order</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {/* Care Guide */}
                  <button
                    onClick={() => {
                      setIsHowToApplyOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7] rounded-xl text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-4 h-4 text-zinc-600" />
                      <span>Care Guide</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  {/* FAQ */}
                  <Link
                    to="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm rounded-xl text-left transition-colors ${
                      isFaqActive
                        ? 'font-bold text-black bg-[#D4CCB8] border-l-4 border-black pl-3.5'
                        : 'font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-4 h-4 text-zinc-600" />
                      <span className={isFaqActive ? 'underline decoration-black decoration-2 underline-offset-4' : ''}>FAQ</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {/* About */}
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-between py-2.5 px-3 text-sm rounded-xl text-left transition-colors ${
                      isAboutActive
                        ? 'font-bold text-black bg-[#D4CCB8] border-l-4 border-black pl-3.5'
                        : 'font-medium text-zinc-800 hover:text-black hover:bg-[#DFD8C7]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Info className="w-4 h-4 text-zinc-600" />
                      <span className={isAboutActive ? 'underline decoration-black decoration-2 underline-offset-4' : ''}>About Us</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-[#DFD8C7] border-t border-[#D3CBBA] space-y-2">
                <a
                  href="https://www.facebook.com/Meltsparkle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-zinc-900 text-[#E8E2D3] text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 hover:bg-black transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook Page</span>
                </a>
                <a
                  href="https://wa.me/8801712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 hover:bg-[#20ba5a] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
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
