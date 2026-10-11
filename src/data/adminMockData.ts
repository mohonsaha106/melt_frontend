import { AdminOrder, CustomerInquiry, PromoCode, StoreSettings, CategoryItem, WebsiteSectionsSettings } from '../types/admin';

export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    orderId: 'MS-948124',
    customerName: 'Samira Anjum',
    phone: '01712984561',
    district: 'Dhaka',
    thana: 'Dhanmondi',
    address: 'House 42, Road 9/A, Dhanmondi R/A',
    deliveryMethod: 'dhaka',
    paymentType: 'cod_advance',
    items: [
      {
        id: 'prod-wedding-preservation-frame-S-Samira & Fahad-Playfair',
        productId: 'prod-wedding-preservation-frame',
        name: 'Wedding Garland & Flower Preservation Frame',
        sku: 'MS-101',
        imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        size: 'S',
        price: 2800,
        quantity: 1,
        isFreeGift: false,
        customText: 'Samira & Fahad • 24.12.2024',
        customFont: 'Playfair Display'
      }
    ],
    subtotal: 2800,
    deliveryFee: 60,
    discount: 0,
    total: 2860,
    advanceAmount: 50,
    dueAmount: 2810,
    createdAt: '11 Oct 2026',
    status: 'Processing',
    courierName: 'Pathao',
    adminNotes: 'Garland petals dried in silica gel. Curing layer 2 in progress.',
    updatedAt: '11 Oct 2026, 11:30 AM'
  },
  {
    orderId: 'MS-829104',
    customerName: 'Tanvir Hossain',
    phone: '01844910283',
    district: 'Chittagong',
    thana: 'Panchlaish',
    address: 'Holding 18, Nasirabad Housing Society',
    deliveryMethod: 'outside',
    paymentType: 'cod_advance',
    items: [
      {
        id: 'prod-gold-monogram-keychain-S-T-Cinzel',
        productId: 'prod-gold-monogram-keychain',
        name: '24K Gold Leaf Initial Monogram Keychain',
        sku: 'MS-102',
        imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        size: 'S',
        price: 350,
        quantity: 2,
        isFreeGift: false,
        customText: 'Initial "T" with Gold Flakes',
        customFont: 'Cinzel'
      },
      {
        id: 'prod-wildflower-bookmark-S-Floral-Amiri',
        productId: 'prod-wildflower-bookmark',
        name: 'Handcrafted Wildflower Resin Bookmark',
        sku: 'MS-104',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        size: 'S',
        price: 290,
        quantity: 1,
        isFreeGift: false
      }
    ],
    subtotal: 990,
    deliveryFee: 110,
    discount: 0,
    total: 1100,
    advanceAmount: 50,
    dueAmount: 1050,
    createdAt: '10 Oct 2026',
    status: 'Shipped',
    courierName: 'Steadfast',
    trackingCode: 'STDF-84920491',
    adminNotes: 'Handed over to Steadfast courier hub.',
    updatedAt: '11 Oct 2026, 09:15 AM'
  },
  {
    orderId: 'MS-739102',
    customerName: 'Nusrat Jahan',
    phone: '01928475910',
    district: 'Sylhet',
    thana: 'Sylhet Sadar',
    address: 'Flat 4B, Green Hill Tower, Kumarpara',
    deliveryMethod: 'outside',
    paymentType: 'cod_advance',
    items: [
      {
        id: 'prod-emerald-geode-clock-M',
        productId: 'prod-emerald-geode-clock',
        name: 'Royal Emerald & Gold Geode Wall Clock',
        sku: 'MS-103',
        imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
        size: 'M',
        price: 4500,
        quantity: 1,
        isFreeGift: false
      }
    ],
    subtotal: 4500,
    deliveryFee: 0,
    discount: 0,
    total: 4500,
    advanceAmount: 50,
    dueAmount: 4450,
    createdAt: '11 Oct 2026',
    status: 'Order Placed',
    adminNotes: 'Customer requested gold hands for the clock.',
    updatedAt: '11 Oct 2026, 02:40 PM'
  },
  {
    orderId: 'MS-619283',
    customerName: 'Mahir Faisal',
    phone: '01677894012',
    district: 'Dhaka',
    thana: 'Uttara',
    address: 'Sector 4, Road 11, House 25',
    deliveryMethod: 'dhaka',
    paymentType: 'cod_advance',
    items: [
      {
        id: 'prod-ocean-wave-coasters-M',
        productId: 'prod-ocean-wave-coasters',
        name: 'Ocean Wave Resin Coasters (Set of 4)',
        sku: 'MS-105',
        imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=800&q=80',
        size: 'M',
        price: 950,
        quantity: 1,
        isFreeGift: false
      }
    ],
    subtotal: 950,
    deliveryFee: 60,
    discount: 50,
    total: 960,
    advanceAmount: 50,
    dueAmount: 910,
    createdAt: '09 Oct 2026',
    status: 'Delivered',
    courierName: 'Pathao',
    trackingCode: 'PTH-992384',
    adminNotes: 'Customer confirmed delivery and paid ৳910.',
    updatedAt: '10 Oct 2026, 05:20 PM'
  },
  {
    orderId: 'MS-551029',
    customerName: 'Farzana Akter',
    phone: '01799201948',
    district: 'Rajshahi',
    thana: 'Boalia',
    address: 'Sagorpara Goli, Holding 34',
    deliveryMethod: 'outside',
    paymentType: 'cod_advance',
    items: [
      {
        id: 'prod-baby-milestone-cube-S',
        productId: 'prod-baby-milestone-cube',
        name: 'Baby Milestone Keepsake Memory Cube',
        sku: 'MS-106',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        size: 'S',
        price: 1850,
        quantity: 1,
        isFreeGift: false,
        customText: 'Ayaan • Born 12.08.2024'
      }
    ],
    subtotal: 1850,
    deliveryFee: 110,
    discount: 0,
    total: 1960,
    advanceAmount: 50,
    dueAmount: 1910,
    createdAt: '11 Oct 2026',
    status: 'Advance Confirmed',
    adminNotes: '৳50 bKash token received. TrxID: BK9284019.',
    updatedAt: '11 Oct 2026, 01:10 PM'
  }
];

