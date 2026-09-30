import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Download, 
  Check, 
  SlidersHorizontal,
  Package,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, StockStatus } from '../types';
import { CATEGORIES } from '../data/storeData';

export const AdminProductManager: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    showToast
  } = useShop();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Mobile Phones',
    brand: 'Ujwal Tech',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    shortDescription: '',
    description: '',
    stockStatus: 'in_stock',
    stockCount: 10,
    rating: 4.8,
    reviewsCount: 12,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    warranty: '1 Year Brand Warranty',
    images: ['/src/assets/images/hero_electronics_showcase_1790778317963.jpg']
  });

  if (!isAdminOpen) return null;

  const handleStartCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Mobile Phones',
      brand: 'Ujwal Tech',
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      shortDescription: 'High quality genuine electronics product.',
      description: 'Detailed description of features, performance and warranty coverage.',
      stockStatus: 'in_stock',
      stockCount: 15,
      rating: 4.8,
      reviewsCount: 25,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      warranty: '1 Year Brand Warranty',
      images: ['/src/assets/images/product_flagship_phone_1790778362839.jpg'],
      specifications: {
        'Category': 'Electronics',
        'Warranty': '1 Year Official'
      }
    });
    setIsCreating(true);
  };

  const handleStartEdit = (p: Product) => {
    setIsCreating(false);
    setEditingProduct(p);
    setFormData({ ...p });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Product name and price are required', 'error');
      return;
    }

    if (isCreating) {
      addProduct({
        name: formData.name || 'New Product',
        category: formData.category || 'Other Electronics',
        brand: formData.brand || 'Brand',
        images: formData.images && formData.images.length ? formData.images : ['/src/assets/images/hero_electronics_showcase_1790778317963.jpg'],
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || Number(formData.price),
        discount: Number(formData.discount) || 0,
        shortDescription: formData.shortDescription || '',
        description: formData.description || '',
        specifications: formData.specifications || { Warranty: '1 Year' },
        stockStatus: (formData.stockStatus as StockStatus) || 'in_stock',
        stockCount: Number(formData.stockCount) || 10,
        rating: Number(formData.rating) || 4.7,
        reviewsCount: Number(formData.reviewsCount) || 10,
        isFeatured: Boolean(formData.isFeatured),
        isNewArrival: Boolean(formData.isNewArrival),
        isBestSeller: Boolean(formData.isBestSeller),
        warranty: formData.warranty || '1 Year Official Warranty'
      });
      setIsCreating(false);
    } else if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formData.name || editingProduct.name,
        category: formData.category || editingProduct.category,
        brand: formData.brand || editingProduct.brand,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount: Number(formData.discount),
        shortDescription: formData.shortDescription || editingProduct.shortDescription,
        description: formData.description || editingProduct.description,
        stockStatus: (formData.stockStatus as StockStatus) || editingProduct.stockStatus,
        stockCount: Number(formData.stockCount),
        isFeatured: Boolean(formData.isFeatured),
        isNewArrival: Boolean(formData.isNewArrival),
        isBestSeller: Boolean(formData.isBestSeller),
        warranty: formData.warranty || editingProduct.warranty
      });
      setEditingProduct(null);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ujwal_telecom_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog exported as JSON!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Store Admin & Product Manager
              </h2>
              <p className="text-[11px] text-slate-500">
                Ujwal Telecom & Electronics · Easy catalog editing, stock updates & CMS export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              title="Export products to JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <button
              onClick={resetProductsToDefault}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              title="Reset to default demo items"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Create / Edit Form Drawer */}
          {(isCreating || editingProduct) ? (
            <form onSubmit={handleSave} className="space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-700" />
                  <span>{isCreating ? 'Add New Product to Store' : `Edit Product: ${editingProduct?.name}`}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category || 'Mobile Phones'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice || 0}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={formData.discount || 0}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Status</label>
                  <select
                    value={formData.stockStatus || 'in_stock'}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as StockStatus })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stockCount || 0}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Warranty Term</label>
                  <input
                    type="text"
                    value={formData.warranty || ''}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 bg-white rounded border border-slate-300"
                  />
                </div>

                <div className="sm:col-span-3 flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <span>Featured Product</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival || false}
                      onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    />
                    <span>New Arrival</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller || false}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    <span>Best Seller</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Current Product Catalog ({products.length})</h3>
                <p className="text-xs text-slate-500">Edit prices, manage inventory levels, or add new electronic models.</p>
              </div>
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add New Product</span>
              </button>
            </div>
          )}

          {/* Product Inventory Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="p-3 flex items-center gap-2.5">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-9 h-9 rounded object-cover bg-slate-100 shrink-0"
                        />
                        <div className="truncate max-w-[200px] sm:max-w-xs">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-500">{p.id} · {p.brand}</p>
                        </div>
                      </td>

                      <td className="p-3 text-slate-700 whitespace-nowrap">{p.category}</td>

                      <td className="p-3 font-bold text-slate-900 whitespace-nowrap tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>

                      <td className="p-3 text-slate-700 whitespace-nowrap tabular-nums">
                        {p.stockCount} units
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stockStatus === 'in_stock'
                            ? 'bg-emerald-50 text-emerald-800'
                            : p.stockStatus === 'low_stock'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}>
                          {p.stockStatus.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
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

        </div>

      </div>
    </div>
  );
};
