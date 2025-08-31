import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: 'Library',
      path: '/component-library-documentation-hub',
      icon: 'Library'
    },
    {
      label: 'Input Components',
      path: '/component-library-documentation-hub',
      icon: 'Package'
    },
    {
      label: 'Playground',
      path: '/interactive-component-playground',
      icon: 'Play',
      current: true
    }
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.label}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          <button
            onClick={() => handleNavigation(item?.path)}
            className={`
              flex items-center space-x-1 px-2 py-1 rounded-md transition-colors
              ${item?.current
                ? 'text-foreground font-medium bg-muted cursor-default'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
            disabled={item?.current}
            aria-current={item?.current ? 'page' : undefined}
          >
            <Icon name={item?.icon} size={14} />
            <span>{item?.label}</span>
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;