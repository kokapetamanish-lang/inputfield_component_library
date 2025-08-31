import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyEditor = ({ selectedProperty, themeData, onThemeUpdate, onExportTheme, onResetTheme }) => {
  const [localValue, setLocalValue] = React.useState('');

  React.useEffect(() => {
    if (selectedProperty) {
      const value = themeData?.[selectedProperty?.category]?.[selectedProperty?.property] || '';
      setLocalValue(value);
    }
  }, [selectedProperty, themeData]);

  const handleValueChange = (newValue) => {
    setLocalValue(newValue);
    if (selectedProperty) {
      onThemeUpdate(selectedProperty?.category, selectedProperty?.property, newValue);
    }
  };

  const getPropertyConfig = () => {
    if (!selectedProperty) return null;

    const { category, property } = selectedProperty;
    
    const configs = {
      colors: {
        type: 'color',
        label: 'Color Value',
        description: 'Select or enter a hex color value'
      },
      typography: {
        fontFamily: {
          type: 'select',
          label: 'Font Family',
          description: 'Choose a font family',
          options: [
            { value: 'Inter, sans-serif', label: 'Inter' },
            { value: 'Roboto, sans-serif', label: 'Roboto' },
            { value: 'Open Sans, sans-serif', label: 'Open Sans' },
            { value: 'Poppins, sans-serif', label: 'Poppins' },
            { value: 'Montserrat, sans-serif', label: 'Montserrat' },
            { value: 'JetBrains Mono, monospace', label: 'JetBrains Mono' }
          ]
        },
        fontSize: {
          type: 'slider',
          label: 'Font Size',
          description: 'Base font size in pixels',
          min: 12,
          max: 24,
          step: 1,
          unit: 'px'
        },
        fontWeight: {
          type: 'select',
          label: 'Font Weight',
          description: 'Font weight value',
          options: [
            { value: '300', label: 'Light (300)' },
            { value: '400', label: 'Regular (400)' },
            { value: '500', label: 'Medium (500)' },
            { value: '600', label: 'Semibold (600)' },
            { value: '700', label: 'Bold (700)' }
          ]
        },
        lineHeight: {
          type: 'slider',
          label: 'Line Height',
          description: 'Line height multiplier',
          min: 1,
          max: 2,
          step: 0.1,
          unit: ''
        },
        letterSpacing: {
          type: 'slider',
          label: 'Letter Spacing',
          description: 'Letter spacing in pixels',
          min: -1,
          max: 2,
          step: 0.1,
          unit: 'px'
        }
      },
      spacing: {
        type: 'slider',
        label: 'Spacing Value',
        description: 'Spacing value in pixels',
        min: 0,
        max: 32,
        step: 2,
        unit: 'px'
      },
      borders: {
        borderRadius: {
          type: 'slider',
          label: 'Border Radius',
          description: 'Corner radius in pixels',
          min: 0,
          max: 16,
          step: 1,
          unit: 'px'
        },
        borderWidth: {
          type: 'slider',
          label: 'Border Width',
          description: 'Border thickness in pixels',
          min: 0,
          max: 4,
          step: 1,
          unit: 'px'
        },
        focusRing: {
          type: 'slider',
          label: 'Focus Ring Width',
          description: 'Focus ring thickness in pixels',
          min: 1,
          max: 4,
          step: 1,
          unit: 'px'
        },
        shadowSize: {
          type: 'select',
          label: 'Shadow Size',
          description: 'Box shadow size',
          options: [
            { value: 'none', label: 'None' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
            { value: 'xl', label: 'Extra Large' }
          ]
        }
      }
    };

    if (category === 'colors') {
      return configs?.colors;
    } else if (category === 'typography' && configs?.typography?.[property]) {
      return configs?.typography?.[property];
    } else if (category === 'spacing') {
      return configs?.spacing;
    } else if (category === 'borders' && configs?.borders?.[property]) {
      return configs?.borders?.[property];
    }

    return {
      type: 'text',
      label: 'Custom Value',
      description: 'Enter a custom CSS value'
    };
  };

  const renderPropertyEditor = () => {
    if (!selectedProperty) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Icon name="Settings" size={48} className="text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Property Selected</h4>
          <p className="text-sm text-muted-foreground">
            Select a property from the tree to start customizing
          </p>
        </div>
      );
    }

    const config = getPropertyConfig();
    if (!config) return null;

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-foreground capitalize">
            {selectedProperty?.property?.replace(/([A-Z])/g, ' $1')?.trim()}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{config?.description}</p>
        </div>
        <div className="space-y-4">
          {config?.type === 'color' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Color Picker</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={localValue}
                  onChange={(e) => handleValueChange(e?.target?.value)}
                  className="w-12 h-12 rounded border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={localValue}
                  onChange={(e) => handleValueChange(e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}

          {config?.type === 'slider' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{config?.label}</label>
                <span className="text-sm text-muted-foreground font-mono">
                  {localValue}{config?.unit}
                </span>
              </div>
              <input
                type="range"
                min={config?.min}
                max={config?.max}
                step={config?.step}
                value={parseFloat(localValue) || config?.min}
                onChange={(e) => handleValueChange(e?.target?.value + config?.unit)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{config?.min}{config?.unit}</span>
                <span>{config?.max}{config?.unit}</span>
              </div>
            </div>
          )}

          {config?.type === 'select' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">{config?.label}</label>
              <select
                value={localValue}
                onChange={(e) => handleValueChange(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {config?.options?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {config?.type === 'text' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">{config?.label}</label>
              <input
                type="text"
                value={localValue}
                onChange={(e) => handleValueChange(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground font-mono text-sm"
                placeholder="Enter CSS value"
              />
            </div>
          )}
        </div>
        {/* Property Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Value:</span>
            <code className="px-2 py-1 bg-muted rounded text-foreground font-mono">
              {localValue}
            </code>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-card border-l border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Property Editor</h3>
        <p className="text-sm text-muted-foreground mt-1">Customize selected property</p>
      </div>
      
      <div className="p-6 overflow-y-auto h-[calc(100%-200px)]">
        {renderPropertyEditor()}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-3">
        <Button
          variant="default"
          onClick={onExportTheme}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          Export Theme
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onResetTheme}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            iconName="Copy"
            iconPosition="left"
            className="flex-1"
          >
            Copy CSS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditor;