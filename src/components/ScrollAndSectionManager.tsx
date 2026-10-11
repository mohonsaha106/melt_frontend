import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const HOMEPAGE_SECTIONS = [
  'hero-section',
  'special-offers',
  'explore-categories',
  'highlight-banner',
  'product-catalog',
  'custom-universe',
  'community-gallery'
];

/**
 * Detect which section of the homepage is currently in the active viewport
 */
export const getActiveHomepageSection = (): string => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollY < 120) return 'hero-section';

  // Check middle-upper area of viewport
  const viewportAnchor = scrollY + 140;

  for (let i = HOMEPAGE_SECTIONS.length - 1; i >= 0; i--) {
    const id = HOMEPAGE_SECTIONS[i];
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + scrollY;
    if (viewportAnchor >= top - 20) {
      return id;
    }
  }

  return 'hero-section';
};

/**
 * Scroll smoothly to element with sticky header offset
 */
export const scrollToElementWithOffset = (
  elementId: string, 
  behavior: ScrollBehavior = 'smooth'
): boolean => {
  const el = document.getElementById(elementId);
  if (!el) return false;

  const headerOffset = 82;
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetTop = Math.max(0, rect.top + scrollTop - headerOffset);

  window.scrollTo({
    top: targetTop,
    behavior
  });
  return true;
};

/**
 * Global Scroll & Section Manager:
 * 1. Tracks user scroll position & active section across the platform
 * 2. If user leaves a section of the homepage and returns (Back button or link), restores that exact section
 * 3. Handles hash/anchor links across the entire platform
 * 4. Restores scroll position on pop navigation across all pages
 */
export const ScrollAndSectionManager: React.FC = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const lastPathnameRef = useRef(location.pathname);
  const isInitialMountRef = useRef(true);

  // 1. Passive scroll listener to remember section & position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentPath = window.location.pathname;
          const currentY = window.pageYOffset || document.documentElement.scrollTop;

          // Always track position for current route
          sessionStorage.setItem(`melt_scroll_${currentPath}`, String(currentY));

          // If on homepage, track active section
          if (currentPath === '/') {
            const activeSection = getActiveHomepageSection();
            sessionStorage.setItem('melt_homepage_section', activeSection);
            sessionStorage.setItem('melt_homepage_scrollY', String(currentY));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Handle route transition, hash navigation, and section restoration
  useEffect(() => {
    const { pathname, hash } = location;
    const isReturningToHome = pathname === '/' && lastPathnameRef.current !== '/';
    const isPop = navType === 'POP';
    lastPathnameRef.current = pathname;

    // A. Explicit hash navigation (e.g. /#product-catalog or /#special-offers)
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const scrolled = scrollToElementWithOffset(targetId, 'smooth');
        if (scrolled || attempts >= 8) {
          clearInterval(interval);
        }
      }, 50);
      return;
    }

    // B. Check if user clicked Logo to reset to top
    if (sessionStorage.getItem('melt_reset_to_top') === 'true') {
      sessionStorage.removeItem('melt_reset_to_top');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // C. Returning to Homepage from another page
    if (pathname === '/') {
      if (isReturningToHome || isPop) {
        const savedSection = sessionStorage.getItem('melt_homepage_section');
        const savedScrollY = sessionStorage.getItem('melt_homepage_scrollY');

        if (savedSection && savedSection !== 'hero-section') {
          // Restore exact section with retry until component mounts
          let attempts = 0;
          const interval = setInterval(() => {
            attempts++;
            const scrolled = scrollToElementWithOffset(savedSection, attempts === 1 ? 'instant' : 'smooth');
            if (scrolled || attempts >= 8) {
              clearInterval(interval);
            }
          }, 40);
          return;
        } else if (savedScrollY && Number(savedScrollY) > 80) {
          window.scrollTo({ top: Number(savedScrollY), behavior: 'instant' });
          return;
        }
      }

      // Initial mount or fresh visit without prior section
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;
      }
      return;
    }

    // D. Subpage navigation (e.g. /shop, /reviews, /faq, /about, /how-to-order)
    if (isPop) {
      // Browser Back/Forward: restore saved scroll position for this subpage
      const savedY = sessionStorage.getItem(`melt_scroll_${pathname}`);
      if (savedY) {
        const targetY = Number(savedY);
        setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 30);
        return;
      }
    }

    // Fresh PUSH navigation to a new subpage: start at top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location, navType]);

  return null;
};
