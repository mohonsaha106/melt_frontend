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
  category: string;
  categoryEn?: string;
}

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'বিয়ের ফুল বা স্মৃতিচিহ্ন সংরক্ষণের জন্য কীভাবে পাঠাব?',
    answer: 'এটি খুবই সহজ!\n১. আমাদের ওয়েবসাইটে অর্ডার করার পর বা ফেসবুক পেইজে (facebook.com/Meltsparkle) নক দেওয়ার পর আমাদের টিম সহজ প্যাকেজিং গাইডলাইন প্রদান করবে।\n২. কুরিয়ার বা রাইডারের মাধ্যমে আপনার তাজা বা শুকনা ফুল আমাদের ঢাকা স্টুডিওতে পাঠান।\n৩. আমরা সিলিকা জেলের সাহায্যে পাপড়িগুলো ডিহাইড্রেট করে নিখুঁত ক্রিস্টাল রেজিনে কাস্টিং করি।',
    category: 'ফুল সংরক্ষণ',
    categoryEn: 'Flower Preservation'
  },
  {
    question: 'সময়ের সাথে কি রেজিনের রং হলুদ বা ঘোলা হয়ে যাবে?',
    answer: 'একদমই না। Meltsparkle-এ আমরা বিশেষভাবে প্রিমিয়াম আর্টিস্ট-গ্রেড, ইউভি-স্ট্যাবিলাইজড নন-ইয়েলোয়িং ইপোক্সি রেজিন ব্যবহার করি। সরাসরি প্রখর রোদে দীর্ঘক্ষণ ফেলে না রাখলে এটি বছরের পর বছর ক্রিস্টাল কাঁচের মতো স্বচ্ছ থাকবে।',
    category: 'স্থায়িত্ব ও কোয়ালিটি',
    categoryEn: 'Durability & Quality'
  },
  {
    question: 'কাস্টম রেজিন অর্ডার তৈরিতে কতদিন সময় লাগে?',
    answer: '• রেডিমেড বা পার্সোনালাইজড কিচেন ও বুকমার্ক: ২–৪ কার্যদিবস।\n• কাস্টম ওয়াল ক্লক ও ট্রে: ৪–৬ কার্যদিবস।\n• বিয়ের ফুলের ফ্রেম: ১০–১৪ দিন (কারণ পাপড়িগুলো নিখুঁতভাবে শুকানো এবং কয়েক স্তরে রেজিন কিউরিং করার প্রয়োজন হয়)।',
    category: 'স্থায়িত্ব ও কোয়ালিটি',
    categoryEn: 'Durability & Quality'
  },
  {
    question: 'রেজিন প্রোডাক্টের যত্ন ও পরিষ্কার করার নিয়ম কী?',
    answer: '• যেকোনো নরম মাইক্রোফাইবার কাপড় ও হালকা সাবান পানি দিয়ে আলতোভাবে মুছে নিন।\n• কোনো হার্শ কেমিক্যাল, অ্যাসিটোন, অ্যালকোহল বা শক্ত মাজুনি ব্যবহার করবেন না।\n• সরাসরি খোলা আগুন ও অতিরিক্ত তাপ থেকে দূরে রাখুন।',
    category: 'ব্যবহার ও যত্ন',
    categoryEn: 'Usage & Care'
  },
  {
    question: 'ক্যাশ অন ডেলিভারি (COD) এবং ৫০ টাকা অগ্রিম কীভাবে কাজ করে?',
    answer: 'আমরা সারা বাংলাদেশে ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি সুবিধা দিই! কাস্টমাইজেশন ও কুরিয়ার পার্সেল বুকিং নিশ্চিত করতে বিকাশ, নগদ বা রকেটের মাধ্যমে মাত্র ৫০ টাকা টোকেন অগ্রিম নেওয়া হয়। বাকি সম্পূর্ণ টাকা পার্সেল হাতে পেয়ে ডেলিভারিম্যানকে পরিশোধ করবেন।',
    category: 'ডেলিভারি ও পেমেন্ট',
    categoryEn: 'Delivery & Payment'
  },
  {
    question: 'ডেলিভারি চার্জ ও ডেলিভারির সময় কেমন?',
    answer: 'ঢাকা সিটির ভেতরে: ৳৬০ (১–২ দিন ডেলিভারি)। ঢাকা সিটির বাইরে (৬৪ জেলা): ৳১১০ (২–৪ দিন ডেলিভারি, স্টেডফাস্ট ও রেডেক্স কুরিয়ারে)। ১,৫০০ টাকার বেশি অর্ডারে সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি!',
    category: 'ডেলিভারি ও পেমেন্ট',
    categoryEn: 'Delivery & Payment'
  },
  {
    question: '৪টি কিনলে ১টি ফ্রি অফারটি কীভাবে পাওয়া যায়?',
    answer: 'আমরা কাস্টমারদের উপহার দিতে ভালোবাসি!\n• ৪টি বা তার বেশি কিনলে → ১টি উপহার সম্পূর্ণ ফ্রি!\n• ৭টি বা তার বেশি কিনলে → ২টি উপহার সম্পূর্ণ ফ্রি!\n• ১০টি বা তার বেশি কিনলে → ৩টি উপহার সম্পূর্ণ ফ্রি!\nকার্ট ড্রয়ারে পণ্য যোগ করলেই স্বয়ংক্রিয়ভাবে ফ্রি গিফট সিলেক্টর আনলক হয়ে যাবে।',
    category: 'ডেলিভারি ও পেমেন্ট',
    categoryEn: 'Delivery & Payment'
  }
];
