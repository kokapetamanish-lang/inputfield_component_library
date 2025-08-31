import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Documentation',
      path: '/component-library-documentation-hub',
      icon: 'Book',
      description: 'Component guides and examples'
    },
    {
      label: 'Playground',
      path: '/interactive-component-playground',
      icon: 'Play',
      description: 'Interactive experimentation environment'
    },
    {
      label: 'API Reference',
      path: '/component-api-reference',
      icon: 'Code',
      description: 'Technical documentation and interfaces'
    },
    {
      label: 'Themes',
      path: '/theme-customization-studio',
      icon: 'Palette',
      description: 'Design customization studio'
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement?.classList?.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement?.classList?.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="Layers" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">InputField</span>
              <span className="text-xs text-muted-foreground -mt-1">Component Library</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.description}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>v2.1.0</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={16} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-micro
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <div className="flex flex-col items-start">
                    <span>{item?.label}</span>
                    <span className="text-xs opacity-75">{item?.description}</span>
                  </div>
                </button>
              ))}
              <div className="pt-3 mt-3 border-t border-border">
                <div className="text-xs text-muted-foreground px-3">Version 2.1.0</div>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-micro
                ${isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={item?.icon} size={18} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NavigationHeader;