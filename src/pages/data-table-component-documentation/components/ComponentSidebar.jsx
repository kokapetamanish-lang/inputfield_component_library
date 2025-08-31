import React from 'react';
import Icon from '../../../components/AppIcon';

const ComponentSidebar = ({ selectedComponent, onComponentSelect }) => {
  const components = [
    {
      id: 'data-table',
      name: 'Data Table',
      description: 'Main data table component',
      status: 'stable',
      variants: [
        { id: 'basic-table', name: 'Basic Table', description: 'Simple data display' },
        { id: 'sortable-table', name: 'Sortable Table', description: 'With column sorting' },
        { id: 'selectable-table', name: 'Selectable Table', description: 'With row selection' },
        { id: 'advanced-table', name: 'Advanced Table', description: 'Full featured table' }
      ]
    }
  ];

  const handleComponentClick = (component) => {
    onComponentSelect(component);
  };

  return (
    <div className="h-full bg-card border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Data Table Components</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Explore table variants and examples
        </p>
      </div>
      <div className="p-4">
        {components?.map((component) => (
          <div key={component?.id} className="mb-6">
            <div
              className={`
                flex items-center justify-between p-3 rounded-lg cursor-pointer transition-micro
                ${selectedComponent?.id === component?.id 
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                }
              `}
              onClick={() => handleComponentClick(component)}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Table" size={20} className="text-primary" />
                <div>
                  <h3 className="font-medium text-foreground">{component?.name}</h3>
                  <p className="text-xs text-muted-foreground">{component?.description}</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                {component?.status}
              </span>
            </div>

            {/* Variants */}
            <div className="ml-8 mt-2 space-y-2">
              {component?.variants?.map((variant) => (
                <div
                  key={variant?.id}
                  className={`
                    flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-micro
                    ${selectedComponent?.id === variant?.id 
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted/30 text-muted-foreground'
                    }
                  `}
                  onClick={() => handleComponentClick(variant)}
                >
                  <Icon name="Minus" size={14} />
                  <div>
                    <h4 className="text-sm font-medium">{variant?.name}</h4>
                    <p className="text-xs opacity-75">{variant?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentSidebar;