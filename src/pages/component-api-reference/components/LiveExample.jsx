import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LiveExample = ({ title, description, initialProps = {}, component: Component, className = '' }) => {
  const [props, setProps] = useState(initialProps);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateProp = (propName, value) => {
    setProps(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  const resetProps = () => {
    setProps(initialProps);
  };

  const generateCode = () => {
    const propsString = Object.entries(props)?.filter(([_, value]) => value !== '' && value !== false && value !== null)?.map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : '';
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })?.filter(Boolean)?.join('\n  ');

    return `<Input\n  ${propsString}\n/>`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetProps}
              iconName="RotateCcw"
              iconSize={14}
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconSize={14}
            >
              {isExpanded ? 'Hide' : 'Show'} Props
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Live Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Preview</h4>
          <div className="p-6 bg-muted rounded-lg border-2 border-dashed border-border">
            <div className="max-w-md">
              <Input {...props} />
            </div>
          </div>
        </div>

        {/* Props Controls */}
        {isExpanded && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Props</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <Input
                label="Label"
                type="text"
                value={props?.label || ''}
                onChange={(e) => updateProp('label', e?.target?.value)}
                placeholder="Enter label text"
              />
              
              <Input
                label="Placeholder"
                type="text"
                value={props?.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e?.target?.value)}
                placeholder="Enter placeholder text"
              />
              
              <Input
                label="Description"
                type="text"
                value={props?.description || ''}
                onChange={(e) => updateProp('description', e?.target?.value)}
                placeholder="Enter description text"
              />
              
              <Input
                label="Error Message"
                type="text"
                value={props?.error || ''}
                onChange={(e) => updateProp('error', e?.target?.value)}
                placeholder="Enter error message"
              />

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={props?.required || false}
                    onChange={(e) => updateProp('required', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Required</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={props?.disabled || false}
                    onChange={(e) => updateProp('disabled', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Disabled</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Generated Code */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Generated Code</h4>
          <div className="relative">
            <pre className="p-4 bg-muted rounded-lg border border-border overflow-x-auto text-sm">
              <code className="text-foreground font-mono">{generateCode()}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard?.writeText(generateCode())}
              className="absolute top-2 right-2"
              iconName="Copy"
              iconSize={14}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveExample;