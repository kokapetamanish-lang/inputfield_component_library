import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeHeader = ({ 
  currentThemeName, 
  hasUnsavedChanges, 
  onSaveTheme, 
  onLoadPresets, 
  onNewTheme,
  onImportTheme 
}) => {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Theme Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Palette" size={20} className="text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Theme Studio</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Current theme:</span>
            <span className="font-medium text-foreground">{currentThemeName}</span>
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="Circle" size={8} className="fill-current" />
                <span className="text-xs">Unsaved changes</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewTheme}
              iconName="Plus"
              iconPosition="left"
            >
              New Theme
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadPresets}
              iconName="Grid3x3"
              iconPosition="left"
            >
              Presets
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onImportTheme}
              iconName="Upload"
              iconPosition="left"
            >
              Import
            </Button>
          </div>

          <Button
            variant={hasUnsavedChanges ? "default" : "outline"}
            size="sm"
            onClick={onSaveTheme}
            iconName="Save"
            iconPosition="left"
            disabled={!hasUnsavedChanges}
          >
            {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Theme Info */}
      <div className="md:hidden mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Theme:</span>
            <span className="font-medium text-foreground">{currentThemeName}</span>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="Circle" size={8} className="fill-current" />
              <span className="text-xs">Unsaved</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeHeader;