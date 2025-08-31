import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import ThemeHeader from './components/ThemeHeader';
import ThemePropertyTree from './components/ThemePropertyTree';
import LivePreviewPanel from './components/LivePreviewPanel';
import PropertyEditor from './components/PropertyEditor';
import ThemePresetGallery from './components/ThemePresetGallery';
import MobileTabInterface from './components/MobileTabInterface';

const ThemeCustomizationStudio = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentThemeName, setCurrentThemeName] = useState('Custom Theme');
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [themeData, setThemeData] = useState({
    colors: {
      primary: '#2563EB',
      secondary: '#64748B',
      background: '#FFFFFF',
      foreground: '#0F172A',
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
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeData(parsedTheme);
      } catch (error) {
        console.error('Error loading saved theme:', error);
      }
    }
  }, []);

  const handlePropertySelect = (category, property) => {
    setSelectedProperty({ category, property });
  };

  const handleThemeUpdate = (category, property, value) => {
    setThemeData(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [property]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveTheme = () => {
    localStorage.setItem('customTheme', JSON.stringify(themeData));
    localStorage.setItem('customThemeName', currentThemeName);
    setHasUnsavedChanges(false);
  };

  const handleExportTheme = () => {
    const exportData = {
      name: currentThemeName,
      version: '1.0.0',
      created: new Date()?.toISOString(),
      theme: themeData
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentThemeName?.toLowerCase()?.replace(/\s+/g, '-')}-theme.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetTheme = () => {
    const defaultTheme = {
      colors: {
        primary: '#2563EB',
        secondary: '#64748B',
        background: '#FFFFFF',
        foreground: '#0F172A',
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

    setThemeData(defaultTheme);
    setCurrentThemeName('Default Theme');
    setHasUnsavedChanges(true);
  };

  const handlePresetLoad = (presetTheme) => {
    setThemeData(presetTheme);
    setHasUnsavedChanges(true);
  };

  const handleNewTheme = () => {
    setCurrentThemeName('New Theme');
    handleResetTheme();
  };

  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event?.target?.result);
            if (importedData?.theme) {
              setThemeData(importedData?.theme);
              setCurrentThemeName(importedData?.name || 'Imported Theme');
              setHasUnsavedChanges(true);
            }
          } catch (error) {
            console.error('Error importing theme:', error);
          }
        };
        reader?.readAsText(file);
      }
    };
    input?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="pt-16 pb-16 md:pb-0 h-screen flex flex-col">
        <ThemeHeader
          currentThemeName={currentThemeName}
          hasUnsavedChanges={hasUnsavedChanges}
          onSaveTheme={handleSaveTheme}
          onLoadPresets={() => setShowPresetGallery(true)}
          onNewTheme={handleNewTheme}
          onImportTheme={handleImportTheme}
        />

        <div className="flex-1 overflow-hidden">
          {isMobile ? (
            <MobileTabInterface
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              themeData={themeData}
              onThemeUpdate={handleThemeUpdate}
              onExportTheme={handleExportTheme}
              onResetTheme={handleResetTheme}
            />
          ) : (
            <div className="h-full flex">
              {/* Left Panel - Property Tree */}
              <div className="w-1/4 min-w-[300px]">
                <ThemePropertyTree
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                  themeData={themeData}
                />
              </div>

              {/* Center Panel - Live Preview */}
              <div className="w-1/2 flex-1">
                <LivePreviewPanel themeData={themeData} />
              </div>

              {/* Right Panel - Property Editor */}
              <div className="w-1/4 min-w-[300px]">
                <PropertyEditor
                  selectedProperty={selectedProperty}
                  themeData={themeData}
                  onThemeUpdate={handleThemeUpdate}
                  onExportTheme={handleExportTheme}
                  onResetTheme={handleResetTheme}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ThemePresetGallery
        isVisible={showPresetGallery}
        onClose={() => setShowPresetGallery(false)}
        onPresetLoad={handlePresetLoad}
      />
    </div>
  );
};

export default ThemeCustomizationStudio;