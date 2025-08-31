import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComponentSidebar = ({ selectedComponent, onComponentSelect }) => {
  const [expandedSections, setExpandedSections] = useState({
    'input-components': true,
    'form-components': false,
    'layout-components': false
  });

  const componentSections = [
    {
      id: 'input-components',
      title: 'Input Components',
      icon: 'Type',
      components: [
        {
          id: 'text-input',
          name: 'Text Input',
          description: 'Basic text input with validation',
          status: 'stable'
        },
        {
          id: 'password-input',
          name: 'Password Input',
          description: 'Secure password input with toggle',
          status: 'stable'
        },
        {
          id: 'search-input',
          name: 'Search Input',
          description: 'Search input with clear functionality',
          status: 'stable'
        },
        {
          id: 'number-input',
          name: 'Number Input',
          description: 'Numeric input with validation',
          status: 'beta'
        },
        {
          id: 'email-input',
          name: 'Email Input',
          description: 'Email input with format validation',
          status: 'stable'
        }
      ]
    },
    {
      id: 'form-components',
      title: 'Form Components',
      icon: 'FileText',
      components: [
        {
          id: 'form-group',
          name: 'Form Group',
          description: 'Container for form elements',
          status: 'stable'
        },
        {
          id: 'field-wrapper',
          name: 'Field Wrapper',
          description: 'Wrapper with label and validation',
          status: 'stable'
        }
      ]
    },
    {
      id: 'layout-components',
      title: 'Layout Components',
      icon: 'Layout',
      components: [
        {
          id: 'input-grid',
          name: 'Input Grid',
          description: 'Grid layout for multiple inputs',
          status: 'alpha'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'text-success bg-success/10';
      case 'beta':
        return 'text-warning bg-warning/10';
      case 'alpha':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-2">Components</h2>
        <p className="text-sm text-muted-foreground">
          Browse and explore available components
        </p>
      </div>
      <div className="p-4 space-y-2">
        {componentSections?.map((section) => (
          <div key={section?.id} className="space-y-1">
            <button
              onClick={() => toggleSection(section?.id)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-micro"
            >
              <div className="flex items-center space-x-2">
                <Icon name={section?.icon} size={16} />
                <span>{section?.title}</span>
              </div>
              <Icon 
                name={expandedSections?.[section?.id] ? 'ChevronDown' : 'ChevronRight'} 
                size={14} 
              />
            </button>

            {expandedSections?.[section?.id] && (
              <div className="ml-4 space-y-1">
                {section?.components?.map((component) => (
                  <button
                    key={component?.id}
                    onClick={() => onComponentSelect(component)}
                    className={`
                      flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-micro
                      ${selectedComponent?.id === component?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{component?.name}</span>
                      <span className="text-xs opacity-75">{component?.description}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(component?.status)}`}>
                      {component?.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border mt-auto">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center justify-between">
            <span>Total Components:</span>
            <span className="font-medium">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Last Updated:</span>
            <span className="font-medium">Aug 26, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSidebar;