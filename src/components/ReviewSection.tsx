import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const homeReviewImages = [
    {
      id: 'h-rev-1',
      url: '/reviews/review-1.jpg',
      likes: 942
    },
    {
      id: 'h-rev-2',
      url: '/reviews/550887156_122140264028658912_2420151643039578278_n.jpg',
      likes: 835
    },
    {
      id: 'h-rev-3',
      url: '/reviews/548275486_122139653252658912_1171929115424733035_n.jpg',
      likes: 1120
    },
    {
      id: 'h-rev-4',
      url: '/reviews/550325310_122140266320658912_7231201057920921566_n.jpg',
      likes: 674
    },
    {
      id: 'h-rev-5',
      url: '/reviews/530862365_122136102956658912_5285189544644175084_n.jpg',
      likes: 785
    },
    {
      id: 'h-rev-6',
      url: '/reviews/529954523_122136102572658912_4395678324086200379_n.jpg',
      likes: 930
    },
    {
      id: 'h-rev-7',
      url: '/reviews/530369802_122136102872658912_861243861180862681_n.jpg',
      likes: 640
    },
    {
      id: 'h-rev-8',
      url: '/reviews/530825121_122136104126658912_725598718912369336_n.jpg',
      likes: 820
    }
  ];

  return (
    <section id="community-gallery" className="py-16 sm:py-24 bg-[#E8E2D3] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-amber-900 mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>REAL CUSTOMER REVIEWS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
            Loved by 15,000+ Customers
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Real customer chats, unboxing photos, and keepsakes shared across Bangladesh.
          </p>
        </div>

        {/* Pinterest-style Image Masonry Grid (Images Only, Zero Text Below) */}
        <div className="columns-2 sm:columns-2 md:columns-4 gap-3.5 sm:gap-5 space-y-3.5 sm:space-y-5 mb-12">
          {homeReviewImages.map((img) => (
            <Link
              key={img.id}
              to="/reviews"
              className="break-inside-avoid group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/5 shadow-xs hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src={img.url}
                alt="Customer Review Screenshot"
                className="w-full h-auto object-cover select-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Hover Dark Vignette & Heart */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 text-white">
                <span className="text-[11px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  View Review
                </span>
                <div className="flex items-center space-x-1 text-xs font-semibold bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{img.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action button linking to /reviews */}
        <div className="text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 shadow-md hover:shadow-xl active:scale-95"
          >
            <span>Explore All 18+ Customer Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
