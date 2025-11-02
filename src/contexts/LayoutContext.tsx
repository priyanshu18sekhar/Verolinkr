'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LayoutContextType {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  isMobile: boolean;
  isTablet: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setLeftSidebarOpen: (open: boolean) => void;
  setRightSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftSidebarOpen, setLeftSidebarOpenState] = useState<boolean>(true);
  const [rightSidebarOpen, setRightSidebarOpenState] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    // Load saved sidebar preferences from localStorage
    const savedLeftSidebar = localStorage.getItem('leftSidebarOpen');
    const savedRightSidebar = localStorage.getItem('rightSidebarOpen');
    
    if (savedLeftSidebar === 'true' || savedLeftSidebar === 'false') {
      setLeftSidebarOpenState(savedLeftSidebar === 'true');
    } else {
      setLeftSidebarOpenState(true); // Default to open for desktop
    }
    
    if (savedRightSidebar === 'true' || savedRightSidebar === 'false') {
      setRightSidebarOpenState(savedRightSidebar === 'true');
    }

    // Check initial viewport size
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
      
      // Auto-adjust sidebar states on mobile
      if (width < 768) {
        setLeftSidebarOpenState(false);
        setRightSidebarOpenState(false);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const toggleLeftSidebar = () => {
    const newState = !leftSidebarOpen;
    setLeftSidebarOpenState(newState);
    localStorage.setItem('leftSidebarOpen', String(newState));
  };

  const toggleRightSidebar = () => {
    const newState = !rightSidebarOpen;
    setRightSidebarOpenState(newState);
    localStorage.setItem('rightSidebarOpen', String(newState));
  };

  const setLeftSidebarOpen = (open: boolean) => {
    setLeftSidebarOpenState(open);
    localStorage.setItem('leftSidebarOpen', String(open));
  };

  const setRightSidebarOpen = (open: boolean) => {
    setRightSidebarOpenState(open);
    localStorage.setItem('rightSidebarOpen', String(open));
  };

  return (
    <LayoutContext.Provider
      value={{
        leftSidebarOpen,
        rightSidebarOpen,
        isMobile,
        isTablet,
        toggleLeftSidebar,
        toggleRightSidebar,
        setLeftSidebarOpen,
        setRightSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

