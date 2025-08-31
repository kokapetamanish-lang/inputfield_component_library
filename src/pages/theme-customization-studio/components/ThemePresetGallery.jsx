import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemePresetGallery = ({ onPresetLoad, isVisible, onClose }) => {
  const themePresets = [
    {
      id: 'default',
      name: 'Default Theme',
      description: 'Clean and modern design with blue accents',
      colors: {
        primary: '#2563EB',
        secondary: '#64748B',
        background: '#FFFFFF',
        foreground: '#0F172A'
      },
      preview: ['#2563EB', '#64748B', '#FFFFFF', '#0F172A']
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Elegant dark mode with purple accents',
      colors: {
        primary: '#8B5CF6',
        secondary: '#6B7280',
        background: '#0F172A',
        foreground: '#F8FAFC'
      },
      preview: ['#8B5CF6', '#6B7280', '#0F172A', '#F8FAFC']
    },
    {
      id: 'nature',
      name: 'Nature Theme',
      description: 'Earth tones with green primary colors',
      colors: {
        primary: '#059669',
        secondary: '#78716C',
        background: '#FEFEFE',
        foreground: '#1C1917'
      },
      preview: ['#059669', '#78716C', '#FEFEFE', '#1C1917']
    },
    {
      id: 'sunset',
      name: 'Sunset Theme',
      description: 'Warm colors inspired by sunset hues',
      colors: {
        primary: '#EA580C',
        secondary: '#DC2626',
        background: '#FFF7ED',
        foreground: '#9A3412'
      },
      preview: ['#EA580C', '#DC2626', '#FFF7ED', '#9A3412']
    },
    {
      id: 'ocean',
      name: 'Ocean Theme',
      description: 'Cool blues and teals for a calming effect',
      colors: {
        primary: '#0891B2',
        secondary: '#0F766E',
        background: '#F0F9FF',
        foreground: '#0C4A6E'
      },
      preview: ['#0891B2', '#0F766E', '#F0F9FF', '#0C4A6E']
    },
    {
      id: 'minimal',
      name: 'Minimal Theme',
      description: 'Ultra-clean design with subtle grays',
      colors: {
        primary: '#374151',
        secondary: '#6B7280',
        background: '#FAFAFA',
        foreground: '#111827'
      },
      preview: ['#374151', '#6B7280', '#FAFAFA', '#111827']
    },
    {
      id: 'vibrant',
      name: 'Vibrant Theme',
      description: 'Bold and energetic with bright colors',
      colors: {
        primary: '#EC4899',
        secondary: '#8B5CF6',
        background: '#FFFFFF',
        foreground: '#1F2937'
      },
      preview: ['#EC4899', '#8B5CF6', '#FFFFFF', '#1F2937']
    },
    {
      id: 'corporate',
      name: 'Corporate Theme',
      description: 'Professional design for business applications',
      colors: {
        primary: '#1E40AF',
        secondary: '#475569',
        background: '#F8FAFC',
        foreground: '#1E293B'
      },
      preview: ['#1E40AF', '#475569', '#F8FAFC', '#1E293B']
    }
  ];

  const handlePresetSelect = (preset) => {
    const fullTheme = {
      colors: {
        primary: preset?.colors?.primary,
        secondary: preset?.colors?.secondary,
        background: preset?.colors?.background,
        foreground: preset?.colors?.foreground,
        border: '#E2E8F0',
        error: '#DC2626',
        success: '#059669',
        warning: '#D97706'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.5',
        letterSpacing: '0px'
      },
      spacing: {
        paddingX: '12px',
        paddingY: '8px',
        marginX: '0px',
        marginY: '4px',
        gap: '8px'
      },
      borders: {
        borderRadius: '6px',
        borderWidth: '1px',
        focusRing: '2px',
        shadowSize: 'sm'
      }
    };

    onPresetLoad(fullTheme);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg border border-border max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Theme Presets</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Choose from pre-built themes or use as starting points
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themePresets?.map((preset) => (
              <div
                key={preset?.id}
                className="group border border-border rounded-lg p-4 hover:border-primary/50 transition-micro cursor-pointer"
                onClick={() => handlePresetSelect(preset)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-micro">
                    {preset?.name}
                  </h4>
                  <div className="flex space-x-1">
                    {preset?.preview?.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {preset?.description}
                </p>

                {/* Mini Preview */}
                <div 
                  className="p-3 rounded border border-border space-y-2"
                  style={{ 
                    backgroundColor: preset?.colors?.background,
                    color: preset?.colors?.foreground 
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: preset?.colors?.primary }}
                    />
                    <div className="text-xs font-medium">Sample Input</div>
                  </div>
                  <div 
                    className="w-full h-6 rounded text-xs flex items-center px-2 border"
                    style={{ 
                      borderColor: preset?.colors?.primary,
                      backgroundColor: preset?.colors?.background 
                    }}
                  >
                    Preview text
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Click to apply
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={14} 
                    className="text-muted-foreground group-hover:text-primary transition-micro" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {themePresets?.length} presets available
            </div>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePresetGallery;