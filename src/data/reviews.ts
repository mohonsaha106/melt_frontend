import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Tasnim Farhana',
    city: 'Gulshan, Dhaka',
    rating: 5,
    date: '2 days ago',
    title: 'My wedding garland is preserved so beautifully!',
    comment: 'I sent Meltsparkle my wedding garland and reception roses. The 10-inch preservation frame turned out beyond breathtaking! The crystal resin clarity and gold leaf details will keep my wedding memories alive forever.',
    productName: 'Wedding Garland & Flower Preservation Frame',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Sadia Jahan',
    city: 'Dhanmondi, Dhaka',
    rating: 5,
    date: '4 days ago',
    title: 'Monogram Keychains make the best gifts!',
    comment: 'Ordered custom initial keychains for my bridesmaids with their favorite dried flowers and 24K gold foil. Everyone was obsessed with the glass-like finish. Fast delivery and secure packaging!',
    productName: '24K Gold Leaf Initial Monogram Keychain',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Tanvir Ahmed',
    city: 'Agrabad, Chattogram',
    rating: 5,
    date: '1 week ago',
    title: 'The Geode Resin Clock is a masterpiece',
    comment: 'The emerald and gold geode wall clock looks ultra-luxurious in our living room. You can tell real artistic craftsmanship went into every swirl and crushed crystal vein.',
    productName: 'Royal Emerald & Gold Geode Resin Wall Clock',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    author: 'Nafisa Tabassum',
    city: 'Uttara, Dhaka',
    rating: 5,
    date: '1 week ago',
    title: 'Unbelievable clarity & high quality',
    comment: 'Purchased the Ocean Wave coaster set and the wildflower bookmark. The water effect with real seafoam is hypnotic! The ৳50 advance COD process was very smooth.',
    productName: 'Ocean Wave Resin Coasters (Set of 4)',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    author: 'Farzana Chowdhury',
    city: 'Sylhet Sadar',
    rating: 5,
    date: '2 weeks ago',
    title: 'Baby memory block made me cry happy tears',
    comment: 'Preserving our newborn’s hospital band and first curl in a crystal resin cube. Meltsparkle handled our delicate memories with so much care. Truly keeping memories alive!',
    productName: 'Baby Milestone Keepsake Memory Cube',
    verifiedPurchase: true
  }
];

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Durability' | 'Application' | 'Safety' | 'Delivery & Payment';
}

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'How do I send my bridal flowers or keepsake items for preservation?',
    answer: 'It is very simple!\n1. After placing your order on our website or messaging our Facebook page (https://www.facebook.com/Meltsparkle), our team provides simple packaging guidelines.\n2. Send your fresh or dried flowers/items via courier or rider to our Dhaka studio.\n3. We professionally dry and dehydrate the petals in silica gel before casting them in crystal resin.',
    category: 'Application'
  },
  {
    question: 'Will the resin turn yellow over time?',
    answer: 'No. At Meltsparkle, we exclusively use premium artist-grade, UV-stabilized, non-yellowing epoxy resin. This prevents discoloration and keeps your preserved memories crystal-clear for decades when kept away from direct prolonged outdoor sun exposure.',
    category: 'Durability'
  },
  {
    question: 'How long does it take to handcraft a custom resin order?',
    answer: '• Readymade / Personalized Keychains & Bookmarks: 2–4 business days.\n• Custom Clocks & Trays: 4–6 business days.\n• Wedding Flower Preservation Frames: 10–14 days (due to delicate petal dehydration & multi-layer curing processes).',
    category: 'Durability'
  },
  {
    question: 'How should I care for and clean my resin products?',
    answer: '• Clean gently with a soft microfiber cloth and mild soapy water if needed.\n• Avoid harsh chemical solvents, acetone, alcohol wipes, or abrasive pads.\n• Keep away from open flames and direct continuous extreme heat.',
    category: 'Safety'
  },
  {
    question: 'How does Cash on Delivery (COD) and the ৳50 Advance work?',
    answer: 'We deliver nationwide across all 64 districts in Bangladesh! To confirm your handcrafted customization and book the courier parcel, we collect a small ৳50 token advance via bKash / Nagad / Rocket. The remaining due balance is paid to the courier upon delivery at your doorstep.',
    category: 'Delivery & Payment'
  },
  {
    question: 'What are the delivery charges and delivery times?',
    answer: 'Inside Dhaka: ৳60 (1–2 days delivery). Outside Dhaka (all 64 districts): ৳110 (2–4 days delivery via Steadfast / RedX). Orders over ৳1,500 receive 100% FREE delivery!',
    category: 'Delivery & Payment'
  },
  {
    question: 'What are the Buy 4 Get 1 Free and gift rewards?',
    answer: 'We love giving surprises!\n• Buy 4+ items → Get 1 FREE handcrafted gift of your choice!\n• Buy 7+ items → Get 2 FREE gifts!\n• Buy 10+ items → Get 3 FREE gifts!\nThe promotional gift selector automatically unlocks inside your cart drawer.',
    category: 'Delivery & Payment'
  }
];
