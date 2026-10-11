import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, Package, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, lastOrder } = useStore();
  const [orderIdQuery, setOrderIdQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(lastOrder || null);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdQuery.trim()) return;

    setTimeout(() => {
      setTrackedOrder({
        orderId: orderIdQuery.toUpperCase().startsWith('MS-') ? orderIdQuery.toUpperCase() : `MS-${orderIdQuery}`,
        customerName: 'Verified Customer',
        phone: '017••••••89',
        district: 'Dhaka',
        address: 'House 14, Road 7, Dhanmondi',
        status: 'Handed to Courier',
        courier: 'Steadfast Courier',
        trackingNumber: 'STF-BD-8931204',
        createdAt: '26 Sep 2026',
        estimatedDelivery: 'Tomorrow, 2:00 PM',
        steps: [
          { title: 'Order Placed', time: '26 Sep, 10:30 AM', done: true },
          { title: '৳50 Advance Confirmed', time: '26 Sep, 11:15 AM', done: true },
          { title: 'Quality Check & Resin Gift Boxing', time: '26 Sep, 03:00 PM', done: true },
          { title: 'Handed to Courier (Steadfast)', time: '27 Sep, 09:00 AM', done: true },
          { title: 'Out for Delivery', time: 'Estimated 28 Sep', done: false },
          { title: 'Delivered', time: 'Pending', done: false }
        ]
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsTrackOrderOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden z-10 border border-black/10 text-[#111111]"
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-black/10 bg-[#DFD8C7]">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-black" />
            <h3 className="text-lg font-bold text-[#111111]">Track Your Keepsake Parcel</h3>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-2 text-zinc-600 hover:text-black hover:bg-[#D4CCB8] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. MS-102948) or Phone"
              value={orderIdQuery}
              onChange={(e) => setOrderIdQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Tracking Result */}
          {trackedOrder && (
            <div className="space-y-6 pt-2">
              <div className="p-4 rounded-2xl bg-[#F2EDE2] border border-black/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#111111]">{trackedOrder.orderId}</span>
                  <span className="px-2.5 py-0.5 bg-amber-200/80 text-amber-900 text-[10px] font-bold rounded-full uppercase border border-amber-300">
                    In Transit
                  </span>
                </div>
                <div className="text-xs text-zinc-700">
                  Courier: <strong>Steadfast Express BD</strong> (Track ID: STF-BD-8931204)
                </div>
                <div className="text-xs text-zinc-700">
                  Estimated Delivery: <strong className="text-[#111111]">1–2 business days</strong>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="space-y-4 pl-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">Parcel Timeline</h4>
                
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-black/15">
                  {[
                    { label: 'Order Placed & Artisan Scheduled', done: true, time: '26 Sep, 10:30 AM' },
                    { label: '৳50 Advance Token Verified', done: true, time: '26 Sep, 11:15 AM' },
                    { label: 'Resin Quality Inspection & Gift Box Packaging', done: true, time: '26 Sep, 03:00 PM' },
                    { label: 'Dispatched with Courier', done: true, time: '27 Sep, 09:00 AM' },
                    { label: 'Out for Delivery to Doorstep', done: false, time: 'Expected 28 Sep' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done ? 'bg-black text-[#E8E2D3]' : 'bg-[#DFD8C7] text-zinc-500 border border-black/10'
                      }`}>
                        {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-semibold ${step.done ? 'text-[#111111]' : 'text-zinc-600'}`}>
                          {step.label}
                        </div>
                        <div className="text-[10px] text-zinc-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
