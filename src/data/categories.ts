import { Placement, TattooCategory } from '../types';

export interface PlacementItem {
  name: Placement;
  image: string;
  count: number;
}

export const PLACEMENTS: PlacementItem[] = [
  {
    name: 'Wedding Keepsakes',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80',
    count: 36
  },
  {
    name: 'Flower Preservation',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80',
    count: 48
  },
  {
    name: 'Monogram Keychains',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    count: 52
  },
  {
    name: 'Geode Clocks',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=400&q=80',
    count: 24
  },
  {
    name: 'Ocean Coasters',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    count: 31
  },
  {
    name: 'Floral Bookmarks',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    count: 40
  },
  {
    name: 'Resin Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
    count: 29
  },
  {
    name: 'Trinket Trays',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80',
    count: 22
  },
  {
    name: 'Baby Keepsakes',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
    count: 18
  },
  {
    name: 'Letter Nightlamps',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    count: 26
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
  { id: 'custom', label: 'Custom Studio' },
];
