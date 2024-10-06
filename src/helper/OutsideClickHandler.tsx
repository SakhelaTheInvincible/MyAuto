import React, { useRef, useEffect } from 'react';

type OutsideClickHandlerProps = {
  onOutsideClick: () => void;
  children: React.ReactNode;
};

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({ onOutsideClick, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onOutsideClick]);

  return <div ref={containerRef}>{children}</div>;
};

export default OutsideClickHandler;
