import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PreviewPanel = ({ 
  instances, 
  onUpdateInstance, 
  onRemoveInstance, 
  onReorderInstances 
}) => {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const deviceFrames = {
    desktop: { width: '100%', height: 'auto', label: 'Desktop' },
    tablet: { width: '768px', height: '1024px', label: 'Tablet' },
    mobile: { width: '375px', height: '667px', label: 'Mobile' }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorderInstances(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleInputChange = (instanceId, value) => {
    onUpdateInstance(instanceId, { value });
  };

  const getDeviceFrameStyle = () => {
    const frame = deviceFrames?.[selectedDevice];
    return {
      width: frame?.width,
      height: frame?.height,
      maxWidth: '100%',
      margin: selectedDevice !== 'desktop' ? '0 auto' : '0'
    };
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Device:</span>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {Object.entries(deviceFrames)?.map(([key, frame]) => (
                <option key={key} value={key}>
                  {frame?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Layers" size={14} />
            <span>{instances?.length} instance{instances?.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Monitor" size={14} />
            <span>{deviceFrames?.[selectedDevice]?.label}</span>
          </div>
        </div>
      </div>
      {/* Preview Area */}
      <div className="p-6">
        <div 
          className="bg-card border border-border rounded-lg p-6 min-h-96"
          style={getDeviceFrameStyle()}
        >
          {instances?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Icon name="Package" size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Components</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first input component to start experimenting
              </p>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Component
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {instances?.map((instance, index) => (
                <div
                  key={instance?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`
                    group relative p-4 border border-border rounded-lg bg-background
                    hover:border-primary/50 transition-colors cursor-move
                    ${draggedIndex === index ? 'opacity-50' : ''}
                  `}
                >
                  {/* Instance Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Instance {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {instance?.config?.type} • {instance?.config?.size}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveInstance(instance?.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>

                  {/* Component Preview */}
                  <div className="max-w-md">
                    <Input
                      label={instance?.config?.label}
                      type={instance?.config?.type}
                      placeholder={instance?.config?.placeholder}
                      description={instance?.config?.description}
                      error={instance?.config?.error}
                      disabled={instance?.config?.disabled}
                      required={instance?.config?.required}
                      value={instance?.value || ''}
                      onChange={(e) => handleInputChange(instance?.id, e?.target?.value)}
                      minLength={instance?.config?.minLength}
                      maxLength={instance?.config?.maxLength}
                      pattern={instance?.config?.pattern}
                    />
                  </div>

                  {/* Configuration Summary */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {instance?.config?.required && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-error/10 text-error">
                          Required
                        </span>
                      )}
                      {instance?.config?.disabled && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                          Disabled
                        </span>
                      )}
                      {instance?.config?.loading && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                          Loading
                        </span>
                      )}
                      {instance?.config?.error && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-error/10 text-error">
                          Has Error
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Responsive Info */}
      {selectedDevice !== 'desktop' && (
        <div className="px-6 pb-6">
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Responsive Preview</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Viewing components in {deviceFrames?.[selectedDevice]?.label?.toLowerCase()} viewport. 
              Components automatically adapt to different screen sizes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;