import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const ComponentOverview = ({ component }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [inputSize, setInputSize] = useState('default');
  const [inputVariant, setInputVariant] = useState('default');
  const [isDisabled, setIsDisabled] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'api', label: 'API', icon: 'Code' },
    { id: 'examples', label: 'Examples', icon: 'Play' }
  ];

  const handleInputChange = (e) => {
    setInputValue(e?.target?.value);
    if (inputError) setInputError('');
  };

  const validateInput = () => {
    if (!inputValue?.trim()) {
      setInputError('This field is required');
    } else if (inputValue?.length < 3) {
      setInputError('Minimum 3 characters required');
    } else {
      setInputError('');
    }
  };

  const renderOverviewContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Example</h3>
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <div className="max-w-md">
            <Input
              label="Sample Input Field"
              type={component?.id === 'password-input' ? 'password' : 'text'}
              placeholder={`Enter ${component?.name?.toLowerCase() || 'text'}...`}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={validateInput}
              error={inputError}
              disabled={isDisabled}
              description="This is a live interactive example"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Controls</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Size</label>
            <select
              value={inputSize}
              onChange={(e) => setInputSize(e?.target?.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="sm">Small</option>
              <option value="default">Default</option>
              <option value="lg">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Variant</label>
            <select
              value={inputVariant}
              onChange={(e) => setInputVariant(e?.target?.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="default">Default</option>
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e?.target?.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Disabled state</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Icon name="Check" size={16} className="text-success mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Validation Support</h4>
              <p className="text-sm text-muted-foreground">Built-in validation with error states</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Check" size={16} className="text-success mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Accessibility</h4>
              <p className="text-sm text-muted-foreground">ARIA labels and keyboard navigation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Check" size={16} className="text-success mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Theme Support</h4>
              <p className="text-sm text-muted-foreground">Light and dark theme compatible</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Check" size={16} className="text-success mt-1" />
            <div>
              <h4 className="font-medium text-foreground">TypeScript</h4>
              <p className="text-sm text-muted-foreground">Full TypeScript support with types</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">label</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Label text for the input</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">type</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">'text'</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Input type (text, email, password, etc.)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">placeholder</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Placeholder text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">value</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Input value</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">onChange</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">function</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Change handler function</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">error</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Error message to display</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-foreground">disabled</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">Disable the input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExamplesContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Basic Usage</h3>
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <div className="space-y-4 max-w-md">
            <Input
              label="Basic Input"
              type="text"
              placeholder="Enter text..."
            />
            <Input
              label="With Description"
              type="email"
              placeholder="Enter email..."
              description="We'll never share your email address"
            />
            <Input
              label="With Error"
              type="text"
              placeholder="Enter text..."
              error="This field is required"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Different States</h3>
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Normal State"
                type="text"
                placeholder="Normal input..."
              />
              <Input
                label="Disabled State"
                type="text"
                placeholder="Disabled input..."
                disabled
              />
            </div>
            <div className="space-y-4">
              <Input
                label="Required Field"
                type="text"
                placeholder="Required input..."
                required
              />
              <Input
                label="Password Input"
                type="password"
                placeholder="Enter password..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api':
        return renderApiContent();
      case 'examples':
        return renderExamplesContent();
      default:
        return renderOverviewContent();
    }
  };

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Component</h3>
          <p className="text-muted-foreground">Choose a component from the sidebar to view its documentation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{component?.name}</h1>
              <p className="text-muted-foreground mt-1">{component?.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${
                component?.status === 'stable' ? 'text-success bg-success/10' :
                component?.status === 'beta'? 'text-warning bg-warning/10' : 'text-error bg-error/10'
              }`}>
                {component?.status}
              </span>
            </div>
          </div>

          <div className="flex space-x-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro
                  ${activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ComponentOverview;