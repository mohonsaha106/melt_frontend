import { Language, Translations } from '../types/language';
import { bn } from './bn';
import { en } from './en';
import {
  PRODUCT_TRANSLATIONS,
  PLACEMENT_TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
} from './productTranslations';

export const translations: Record<Language, Translations> = {
  bn,
  en,
};

export {
  bn,
  en,
  PRODUCT_TRANSLATIONS,
  PLACEMENT_TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
};

// Bengali numeral mapping
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => BN_DIGITS[parseInt(digit, 10)]);
}

export function formatPriceLocalized(amount: number, language: Language, useBengaliDigits: boolean = true): string {
  const formattedNumber = amount.toLocaleString('en-US');
  if (language === 'bn') {
    return useBengaliDigits ? `৳${toBengaliNumber(formattedNumber)}` : `৳${formattedNumber}`;
  }
  return `৳${formattedNumber}`;
}

// Hero pieces translations
export interface LocalizedGalleryPiece {
  id: string;
  sku: string;
  collectionName: { bn: string; en: string };
  title: { bn: string; en: string };
  subtitle: { bn: string; en: string };
  description: { bn: string; en: string };
  price: number;
  originalPrice: number;
  imageUrl: string;
  editionTag: { bn: string; en: string };
}

export const HERO_GALLERY_TRANSLATIONS: LocalizedGalleryPiece[] = [
  {
    id: 'prod-forever-rose-pendant',
    sku: 'MS-107',
    collectionName: {
      bn: 'সিগনেচার কালেকশন',
      en: 'THE SIGNATURE COLLECTION',
    },
    title: {
      bn: 'ইটারনাল রোজবাড টিয়ারড্রপ পেন্ডেন্ট',
      en: 'Eternal Rosebud Teardrop Pendant',
    },
    subtitle: {
      bn: '২৪কে গোল্ড ফয়েলে আসল ক্ষুদে লাল গোলাপের কুঁড়ি',
      en: 'Real miniature red rosebud set in 24K gold foil',
    },
    description: {
      bn: 'অ্যান্টি-টার্নিশ ১৮কে গোল্ড প্লেটেড চেইনে ক্রিস্টাল ক্লিয়ার রেজিনে আজীবন সংরক্ষিত আসল প্রাকৃতিক গোলাপের কুঁড়ি।',
      en: 'A genuine botanical rosebud immortalized inside museum-clarity crystal epoxy on an anti-tarnish 18K gold-plated chain.',
    },
    price: 550,
    originalPrice: 700,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    editionTag: {
      bn: 'ফাইন জুয়েলারি ০১',
      en: 'FINE JEWELRY NO. 01',
    },
  },
  {
    id: 'prod-gold-monogram-keychain',
    sku: 'MS-102',
    collectionName: {
      bn: 'গোল্ডেন মনোগ্রাম সিরিজ',
      en: 'GOLDEN MONOGRAM SERIES',
    },
    title: {
      bn: '২৪কে গোল্ড লিফ ইনিশিয়াল লকেট ও কিচেন',
      en: '24K Gold Leaf Initial Locket',
    },
    subtitle: {
      bn: '২৪কে গোল্ড ফ্লেক ও বেবিস ব্রেথ ড্রাইড ফ্লাওয়ার',
      en: 'Pressed baby’s breath florals with 24K gold flakes',
    },
    description: {
      bn: 'আসল খাঁটি স্বর্ণের পাতা ও প্রাকৃতিক শুকনো ফুলে তৈরি পার্সোনালাইজড অ্যালফাবেট লকেট এবং লাক্সারি মেটালিক সুইভেল ক্লাস্প।',
      en: 'Personalized alphabet charm hand-poured with real gold leaf, natural pressed flowers, and luxury swivel clasp hardware.',
    },
    price: 350,
    originalPrice: 450,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    editionTag: {
      bn: 'পার্সোনালাইজড কিপসেক',
      en: 'PERSONALIZED HEIRLOOM',
    },
  },
  {
    id: 'prod-floral-ring-dish',
    sku: 'MS-106',
    collectionName: {
      bn: 'সেরিমোনিয়াল ব্রাইডাল অ্যাথেলিয়ার',
      en: 'CEREMONIAL BRIDAL ATELIER',
    },
    title: {
      bn: 'পার্সোনালাইজড ফ্লোরাল ট্রিঙ্কেট ডিশ',
      en: 'Personalized Floral Trinket Dish',
    },
    subtitle: {
      bn: 'স্বর্ণালী ক্যালিগ্রাফি সহ খাঁজকাটা জুয়েলারি ট্রে',
      en: 'Scalloped jewelry tray with gold foil script',
    },
    description: {
      bn: 'আসল শুকনো গোলাপের পাপড়ি ও কাস্টম কাপল ক্যালিগ্রাফি সম্বলিত নান্দনিক রিং ডিসপ্লে ডিশ।',
      en: 'Adorned with real dried rose petals, botanical ferns, and custom couple calligraphy for ring and vanity display.',
    },
    price: 650,
    originalPrice: 850,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=85',
    editionTag: {
      bn: 'ব্রাইডাল স্পেশাল',
      en: 'BRIDAL ESSENTIAL',
    },
  },
  {
    id: 'prod-geode-emerald-wall-clock',
    sku: 'MS-103',
    collectionName: {
      bn: 'স্টেটমেন্ট মিনারেল ডেকোর',
      en: 'STATEMENT MINERAL DECOR',
    },
    title: {
      bn: 'রয়্যাল এমারেল্ড জিওড রেজিন ওয়াল ক্লক',
      en: 'Royal Emerald Geode Wall Clock',
    },
    subtitle: {
      bn: 'রিয়েল ক্রাশড কোয়ার্টজ ক্রিস্টাল ও সাইলেন্ট সুইপ মুভমেন্ট',
      en: 'Natural crushed quartz veins & silent quartz movement',
    },
    description: {
      bn: 'গভীর পান্না সবুজ রং ও সোনালী রেখার বিলাসবহুল হস্তশিল্প রেজিন ঘড়ি। আধুনিক ইন্টেরিয়রের জন্য স্টেটমেন্ট আর্টপিস।',
      en: 'Statement luxury resin art piece capturing deep jewel emerald pigments and metallic gold veins for modern interiors.',
    },
    price: 3400,
    originalPrice: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85',
    editionTag: {
      bn: 'স্টেটমেন্ট ক্লক',
      en: 'STATEMENT PIECE',
    },
  },
  {
    id: 'prod-botanical-hair-clips',
    sku: 'MS-112',
    collectionName: {
      bn: 'বোটানিক্যাল অ্যাক্সেসরিজ',
      en: 'BOTANICAL ACCESSORIES',
    },
    title: {
      bn: 'ড্রাই ডেইজি ও গোল্ড হেয়ার ক্লিপস সেট',
      en: 'Pressed Daisy & Gold Hair Clips',
    },
    subtitle: {
      bn: 'ফরগেট-মি-নট ফুল ও সোনালী পাতা (৩টির সেট)',
      en: 'Forget-me-nots & golden leaves (Set of 3)',
    },
    description: {
      bn: 'আসল শুকনো ফুল ও সোনালী পাতার সংমিশ্রণে তৈরি প্রিমিয়াম হেয়ার ব্যারেটস। চুলের সুরক্ষায় আরামদায়ক।',
      en: 'Handcrafted alligator hair barrettes cast with real organic florals and golden leaf accents in clear archival epoxy.',
    },
    price: 420,
    originalPrice: 550,
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85',
    editionTag: {
      bn: 'ট্রেন্ডিং কালেকশন',
      en: 'TRENDING ACCESSORY',
    },
  },
];
