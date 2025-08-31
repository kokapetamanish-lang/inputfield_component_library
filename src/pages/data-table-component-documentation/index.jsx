import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import ComponentSidebar from './components/ComponentSidebar';
import ComponentOverview from './components/ComponentOverview';
import CodeSandbox from './components/CodeSandbox';
import SearchBar from './components/SearchBar';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';

const DataTableComponentDocumentation = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Initialize with default data table component on load
  useEffect(() => {
    const defaultComponent = {
      id: 'data-table',
      name: 'Data Table',
      description: 'A comprehensive data table component with sorting, selection, loading states, and TypeScript support',
      status: 'stable'
    };
    setSelectedComponent(defaultComponent);
  }, []);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setShowQuickActions(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleQuickAction = (actionId, data) => {
    switch (actionId) {
      case 'new-component': console.log('Creating new table component...');
        break;
      case 'export-docs':
        console.log('Exporting table documentation...');
        break;
      case 'share-link': console.log('Sharing data table link...');
        break;
      case 'feedback': console.log('Opening feedback form...');
        break;
      case 'view-component':
        if (data) {
          const component = {
            id: data?.id,
            name: data?.name,
            description: `${data?.name} with advanced functionality`,
            status: 'stable'
          };
          setSelectedComponent(component);
          setShowQuickActions(false);
        }
        break;
      default:
        break;
    }
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="flex h-screen pt-16">
        {/* Left Sidebar */}
        <div className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80'}
          ${sidebarCollapsed ? 'md:w-0' : 'md:w-80'}
        `}>
          <ComponentSidebar
            selectedComponent={selectedComponent}
            onComponentSelect={handleComponentSelect}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-muted rounded-md transition-micro"
                >
                  <Icon name={sidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} size={16} />
                </button>
                
                <div className="w-80">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleQuickActions}
                  className={`
                    p-2 rounded-md transition-micro
                    ${showQuickActions ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  `}
                >
                  <Icon name="Zap" size={16} />
                </button>
                
                <button
                  onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                  className="p-2 hover:bg-muted rounded-md transition-micro"
                >
                  <Icon name={rightPanelCollapsed ? 'PanelRightOpen' : 'PanelRightClose'} size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Documentation Area */}
            <div className="flex-1 min-w-0">
              {showQuickActions ? (
                <div className="h-full overflow-y-auto p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        Data Table Component Documentation
                      </h1>
                      <p className="text-muted-foreground">
                        Comprehensive guide for implementing data tables with sorting, selection, loading states, and TypeScript support.
                      </p>
                    </div>
                    <QuickActions onAction={handleQuickAction} />
                  </div>
                </div>
              ) : (
                <ComponentOverview component={selectedComponent} />
              )}
            </div>

            {/* Right Sidebar - Code Sandbox */}
            <div className={`
              transition-all duration-300 ease-in-out
              ${rightPanelCollapsed ? 'w-0 overflow-hidden' : 'w-80'}
              ${rightPanelCollapsed ? 'md:w-0' : 'md:w-80'}
            `}>
              <CodeSandbox component={selectedComponent} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default DataTableComponentDocumentation;