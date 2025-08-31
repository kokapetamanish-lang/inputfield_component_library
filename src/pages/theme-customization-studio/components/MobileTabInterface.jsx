import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ThemePropertyTree from './ThemePropertyTree';
import LivePreviewPanel from './LivePreviewPanel';
import PropertyEditor from './PropertyEditor';

const MobileTabInterface = ({ 
  selectedProperty, 
  onPropertySelect, 
  themeData, 
  onThemeUpdate, 
  onExportTheme, 
  onResetTheme 
}) => {
  const [activeTab, setActiveTab] = useState('properties');

  const tabs = [
    {
      id: 'properties',
      label: 'Properties',
      icon: 'Settings',
      component: (
        <ThemePropertyTree
          selectedProperty={selectedProperty}
          onPropertySelect={onPropertySelect}
          themeData={themeData}
        />
      )
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: 'Eye',
      component: (
        <LivePreviewPanel themeData={themeData} />
      )
    },
    {
      id: 'editor',
      label: 'Editor',
      icon: 'Edit',
      component: (
        <PropertyEditor
          selectedProperty={selectedProperty}
          themeData={themeData}
          onThemeUpdate={onThemeUpdate}
          onExportTheme={onExportTheme}
          onResetTheme={onResetTheme}
        />
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-card">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-4 px-3 text-sm font-medium transition-micro
              ${activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {tabs?.find(tab => tab?.id === activeTab)?.component}
      </div>
      {/* Mobile Action Bar */}
      {activeTab === 'editor' && (
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <button
              onClick={onExportTheme}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
            <button
              onClick={onResetTheme}
              className="px-4 py-3 border border-border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
            >
              <Icon name="RotateCcw" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTabInterface;