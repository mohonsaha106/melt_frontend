import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

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
        
        {/* Expanded Social Icons Stack (WhatsApp & Messenger Only, No Text) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-3 mb-3"
            >
              {/* WhatsApp Circular Icon Button */}
              <motion.a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl border-2 border-white/40 hover:shadow-2xl transition-all"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.588 5.77-5.768 0-3.18-2.587-5.768-5.77-5.768zm3.389 8.163c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.115-.527-1.74-.719-2.853-2.493-2.94-2.608-.088-.115-.711-.946-.711-1.804 0-.858.448-1.28.608-1.454.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.25-.041.391.298.144.348.492 1.203.535 1.29.043.087.072.189.014.304-.058.116-.087.188-.174.29-.087.101-.183.226-.261.304-.087.087-.178.182-.077.355.101.174.45 1.488 1.488 2.012.285.144.526.19.711.232.185.043.348.043.478.022.145-.022.45-.184.58-.362.13-.178.13-.333.087-.464-.043-.13-.16-.203-.333-.29z"/>
                </svg>
              </motion.a>

              {/* Messenger Circular Icon Button */}
              <motion.a
                href="https://m.me/Meltsparkle"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.01 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0084FF] via-[#9B51E0] to-[#FF5E3A] text-white flex items-center justify-center shadow-xl border-2 border-white/40 hover:shadow-2xl transition-all"
                aria-label="Messenger"
                title="Chat on Facebook Messenger"
              >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.202.195.144.316.37.316.613l.063 1.91c.026.793.844 1.31 1.547.93l2.133-1.15a.99.99 0 0 1 .59-.092c.52.094 1.06.145 1.616.145 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.096 12.443-2.613-2.787-5.1 2.787 5.61-5.957 2.678 2.787 5.035-2.787-5.61 5.957z" />
                </svg>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger / Cross Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
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
