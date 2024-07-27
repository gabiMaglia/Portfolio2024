// components/scroll-to-top.js
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const ButtonScrollTopComponent = ({ scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      
      const isActive = scrollY.current > 0.14;
      setIsVisible(isActive);
    };
    handleVisibility(); 

    const unsubscribe = scrollY.onChange(handleVisibility); 

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
        document.documentElement.scrollTop = 0; 
        document.body.scrollTop = 0;
  };

  return (
    <div
      onClick={handleScrollToTop}
      className={`fixed bottom-6 left-6 ${isVisible ? 'block' : 'hidden'}`}
    >
      <Button>Up</Button>
    </div>
  );
};

export default ButtonScrollTopComponent;
