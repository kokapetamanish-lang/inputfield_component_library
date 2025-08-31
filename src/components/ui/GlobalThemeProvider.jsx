import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const GlobalThemeProvider = ({ children, defaultTheme = 'light', storageKey = 'theme' }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = window.document?.documentElement;
    const savedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    root.classList?.remove('light', 'dark');
    root.classList?.add(initialTheme);
  }, [storageKey]);

  const changeTheme = (newTheme) => {
    if (newTheme === theme) return;
    
    setIsTransitioning(true);
    const root = window.document?.documentElement;
    
    // Add transition class for smooth theme switching
    root.style.transition = 'background-color 200ms ease-in-out, color 200ms ease-in-out';
    
    root.classList?.remove('light', 'dark');
    root.classList?.add(newTheme);
    
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    
    // Remove transition after animation completes
    setTimeout(() => {
      root.style.transition = '';
      setIsTransitioning(false);
    }, 200);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: changeTheme,
    toggleTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen bg-background text-foreground transition-smooth ${isTransitioning ? 'pointer-events-none' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default GlobalThemeProvider;