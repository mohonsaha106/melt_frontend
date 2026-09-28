export type Placement = 
  | 'Wedding Keepsakes'
  | 'Flower Preservation'
  | 'Resin Jewelry'
  | 'Monogram Keychains'
  | 'Floral Bookmarks'
  | 'Geode Clocks'
  | 'Ocean Coasters'
  | 'Trinket Trays'
  | 'Baby Keepsakes'
  | 'Letter Nightlamps'
  | 'Wall Art'
  | 'Desk Signs';

export type TattooCategory =
  | 'all'
  | 'preservation'
  | 'jewelry'
  | 'keychains'
  | 'bookmarks'
  | 'coasters'
  | 'clocks'
  | 'custom';

export type ResinCategory = TattooCategory;

export interface ProductSizeOption {
  size: 'S' | 'M' | 'L' | 'Pack';
  dimensions: string;
  price: number;
  isRecommended?: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: TattooCategory;
  price: number;
  originalPrice?: number;
  tag?: 'BEST' | 'HOT' | 'NEW' | 'TRENDING' | 'LIMITED' | 'FREE';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  svgIcon?: string;
  description: string;
  placements: Placement[];
  durability: string;
  sizes: ProductSizeOption[];
  isCustomizable?: boolean;
  isFreeGiftEligible?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  imageUrl: string;
  size: 'S' | 'M' | 'L' | 'Pack';
  price: number;
  quantity: number;
  isFreeGift?: boolean;
  customText?: string;
  customFont?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verifiedPurchase: boolean;
  photoUrl?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  deliveryMethod: 'dhaka' | 'outside';
  paymentType: 'cod_advance' | 'full';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  advanceAmount: number;
  dueAmount: number;
  createdAt: string;
  status: 'Order Placed' | 'Advance Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}
