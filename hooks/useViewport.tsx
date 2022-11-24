import { useCallback, useEffect, useState } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const handleScrollChange = () => {
    setScrollOffset(window.pageYOffset)
  };

  const handleWindowSizeChangeCallback = useCallback((e) => handleWindowSizeChange(), []);
  const handleScrollChangeCallback = useCallback((e) => handleScrollChange(), []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChangeCallback);
    window.addEventListener('scroll', handleScrollChangeCallback);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChangeCallback);
      window.removeEventListener('scroll', handleScrollChangeCallback);
    };
  }, []);

  return { isMobile: width <= 768, screenWidth: width, screenHeight: height, scrollOffset };
};
