import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-wedding-preservation-frame',
    sku: 'MS-101',
    name: 'Wedding Garland & Flower Preservation Frame',
    category: 'preservation',
    price: 2800,
    originalPrice: 3500,
    tag: 'BEST',
    rating: 5.0,
    reviewCount: 168,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    description: 'Immortalize your most sacred wedding garland and reception bouquet in crystal-clear, non-yellowing UV archival resin. Handcrafted with gold foil flakes, custom couple name engraving, and acrylic stand.',
    placements: ['Wedding Keepsakes', 'Flower Preservation', 'Wall Art'],
    durability: 'Lifetime Keepsake',
    sizes: [
      { size: 'S', dimensions: '6 x 6 inch Square', price: 2800, isRecommended: true },
      { size: 'M', dimensions: '8 x 8 inch Square', price: 3800 },
      { size: 'L', dimensions: '10 x 10 inch Deluxe Hexagon', price: 5200 },
      { size: 'Pack', dimensions: 'Full Bridal Set (Frame + 2 Coasters + 1 Ring Dish)', price: 6800 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
  },
  {
    id: 'prod-gold-monogram-keychain',
    sku: 'MS-102',
    name: '24K Gold Leaf Initial Monogram Keychain',
    category: 'keychains',
    price: 350,
    originalPrice: 450,
    tag: 'BEST',
    rating: 4.9,
    reviewCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-poured crystal alphabet letter keychain infused with genuine 24K gold foil flakes, pressed white baby’s breath florals, and a luxury metallic swivel lobster clasp.',
    placements: ['Monogram Keychains', 'Resin Jewelry'],
    durability: 'Handcrafted Scratch-Resistant',
    sizes: [
      { size: 'S', dimensions: 'Single Initial (4.5 cm)', price: 350, isRecommended: true },
      { size: 'M', dimensions: 'Initial + Mini Heart Charm', price: 480 },
      { size: 'L', dimensions: 'Couple Duo Initials Set', price: 680 },
      { size: 'Pack', dimensions: 'Bridal Party Pack (5 Pcs)', price: 1550 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: true
  },
  {
    id: 'prod-geode-emerald-wall-clock',
    sku: 'MS-103',
    name: 'Royal Emerald & Gold Geode Resin Wall Clock',
    category: 'clocks',
    price: 3400,
    originalPrice: 4200,
    tag: 'BEST',
    rating: 5.0,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    description: 'Statement luxury resin timepiece made with crushed natural quartz crystals, metallic gold leaf veins, deep emerald pigments, and silent sweep quartz clock movement.',
    placements: ['Geode Clocks', 'Wall Art'],
    durability: 'Silent Sweep Quartz Clock',
    sizes: [
      { size: 'S', dimensions: '10 inch Diameter', price: 3400, isRecommended: true },
      { size: 'M', dimensions: '12 inch Diameter', price: 4500 },
      { size: 'L', dimensions: '16 inch Grand Diameter', price: 6200 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
  },
  {
    id: 'prod-ocean-wave-coasters',
    sku: 'MS-104',
    name: 'Ocean Wave Resin Coasters (Set of 4)',
    category: 'coasters',
    price: 1200,
    originalPrice: 1500,
    tag: 'HOT',
    rating: 4.9,
    reviewCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking 3-layer resin beach art capturing frothy seafoam waves, natural coastal sand, and azure blue waters. Heat-resistant with soft protective cork base.',
    placements: ['Ocean Coasters', 'Trinket Trays'],
    durability: 'Heat & Spill Resistant',
    sizes: [
      { size: 'S', dimensions: 'Pair of 2 Coasters (4 inch)', price: 650 },
      { size: 'M', dimensions: 'Set of 4 Coasters (4 inch)', price: 1200, isRecommended: true },
      { size: 'L', dimensions: 'Set of 6 Coasters + Holder Tray', price: 1850 }
    ],
    isFreeGiftEligible: false
  },
  {
    id: 'prod-pressed-flower-bookmark',
    sku: 'MS-105',
    name: 'Pressed Wildflower Botanical Resin Bookmark',
    category: 'bookmarks',
    price: 320,
    originalPrice: 420,
    tag: 'HOT',
    rating: 4.9,
    reviewCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-thin, flexible yet shatterproof crystal resin bookmark encasing real pressed daisies, lavender, gold shimmer foil, and a luxurious handcrafted silk tassel.',
    placements: ['Floral Bookmarks', 'Desk Signs'],
    durability: 'Flexible & Shatterproof',
    sizes: [
      { size: 'S', dimensions: 'Slim (14 x 2.5 cm)', price: 320, isRecommended: true },
      { size: 'M', dimensions: 'Wide (14 x 4 cm)', price: 420 },
      { size: 'L', dimensions: 'Personalized Name Bookmark', price: 490 },
      { size: 'Pack', dimensions: 'Reader Gift Bundle (3 Bookmarks)', price: 850 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: true
  },
  {
    id: 'prod-floral-ring-dish',
    sku: 'MS-106',
    name: 'Personalized Floral Trinket Dish & Ring Holder',
    category: 'jewelry',
    price: 650,
    originalPrice: 850,
    tag: 'NEW',
    rating: 4.8,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    description: 'Scalloped edge jewelry tray adorned with real dried rose petals, botanical ferns, and custom gold script lettering. Perfect for bridal nightstands and ring displays.',
    placements: ['Trinket Trays', 'Wedding Keepsakes', 'Resin Jewelry'],
    durability: 'Handcrafted Gloss Finish',
    sizes: [
      { size: 'S', dimensions: '4 inch Round Scallop', price: 650, isRecommended: true },
      { size: 'M', dimensions: '5.5 inch Oval Trinket Tray', price: 900 },
      { size: 'L', dimensions: 'Ring Dish + Ring Cone Duo', price: 1250 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
  },
  {
    id: 'prod-forever-rose-pendant',
    sku: 'MS-107',
    name: 'Eternal Dried Rosebud Teardrop Pendant',
    category: 'jewelry',
    price: 550,
    originalPrice: 700,
    tag: 'TRENDING',
    rating: 4.9,
    reviewCount: 175,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    description: 'A real miniature red rosebud preserved forever inside a high-clarity resin teardrop cabochon, suspended on an anti-tarnish 18k gold plated or silver chain.',
    placements: ['Resin Jewelry', 'Flower Preservation'],
    durability: 'Anti-Tarnish Chain Included',
    sizes: [
      { size: 'S', dimensions: 'Small Teardrop (20 mm)', price: 550, isRecommended: true },
      { size: 'M', dimensions: 'Medium Orb (25 mm)', price: 720 },
      { size: 'L', dimensions: 'Pendant + Matching Earring Set', price: 1100 }
    ],
    isFreeGiftEligible: true
  },
  {
    id: 'prod-baby-milestone-block',
    sku: 'MS-108',
    name: 'Baby Milestone Keepsake Memory Cube',
    category: 'preservation',
    price: 2400,
    originalPrice: 3000,
    tag: 'BEST',
    rating: 5.0,
    reviewCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    description: 'Preserve your baby’s precious newborn memories forever — first curl, hospital bracelet, birth time, and pressed nursery florals inside a crystal clear memory block.',
    placements: ['Baby Keepsakes', 'Flower Preservation'],
    durability: 'Forever Archival Casting',
    sizes: [
      { size: 'S', dimensions: '4 x 4 inch Cube', price: 2400, isRecommended: true },
      { size: 'M', dimensions: '5 x 5 inch Cube', price: 3200 },
      { size: 'L', dimensions: '6 x 6 inch Cube with Wooden Light Stand', price: 4200 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
  },
  {
    id: 'prod-glowing-letter-nightlamp',
    sku: 'MS-109',
    name: 'Custom Resin Monogram Letter Nightlamp (USB LED)',
    category: 'custom',
    price: 1450,
    originalPrice: 1900,
    tag: 'HOT',
    rating: 5.0,
    reviewCount: 205,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'Personalized resin alphabet letter filled with dried hydrangea petals, gold flake swirls, and fairy pearls, mounted on a solid beech wood warm LED glow stand.',
    placements: ['Letter Nightlamps', 'Monogram Keychains', 'Desk Signs'],
    durability: 'Warm LED USB Powered',
    sizes: [
      { size: 'S', dimensions: 'Single Letter + Wood Base (11 cm)', price: 1450, isRecommended: true },
      { size: 'M', dimensions: 'Couple Initials (e.g. A & S)', price: 2600 },
      { size: 'L', dimensions: 'Full Name Word Lamp (up to 6 letters)', price: 4500 }
    ],
    isCustomizable: true,
    isFreeGiftEligible: false
  },
  {
    id: 'prod-geode-agate-vanity-tray',
    sku: 'MS-110',
    name: 'Luxe Geode Agate Vanity Serving Tray',
    category: 'clocks',
    price: 1850,
    originalPrice: 2400,
    tag: 'NEW',
    rating: 4.9,
    reviewCount: 62,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    description: 'High-gloss resin vanity tray with real crushed glass borders, gold shimmer veins, and dual solid brass brushed handles. Elevates perfumes, watches, and candles.',
    placements: ['Trinket Trays', 'Wall Art'],
    durability: 'Polished Brass Handles',
    sizes: [
      { size: 'S', dimensions: '10 x 6 inch Tray', price: 1850, isRecommended: true },
      { size: 'M', dimensions: '12 x 8 inch Tray', price: 2600 },
      { size: 'L', dimensions: '14 x 10 inch Grand Tray', price: 3400 }
    ],
    isFreeGiftEligible: false
  },
  {
    id: 'prod-islamic-calligraphy-art',
    sku: 'MS-111',
    name: 'Ayatul Kursi Metallic Arabic Calligraphy Resin Art',
    category: 'clocks',
    price: 4200,
    originalPrice: 5200,
    tag: 'LIMITED',
    rating: 5.0,
    reviewCount: 114,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: '16-inch circular high-gloss black and champagne gold resin art with metallic 3D raised Arabic calligraphy of Ayatul Kursi. A timeless centerpiece for any home.',
    placements: ['Wall Art', 'Geode Clocks'],
    durability: '3D Gold Mirror Acrylic Inlay',
    sizes: [
      { size: 'S', dimensions: '12 inch Diameter', price: 3200 },
      { size: 'M', dimensions: '16 inch Diameter', price: 4200, isRecommended: true },
      { size: 'L', dimensions: '20 inch Grand Statement Piece', price: 5900 }
    ],
    isFreeGiftEligible: false
  },
  {
    id: 'prod-botanical-hair-clips',
    sku: 'MS-112',
    name: 'Pressed Daisy & Gold Foil Hair Clip Set (3 Pcs)',
    category: 'jewelry',
    price: 420,
    originalPrice: 550,
    tag: 'TRENDING',
    rating: 4.8,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    description: 'Handmade alligator hair barrettes cast with real pressed forget-me-nots, golden flakes, and delicate dried leaves. Gentle on hair and effortlessly chic.',
    placements: ['Resin Jewelry', 'Floral Bookmarks'],
    durability: 'Gold Plated Strong Grip',
    sizes: [
      { size: 'S', dimensions: 'Set of 2 Minimal Clips', price: 290 },
      { size: 'M', dimensions: 'Set of 3 Statement Clips', price: 420, isRecommended: true },
      { size: 'L', dimensions: 'Set of 5 Assorted Floral Clips', price: 650 }
    ],
    isFreeGiftEligible: true
  }
];

export const FREE_GIFT_CATALOG: Product[] = PRODUCTS.filter(p => p.isFreeGiftEligible);
