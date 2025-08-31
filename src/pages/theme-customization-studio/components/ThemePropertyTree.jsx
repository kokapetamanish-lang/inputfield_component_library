import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ThemePropertyTree = ({ selectedProperty, onPropertySelect, themeData }) => {
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    typography: false,
    spacing: false,
    borders: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const propertyCategories = [
    {
      id: 'colors',
      label: 'Colors',
      icon: 'Palette',
      properties: [
        { id: 'primary', label: 'Primary Color', value: themeData?.colors?.primary },
        { id: 'secondary', label: 'Secondary Color', value: themeData?.colors?.secondary },
        { id: 'background', label: 'Background', value: themeData?.colors?.background },
        { id: 'foreground', label: 'Foreground', value: themeData?.colors?.foreground },
        { id: 'border', label: 'Border Color', value: themeData?.colors?.border },
        { id: 'error', label: 'Error Color', value: themeData?.colors?.error },
        { id: 'success', label: 'Success Color', value: themeData?.colors?.success },
        { id: 'warning', label: 'Warning Color', value: themeData?.colors?.warning }
      ]
    },
    {
      id: 'typography',
      label: 'Typography',
      icon: 'Type',
      properties: [
        { id: 'fontFamily', label: 'Font Family', value: themeData?.typography?.fontFamily },
        { id: 'fontSize', label: 'Base Font Size', value: themeData?.typography?.fontSize },
        { id: 'fontWeight', label: 'Font Weight', value: themeData?.typography?.fontWeight },
        { id: 'lineHeight', label: 'Line Height', value: themeData?.typography?.lineHeight },
        { id: 'letterSpacing', label: 'Letter Spacing', value: themeData?.typography?.letterSpacing }
      ]
    },
    {
      id: 'spacing',
      label: 'Spacing',
      icon: 'Move',
      properties: [
        { id: 'paddingX', label: 'Horizontal Padding', value: themeData?.spacing?.paddingX },
        { id: 'paddingY', label: 'Vertical Padding', value: themeData?.spacing?.paddingY },
        { id: 'marginX', label: 'Horizontal Margin', value: themeData?.spacing?.marginX },
        { id: 'marginY', label: 'Vertical Margin', value: themeData?.spacing?.marginY },
        { id: 'gap', label: 'Gap Size', value: themeData?.spacing?.gap }
      ]
    },
    {
      id: 'borders',
      label: 'Borders',
      icon: 'Square',
      properties: [
        { id: 'borderRadius', label: 'Border Radius', value: themeData?.borders?.borderRadius },
        { id: 'borderWidth', label: 'Border Width', value: themeData?.borders?.borderWidth },
        { id: 'focusRing', label: 'Focus Ring Width', value: themeData?.borders?.focusRing },
        { id: 'shadowSize', label: 'Shadow Size', value: themeData?.borders?.shadowSize }
      ]
    }
  ];

  return (
    <div className="h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Theme Properties</h3>
        <p className="text-sm text-muted-foreground mt-1">Customize component styling</p>
      </div>
      <div className="overflow-y-auto h-[calc(100%-80px)]">
        {propertyCategories?.map((category) => (
          <div key={category?.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleSection(category?.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-micro text-left"
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={18} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{category?.label}</span>
              </div>
              <Icon 
                name={expandedSections?.[category?.id] ? 'ChevronDown' : 'ChevronRight'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSections?.[category?.id] && (
              <div className="pb-2">
                {category?.properties?.map((property) => (
                  <button
                    key={property?.id}
                    onClick={() => onPropertySelect(category?.id, property?.id)}
                    className={`
                      w-full flex items-center justify-between px-8 py-2 hover:bg-muted transition-micro text-left
                      ${selectedProperty?.category === category?.id && selectedProperty?.property === property?.id
                        ? 'bg-primary/10 border-r-2 border-primary' :''
                      }
                    `}
                  >
                    <span className="text-sm text-foreground">{property?.label}</span>
                    <div className="flex items-center space-x-2">
                      {category?.id === 'colors' && (
                        <div 
                          className="w-4 h-4 rounded border border-border"
                          style={{ backgroundColor: property?.value }}
                        />
                      )}
                      <span className="text-xs text-muted-foreground font-mono">
                        {property?.value}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePropertyTree;