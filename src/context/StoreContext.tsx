import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Placement, TattooCategory, OrderDetails } from '../types';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, size?: 'S' | 'M' | 'L' | 'Pack', customDetails?: { text: string; font: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  
  // Free Gifts Deal
  freeGifts: CartItem[];
  addFreeGift: (product: Product) => void;
  removeFreeGift: (cartItemId: string) => void;
  eligibleFreeGiftCount: number;
  remainingFreeGiftSlots: number;
  nextTierItemsNeeded: number;
  nextTierProgressPercent: number;
  isFreeGiftModalOpen: boolean;
  setIsFreeGiftModalOpen: (open: boolean) => void;

  // Wishlist State
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Navigation
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCustomStudioOpen: boolean;
  setIsCustomStudioOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isHowToApplyOpen: boolean;
  setIsHowToApplyOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;

  // Filters & Search
  selectedCategory: TattooCategory;
  setSelectedCategory: (cat: TattooCategory) => void;
  selectedPlacement: Placement | null;
  setSelectedPlacement: (placement: Placement | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;

  // Calculated Totals
  cartSubtotal: number;
  totalCartItemCount: number;
  isMinimumOrderMet: boolean;
  freeShippingRemaining: number;
  isFreeShippingUnlocked: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'melt_sparkle_cart_v1';
const WISHLIST_STORAGE_KEY = 'melt_sparkle_wishlist_v1';
const MINIMUM_ORDER_AMOUNT = 250;
const FREE_SHIPPING_THRESHOLD = 1500;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load Wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFreeGiftModalOpen, setIsFreeGiftModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHowToApplyOpen, setIsHowToApplyOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Search & Filters
  const [selectedCategory, setSelectedCategory] = useState<TattooCategory>('all');
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Separate regular items and free gifts in cart
  const regularCartItems = useMemo(() => cart.filter(item => !item.isFreeGift), [cart]);
  const freeGifts = useMemo(() => cart.filter(item => item.isFreeGift), [cart]);

  // Regular item count for unlocking promo tiers
  const regularItemCount = useMemo(() => {
    return regularCartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [regularCartItems]);

  // Promo deal tiers:
  // 4+ items -> 1 free gift
  // 7+ items -> 2 free gifts
  // 10+ items -> 3 free gifts
  const eligibleFreeGiftCount = useMemo(() => {
    if (regularItemCount >= 10) return 3;
    if (regularItemCount >= 7) return 2;
    if (regularItemCount >= 4) return 1;
    return 0;
  }, [regularItemCount]);

  const remainingFreeGiftSlots = Math.max(0, eligibleFreeGiftCount - freeGifts.length);

  // Next tier milestone
  const { nextTierItemsNeeded, nextTierProgressPercent } = useMemo(() => {
    if (regularItemCount < 4) {
      return {
        nextTierItemsNeeded: 4 - regularItemCount,
        nextTierProgressPercent: Math.min(100, (regularItemCount / 4) * 100)
      };
    } else if (regularItemCount < 7) {
      return {
        nextTierItemsNeeded: 7 - regularItemCount,
        nextTierProgressPercent: Math.min(100, ((regularItemCount - 4) / 3) * 100)
      };
    } else if (regularItemCount < 10) {
      return {
        nextTierItemsNeeded: 10 - regularItemCount,
        nextTierProgressPercent: Math.min(100, ((regularItemCount - 7) / 3) * 100)
      };
    } else {
      return {
        nextTierItemsNeeded: 0,
        nextTierProgressPercent: 100
      };
    }
  }, [regularItemCount]);

  // Celebrate when a free gift tier is unlocked
  useEffect(() => {
    if (eligibleFreeGiftCount > 0 && remainingFreeGiftSlots > 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [eligibleFreeGiftCount, remainingFreeGiftSlots]);

  // Subtotal of regular items
  const cartSubtotal = useMemo(() => {
    return regularCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [regularCartItems]);

  const totalCartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const isMinimumOrderMet = cartSubtotal >= MINIMUM_ORDER_AMOUNT || cartSubtotal === 0;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const isFreeShippingUnlocked = cartSubtotal >= FREE_SHIPPING_THRESHOLD;

  // Add regular item to cart
  const addToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'Pack' = 'S',
    customDetails?: { text: string; font: string }
  ) => {
    const sizeOption = product.sizes.find(s => s.size === size) || product.sizes[0];
    const unitPrice = sizeOption ? sizeOption.price : product.price;
    const cartItemId = customDetails 
      ? `${product.id}-${size}-${customDetails.text}-${customDetails.font}`
      : `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: customDetails ? `Custom: ${customDetails.text}` : product.name,
            sku: product.sku,
            imageUrl: product.imageUrl,
            size,
            price: unitPrice,
            quantity: 1,
            isFreeGift: false,
            customText: customDetails?.text,
            customFont: customDetails?.font
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  // Add chosen free gift
  const addFreeGift = (product: Product) => {
    if (freeGifts.length >= eligibleFreeGiftCount) return;

    const giftId = `free-gift-${product.id}-${Date.now()}`;
    setCart(prev => [
      ...prev,
      {
        id: giftId,
        productId: product.id,
        name: `${product.name} (Free Gift)`,
        sku: product.sku,
        imageUrl: product.imageUrl,
        size: 'S',
        price: 0,
        quantity: 1,
        isFreeGift: true
      }
    ]);
    setIsFreeGiftModalOpen(false);
  };

  const removeFreeGift = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  // Wishlist handler
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        freeGifts,
        addFreeGift,
        removeFreeGift,
        eligibleFreeGiftCount,
        remainingFreeGiftSlots,
        nextTierItemsNeeded,
        nextTierProgressPercent,
        isFreeGiftModalOpen,
        setIsFreeGiftModalOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCustomStudioOpen,
        setIsCustomStudioOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isHowToApplyOpen,
        setIsHowToApplyOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        lastOrder,
        setLastOrder,
        selectedCategory,
        setSelectedCategory,
        selectedPlacement,
        setSelectedPlacement,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        cartSubtotal,
        totalCartItemCount,
        isMinimumOrderMet,
        freeShippingRemaining,
        isFreeShippingUnlocked,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