export const INITIAL_CUSTOMER_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-101',
    customerName: 'Sabrina Mostafa',
    phone: '01711223344',
    email: 'sabrina.m@gmail.com',
    topic: 'বিয়ের ফুল ও মালা সংরক্ষণ',
    message: 'আমার বিয়ের অনুষ্ঠান আগামী শুক্রবার। বিয়ের বরণ ডালা ও গোলাপের তোড়া কীভাবে পাঠালে ফুল একদম তাজা থাকবে? ফ্রেমের সম্ভাব্য সাইজ ও রেট জানতে চাই।',
    status: 'New',
    createdAt: '11 Oct 2026, 01:25 PM'
  },
  {
    id: 'inq-102',
    customerName: 'Arifur Rahman',
    phone: '01819988776',
    email: 'arif.bd@yahoo.com',
    topic: 'কর্পোরেট ও বাল্ক উপহার',
    message: 'আমাদের কোম্পানির ১০ম বর্ষপূর্তি উপলক্ষে ৫০টি কাস্টম গোল্ড লিফ রেজিন বুকমার্ক তৈরি করতে চাই কোম্পানির লোগো সহ। কোটেশন ও ডেলিভারি সময় দরকার।',
    status: 'Contacted',
    createdAt: '10 Oct 2026, 04:45 PM'
  },
  {
    id: 'inq-103',
    customerName: 'Tanjila Karim',
    phone: '01912345678',
    topic: 'জিওড রেজিন ওয়াল ক্লক',
    message: 'আমাদের নতুন ফ্ল্যাটের লিভিং রুমের জন্য ১৮ ইঞ্চি ডায়ামিটার রয়াল ব্লু ও গোল্ড জিওড ঘড়ি বানানো যাবে কি? প্রাইস কেমন হতে পারে?',
    status: 'New',
    createdAt: '11 Oct 2026, 11:10 AM'
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 500,
    isActive: true,
    usageCount: 48,
    expiryDate: '31 Dec 2026'
  },
  {
    id: 'promo-2',
    code: 'BRIDAL300',
    discountType: 'fixed',
    discountValue: 300,
    minSpend: 2500,
    isActive: true,
    usageCount: 22,
    expiryDate: '15 Nov 2026'
  },
  {
    id: 'promo-3',
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 110,
    minSpend: 1500,
    isActive: true,
    usageCount: 95
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = [
  {
    studioName: 'Melt Sparkle Atelier',
    phone: '+880 1712-345678',
    whatsapp: '8801712345678',
    email: 'contact@meltsparkle.com',
    address: 'Studio 4B, Artisan Lane, Dhanmondi, Dhaka, Bangladesh',
    bkashNumber: '01712345678 (Merchant)',
    nagadNumber: '01712345678 (Personal/Merchant)',
    advanceAmount: 50,
    deliveryDhaka: 60,
    deliveryOutside: 110,
    freeShippingThreshold: 1500,
    announcementText: '✨ ৪টি প্রোডাক্টে ১টি ফ্রি উপহার! সারা দেশে মাত্র ৫০ টাকা অগ্রিমে ক্যাশ অন ডেলিভারি সুবিধা।',
    announcementActive: true
  }
][0];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'wedding',
    name: 'Wedding Keepsakes',
    categorySlug: 'wedding',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    count: 36,
    badge: 'Bridal Atelier',
    subtitle: 'Garland & bridal flower frames',
    theme: 'bridal',
    priceText: 'From ৳2,800'
  },
  {
    id: 'preservation',
    name: 'Flower Preservation',
    categorySlug: 'preservation',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    count: 48,
    badge: 'Most Loved',
    subtitle: 'Real floral display cubes',
    theme: 'bridal',
    priceText: 'From ৳1,800'
  },
  {
    id: 'keychains',
    name: 'Monogram Keychains',
    categorySlug: 'keychains',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    count: 52,
    badge: 'Personalized',
    subtitle: '24K gold foil alphabet initials',
    theme: 'gifts',
    priceText: 'From ৳350'
  },
  {
    id: 'clocks',
    name: 'Geode Clocks',
    categorySlug: 'clocks',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    count: 24,
    badge: 'Luxury Art',
    subtitle: 'Crushed raw quartz wall clocks',
    theme: 'home',
    priceText: 'From ৳3,400'
  },
  {
    id: 'coasters',
    name: 'Ocean Coasters',
    categorySlug: 'coasters',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    count: 31,
    badge: 'Set of 4',
    subtitle: 'Multi-layer seafoam waves',
    theme: 'home',
    priceText: 'From ৳1,200'
  },
  {
    id: 'bookmarks',
    name: 'Floral Bookmarks',
    categorySlug: 'bookmarks',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    count: 40,
    badge: 'Silk Tassel',
    subtitle: 'Pressed botanical petals',
    theme: 'gifts',
    priceText: 'From ৳320'
  },
  {
    id: 'jewelry',
    name: 'Resin Jewelry',
    categorySlug: 'jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    count: 29,
    badge: '18K Gold Plated',
    subtitle: 'Rosebud pendants & gems',
    theme: 'wearables',
    priceText: 'From ৳650'
  },
  {
    id: 'trinket-trays',
    name: 'Trinket Trays',
    categorySlug: 'clocks',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    count: 22,
    badge: 'Vanity Decor',
    subtitle: 'Scalloped gold leaf ring dishes',
    theme: 'home',
    priceText: 'From ৳750'
  },
  {
    id: 'baby',
    name: 'Baby Keepsakes',
    categorySlug: 'baby',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    count: 18,
    badge: 'Memory Cube',
    subtitle: 'First hair curls & hospital tags',
    theme: 'gifts',
    priceText: 'From ৳1,950'
  },
  {
    id: 'nightlamps',
    name: 'Letter Nightlamps',
    categorySlug: 'nightlamps',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    count: 26,
    badge: 'Warm Wood LED',
    subtitle: 'Botanical illuminated alphabet',
    theme: 'home',
    priceText: 'From ৳1,450'
  }
];

export const INITIAL_WEBSITE_SECTIONS: WebsiteSectionsSettings = {
  offers: {
    badge: 'LIMITED TIME DEALS',
    title: 'Products on Offer',
    subtitle: 'Enjoy exclusive savings on our bestselling handcrafted resin keepsakes and memory art pieces.'
  },
  categories: {
    badge: 'SHOP BY CATEGORY',
    title: 'Explore Keepsake Categories',
    subtitle: 'Click any category below to browse our complete collection of handcrafted resin keepsakes, bridal preservation, and custom gifts.'
  },
  highlightStrip: {
    item1: '100% Handcrafted Resin',
    item2: 'Real Bridal Flower Preservation',
    item3: 'UV Non-Yellowing Lifetime Keepsake'
  },
  productCatalog: {
    badge: 'HANDCRAFTED ATELIER',
    title: 'Shop All Designs',
    subtitle: 'Discover our complete collection of handcrafted resin keepsakes, bridal preservation, and personalized memory art pieces.',
    buttonText: 'See More'
  },
  customUniverse: {
    badge: 'স্মৃতি সংরক্ষণের দুটি উপায়',
    title: 'স্মৃতি থাকুক চিরসবুজ ও অম্লান',
    subtitle: 'আপনার পছন্দের রেজিন কিপসেক তৈরির দুটি দারুণ সুযোগ — নিজের মনোগ্রাম কাস্টমাইজ করুন অথবা জীবনের সেরা মুহূর্তের স্মৃতি চিরতরে সংরক্ষণ করুন।',
    card1Title: 'কাস্টম নাম ও মনোগ্রাম',
    card1Subtitle: 'সার্ভিস ০১',
    card1Description: 'আপনার নাম, নিজস্ব বা কাপল ইনিশিয়াল কাস্ট করা হবে ২৪ ক্যারেট গোল্ড লিফ, ন্যাচারাল ফুল ও গ্লোয়িং এলইডি উডেন বেসের সাথে।',
    card2Title: 'জীবনের শ্রেষ্ঠ স্মৃতি সংরক্ষণ',
    card2Subtitle: 'সার্ভিস ০২',
    card2Description: 'বিয়ের মালা, প্রিমিয়াম লাল গোলাপ, বেবি হসপিটাল ট্যাগ বা প্রিয়জনের স্মৃতি আবদ্ধ করুন লাইফটাইম ক্রিস্টাল রেজিনে।'
  },
  reviews: {
    badge: 'REAL CUSTOMER REVIEWS',
    title: 'Loved by 15,000+ Customers',
    subtitle: 'Real customer chats, unboxing photos, and keepsakes shared across Bangladesh.',
    buttonText: 'Explore All 18+ Customer Reviews'
  },
  announcement: {
    text: '✨ ৪টি প্রোডাক্টে ১টি ফ্রি উপহার! সারা দেশে মাত্র ৫০ টাকা অগ্রিমে ক্যাশ অন ডেলিভারি সুবিধা।',
    isActive: true
  },
  shopPage: {
    title: 'The Complete Keepsake Collection',
    subtitle: 'Explore authentic handcrafted resin treasures, botanicals, and bespoke memory art.'
  }
};

