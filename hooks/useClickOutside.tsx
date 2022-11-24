import { useEffect, useCallback } from 'react';

export const useClickOutside = (ref: any, callback: any) => {
  const handleWindowSizeChangeCallback = useCallback((e) => handleClick(e), []);

  useEffect(() => {
    document.addEventListener('click', handleWindowSizeChangeCallback);
    return () => {
      document.removeEventListener('click', handleWindowSizeChangeCallback);
    };
  });

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

};