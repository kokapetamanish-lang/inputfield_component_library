import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'new-component',
      title: 'Create New Table',
      description: 'Start building a new data table component',
      icon: 'Plus',
      color: 'primary',
      action: () => onAction('new-component')
    },
    {
      id: 'export-docs',
      title: 'Export Documentation',
      description: 'Download table component documentation',
      icon: 'Download',
      color: 'accent',
      action: () => onAction('export-docs')
    },
    {
      id: 'share-link',
      title: 'Share Component',
      description: 'Generate shareable link for this table',
      icon: 'Share',
      color: 'secondary',
      action: () => onAction('share-link')
    },
    {
      id: 'feedback',
      title: 'Provide Feedback',
      description: 'Help us improve data table components',
      icon: 'MessageSquare',
      color: 'warning',
      action: () => onAction('feedback')
    }
  ];

  const quickComponents = [
    { id: 'basic-table', name: 'Basic Table', description: 'Simple data display' },
    { id: 'sortable-table', name: 'Sortable Table', description: 'With column sorting' },
    { id: 'selectable-table', name: 'Selectable Table', description: 'With row selection' },
    { id: 'advanced-table', name: 'Advanced Table', description: 'Full featured table' }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`
                p-6 text-left rounded-lg border transition-micro
                hover:shadow-md hover:scale-[1.02]
                ${action?.color === 'primary' ? 'border-primary/20 hover:border-primary/40 hover:bg-primary/5' : ''}
                ${action?.color === 'accent' ? 'border-accent/20 hover:border-accent/40 hover:bg-accent/5' : ''}
                ${action?.color === 'secondary' ? 'border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5' : ''}
                ${action?.color === 'warning' ? 'border-warning/20 hover:border-warning/40 hover:bg-warning/5' : ''}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  p-3 rounded-lg
                  ${action?.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                  ${action?.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                  ${action?.color === 'secondary' ? 'bg-secondary/10 text-secondary' : ''}
                  ${action?.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                `}>
                  <Icon name={action?.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Quick Component Access */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Component Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickComponents?.map((component) => (
            <button
              key={component?.id}
              onClick={() => onAction('view-component', component)}
              className="
                p-4 text-left rounded-lg border border-border
                hover:border-primary/40 hover:bg-primary/5
                transition-micro
              "
            >
              <div className="flex items-center space-x-3">
                <Icon name="Table" size={20} className="text-primary" />
                <div>
                  <h3 className="font-medium text-foreground">{component?.name}</h3>
                  <p className="text-sm text-muted-foreground">{component?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Getting Started Guide */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Getting Started</h2>
        <div className="p-6 border border-border rounded-lg">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-foreground">Import the DataTable component</h4>
                <p className="text-sm text-muted-foreground">Add the component to your project</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-foreground">Define your data and columns</h4>
                <p className="text-sm text-muted-foreground">Set up the data structure and column configuration</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-foreground">Configure features</h4>
                <p className="text-sm text-muted-foreground">Enable sorting, selection, and other features as needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;