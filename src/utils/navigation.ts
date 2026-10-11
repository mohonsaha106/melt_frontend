import { NavigateFunction } from 'react-router-dom';
import { scrollToElementWithOffset } from '../components/ScrollAndSectionManager';

/**
 * Universal Section Navigator:
 * - If on Homepage (/), smoothly scrolls to the section element.
 * - If on any other page (/shop, /how-to-order, /faq, etc.), navigates to /#{sectionId}
 *   and restores the target section automatically.
 */
export const navigateToSection = (sectionId: string, navigate?: NavigateFunction): void => {
  const currentPath = window.location.pathname;

  if (currentPath === '/') {
    // Already on homepage, smooth scroll directly
    const scrolled = scrollToElementWithOffset(sectionId, 'smooth');
    if (!scrolled) {
      window.location.hash = sectionId;
    }
  } else {
    // Save target section so manager scrolls to it immediately
    sessionStorage.setItem('melt_homepage_section', sectionId);

    if (navigate) {
      navigate(`/#${sectionId}`);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  }
};
