import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, Instagram, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | '5star'>('all');

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
      caption: 'Wedding garland preservation frame',
      likes: 780
    },
    {
      url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      caption: '24K gold foil initial keychains set',
      likes: 924
    },
    {
      url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80',
      caption: 'Royal emerald geode wall clock',
      likes: 645
    },
    {
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      caption: 'Ocean wave 3-layer resin coasters',
      likes: 812
    }
  ];

  const filteredReviews = REVIEWS.filter((r) => {
    if (activeTab === '5star') return r.rating === 5;
    if (activeTab === 'verified') return r.verifiedPurchase;
    return true;
  });

  return (
    <section id="community-gallery" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Lookbook Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 font-mono">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>COMMUNITY LOOKBOOK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
            Tagged with #Meltsparkle
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Real homes, real bridal memories across Bangladesh. Follow facebook.com/Meltsparkle & tag us to be featured.
          </p>
        </div>

        {/* 4 Image Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#DFD8C7] shadow-sm border border-[#D3CBBA]"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="text-xs font-medium line-clamp-1">{img.caption}</p>
                <div className="flex items-center space-x-1 text-[11px] text-pink-300 mt-1">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                  <span>{img.likes} likes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <div className="pt-12 border-t border-[#D3CBBA]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xl font-bold text-zinc-900 font-serif">4.95 / 5.0</span>
                <span className="text-sm text-zinc-600">(1,480+ Happy Customers)</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mt-1 font-serif">
                What Our Clients Say
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-[#DFD8C7] rounded-xl border border-[#D3CBBA]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'all' ? 'bg-black text-[#E8E2D3] shadow-sm' : 'text-zinc-700 hover:text-black'
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setActiveTab('5star')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === '5star' ? 'bg-black text-[#E8E2D3] shadow-sm' : 'text-zinc-700 hover:text-black'
                }`}
              >
                5 Stars Only
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'verified' ? 'bg-black text-[#E8E2D3] shadow-sm' : 'text-zinc-700 hover:text-black'
                }`}
              >
                Verified Purchases
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 flex flex-col justify-between shadow-soft hover:shadow-card hover:border-black/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">{rev.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 mb-2 font-serif">{rev.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D3CBBA]/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-zinc-900">{rev.author}</div>
                    <div className="text-[11px] text-zinc-500">{rev.city}</div>
                  </div>
                  {rev.verifiedPurchase && (
                    <div className="flex items-center space-x-1 text-[11px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Order</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
