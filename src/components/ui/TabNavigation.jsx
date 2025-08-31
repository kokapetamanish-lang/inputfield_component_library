import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleKeyDown = (event, path) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleNavigation(path);
    } else if (event?.key === 'ArrowLeft' || event?.key === 'ArrowRight') {
      event?.preventDefault();
      const currentIndex = navigationItems?.findIndex(item => item?.path === location?.pathname);
      let nextIndex;
      
      if (event?.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navigationItems?.length - 1;
      } else {
        nextIndex = currentIndex < navigationItems?.length - 1 ? currentIndex + 1 : 0;
      }
      
      handleNavigation(navigationItems?.[nextIndex]?.path);
    }
  };

  return (
    <nav className={`flex items-center space-x-1 ${className}`} role="tablist">
      {navigationItems?.map((item, index) => (
        <button
          key={item?.path}
          onClick={() => handleNavigation(item?.path)}
          onKeyDown={(e) => handleKeyDown(e, item?.path)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${isActivePath(item?.path)
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
          `}
          role="tab"
          aria-selected={isActivePath(item?.path)}
          aria-controls={`panel-${index}`}
          tabIndex={isActivePath(item?.path) ? 0 : -1}
          title={item?.description}
        >
          <Icon name={item?.icon} size={16} />
          <span>{item?.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;