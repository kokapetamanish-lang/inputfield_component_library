import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const quickActions = [
    {
      id: 'new-component',
      label: 'New Component',
      icon: 'Plus',
      description: 'Create a new component',
      variant: 'default'
    },
    {
      id: 'export-docs',
      label: 'Export Docs',
      icon: 'Download',
      description: 'Export documentation as PDF',
      variant: 'outline'
    },
    {
      id: 'share-link',
      label: 'Share',
      icon: 'Share2',
      description: 'Share component documentation',
      variant: 'ghost'
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: 'MessageSquare',
      description: 'Provide feedback on components',
      variant: 'ghost'
    }
  ];

  const recentComponents = [
    { id: 'text-input', name: 'Text Input', lastAccessed: '2 hours ago' },
    { id: 'password-input', name: 'Password Input', lastAccessed: '1 day ago' },
    { id: 'search-input', name: 'Search Input', lastAccessed: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              onClick={() => onAction(action?.id)}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <Icon name={action?.icon} size={20} />
              <div className="text-center">
                <div className="font-medium">{action?.label}</div>
                <div className="text-xs opacity-75">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recently Viewed</h3>
        <div className="space-y-2">
          {recentComponents?.map((component) => (
            <button
              key={component?.id}
              onClick={() => onAction('view-component', component)}
              className="flex items-center justify-between w-full p-3 bg-muted/50 hover:bg-muted rounded-md transition-micro"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="Type" size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">{component?.name}</div>
                  <div className="text-xs text-muted-foreground">{component?.lastAccessed}</div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Package" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Components</span>
            </div>
            <div className="text-2xl font-bold text-foreground">8</div>
            <div className="text-xs text-muted-foreground">Total available</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Views</span>
            </div>
            <div className="text-2xl font-bold text-foreground">1.2k</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Download" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Downloads</span>
            </div>
            <div className="text-2xl font-bold text-foreground">456</div>
            <div className="text-xs text-muted-foreground">This week</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Star" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Rating</span>
            </div>
            <div className="text-2xl font-bold text-foreground">4.8</div>
            <div className="text-xs text-muted-foreground">Average score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;