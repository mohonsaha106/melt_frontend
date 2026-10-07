import { Placement, TattooCategory } from '../types';

export interface PlacementItem {
  name: Placement;
  categorySlug: string;
  image: string;
  count: number;
  badge?: string;
  subtitle: string;
  theme: 'bridal' | 'gifts' | 'home' | 'wearables';
  priceText?: string;
  featured?: boolean;
}

export const PLACEMENTS: PlacementItem[] = [
  {
    name: 'Wedding Keepsakes',
    categorySlug: 'wedding',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    count: 36,
    badge: 'Bridal Atelier',
    subtitle: 'Garland & bridal flower frames',
    theme: 'bridal',
    priceText: 'From ৳2,800',
    featured: true
  },
  {
    name: 'Flower Preservation',
    categorySlug: 'preservation',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    count: 48,
    badge: 'Most Loved',
    subtitle: 'Real floral display cubes',
    theme: 'bridal',
    priceText: 'From ৳1,800',
    featured: true
  },
  {
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
    name: 'Geode Clocks',
    categorySlug: 'clocks',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    count: 24,
    badge: 'Luxury Art',
    subtitle: 'Crushed raw quartz wall clocks',
    theme: 'home',
    priceText: 'From ৳3,400',
    featured: true
  },
  {
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
    name: 'Baby Keepsakes',
    categorySlug: 'baby',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    count: 18,
    badge: 'First Memories',
    subtitle: 'Hospital tag & curl cubes',
    theme: 'gifts',
    priceText: 'From ৳1,450'
  },
  {
    name: 'Letter Nightlamps',
    categorySlug: 'nightlamps',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    count: 26,
    badge: 'Warm LED Glow',
    subtitle: 'Beechwood illuminated letters',
    theme: 'gifts',
    priceText: 'From ৳1,850'
  }
];

export interface CategoryOption {
  id: TattooCategory;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Keepsakes' },
  { id: 'preservation', label: 'Flower Preservation & Frames' },
  { id: 'keychains', label: 'Monogram Keychains' },
  { id: 'bookmarks', label: 'Floral Bookmarks' },
  { id: 'clocks', label: 'Geode Clocks & Trays' },
  { id: 'coasters', label: 'Resin Coasters' },
  { id: 'jewelry', label: 'Resin Jewelry & Pendants' },
];

