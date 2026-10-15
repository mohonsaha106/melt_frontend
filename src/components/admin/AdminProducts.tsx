import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAdmin } from '../../context/AdminContext';
import { Product, TattooCategory, ProductSizeOption } from '../../types';
import { CustomSelect } from '../ui/CustomSelect';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  X, 
  Gift,
  Upload,
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [isPresetDropdownOpen, setIsPresetDropdownOpen] = useState(false);
  const presetDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (presetDropdownRef.current && !presetDropdownRef.current.contains(event.target as Node)) {
        setIsPresetDropdownOpen(false);
      }
    };
    if (isPresetDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPresetDropdownOpen]);
  
  // Dynamic category filter list
  const categoryFilters = useMemo(() => {
    return [
      { id: 'all', label: 'All Keepsakes' },
      ...categories.map(c => ({ id: c.categorySlug || c.id, label: c.name }))
    ];
  }, [categories]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dragOverField, setDragOverField] = useState<'primary' | 'sec1' | 'sec2' | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    sku: string;
    name: string;
    category: TattooCategory;
    price: number;
    originalPrice: number;
    enableOffer: boolean;
    offerPrice: number;
    tag: Product['tag'];
    primaryImage: string;
    secondaryImage1: string;
    secondaryImage2: string;
    description: string;
    sizes: ProductSizeOption[];
  }>({
    sku: '',
    name: '',
    category: 'preservation',
    price: 1500,
    originalPrice: 1500,
    enableOffer: false,
    offerPrice: 1200,
    tag: 'NEW',
    primaryImage: '',
    secondaryImage1: '',
    secondaryImage2: '',
    description: '',
    sizes: [
      { size: 'S', dimensions: 'Standard Single Piece', price: 1500 },
      { size: 'M', dimensions: 'Deluxe Medium Size', price: 2200 },
      { size: 'L', dimensions: 'Large Statement Piece', price: 3500 }
    ]
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = selectedCat === 'all' || p.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCat, searchQuery]);

  const handleFileUpload = (file: File, field: 'primaryImage' | 'secondaryImage1' | 'secondaryImage2') => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData(prev => ({
          ...prev,
          [field]: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      sku: `MS-${Math.floor(100 + products.length + 1)}`,
      name: '',
      category: (categories[0]?.categorySlug as TattooCategory) || 'preservation',
      price: 1500,
      originalPrice: 1500,
      enableOffer: false,
      offerPrice: 1200,
      tag: 'NEW',
      primaryImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      secondaryImage1: '',
      secondaryImage2: '',
      description: 'Hand-poured crystal clear archival resin keepsake crafted with real botanicals and metallic gold foil flakes.',
      sizes: [
        { size: 'S', dimensions: 'Standard Single', price: 1500 },
        { size: 'M', dimensions: 'Deluxe Medium', price: 2200 },
        { size: 'L', dimensions: 'Grand Statement', price: 3200 }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    const primary = prod.imageUrl || (prod.images && prod.images[0]) || '';
    const secImages = prod.secondaryImages || (prod.images && prod.images.slice(1)) || [];
    const hasDiscount = Boolean(prod.originalPrice && prod.originalPrice > prod.price);
    const origPrice = hasDiscount ? (prod.originalPrice as number) : prod.price;
    const salePrice = prod.price;

    setFormData({
      sku: prod.sku,
      name: prod.name,
      category: prod.category,
      price: salePrice,
      originalPrice: origPrice,
      enableOffer: hasDiscount,
      offerPrice: hasDiscount ? salePrice : Math.round(origPrice * 0.8),
      tag: prod.tag || 'BEST',
      primaryImage: primary,
      secondaryImage1: secImages[0] || '',
      secondaryImage2: secImages[1] || '',
      description: prod.description,
      sizes: prod.sizes && prod.sizes.length > 0 ? prod.sizes : [
        { size: 'S', dimensions: 'Standard', price: salePrice }
      ]
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim()) return;
    if (!formData.primaryImage) {
      alert('Please upload a Primary Cover image.');
      return;
    }

    const secondaryImages = [formData.secondaryImage1, formData.secondaryImage2].filter(Boolean);
    const allImages = [formData.primaryImage, ...secondaryImages].filter(Boolean);
    const originalPrice = formData.originalPrice || 1500;
    const isOfferActive = formData.enableOffer && formData.offerPrice > 0 && formData.offerPrice < originalPrice;
    const sellingPrice = isOfferActive ? formData.offerPrice : originalPrice;

    const productPayload = {
      sku: formData.sku,
      name: formData.name,
      category: formData.category,
      price: sellingPrice,
      originalPrice: isOfferActive ? originalPrice : undefined,
      tag: formData.tag,
      imageUrl: formData.primaryImage,
      images: allImages,
      secondaryImages: secondaryImages,
      description: formData.description,
      placements: editingProduct?.placements || [],
      durability: editingProduct?.durability || 'Lifetime Keepsake',
      sizes: formData.sizes.length > 0 ? formData.sizes : [{ size: 'Standard', dimensions: 'Single piece', price: sellingPrice }],
      isCustomizable: editingProduct?.isCustomizable ?? true,
      isFreeGiftEligible: editingProduct?.isFreeGiftEligible ?? false
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productPayload,
        rating: editingProduct.rating || 5.0,
        reviewCount: editingProduct.reviewCount || 120
      });
    } else {
      addProduct({
        ...productPayload,
        rating: 5.0,
        reviewCount: 45
      });
    }

    setIsModalOpen(false);
  };

  const updateSizeOption = (idx: number, field: keyof ProductSizeOption, val: any) => {
    setFormData(prev => {
      const updated = [...prev.sizes];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, sizes: updated };
    });
  };

  const discountPercentage = useMemo(() => {
    const orig = Number(formData.originalPrice) || 0;
    const offer = Number(formData.offerPrice) || 0;
    if (orig > 0 && offer > 0 && offer < orig) {
      return Math.round(((orig - offer) / orig) * 100);
    }
    return 0;
  }, [formData.originalPrice, formData.offerPrice]);

  const addSizeOption = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [
        ...prev.sizes,
        {
          size: '',
          dimensions: '',
          price: prev.originalPrice || prev.price || 1500
        }
      ]
    }));
  };

  const removeSizeOption = (idx: number) => {
    setFormData(prev => {
      if (prev.sizes.length <= 1) return prev;
      return { ...prev, sizes: prev.sizes.filter((_, i) => i !== idx) };
    });
  };

  const applySizePreset = (preset: 'numbers' | 'letters' | 'dimensions') => {
    const base = formData.originalPrice || formData.price || 1500;
    if (preset === 'numbers') {
      setFormData(prev => ({
        ...prev,
        sizes: [
          { size: '12', dimensions: '12" Keepsake Piece', price: base },
          { size: '14', dimensions: '14" Keepsake Piece', price: base + 700 },
          { size: '16', dimensions: '16" Keepsake Piece', price: base + 1600 }
        ]
      }));
    } else if (preset === 'letters') {
      setFormData(prev => ({
        ...prev,
        sizes: [
          { size: 'S', dimensions: 'Standard Small', price: base },
          { size: 'M', dimensions: 'Deluxe Medium', price: base + 700 },
          { size: 'L', dimensions: 'Grand Statement', price: base + 1700 }
        ]
      }));
    } else if (preset === 'dimensions') {
      setFormData(prev => ({
        ...prev,
        sizes: [
          { size: '8x8"', dimensions: 'Square Keepsake Box', price: base },
          { size: '10x10"', dimensions: 'Centerpiece Block', price: base + 900 },
          { size: '12x12"', dimensions: 'Grand Wall / Table Piece', price: base + 2000 }
        ]
      }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <span>Product Catalog</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#0a5c36]">
              {products.length} Items
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, edit, and organize handcrafted resin keepsakes, manage custom sizes, prices, and tags.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Keepsake</span>
        </button>
      </div>

      {/* Search and Category Filter Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, SKU, or description..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center overflow-x-auto gap-2 pb-1 no-scrollbar text-xs">
          {categoryFilters.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`
                px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer
                ${selectedCat === cat.id
                  ? 'bg-[#e6f4ea] text-[#0a5c36] border border-[#0a5c36]/20 font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-medium border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4 font-semibold">Keepsake Item</th>
                <th className="py-3 px-4 font-semibold">SKU & Category</th>
                <th className="py-3 px-4 font-semibold">Base Price</th>
                <th className="py-3 px-4 font-semibold">Sizes</th>
                <th className="py-3 px-4 font-semibold">Badge Tag</th>
                <th className="py-3 px-4 font-semibold">Free Gift</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* Thumbnail & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-11 h-11 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{prod.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5">
                          {prod.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU & Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-slate-600 font-semibold">{prod.sku}</span>
                    <div className="text-[10px] text-[#0a5c36] capitalize font-medium mt-0.5">
                      {prod.category}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                    <div className="font-bold text-slate-900 text-xs">৳{prod.price}</div>
                    {prod.originalPrice && prod.originalPrice > prod.price && (
                      <div className="text-[10px] text-slate-400 line-through">৳{prod.originalPrice}</div>
                    )}
                  </td>

                  {/* Sizes */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {prod.sizes?.map(s => (
                        <span key={s.size} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600">
                          {s.size}: ৳{s.price}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Tag */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {prod.tag ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] font-bold">
                        {prod.tag}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">—</span>
                    )}
                  </td>

                  {/* Free Gift */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {prod.isFreeGiftEligible ? (
                      <span className="inline-flex items-center space-x-1 text-[#0a5c36] font-semibold text-[11px]">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Eligible</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">No</span>
                    )}
                  </td>

                  {/* Action buttons */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${prod.name}" from catalog?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL
         ======================================================== */}
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
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full text-slate-900 shadow-2xl relative z-10 flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-hidden my-auto"
          >
            
            {/* Modal Header (Pinned) */}
            <div className="shrink-0 px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {editingProduct ? 'Edit Keepsake Product' : 'Add New Keepsake Product'}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    Manage title, pricing, images, and customized size variants.
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

            {/* Form wrapping body and pinned footer */}
            <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col overflow-hidden">
              
              {/* Scrollable Form Body */}
              <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 overscroll-contain text-xs">
                
                {/* Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Keepsake Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Royal Gold Monogram Initial Frame"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-mono text-[#0a5c36] font-semibold focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                    />
                  </div>
                </div>

                {/* Category, Tag & Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-20">
                  <CustomSelect
                    label="Category"
                    required
                    searchPlaceholder="Search categories..."
                    value={formData.category}
                    onChange={(val) => setFormData({ ...formData, category: val as TattooCategory })}
                    options={categories.map((c) => ({
                      value: c.categorySlug || c.id,
                      label: c.name
                    }))}
                  />

                  <CustomSelect
                    label="Badge Tag"
                    searchable={false}
                    value={formData.tag || 'NONE'}
                    onChange={(val) => setFormData({ ...formData, tag: val === 'NONE' ? undefined : (val as Product['tag']) })}
                    options={[
                      { value: 'NONE', label: 'None' },
                      { value: 'BEST', label: 'Best Seller', badge: 'BEST', badgeClass: 'bg-amber-100 text-amber-800' },
                      { value: 'HOT', label: 'Hot Choice', badge: 'HOT', badgeClass: 'bg-rose-100 text-rose-800' },
                      { value: 'NEW', label: 'New Arrival', badge: 'NEW', badgeClass: 'bg-emerald-100 text-emerald-800' },
                      { value: 'TRENDING', label: 'Trending', badge: 'TRENDING', badgeClass: 'bg-purple-100 text-purple-800' },
                      { value: 'LIMITED', label: 'Limited Edition', badge: 'LIMITED', badgeClass: 'bg-indigo-100 text-indigo-800' }
                    ]}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Original Price (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min={50}
                      value={formData.originalPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData({ ...formData, price: val, originalPrice: val });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                    />
                  </div>
                </div>

                {/* Direct Image Upload: 1 Primary + 2 Secondary */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Product Keepsake Images <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      1 Primary + 2 Secondary Placeholders
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    
                    {/* 1. Primary Cover */}
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
                            alt="Primary cover preview"
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

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Product Description
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Botanicals, materials, and care notes
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a comprehensive keepsake story, floral preservation process, archival UV-resistant resin details, finish, dimensions, and care instructions..."
                    className="w-full min-h-[140px] sm:min-h-[160px] bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 leading-relaxed placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-y"
                  />
                </div>

                {/* Size Variants & Variant Pricing (Fully Customized) */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-900">
                        Size Variants & Variant Pricing
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Customize size types and their prices.
                      </p>
                    </div>

                    {/* Custom Presets Dropdown */}
                    <div className="relative" ref={presetDropdownRef}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500 shrink-0">Presets:</span>
                        <button
                          type="button"
                          onClick={() => setIsPresetDropdownOpen(!isPresetDropdownOpen)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-[#0a5c36] text-xs font-semibold text-slate-700 transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/20"
                          aria-haspopup="true"
                          aria-expanded={isPresetDropdownOpen}
                        >
                          <span>Choose Preset...</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isPresetDropdownOpen ? 'rotate-180 text-[#0a5c36]' : ''}`} />
                        </button>
                      </div>

                      {/* Custom Dropdown Popover */}
                      {isPresetDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-40 p-1.5">
                          <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                            Preset Templates
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              applySizePreset('letters');
                              setIsPresetDropdownOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#e6f4ea] text-slate-700 hover:text-[#0a5c36] transition-colors group cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <div className="text-xs font-bold leading-tight">Letters (S, M, L)</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-[#0a5c36]/80 leading-tight mt-0.5">
                                Small, Medium, Large tiers
                              </div>
                            </div>
                            <span className="text-[10px] font-mono bg-slate-100 group-hover:bg-[#0a5c36]/10 text-slate-500 group-hover:text-[#0a5c36] px-1.5 py-0.5 rounded font-bold">
                              3 sizes
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              applySizePreset('numbers');
                              setIsPresetDropdownOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#e6f4ea] text-slate-700 hover:text-[#0a5c36] transition-colors group cursor-pointer flex items-center justify-between mt-0.5"
                          >
                            <div>
                              <div className="text-xs font-bold leading-tight">Numbers (12, 14, 16)</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-[#0a5c36]/80 leading-tight mt-0.5">
                                Numeric size series (12, 14, 16)
                              </div>
                            </div>
                            <span className="text-[10px] font-mono bg-slate-100 group-hover:bg-[#0a5c36]/10 text-slate-500 group-hover:text-[#0a5c36] px-1.5 py-0.5 rounded font-bold">
                              3 sizes
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              applySizePreset('dimensions');
                              setIsPresetDropdownOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#e6f4ea] text-slate-700 hover:text-[#0a5c36] transition-colors group cursor-pointer flex items-center justify-between mt-0.5"
                          >
                            <div>
                              <div className="text-xs font-bold leading-tight">Inches (8", 10", 12")</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-[#0a5c36]/80 leading-tight mt-0.5">
                                Square keepsake frames & cubes
                              </div>
                            </div>
                            <span className="text-[10px] font-mono bg-slate-100 group-hover:bg-[#0a5c36]/10 text-slate-500 group-hover:text-[#0a5c36] px-1.5 py-0.5 rounded font-bold">
                              3 sizes
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Variants List */}
                  <div className="space-y-2">
                    {formData.sizes.map((s, idx) => (
                      <div 
                        key={idx} 
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
                      >
                        {/* Size Type Input */}
                        <div className="w-full sm:w-28 shrink-0">
                          <label className="text-[10px] text-slate-400 font-medium block sm:hidden">Size Type</label>
                          <input
                            type="text"
                            required
                            value={s.size}
                            onChange={(e) => updateSizeOption(idx, 'size', e.target.value)}
                            placeholder="e.g. 12 or S"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 placeholder:font-normal focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                          />
                        </div>

                        {/* Dimensions / Note */}
                        <div className="flex-1 min-w-0">
                          <label className="text-[10px] text-slate-400 font-medium block sm:hidden">Details / Dimensions</label>
                          <input
                            type="text"
                            value={s.dimensions || ''}
                            onChange={(e) => updateSizeOption(idx, 'dimensions', e.target.value)}
                            placeholder="Dimensions or label (e.g. 12x12 inch frame)"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                          />
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-semibold text-slate-500">৳</span>
                            <input
                              type="number"
                              required
                              min={0}
                              value={s.price}
                              onChange={(e) => updateSizeOption(idx, 'price', Number(e.target.value))}
                              className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          {formData.sizes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSizeOption(idx)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove variant"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Variant Button */}
                  <button
                    type="button"
                    onClick={addSizeOption}
                    className="w-full py-2 border border-dashed border-slate-300 hover:border-[#0a5c36] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0a5c36] hover:bg-[#e6f4ea]/20 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Size Variant</span>
                  </button>
                </div>

                {/* Enable Offer Section */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer select-none"
                      onClick={() => setFormData(prev => ({ ...prev, enableOffer: !prev.enableOffer }))}
                    >
                      <input
                        type="checkbox"
                        id="enable-offer-toggle"
                        checked={formData.enableOffer}
                        onChange={(e) => setFormData({ ...formData, enableOffer: e.target.checked })}
                        className="w-4 h-4 rounded text-[#0a5c36] focus:ring-[#0a5c36] cursor-pointer"
                      />
                      <div>
                        <label htmlFor="enable-offer-toggle" className="text-xs font-bold text-slate-900 cursor-pointer flex items-center gap-1.5">
                          <span>Enable Offer</span>
                          {formData.enableOffer && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                              Active
                            </span>
                          )}
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Provide a limited-time promotional discount price on this keepsake.
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch Pill */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={formData.enableOffer}
                      onClick={() => setFormData(prev => ({ ...prev, enableOffer: !prev.enableOffer }))}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0a5c36] focus:ring-offset-2 ${
                        formData.enableOffer ? 'bg-[#0a5c36]' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          formData.enableOffer ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Offer Details Area (Shown when Enable Offer is checked) */}
                  {formData.enableOffer && (
                    <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      
                      {/* Current Original Price */}
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Current Original Price
                        </span>
                        <div className="text-sm font-bold font-mono text-slate-700 flex items-center space-x-1">
                          <span>৳{formData.originalPrice || 0}</span>
                          <span className="text-[10px] text-slate-400 font-sans font-normal">(Base price)</span>
                        </div>
                      </div>

                      {/* New Offer Price Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          New Offer Price (৳) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">৳</span>
                          <input
                            type="number"
                            required={formData.enableOffer}
                            min={1}
                            max={formData.originalPrice ? formData.originalPrice - 1 : undefined}
                            value={formData.offerPrice || ''}
                            onChange={(e) => setFormData({ ...formData, offerPrice: Number(e.target.value) })}
                            placeholder="e.g. 1200"
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-7 pr-3 text-xs sm:text-sm font-mono font-bold text-[#0a5c36] focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                          />
                        </div>
                      </div>

                      {/* Auto-calculated Discount Percentage Card */}
                      <div className={`rounded-xl p-2.5 border transition-all ${
                        discountPercentage > 0
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/70 border-amber-200 text-amber-900'
                      }`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5 opacity-75">
                          Calculated Discount
                        </span>
                        {discountPercentage > 0 ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-base font-extrabold text-[#0a5c36] font-mono">
                              {discountPercentage}% OFF
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700">
                              (Save ৳{(formData.originalPrice || 0) - (formData.offerPrice || 0)})
                            </span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-amber-700 font-medium">
                            {formData.offerPrice >= formData.originalPrice
                              ? 'Offer must be lower than original price'
                              : 'Enter offer price to calculate %'}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>

              {/* Submit Buttons Footer: Pinned at bottom */}
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
                  {editingProduct ? 'Save Product Changes' : 'Create Keepsake'}
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

