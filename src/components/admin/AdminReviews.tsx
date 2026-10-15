import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { AdminReview } from '../../types/admin';
import { CustomSelect } from '../ui/CustomSelect';
import { 
  Star, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Upload, 
  X, 
  ExternalLink, 
  Heart, 
  MessageSquare, 
  Link2, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview, products } = useAdmin();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'linked' | 'unlinked'>('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [activeReview, setActiveReview] = useState<AdminReview | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShare = (_review?: AdminReview | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + '/reviews');
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // Simplified Form State: Only Image & Product Selection Option
  const [formData, setFormData] = useState<{
    imageUrl: string;
    productUrl: string;
    productName: string;
  }>({
    imageUrl: '',
    productUrl: '',
    productName: '',
  });

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        (rev.author && rev.author.toLowerCase().includes(q)) ||
        (rev.comment && rev.comment.toLowerCase().includes(q)) ||
        (rev.productName && rev.productName.toLowerCase().includes(q)) ||
        (rev.productUrl && rev.productUrl.toLowerCase().includes(q));

      const matchesFilter = 
        activeFilter === 'all' || 
        (activeFilter === 'linked' && Boolean(rev.productUrl)) ||
        (activeFilter === 'unlinked' && !rev.productUrl);

      return matchesSearch && matchesFilter;
    });
  }, [reviews, searchQuery, activeFilter]);

  // Lightbox index and navigation
  const activeIndex = useMemo(() => {
    if (!activeReview) return -1;
    return filteredReviews.findIndex(r => r.id === activeReview.id);
  }, [activeReview, filteredReviews]);

  const goToPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredReviews.length === 0) return;
    if (activeIndex > 0) {
      setActiveReview(filteredReviews[activeIndex - 1]);
    } else {
      setActiveReview(filteredReviews[filteredReviews.length - 1]);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredReviews.length === 0) return;
    if (activeIndex < filteredReviews.length - 1) {
      setActiveReview(filteredReviews[activeIndex + 1]);
    } else {
      setActiveReview(filteredReviews[0]);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeReview) return;
      if (e.key === 'Escape') setActiveReview(null);
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReview, activeIndex, filteredReviews]);

  // Handle direct file upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  // Open modal for Adding new review
  const handleOpenAdd = () => {
    setEditingReview(null);
    const defaultProduct = products[0];
    setFormData({
      imageUrl: '',
      productUrl: defaultProduct ? `/#products` : '',
      productName: defaultProduct ? defaultProduct.name : '',
    });
    setIsModalOpen(true);
  };

  // Open modal for Editing review
  const handleOpenEdit = (review: AdminReview) => {
    setEditingReview(review);
    setFormData({
      imageUrl: review.imageUrl,
      productUrl: review.productUrl || '',
      productName: review.productName || review.author || '',
    });
    setIsModalOpen(true);
  };

  // Submit Handler: Only requires image and product URL/selection
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl.trim()) {
      alert('Please upload an image for the review.');
      return;
    }
    if (!formData.productUrl.trim()) {
      alert('Please enter or select a product URL.');
      return;
    }

    if (editingReview) {
      updateReview({
        ...editingReview,
        imageUrl: formData.imageUrl,
        productUrl: formData.productUrl,
        productName: formData.productName || editingReview.productName || 'Keepsake Product'
      });
    } else {
      addReview({
        author: formData.productName ? `${formData.productName} Review` : 'Verified Customer',
        rating: 5,
        comment: '',
        imageUrl: formData.imageUrl,
        productUrl: formData.productUrl,
        productName: formData.productName || 'Keepsake Product',
        likes: Math.floor(100 + Math.random() * 400),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        verifiedPurchase: true
      });
    }

    setIsModalOpen(false);
  };

  // Handle Delete with confirmation
  const handleDelete = (review: AdminReview) => {
    if (window.confirm(`Are you sure you want to delete this review?`)) {
      deleteReview(review.id);
    }
  };

  // Options for selecting from existing products
  const productOptions = useMemo(() => {
    return [
      { value: 'custom', label: 'Custom URL (Enter manually)' },
      ...products.map(p => ({
        value: p.id,
        label: `${p.name} (${p.sku})`
      }))
    ];
  }, [products]);

  return (
    <div className="space-y-6">
      
      {/* Top Header: Title, Description, and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Customer Reviews
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#0a5c36]">
              {reviews.length} Active Pins
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pinterest-style customer testimonials and photo review gallery.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <a
            href="/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer shrink-0"
            title="Open live customer reviews storefront page"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live Page</span>
          </a>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#0a5c36] hover:bg-[#074628] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        </div>
      </div>

      {/* Metrics Highlights Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Reviews
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {reviews.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Active photo testimonials
          </div>
        </div>

        

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Photo Reviews
          </div>
          <div className="text-2xl font-bold text-[#0a5c36] mt-1">
            {reviews.filter(r => Boolean(r.imageUrl)).length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Direct image testimonials
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Linked Products
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {reviews.filter(r => Boolean(r.productUrl)).length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Connected to catalog
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews, product, URL..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'all' as const, label: `All Reviews (${reviews.length})` },
            { id: 'linked' as const, label: `Linked to Product (${reviews.filter(r => Boolean(r.productUrl)).length})` },
            { id: 'unlinked' as const, label: `Unlinked (${reviews.filter(r => !r.productUrl).length})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          PURE PINTEREST-STYLE MASONRY GRID
          Matching http://localhost:3000/reviews exactly
          - Natural height flow image cards
          - Hover dark overlay with iconic Pinterest-style action buttons
          - Click card to open fullscreen lightbox
         ========================================= */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No reviews found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {searchQuery
              ? `No reviews match "${searchQuery}". Try clearing your search.`
              : 'Start by uploading customer photo testimonials to showcase in your store.'}
          </p>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-[#0a5c36] font-semibold hover:underline"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={handleOpenAdd}
              className="mt-4 inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0a5c36] text-white text-xs font-semibold hover:bg-[#074628] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Review</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-[#E8E2D3] rounded-3xl p-3 sm:p-5 md:p-6 border border-[#D3CBBA]/80 shadow-xs">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-3 sm:gap-4 md:gap-5">
            {filteredReviews.map((review, idx) => (
              <div
                key={review.id}
                onClick={() => setActiveReview(review)}
                style={{
                  breakInside: 'avoid',
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                }}
                className="break-inside-avoid inline-block w-full mb-3 sm:mb-4 md:mb-5 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* Image (Natural height flow - all review chats & photos uncropped) */}
                <img
                  src={review.imageUrl}
                  alt={review.productName || 'Customer Review'}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-auto object-cover select-none block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Pinterest dark overlay on hover */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                {/* Top Right: Iconic Pinterest-Style Edit & Delete Buttons on Hover */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(review);
                    }}
                    className="px-3.5 py-2 rounded-full text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center space-x-1.5 bg-[#E60023] hover:bg-[#ad081b] text-white"
                    aria-label="Edit review"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(review);
                    }}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-zinc-900 hover:text-red-600 shadow-md backdrop-blur-md transition-all active:scale-90"
                    aria-label="Delete review"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Bar: Linked Product Chip & Likes Pill on hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
                  {/* Left: Linked Product / Visit URL */}
                  {review.productName ? (
                    <a
                      href={review.productUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1.5 py-1.5 px-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-md backdrop-blur-md transition-all active:scale-95 text-xs font-semibold max-w-[65%] truncate"
                      title={review.productName}
                    >
                      <Link2 className="w-3.5 h-3.5 text-[#0a5c36] shrink-0" />
                      <span className="truncate">{review.productName}</span>
                      {review.productUrl && <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0" />}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(review);
                      }}
                      className="flex items-center space-x-1.5 py-1.5 px-3 rounded-full bg-white/90 hover:bg-white text-zinc-700 shadow-md backdrop-blur-md transition-all active:scale-95 text-xs font-medium"
                      title="Link to a catalog product"
                    >
                      <Link2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>+ Link Product</span>
                    </button>
                  )}

                  {/* Right: Likes pill (identical to ReviewsPage) */}
                  <div
                    className="flex items-center space-x-1 py-1.5 px-3 rounded-full bg-white/90 text-zinc-900 shadow-md backdrop-blur-md text-xs font-semibold shrink-0"
                    title={`${review.likes || 120} Likes`}
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{review.likes || 120}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          FULLSCREEN PINTEREST LIGHTBOX MODAL (PORTAL)
          Matching ReviewsPage.tsx exactly
         ========================================= */}
      {createPortal(
        <AnimatePresence>
          {activeReview && (
            <motion.div
              key="admin-reviews-lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setActiveReview(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md"
            >
              {/* Modal Dialog Body */}
              <motion.div
                key="admin-reviews-lightbox-dialog"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-[92vw] md:max-w-[85vw] lg:max-w-[75vw] max-h-[94vh] flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* Top Floating Control Bar - Exactly 3 buttons: Left (Shop Similar + Share), Right (Cross) */}
                <div className="w-full flex items-center justify-between pb-3 text-white px-1 sm:px-2">
                  {/* Left Side: Shop Similar & Share */}
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/shop"
                      onClick={() => setActiveReview(null)}
                      className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#E8E2D3] hover:bg-white text-black text-xs font-bold tracking-wide transition-all active:scale-95 shadow-md select-none"
                    >
                      <span>Shop Similar</span>
                    </Link>

                    <button
                      onClick={(e) => handleShare(activeReview, e)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10 cursor-pointer"
                      title="Share link"
                      aria-label="Share review"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right Side: Cross / Close Button */}
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveReview(null)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all active:scale-90 border border-white/10 cursor-pointer"
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
                    src={activeReview.imageUrl}
                    alt={activeReview.productName || 'Customer Review Screenshot'}
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

      {/* Add / Edit Review Modal (Simplified: ONLY Image Upload & Product Selection Option) */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Full-bleed Backdrop */}
          <div
            className="fixed inset-0 -top-24 -bottom-24 -left-24 -right-24 bg-slate-950/75 sm:bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            
            {/* Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                  <Upload className="w-4 h-4 text-[#0a5c36]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingReview ? 'Edit Customer Review' : 'Add Customer Review'}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Upload customer photo and select the associated product.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
                
                {/* 1. Direct Image Upload Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Review Image *
                    </label>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, WebP photo or chat screenshot
                    </span>
                  </div>

                  {formData.imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group max-h-60">
                      <img
                        src={formData.imageUrl}
                        alt="Uploaded review preview"
                        className="w-full max-h-60 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-semibold shadow hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          Replace Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow hover:bg-rose-700 cursor-pointer transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
                        isDragOver
                          ? 'border-[#0a5c36] bg-emerald-50/50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center mx-auto mb-2.5">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        Click to upload customer review image
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        or drag and drop your photo file here
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                      e.target.value = '';
                    }}
                  />
                </div>

                {/* 2. Product Selection Option (Select Product or URL) */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-900">
                      Product Selection Option *
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pick a product from your catalog or enter its URL.
                    </p>
                  </div>

                  {/* Pick From Store Products Custom Dropdown */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Select Store Product:
                    </label>
                    <CustomSelect
                      placeholder="Choose a product to connect..."
                      searchPlaceholder="Search store products..."
                      value="custom"
                      onChange={(productId) => {
                        if (productId !== 'custom') {
                          const prod = products.find(p => p.id === productId);
                          if (prod) {
                            setFormData(prev => ({
                              ...prev,
                              productName: prod.name,
                              productUrl: `/#products`
                            }));
                          }
                        }
                      }}
                      options={productOptions}
                    />
                  </div>

                  {/* Product URL input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product URL *
                    </label>
                    <div className="relative flex items-center">
                      <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.productUrl}
                        onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                        placeholder="e.g. /#products or https://..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs text-slate-900 focus:outline-none focus:border-[#0a5c36] focus:ring-2 focus:ring-[#0a5c36]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Product Name Display */}
                  {formData.productName && (
                    <div className="flex items-center justify-between text-xs text-slate-600 px-1 pt-0.5">
                      <span className="text-[11px] text-slate-400">Selected Product:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[280px]">
                        {formData.productName}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Pinned Footer */}
              <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200/90 flex items-center justify-end space-x-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0a5c36] hover:bg-[#074628] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  {editingReview ? 'Save Changes' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
