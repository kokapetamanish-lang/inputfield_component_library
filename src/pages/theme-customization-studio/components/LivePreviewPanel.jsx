import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LivePreviewPanel = ({ themeData }) => {
  const [previewValues, setPreviewValues] = React.useState({
    text: 'Sample text',
    email: 'user@example.com',
    password: 'password123',
    checkbox: false
  });

  const customStyles = {
    '--color-primary': themeData?.colors?.primary,
    '--color-secondary': themeData?.colors?.secondary,
    '--color-background': themeData?.colors?.background,
    '--color-foreground': themeData?.colors?.foreground,
    '--color-border': themeData?.colors?.border,
    '--color-error': themeData?.colors?.error,
    '--color-success': themeData?.colors?.success,
    '--color-warning': themeData?.colors?.warning,
    '--font-family': themeData?.typography?.fontFamily,
    '--font-size': themeData?.typography?.fontSize,
    '--font-weight': themeData?.typography?.fontWeight,
    '--line-height': themeData?.typography?.lineHeight,
    '--letter-spacing': themeData?.typography?.letterSpacing,
    '--border-radius': themeData?.borders?.borderRadius,
    '--border-width': themeData?.borders?.borderWidth,
    '--padding-x': themeData?.spacing?.paddingX,
    '--padding-y': themeData?.spacing?.paddingY
  };

  const componentStates = [
    { label: 'Default State', error: null, disabled: false },
    { label: 'Error State', error: 'This field is required', disabled: false },
    { label: 'Disabled State', error: null, disabled: true }
  ];

  const componentSizes = ['sm', 'default', 'lg'];

  return (
    <div className="h-full bg-background" style={customStyles}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
        <p className="text-sm text-muted-foreground mt-1">Real-time component rendering</p>
      </div>
      <div className="overflow-y-auto h-[calc(100%-80px)] p-6">
        <div className="space-y-8">
          {/* Input Components */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-foreground border-b border-border pb-2">
              Input Components
            </h4>
            
            {componentStates?.map((state, stateIndex) => (
              <div key={stateIndex} className="space-y-4">
                <h5 className="text-sm font-medium text-muted-foreground">{state?.label}</h5>
                
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Text Input"
                    type="text"
                    placeholder="Enter text here"
                    value={previewValues?.text}
                    onChange={(e) => setPreviewValues(prev => ({ ...prev, text: e?.target?.value }))}
                    error={state?.error}
                    disabled={state?.disabled}
                    description="This is a sample text input"
                  />
                  
                  <Input
                    label="Email Input"
                    type="email"
                    placeholder="Enter email address"
                    value={previewValues?.email}
                    onChange={(e) => setPreviewValues(prev => ({ ...prev, email: e?.target?.value }))}
                    error={state?.error}
                    disabled={state?.disabled}
                    required
                  />
                  
                  <Input
                    label="Password Input"
                    type="password"
                    placeholder="Enter password"
                    value={previewValues?.password}
                    onChange={(e) => setPreviewValues(prev => ({ ...prev, password: e?.target?.value }))}
                    error={state?.error}
                    disabled={state?.disabled}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Button Components */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-foreground border-b border-border pb-2">
              Button Components
            </h4>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="success" iconName="Check" iconPosition="left">
                  Success Button
                </Button>
                <Button variant="warning" iconName="AlertTriangle" iconPosition="left">
                  Warning Button
                </Button>
                <Button variant="danger" iconName="X" iconPosition="left">
                  Danger Button
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small Button</Button>
                <Button size="default">Default Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled Button</Button>
                <Button loading>Loading Button</Button>
              </div>
            </div>
          </div>

          {/* Checkbox Components */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-foreground border-b border-border pb-2">
              Checkbox Components
            </h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Default Checkbox"
                description="This is a sample checkbox component"
                checked={previewValues?.checkbox}
                onChange={(e) => setPreviewValues(prev => ({ ...prev, checkbox: e?.target?.checked }))}
              />
              
              <Checkbox
                label="Required Checkbox"
                description="This checkbox is required"
                required
               
                onChange={() => {}}
              />
              
              <Checkbox
                label="Error State Checkbox"
                error="Please check this option"
               
                onChange={() => {}}
              />
              
              <Checkbox
                label="Disabled Checkbox"
                disabled
                checked
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Form Example */}
          <div className="space-y-6">
            <h4 className="text-md font-semibold text-foreground border-b border-border pb-2">
              Complete Form Example
            </h4>
            
            <div className="bg-card p-6 rounded-lg border border-border space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                description="We'll never share your email with anyone"
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
              
              <Checkbox
                label="I agree to the terms and conditions"
                required
              />
              
              <div className="flex gap-3 pt-4">
                <Button variant="default" className="flex-1">
                  Submit Form
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreviewPanel;