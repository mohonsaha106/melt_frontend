import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.6,
    transition: { duration: 0.14 },
  },
};

export const FloatingMessengerButton: React.FC = () => {
  const { cart, isCartOpen, isCheckoutOpen } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If floating cart bar is visible on mobile, elevate the button so they don't overlap
  const isCartBarVisible = cart.length > 0 && !isCartOpen && !isCheckoutOpen;

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`fixed right-4 sm:right-6 z-40 transition-all duration-300 select-none ${
        isCartBarVisible ? 'bottom-20 sm:bottom-24' : 'bottom-5 sm:bottom-6'
      }`}
    >
      <div className="relative flex flex-col items-center">
        
        {/* Expanded Social Icons Stack (WhatsApp & Messenger Only) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center space-y-3 mb-3"
            >
              {/* WhatsApp Circular Icon Button */}
              <motion.a
                variants={itemVariants}
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-white/50 transition-shadow focus:outline-none"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <svg className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.237a9.994 9.994 0 0 0 4.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.925-7.062A9.925 9.925 0 0 0 12.012 2zm5.782 14.545c-.24.67-.936 1.226-1.666 1.385-.501.107-1.155.195-3.342-.711-2.795-1.157-4.6-4.004-4.74-4.19-.138-.187-1.135-1.509-1.135-2.877 0-1.368.718-2.04 0.973-2.317.255-.276.56-.345.748-.345.188 0 .375.008.538.016.173.008.406-.065.635.485.239.57.812 1.978.883 2.122.07.144.118.314.02.508-.098.194-.147.315-.29.485-.143.17-.301.378-.43.508-.145.145-.295.304-.128.589.167.284.743 1.226 1.593 1.984 1.096.977 2.019 1.28 2.308 1.424.288.145.457.122.626-.073.169-.195.722-.84.915-1.127.194-.287.388-.24.646-.145.26.096 1.644.774 1.926.915.282.14.47.21.54.327.069.117.069.678-.17 1.352z"/>
                </svg>
              </motion.a>

              {/* Messenger Circular Icon Button */}
              <motion.a
                variants={itemVariants}
                href="https://m.me/Meltsparkle"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0084FF] via-[#9B51E0] to-[#FF5E3A] text-white flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-white/50 transition-shadow focus:outline-none"
                aria-label="Messenger"
                title="Chat on Facebook Messenger"
              >
                <svg className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.202.195.144.316.37.316.613l.063 1.91c.026.793.844 1.31 1.547.93l2.133-1.15a.99.99 0 0 1 .59-.092c.52.094 1.06.145 1.616.145 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.443-2.613-2.787-5.1 2.787 5.61-5.957 2.678 2.787 5.035-2.787-5.61 5.957z" />
                </svg>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger / Cross Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl transition-all duration-300 border-2 select-none ${
            isOpen 
              ? 'bg-zinc-900 border-[#D3CBBA] text-white shadow-xl rotate-90' 
              : 'bg-[#0A0A0A] hover:bg-zinc-900 border-[#D3CBBA]/80 text-[#E8E2D3] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
          }`}
          aria-label={isOpen ? "Close messaging options" : "Open messaging options"}
          title={isOpen ? "Close" : "Chat with us"}
        >
          {/* Active Online Green Dot (Only when closed) */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0A0A0A]"></span>
            </span>
          )}

          {/* Morphing Icon */}
          <motion.div
            key={isOpen ? 'close-icon' : 'msg-icon'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#E8E2D3]" />
            ) : (
              <MessageSquare className="w-6 h-6 text-[#E8E2D3]" />
            )}
          </motion.div>
        </motion.button>

      </div>
    </div>
  );
};

