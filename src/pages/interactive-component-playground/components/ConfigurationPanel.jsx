import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConfigurationPanel = ({ 
  config, 
  onConfigChange, 
  onAddInstance, 
  onExportConfig,
  onCopyCode 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    props: true,
    styling: true,
    states: false,
    validation: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleConfigUpdate = (key, value) => {
    onConfigChange({ ...config, [key]: value });
  };

  const sizeOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'default', label: 'Medium' },
    { value: 'lg', label: 'Large' }
  ];

  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'filled', label: 'Filled' },
    { value: 'outlined', label: 'Outlined' },
    { value: 'ghost', label: 'Ghost' }
  ];

  const typeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Password' },
    { value: 'number', label: 'Number' },
    { value: 'tel', label: 'Phone' },
    { value: 'url', label: 'URL' },
    { value: 'search', label: 'Search' },
    { value: 'date', label: 'Date' }
  ];

  return (
    <div className="h-full bg-card border-r border-border overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddInstance}
            iconName="Plus"
            iconPosition="left"
          >
            Add Instance
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onCopyCode}
            iconName="Copy"
            iconPosition="left"
            className="flex-1"
          >
            Copy Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportConfig}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Props Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('props')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-foreground">Props</h3>
            <Icon 
              name={expandedSections?.props ? 'ChevronDown' : 'ChevronRight'} 
              size={16} 
              className="text-muted-foreground"
            />
          </button>
          
          {expandedSections?.props && (
            <div className="space-y-4 pl-4">
              <Input
                label="Label"
                type="text"
                value={config?.label}
                onChange={(e) => handleConfigUpdate('label', e?.target?.value)}
                placeholder="Enter label text"
              />
              
              <Input
                label="Placeholder"
                type="text"
                value={config?.placeholder}
                onChange={(e) => handleConfigUpdate('placeholder', e?.target?.value)}
                placeholder="Enter placeholder text"
              />
              
              <Input
                label="Description"
                type="text"
                value={config?.description}
                onChange={(e) => handleConfigUpdate('description', e?.target?.value)}
                placeholder="Helper text"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Type</label>
                <select
                  value={config?.type}
                  onChange={(e) => handleConfigUpdate('type', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {typeOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Styling Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('styling')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-foreground">Styling</h3>
            <Icon 
              name={expandedSections?.styling ? 'ChevronDown' : 'ChevronRight'} 
              size={16} 
              className="text-muted-foreground"
            />
          </button>
          
          {expandedSections?.styling && (
            <div className="space-y-4 pl-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Size</label>
                <select
                  value={config?.size}
                  onChange={(e) => handleConfigUpdate('size', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sizeOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Variant</label>
                <select
                  value={config?.variant}
                  onChange={(e) => handleConfigUpdate('variant', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {variantOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* States Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('states')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-foreground">States</h3>
            <Icon 
              name={expandedSections?.states ? 'ChevronDown' : 'ChevronRight'} 
              size={16} 
              className="text-muted-foreground"
            />
          </button>
          
          {expandedSections?.states && (
            <div className="space-y-3 pl-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config?.disabled}
                  onChange={(e) => handleConfigUpdate('disabled', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">Disabled</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config?.required}
                  onChange={(e) => handleConfigUpdate('required', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">Required</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config?.loading}
                  onChange={(e) => handleConfigUpdate('loading', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">Loading</span>
              </label>
            </div>
          )}
        </div>

        {/* Validation Section */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('validation')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-foreground">Validation</h3>
            <Icon 
              name={expandedSections?.validation ? 'ChevronDown' : 'ChevronRight'} 
              size={16} 
              className="text-muted-foreground"
            />
          </button>
          
          {expandedSections?.validation && (
            <div className="space-y-4 pl-4">
              <Input
                label="Error Message"
                type="text"
                value={config?.error}
                onChange={(e) => handleConfigUpdate('error', e?.target?.value)}
                placeholder="Enter error message"
              />
              
              <Input
                label="Min Length"
                type="number"
                value={config?.minLength}
                onChange={(e) => handleConfigUpdate('minLength', e?.target?.value)}
                placeholder="Minimum characters"
              />
              
              <Input
                label="Max Length"
                type="number"
                value={config?.maxLength}
                onChange={(e) => handleConfigUpdate('maxLength', e?.target?.value)}
                placeholder="Maximum characters"
              />
              
              <Input
                label="Pattern"
                type="text"
                value={config?.pattern}
                onChange={(e) => handleConfigUpdate('pattern', e?.target?.value)}
                placeholder="Regular expression"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;