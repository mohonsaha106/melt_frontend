import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  MessageSquare, 
  X, 
  Share2, 
  Facebook,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ReviewItem {
  id: string;
  imageUrl: string;
  likes: number;
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'rev-1',
    imageUrl: '/reviews/review-1.jpg',
    likes: 942
  },
  {
    id: 'rev-2',
    imageUrl: '/reviews/550887156_122140264028658912_2420151643039578278_n.jpg',
    likes: 835
  },
  {
    id: 'rev-3',
    imageUrl: '/reviews/548275486_122139653252658912_1171929115424733035_n.jpg',
    likes: 1120
  },
  {
    id: 'rev-4',
    imageUrl: '/reviews/550325310_122140266320658912_7231201057920921566_n.jpg',
    likes: 674
  },
  {
    id: 'rev-5',
    imageUrl: '/reviews/547892469_122139653288658912_6983553257105059459_n.jpg',
    likes: 512
  },
  {
    id: 'rev-6',
    imageUrl: '/reviews/530862365_122136102956658912_5285189544644175084_n.jpg',
    likes: 785
  },
  {
    id: 'rev-7',
    imageUrl: '/reviews/529954523_122136102572658912_4395678324086200379_n.jpg',
    likes: 930
  },
  {
    id: 'rev-8',
    imageUrl: '/reviews/530369802_122136102872658912_861243861180862681_n.jpg',
    likes: 640
  },
  {
    id: 'rev-9',
    imageUrl: '/reviews/530737022_122136102914658912_6299992063989738786_n.jpg',
    likes: 495
  },
  {
    id: 'rev-10',
    imageUrl: '/reviews/530825121_122136104126658912_725598718912369336_n.jpg',
    likes: 820
  },
  {
    id: 'rev-11',
    imageUrl: '/reviews/531991485_122136103058658912_9082694112449445704_n.jpg',
    likes: 560
  },
  {
    id: 'rev-12',
    imageUrl: '/reviews/531472350_122136104528658912_2534129853920902118_n.jpg',
    likes: 730
  },
  {
    id: 'rev-13',
    imageUrl: '/reviews/530195238_122136103994658912_7719482844536378395_n.jpg',
    likes: 685
  },
  {
    id: 'rev-14',
    imageUrl: '/reviews/530673008_122136104222658912_2292925792137403542_n.jpg',
    likes: 890
  },
  {
    id: 'rev-15',
    imageUrl: '/reviews/530234762_122136105134658912_7891032009791287219_n.jpg',
    likes: 615
  },
  {
    id: 'rev-16',
    imageUrl: '/reviews/530648732_122136103772658912_7197471774068674529_n.jpg',
    likes: 540
  },
  {
    id: 'rev-17',
    imageUrl: '/reviews/531826935_122136562982658912_6635618904649876606_n.jpg',
    likes: 760
  },
  {
    id: 'rev-18',
    imageUrl: '/reviews/533073547_122136562988658912_7621633534969610494_n.jpg',
    likes: 690
  }
];

export const ReviewsPage: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ReviewItem | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Customer Reviews | Melt Sparkle';
  }, []);

  // Prevent background scroll when modal is active without causing layout shift
  useEffect(() => {
    if (activeItem) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeItem]);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (_item?: ReviewItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const activeIndex = useMemo(() => {
    if (!activeItem) return -1;
    return REVIEW_ITEMS.findIndex(item => item.id === activeItem.id);
  }, [activeItem]);

  const goToPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex > 0) {
      setActiveItem(REVIEW_ITEMS[activeIndex - 1]);
    } else {
      setActiveItem(REVIEW_ITEMS[REVIEW_ITEMS.length - 1]);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex < REVIEW_ITEMS.length - 1) {
      setActiveItem(REVIEW_ITEMS[activeIndex + 1]);
    } else {
      setActiveItem(REVIEW_ITEMS[0]);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, activeIndex]);

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-6 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Customer Reviews</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Shop Keepsakes</span>
          </Link>
        </div>

        {/* =========================================
            PURE PINTEREST-STYLE MASONRY GRID
            - Images only (Chat screenshots)
            - NO text boxes or captions below
            - GPU & Layout containment prevents any column shaking
           ========================================= */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-3 sm:gap-4 md:gap-5">
          {REVIEW_ITEMS.map((item) => {
            const isLiked = likedItems[item.id];
            const isSaved = savedItems[item.id];
            const currentLikes = isLiked ? item.likes + 1 : item.likes;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                style={{
                  breakInside: 'avoid',
                  contain: 'layout paint',
                  transform: 'translateZ(0)',
                }}
                className="inline-block w-full mb-3 sm:mb-4 md:mb-5 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5 shadow-xs hover:shadow-xl transition-shadow duration-300 cursor-pointer select-none"
              >
                {/* Image (Natural height flow - all review chats contained directly inside image) */}
                <img
                  src={item.imageUrl}
                  alt="Customer Review Screenshot"
                  loading="lazy"
                  className="w-full h-auto object-cover select-none block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Pinterest dark overlay on hover */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                {/* Top Right: Iconic Pinterest Red Save Button */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1.5">
                  <button
                    onClick={(e) => toggleSave(item.id, e)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center space-x-1.5 ${
                      isSaved
                        ? 'bg-zinc-900 text-white'
                        : 'bg-[#E60023] hover:bg-[#ad081b] text-white'
                    }`}
                    aria-label="Save pin"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Bottom Bar: Action buttons on hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between">
                  {/* Share button */}
                  <button
                    onClick={(e) => handleShare(item, e)}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-md backdrop-blur-md transition-all active:scale-90"
                    title="Share"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="flex items-center space-x-1 py-1.5 px-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-md backdrop-blur-md transition-all active:scale-90 text-xs font-semibold"
                    title="Like"
                    aria-label="Like"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isLiked ? 'text-red-500 fill-red-500' : 'text-zinc-700'
                      }`}
                    />
                    <span>{currentLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Submission Banner */}
        <div className="mt-16 sm:mt-20 bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Share Your Keepsake Photo Review</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif">
              Want Your Review Featured Here?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-2 leading-relaxed">
              Send us your keepsake unboxing photo or chat feedback on Facebook or WhatsApp to receive a <strong>10% OFF voucher</strong> on your next handcrafted order!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://www.facebook.com/Meltsparkle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md flex items-center space-x-2"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Send via Facebook</span>
            </a>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md flex items-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* =========================================
          FULLSCREEN PINTEREST LIGHTBOX MODAL (PORTAL)
          - Rendered in document.body to isolate DOM & eliminate any layout shifts
          - Zero loading delay (cached instantly)
          - Silky smooth entrance & exit transition
         ========================================= */}
      {createPortal(
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key="reviews-lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md"
            >
              {/* Modal Dialog Body */}
              <motion.div
                key="reviews-lightbox-dialog"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-[92vw] md:max-w-[85vw] lg:max-w-[75vw] max-h-[94vh] flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* Top Floating Control Bar - Exactly 3 buttons: Left (Shop Similar + Share), Right (Close) */}
                <div className="w-full flex items-center justify-between pb-3 text-white px-1 sm:px-2">
                  {/* Left Side: Shop Similar & Share */}
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/shop"
                      onClick={() => setActiveItem(null)}
                      className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#E8E2D3] hover:bg-white text-black text-xs font-bold tracking-wide transition-all active:scale-95 shadow-md select-none"
                    >
                      <span>Shop Similar</span>
                    </Link>

                    <button
                      onClick={(e) => handleShare(activeItem, e)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10"
                      title="Share link"
                      aria-label="Share review"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right Side: Cross / Close Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveItem(null)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10"
                      aria-label="Close"
                      title="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Image Container */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center min-h-[220px] max-h-[82vh]">
                  <img
                    src={activeItem.imageUrl}
                    alt="Customer Review Screenshot"
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl select-none block"
                  />

                  {/* Left Navigation Arrow */}
                  <button
                    onClick={goToPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all active:scale-90 border border-white/20 z-10"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Navigation Arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all active:scale-90 border border-white/20 z-10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Floating Copied Link Toast Notification (PORTAL) */}
      {createPortal(
        <AnimatePresence>
          {copiedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-[10000] bg-black text-[#E8E2D3] px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-semibold border border-white/20"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Link copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
