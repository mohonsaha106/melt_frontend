import { OrderDetails } from './index';

export type OrderStatus = 
  | 'Order Placed' 
  | 'Advance Confirmed' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled';

export interface AdminOrder extends OrderDetails {
  courierName?: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly' | 'Sundarban';
  trackingCode?: string;
  adminNotes?: string;
  updatedAt?: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  topic: string;
  message: string;
  status: 'New' | 'Contacted' | 'Completed';
  createdAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  isActive: boolean;
  usageCount: number;
  expiryDate?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  categorySlug: string;
  image: string;
  secondaryImages?: string[];
  subtitle?: string;
  badge?: string;
  priceText?: string;
  theme?: 'bridal' | 'gifts' | 'home' | 'wearables';
  count?: number;
}

export interface WebsiteSectionsSettings {
  // 1. Limited Offers Section
  offers: {
    badge: string;
    title: string;
    subtitle: string;
  };
  // 2. Category Carousel Section
  categories: {
    badge: string;
    title: string;
    subtitle: string;
  };
  // 3. Highlight Features Strip
  highlightStrip: {
    item1: string;
    item2: string;
    item3: string;
  };
  // 4. Main Product Catalog Section
  productCatalog: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
  // 5. Custom Keepsake Universe Section
  customUniverse: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Subtitle: string;
    card1Description: string;
    card2Title: string;
    card2Subtitle: string;
    card2Description: string;
  };
  // 6. Real Customer Reviews Section
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText?: string;
  };
  // 7. Announcement Marquee Bar
  announcement: {
    text: string;
    isActive: boolean;
  };
  // 8. Shop Page Header
  shopPage: {
    title: string;
    subtitle: string;
  };
  // 9. How To Order Page
  howToOrder?: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  // 10. FAQ Page
  faqPage?: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    supportTitle: string;
    supportSubtitle: string;
  };
  // 11. About Atelier Page
  aboutPage?: {
    badge: string;
    title: string;
    subtitle: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
    contactEmail: string;
    contactLocation: string;
    workingHours: string;
  };
}

export interface StoreSettings {
  studioName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  bkashNumber: string;
  nagadNumber: string;
  advanceAmount: number;
  deliveryDhaka: number;
  deliveryOutside: number;
  freeShippingThreshold: number;
  announcementText: string;
  announcementActive: boolean;
}

export interface AdminReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  imageUrl: string;
  productUrl?: string;
  productName?: string;
  likes?: number;
  date: string;
  verifiedPurchase?: boolean;
}

export type AdminTab = 
  | 'overview' 
  | 'categories' 
  | 'products' 
  | 'reviews' 
  | 'settings';
