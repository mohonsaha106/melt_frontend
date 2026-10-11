import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  AdminOrder, 
  CustomerInquiry, 
  PromoCode, 
  StoreSettings, 
  OrderStatus,
  CategoryItem,
  WebsiteSectionsSettings 
} from '../types/admin';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  INITIAL_ADMIN_ORDERS, 
  INITIAL_CUSTOMER_INQUIRIES, 
  INITIAL_PROMO_CODES, 
  INITIAL_STORE_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_WEBSITE_SECTIONS 
} from '../data/adminMockData';

interface AdminContextType {
  // Categories (User Item 1)
  categories: CategoryItem[];
  addCategory: (category: Omit<CategoryItem, 'id'>) => CategoryItem;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (categoryId: string) => void;

  // Products (User Items 2, 3, 4)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Website Settings (User Item 5: Controls all titles & subtitles of frontend sections)
  websiteSettings: WebsiteSectionsSettings;
  updateWebsiteSettings: (newSettings: Partial<WebsiteSectionsSettings>) => void;
  updateSectionSettings: <K extends keyof WebsiteSectionsSettings>(
    section: K, 
    values: Partial<WebsiteSectionsSettings[K]>
  ) => void;

  // Orders & Store Settings (Kept for storefront checkout operations)
  orders: AdminOrder[];
  updateOrderStatus: (
    orderId: string, 
    status: OrderStatus, 
    courierName?: AdminOrder['courierName'], 
    trackingCode?: string, 
    adminNotes?: string
  ) => void;
  addOrder: (order: AdminOrder) => void;
  deleteOrder: (orderId: string) => void;

  inquiries: CustomerInquiry[];
  addInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (inquiryId: string, status: CustomerInquiry['status']) => void;
  deleteInquiry: (inquiryId: string) => void;

  promoCodes: PromoCode[];
  addPromoCode: (promo: Omit<PromoCode, 'id' | 'usageCount'>) => void;
  togglePromoCode: (promoId: string) => void;
  deletePromoCode: (promoId: string) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;

  // Computed Metrics
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    pendingAdvanceOrders: number;
    processingOrders: number;
    deliveredOrders: number;
    totalProducts: number;
    totalCategories: number;
    newInquiriesCount: number;
    activePromosCount: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Orders State
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_orders');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_ORDERS;
    } catch {
      return INITIAL_ADMIN_ORDERS;
    }
  });

  // 2. Categories State (User Item 1)
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // 3. Products State (User Items 2, 3, 4)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // 4. Website Settings State (User Item 5: Controls all titles & subtitles of frontend sections)
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSectionsSettings>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_website_settings');
      return saved ? JSON.parse(saved) : INITIAL_WEBSITE_SECTIONS;
    } catch {
      return INITIAL_WEBSITE_SECTIONS;
    }
  });

  // 5. Inquiries State
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_INQUIRIES;
    } catch {
      return INITIAL_CUSTOMER_INQUIRIES;
    }
  });

  // 6. Promo Codes State
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_promos');
      return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
    } catch {
      return INITIAL_PROMO_CODES;
    }
  });

  // 7. Store Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('melt_admin_settings');
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('melt_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('melt_admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('melt_admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('melt_admin_website_settings', JSON.stringify(websiteSettings));
  }, [websiteSettings]);

  useEffect(() => {
    localStorage.setItem('melt_admin_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('melt_admin_promos', JSON.stringify(promoCodes));
  }, [promoCodes]);

  useEffect(() => {
    localStorage.setItem('melt_admin_settings', JSON.stringify(settings));
  }, [settings]);

  // Order Handlers
  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    courierName?: AdminOrder['courierName'], 
    trackingCode?: string, 
    adminNotes?: string
  ) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setOrders(prev => prev.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status,
          courierName: courierName !== undefined ? courierName : order.courierName,
          trackingCode: trackingCode !== undefined ? trackingCode : order.trackingCode,
          adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
          updatedAt: timestamp
        };
      }
      return order;
    }));
  };

  const addOrder = (order: AdminOrder) => {
    setOrders(prev => [order, ...prev]);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  };

  // Product Handlers
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Inquiry Handlers
  const addInquiry = (inq: Omit<CustomerInquiry, 'id' | 'createdAt'>) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newInquiry: CustomerInquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      createdAt: timestamp
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (inquiryId: string, status: CustomerInquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
  };

  const deleteInquiry = (inquiryId: string) => {
    setInquiries(prev => prev.filter(i => i.id !== inquiryId));
  };

  // Promo Code Handlers
  const addPromoCode = (promo: Omit<PromoCode, 'id' | 'usageCount'>) => {
    const newPromo: PromoCode = {
      ...promo,
      id: `promo-${Date.now()}`,
      usageCount: 0
    };
    setPromoCodes(prev => [newPromo, ...prev]);
  };

  const togglePromoCode = (promoId: string) => {
    setPromoCodes(prev => prev.map(p => p.id === promoId ? { ...p, isActive: !p.isActive } : p));
  };

  const deletePromoCode = (promoId: string) => {
    setPromoCodes(prev => prev.filter(p => p.id !== promoId));
  };

  // Category Handlers (User Item 1)
  const addCategory = (catData: Omit<CategoryItem, 'id'>): CategoryItem => {
    const slug = catData.categorySlug?.trim() || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = `cat-${Date.now()}`;
    const newCat: CategoryItem = {
      ...catData,
      id: newId,
      categorySlug: slug || `cat-${Date.now()}`
    };
    setCategories(prev => [newCat, ...prev]);
    return newCat;
  };

  const updateCategory = (updated: CategoryItem) => {
    setCategories(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  // Website Settings Handlers (User Item 5: Controls all titles & subtitles of frontend sections)
  const updateWebsiteSettings = (newSettings: Partial<WebsiteSectionsSettings>) => {
    setWebsiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateSectionSettings = <K extends keyof WebsiteSectionsSettings>(
    section: K, 
    values: Partial<WebsiteSectionsSettings[K]>
  ) => {
    setWebsiteSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values
      }
    }));
  };

  // Settings Handlers
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setOrders(INITIAL_ADMIN_ORDERS);
    setProducts(PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setWebsiteSettings(INITIAL_WEBSITE_SECTIONS);
    setInquiries(INITIAL_CUSTOMER_INQUIRIES);
    setPromoCodes(INITIAL_PROMO_CODES);
    setSettings(INITIAL_STORE_SETTINGS);
    localStorage.removeItem('melt_admin_orders');
    localStorage.removeItem('melt_admin_categories');
    localStorage.removeItem('melt_admin_products');
    localStorage.removeItem('melt_admin_website_settings');
    localStorage.removeItem('melt_admin_inquiries');
    localStorage.removeItem('melt_admin_promos');
    localStorage.removeItem('melt_admin_settings');
  };

  // Compute live metrics
  const metrics = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingAdvanceOrders = orders.filter(o => o.status === 'Order Placed').length;
    const processingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Advance Confirmed').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
    const activePromosCount = promoCodes.filter(p => p.isActive).length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingAdvanceOrders,
      processingOrders,
      deliveredOrders,
      totalProducts: products.length,
      totalCategories: categories.length,
      newInquiriesCount,
      activePromosCount
    };
  }, [orders, products, categories, inquiries, promoCodes]);

  return (
    <AdminContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        websiteSettings,
        updateWebsiteSettings,
        updateSectionSettings,
        orders,
        updateOrderStatus,
        addOrder,
        deleteOrder,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        promoCodes,
        addPromoCode,
        togglePromoCode,
        deletePromoCode,
        settings,
        updateSettings,
        resetToDefaults,
        metrics
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
