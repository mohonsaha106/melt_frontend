import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Product, TattooCategory, Placement, ProductSizeOption } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  X, 
  Gift 
} from 'lucide-react';

const AVAILABLE_PLACEMENTS: Placement[] = [
  'Wedding Keepsakes',
  'Flower Preservation',
  'Resin Jewelry',
  'Monogram Keychains',
  'Floral Bookmarks',
  'Geode Clocks',
  'Ocean Coasters',
  'Baby Keepsakes',
  'Wall Art',
  'Trinket Trays'
];

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  
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

  // Form State
  const [formData, setFormData] = useState<{
    sku: string;
    name: string;
    category: TattooCategory;
    price: number;
    originalPrice: number;
    tag: Product['tag'];
    imageUrl: string;
    description: string;
    placements: Placement[];
    durability: string;
    sizes: ProductSizeOption[];
    isCustomizable: boolean;
    isFreeGiftEligible: boolean;
  }>({
    sku: '',
    name: '',
    category: 'preservation',
    price: 1500,
    originalPrice: 2000,
    tag: 'NEW',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    description: '',
    placements: ['Wedding Keepsakes', 'Flower Preservation'],
    durability: 'Lifetime Keepsake',
    sizes: [
      { size: 'S', dimensions: 'Standard Single Piece', price: 1500, isRecommended: true },
      { size: 'M', dimensions: 'Deluxe Medium Size', price: 2200 },
      { size: 'L', dimensions: 'Large Statement Piece', price: 3500 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
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

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      sku: `MS-${Math.floor(100 + products.length + 1)}`,
      name: '',
      category: 'preservation',
      price: 1500,
      originalPrice: 2000,
      tag: 'NEW',
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-poured crystal clear archival resin keepsake crafted with real botanicals and metallic gold foil flakes.',
      placements: ['Wedding Keepsakes', 'Flower Preservation'],
      durability: 'Lifetime Keepsake',
      sizes: [
        { size: 'S', dimensions: 'Standard Single', price: 1500, isRecommended: true },
        { size: 'M', dimensions: 'Deluxe Medium', price: 2200 },
        { size: 'L', dimensions: 'Grand Statement', price: 3200 }
      ],
      isCustomizable: true,
      isFreeGiftEligible: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      sku: prod.sku,
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      tag: prod.tag || 'BEST',
      imageUrl: prod.imageUrl,
      description: prod.description,
      placements: prod.placements || [],
      durability: prod.durability || 'Lifetime Keepsake',
      sizes: prod.sizes && prod.sizes.length > 0 ? prod.sizes : [
        { size: 'S', dimensions: 'Standard', price: prod.price, isRecommended: true }
      ],
      isCustomizable: prod.isCustomizable ?? true,
      isFreeGiftEligible: prod.isFreeGiftEligible ?? false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData,
        rating: editingProduct.rating || 5.0,
        reviewCount: editingProduct.reviewCount || 120
      });
    } else {
      addProduct({
        ...formData,
        rating: 5.0,
        reviewCount: 45
      });
    }

    setIsModalOpen(false);
  };

  const togglePlacement = (placement: Placement) => {
    setFormData(prev => ({
      ...prev,
      placements: prev.placements.includes(placement)
        ? prev.placements.filter(p => p !== placement)
        : [...prev.placements, placement]
    }));
  };

  const updateSizeOption = (idx: number, field: keyof ProductSizeOption, val: any) => {
    setFormData(prev => {
      const updated = [...prev.sizes];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, sizes: updated };
    });
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-xs">
          <div className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl p-6 sm:p-8 text-slate-900">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingProduct ? 'Edit Keepsake Product' : 'Add New Keepsake Product'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
              
              {/* Name & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 mb-1 font-semibold">Keepsake Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Gold Monogram Initial Frame"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Category, Tag & Pricing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as TattooCategory })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.categorySlug || c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Badge Tag</label>
                  <select
                    value={formData.tag || 'NONE'}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value === 'NONE' ? undefined : (e.target.value as Product['tag']) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs"
                  >
                    <option value="NONE">None</option>
                    <option value="BEST">BEST</option>
                    <option value="HOT">HOT</option>
                    <option value="NEW">NEW</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="LIMITED">LIMITED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Base Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Original Price (৳)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs font-mono"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] text-xs"
                />
              </div>

              {/* Placements tags */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-semibold">Placement & Theme Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_PLACEMENTS.map(plc => {
                    const selected = formData.placements.includes(plc);
                    return (
                      <button
                        type="button"
                        key={plc}
                        onClick={() => togglePlacement(plc)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                          selected
                            ? 'bg-[#e6f4ea] text-[#0a5c36] border border-[#0a5c36] font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {plc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Options & Pricing */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-semibold">Size Variants & Variant Pricing</label>
                <div className="space-y-2">
                  {formData.sizes.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <span className="font-mono font-bold text-[#0a5c36] w-8 text-center">{s.size}</span>
                      <input
                        type="text"
                        value={s.dimensions}
                        onChange={(e) => updateSizeOption(idx, 'dimensions', e.target.value)}
                        placeholder="Dimensions (e.g. 8x8 inch)"
                        className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-slate-900 text-xs"
                      />
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-500">৳</span>
                        <input
                          type="number"
                          value={s.price}
                          onChange={(e) => updateSizeOption(idx, 'price', Number(e.target.value))}
                          className="w-20 bg-white border border-slate-200 rounded-lg p-1.5 text-slate-900 text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization & Free Gift Toggles */}
              <div className="pt-2 flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCustomizable}
                    onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
                    className="rounded text-[#0a5c36] focus:ring-[#0a5c36]"
                  />
                  <span className="text-slate-700 font-semibold">Allow Custom Engraving / Names</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFreeGiftEligible}
                    onChange={(e) => setFormData({ ...formData, isFreeGiftEligible: e.target.checked })}
                    className="rounded text-[#0a5c36] focus:ring-[#0a5c36]"
                  />
                  <span className="text-slate-700 font-semibold">Free Gift Tier Eligible</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white font-semibold transition-all shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Keepsake'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

