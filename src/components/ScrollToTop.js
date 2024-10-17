import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Run when `pathname` (the current route) changes

  return null; // This component doesn't need to render anything
}

export default ScrollToTop;
