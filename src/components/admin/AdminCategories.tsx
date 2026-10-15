import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useAdmin } from '../../context/AdminContext';
import { CategoryItem } from '../../types/admin';
import { 
  Search, 
  Edit3, 
  Trash2, 
  FolderPlus, 
  Sparkles, 
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [dragOverField, setDragOverField] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categorySlug: '',
    subtitle: '',
    primaryImage: '',
    secondaryImage1: '',
    secondaryImage2: ''
  });

  // Calculate live product count for each category
  const categoriesWithCounts = useMemo(() => {
    return categories.map(cat => {
      const matchCount = products.filter(
        p => p.category === cat.categorySlug || p.category === cat.id
      ).length;
      return {
        ...cat,
        computedCount: matchCount > 0 ? matchCount : (cat.count || 0)
      };
    });
  }, [categories, products]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoriesWithCounts;
    return categoriesWithCounts.filter(cat => 
      cat.name.toLowerCase().includes(q) ||
      cat.categorySlug.toLowerCase().includes(q) ||
      (cat.subtitle && cat.subtitle.toLowerCase().includes(q))
    );
  }, [categoriesWithCounts, searchQuery]);

  // Handle direct file upload for primary / secondary images
  const handleFileUpload = (
    file: File, 
    field: 'primaryImage' | 'secondaryImage1' | 'secondaryImage2'
  ) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert('File is too large. Please select an image under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      categorySlug: '',
      subtitle: '',
      primaryImage: '',
      secondaryImage1: '',
      secondaryImage2: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      categorySlug: cat.categorySlug,
      subtitle: cat.subtitle || '',
      primaryImage: cat.image || '',
      secondaryImage1: cat.secondaryImages?.[0] || '',
      secondaryImage2: cat.secondaryImages?.[1] || ''
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name,
      categorySlug: (!editingCategory || prev.categorySlug === editingCategory.categorySlug) ? autoSlug : prev.categorySlug
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = formData.categorySlug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const primaryImg = formData.primaryImage || DEFAULT_FALLBACK_IMAGE;
    const secondaryImgs = [formData.secondaryImage1, formData.secondaryImage2].filter(Boolean);

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: formData.name.trim(),
        categorySlug: slug,
        subtitle: formData.subtitle.trim(),
        image: primaryImg,
        secondaryImages: secondaryImgs.length > 0 ? secondaryImgs : undefined
      });
    } else {
      addCategory({
        name: formData.name.trim(),
        categorySlug: slug,
        subtitle: formData.subtitle.trim(),
        image: primaryImg,
        secondaryImages: secondaryImgs.length > 0 ? secondaryImgs : undefined,
        count: 0
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <span>Keepsake Categories</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#0a5c36]">
              {categories.length} Total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, and organize resin art categories. These display on the homepage carousel and shop filters.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>+ Create Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name, slug, or badge..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] shadow-2xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-[#0a5c36]/40 hover:shadow-xs transition-all group relative overflow-hidden"
          >
            {/* Top Visual Preview & Badge */}
            <div className="flex items-start space-x-3.5">
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 ring-2 ring-slate-200 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                    }}
                  />
                </div>
                {cat.secondaryImages && cat.secondaryImages.length > 0 && (
                  <div className="absolute -bottom-1 -right-1 flex -space-x-1.5">
                    {cat.secondaryImages.map((secImg, sIdx) => (
                      <div
                        key={sIdx}
                        className="w-5 h-5 rounded-full ring-1.5 ring-white bg-slate-100 overflow-hidden shadow-2xs"
                        title={`Secondary #${sIdx + 1}`}
                      >
                        <img
                          src={secImg}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {cat.name}
                  </h3>
                  {cat.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#0a5c36]">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.subtitle || 'Handcrafted bespoke keepsake collection'}
                </p>

                <div className="flex items-center space-x-2 mt-2 font-mono text-[10px] text-slate-500">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    /{cat.categorySlug}
                  </span>
                  <span>•</span>
                  <span className="text-[#0a5c36] font-semibold">
                    {cat.computedCount} items
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-600">
                {cat.priceText || 'Custom Pricing'}
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(cat.id)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Delete Confirmation Overlay */}
            {deleteConfirmId === cat.id && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center z-10 animate-fade-in border border-rose-200 rounded-2xl">
                <p className="text-xs font-bold text-slate-900 mb-1">Delete "{cat.name}"?</p>
                <p className="text-[10px] text-slate-500 mb-3">
                  This will remove it from the homepage and filter lists.
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FolderPlus className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No categories found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or create a new keepsake category.
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 rounded-lg bg-[#0a5c36] text-white text-xs font-semibold cursor-pointer"
          >
            Create Category
          </button>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 9999 }}
        >
          {/* Full-bleed edge-to-edge dark backdrop overlay */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 -top-24 -bottom-24 -left-24 -right-24 bg-slate-950/75 sm:bg-slate-950/80 backdrop-blur-sm cursor-pointer transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card Content (relative z-10) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full text-slate-900 shadow-2xl relative z-10 flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-hidden my-auto"
          >
            
            {/* Modal Header (Pinned) */}
            <div className="shrink-0 px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {editingCategory ? 'Edit Keepsake Category' : 'Create New Keepsake Category'}
                  </h2>
                  <p className="text-[11px] text-slate-500 truncate">
                    Configure category name, visual images, and storefront display.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form wrapping body and footer */}
            <form onSubmit={handleSave} className="flex-1 min-h-0 flex flex-col overflow-hidden">
              
              {/* Scrollable Form Body */}
              <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 overscroll-contain">
                
                {/* Category Name & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Wedding Keepsakes"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.categorySlug}
                      onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                      placeholder="e.g. wedding-keepsakes"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-mono text-[#0a5c36] focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle / Description Line
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Garland & bridal flower preservation frames"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                {/* Category Images Direct Upload: 1 Primary + 2 Secondary */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Category Images <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      1 Primary + 2 Secondary Placeholders
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    
                    {/* 1. Primary Image (Featured / Cover) */}
                    <div className="col-span-2 sm:col-span-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#0a5c36]" />
                          <span>Primary Cover *</span>
                        </span>
                        {formData.primaryImage && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, primaryImage: '' }))}
                            className="text-[10px] text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {formData.primaryImage ? (
                        <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-50 h-28 sm:h-36 flex items-center justify-center">
                          <img
                            src={formData.primaryImage}
                            alt="Primary preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                            <label className="px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold cursor-pointer shadow-xs transition-transform active:scale-95">
                              Change Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, 'primaryImage');
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                          <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium backdrop-blur-2xs">
                            Primary
                          </span>
                        </div>
                      ) : (
                        <label
                          onDragOver={(e) => { e.preventDefault(); setDragOverField('primary'); }}
                          onDragLeave={() => setDragOverField(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverField(null);
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleFileUpload(file, 'primaryImage');
                          }}
                          className={`
                            h-28 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2.5 text-center cursor-pointer transition-all
                            ${dragOverField === 'primary' 
                              ? 'border-[#0a5c36] bg-[#e6f4ea]/40' 
                              : 'border-slate-300 hover:border-[#0a5c36] bg-slate-50/70 hover:bg-[#e6f4ea]/20'
                            }
                          `}
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0a5c36] shadow-2xs mb-1">
                            <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">Upload Primary</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG or WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'primaryImage');
                              e.target.value = '';
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* 2. Secondary Image 1 */}
                    <div className="col-span-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="truncate">Secondary 1</span>
                        {formData.secondaryImage1 && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, secondaryImage1: '' }))}
                            className="text-[10px] text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {formData.secondaryImage1 ? (
                        <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-50 h-24 sm:h-36 flex items-center justify-center">
                          <img
                            src={formData.secondaryImage1}
                            alt="Secondary 1 preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                            <label className="px-2 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-[10px] sm:text-[11px] font-semibold cursor-pointer shadow-xs transition-transform active:scale-95">
                              Change
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, 'secondaryImage1');
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                          <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium backdrop-blur-2xs">
                            #1
                          </span>
                        </div>
                      ) : (
                        <label
                          onDragOver={(e) => { e.preventDefault(); setDragOverField('sec1'); }}
                          onDragLeave={() => setDragOverField(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverField(null);
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleFileUpload(file, 'secondaryImage1');
                          }}
                          className={`
                            h-24 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all
                            ${dragOverField === 'sec1' 
                              ? 'border-[#0a5c36] bg-[#e6f4ea]/40' 
                              : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-100/60'
                            }
                          `}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs mb-1">
                            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-700">+ Sec 1</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">Optional</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'secondaryImage1');
                              e.target.value = '';
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* 3. Secondary Image 2 */}
                    <div className="col-span-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="truncate">Secondary 2</span>
                        {formData.secondaryImage2 && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, secondaryImage2: '' }))}
                            className="text-[10px] text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {formData.secondaryImage2 ? (
                        <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-50 h-24 sm:h-36 flex items-center justify-center">
                          <img
                            src={formData.secondaryImage2}
                            alt="Secondary 2 preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                            <label className="px-2 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-[10px] sm:text-[11px] font-semibold cursor-pointer shadow-xs transition-transform active:scale-95">
                              Change
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, 'secondaryImage2');
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                          <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium backdrop-blur-2xs">
                            #2
                          </span>
                        </div>
                      ) : (
                        <label
                          onDragOver={(e) => { e.preventDefault(); setDragOverField('sec2'); }}
                          onDragLeave={() => setDragOverField(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverField(null);
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleFileUpload(file, 'secondaryImage2');
                          }}
                          className={`
                            h-24 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all
                            ${dragOverField === 'sec2' 
                              ? 'border-[#0a5c36] bg-[#e6f4ea]/40' 
                              : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-100/60'
                            }
                          `}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs mb-1">
                            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-700">+ Sec 2</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">Optional</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'secondaryImage2');
                              e.target.value = '';
                            }}
                          />
                        </label>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              {/* Submit Buttons Footer: pinned at bottom */}
              <div className="shrink-0 px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-slate-50/90 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2 rounded-xl bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
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

